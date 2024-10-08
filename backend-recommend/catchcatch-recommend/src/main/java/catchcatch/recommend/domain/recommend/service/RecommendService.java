package catchcatch.recommend.domain.recommend.service;

import catchcatch.recommend.domain.recommend.domain.MatchStatistics;
import catchcatch.recommend.domain.recommend.domain.Player;
import catchcatch.recommend.domain.recommend.requestdto.EntryRequestDto;
import catchcatch.recommend.domain.recommend.requestdto.ExitRequestDto;
import catchcatch.recommend.domain.recommend.requestdto.MatchData;
import catchcatch.recommend.domain.recommend.requestdto.MatchingDataDto;
import catchcatch.recommend.domain.recommend.responsedto.ExpectationTimeDto;
import catchcatch.recommend.domain.recommend.responsedto.RoomCodeDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;
import java.util.concurrent.ConcurrentSkipListSet;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@EnableScheduling
@Slf4j(topic = "matching")
public class RecommendService {

    private final SimpMessagingTemplate messagingTemplate;
    private final RedisTemplate<String, Object> redisTemplate;
    private final HashMap<String, Integer> avatars;
    private final ElasticsearchService elasticsearchService;
    private final MatchStatistics matchStatistics;

    private PlayerStore playerStore;

    private int USERSIZE;

    @Value("${rating.range}")
    private Integer RATING_RANGE;

    @Value("${rating.max}")
    private Integer RATING_MAX;

    @Value("${player.size}")
    private Integer PLAYER_SIZE;

    @Value("${waiting.time}")
    private Long WAITING_TIME;

    public RecommendService(SimpMessagingTemplate messagingTemplate, RedisTemplate<String, Object> redisTemplate, ElasticsearchService elasticsearchService, MatchStatistics matchStatistics, PlayerStore playerStore) {
        this.messagingTemplate = messagingTemplate;
        this.redisTemplate = redisTemplate;
        this.elasticsearchService = elasticsearchService;
        this.matchStatistics = matchStatistics;
        this.playerStore = playerStore;
        this.avatars = new HashMap<>();

        initializeAvatars();
    }

    private void initializeAvatars() {
        avatars.put("1", 13);
        avatars.put("2", 14);
        avatars.put("3", 15);
        avatars.put("4", 16);
    }

    public void entryPlayer(EntryRequestDto requestDto) {
        Player player = Player.createPlayer(requestDto);
        playerStore.getWaitingPlayers().add(player);
        try {
            expectationPlayer(player);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        log.info("BE/MATCHING - player size " + playerStore.getWaitingPlayers().size());
    }

    public void expectationPlayer(Player player) throws Exception{
        int time = calculateEstimatedMatchTime(player);
        messagingTemplate.convertAndSend("/api/matching/sub/game/" + player.getNickname(),new ExpectationTimeDto(time, "TIME"));
    }

    public void exitPlayerByNickname(ExitRequestDto requestDto) {
        Boolean checkExit = playerStore.getWaitingPlayers().removeIf(player -> player.getNickname().equals(requestDto.nickname()));
        log.info("BE-MATCHING/ check exit player - {} ", checkExit);
    }

    public void matchingGame(){
        if(playerStore.getWaitingPlayers().size() < PLAYER_SIZE){
            return;
        }

        log.info("BE/MATCHING - matching player size {}", playerStore.getWaitingPlayers().size());

        for(int i=0; i < RATING_MAX; i += RATING_RANGE){
            Player lowerPlayer = Player.createRangePlayer(i);
            Player upperPlayer = Player.createRangePlayer(Math.min(i + RATING_RANGE - 1, RATING_MAX));

            log.info("BE/MATCHING - {} ~ {}", lowerPlayer.getRating(), upperPlayer.getRating());

            NavigableSet<Player> matchedPlayers = playerStore.getWaitingPlayers().subSet(lowerPlayer, true, upperPlayer, true)
                    .stream().sorted(Comparator.comparingLong(Player::getEntryTime))
                    .collect(Collectors.toCollection(ConcurrentSkipListSet::new));

            if(matchedPlayers.size() == 0) continue;

            int rating = checkWaitingTime(matchedPlayers.first());

            if(matchedPlayers.size() < PLAYER_SIZE && rating != 0){
                lowerPlayer.extendRating(i==0 ? 0 : -(RATING_RANGE/2)*rating);
                upperPlayer.extendRating((RATING_RANGE/2)*rating);
                matchedPlayers = playerStore.getWaitingPlayers().subSet(lowerPlayer, true, upperPlayer, true);
            }

            while(matchedPlayers.size()>=PLAYER_SIZE){
                NavigableSet<Player> limitMatchedPlayers = matchedPlayers.stream()
                        .limit(PLAYER_SIZE)
                        .collect(Collectors.toCollection(ConcurrentSkipListSet::new));

                log.info("BACK/MATCHING - limit player size {}", limitMatchedPlayers.size());
                saveMattchedLogs(limitMatchedPlayers);
                notifyPlayers(limitMatchedPlayers);
                playerStore.getWaitingPlayers().removeAll(limitMatchedPlayers);
                matchedPlayers.removeAll(limitMatchedPlayers);
            }
        }
    }

    private int checkWaitingTime(Player player) {
        long waitingTime = (System.currentTimeMillis() - player.getEntryTime())/1000;
        if(waitingTime < WAITING_TIME) return 0;
        if(waitingTime < WAITING_TIME*2) return 1;
        if(waitingTime < WAITING_TIME*3) return 2;
        return 3;
    }

    @Transactional
    protected void notifyPlayers(NavigableSet<Player> matchedPlayers) {
        log.info("BACK/MATCHING - success game matching players: {}", playerStore.getWaitingPlayers().size());
        String roomId = UUID.randomUUID().toString();
        for (Player player : matchedPlayers) {
            log.info("BACK/MATCHING - success game matching waiting time: {}", (System.currentTimeMillis() - player.getEntryTime()) / 1000);
            sendRoomIdToPlayer(player, roomId);
            savePlayer(player, roomId);
        }
    }

    private void savePlayer(Player player, String roomId) {
        String key = player.getNickname() + " " + roomId;
        for (int item : player.getItems()) {
            redisTemplate.opsForValue().setBit(key, item, true);
        }
        redisTemplate.opsForValue().setBit(key, avatars.get(player.getAvatar()), true);
        redisTemplate.expire(key, 6000, TimeUnit.SECONDS);
    }

    private void sendRoomIdToPlayer(Player player, String roomId) {
        messagingTemplate.convertAndSend("/api/matching/sub/game/" + player.getNickname(), new RoomCodeDto(roomId,"ROOMCODE"));
    }

    public void updateUserSize(){
        USERSIZE = playerStore.getWaitingPlayers().size();
    }

    public void saveMattchedLogs(NavigableSet<Player> matchedPlayers) {
        String dayOfWeek = LocalDate.now().getDayOfWeek().toString();

        for (Player player : matchedPlayers) {
            long matchDuration = (System.currentTimeMillis() - player.getEntryTime()) / 1000;

            MatchingDataDto matchingData = MatchingDataDto.builder()
                    .rating(player.getRating())
                    .entryTime(LocalTime.now().getHour())
                    .dayOfWeek(dayOfWeek)
                    .matchDuration(matchDuration)
                    .currentUserSize(USERSIZE)
                    .build();

            try {
                elasticsearchService.saveMatchData(matchingData);
                log.info("매칭 데이터 Elasticsearch에 저장 완료: {}", matchingData);
            } catch (IOException e) {
                log.error("Elasticsearch 저장 실패", e);
            }
        }
    }
    //매칭 예상 소요시간
    public int calculateEstimatedMatchTime(Player player) throws IOException {
        String dayOfWeek = LocalDate.now().getDayOfWeek().toString();
        int currentHour = LocalTime.now().getHour();

        int ratingRange1 = getRatingRange(player.getRating());
        int ratingRange2 = getRatingRange(player.getRating() + 500);

        int ratingIndex1 = convertRatingRangeToIndex(ratingRange1);
        int ratingIndex2 = convertRatingRangeToIndex(ratingRange2);
        elasticsearchService.calculateMatchStatistics();
        MatchData data1 = matchStatistics.getMatchedData(dayOfWeek, currentHour, ratingIndex1);
        MatchData data2 = matchStatistics.getMatchedData(dayOfWeek, currentHour, ratingIndex2);

        int averageTime = (data1.getTime() + data2.getTime()) / 2;
        int averageSize = (data1.getSize() + data2.getSize()) / 2;
        int res = (USERSIZE < averageSize) ? (averageTime * averageSize / USERSIZE) : (averageTime * USERSIZE / averageSize);
        res = res > 600? 600: res;
        return res == 0? 5:res;
    }

    private int getRatingRange(int rating) {
        if (rating <= 0) return 500;
        else if (rating >= 2500) return 2500;
        else return (rating + 499) / 500 * 500;
    }

    private int convertRatingRangeToIndex(int rating) {
        if (rating <= 500) return 0;
        else if (rating <= 1000) return 1;
        else if (rating <= 1500) return 2;
        else if (rating <= 2000) return 3;
        else if (rating <= 2500) return 4;
        else return 5;
    }
    public void run(){
        for (int i = 0; i < 10000; i++) {
            MatchingDataDto data = elasticsearchService.generateRandomData();
            try {
                elasticsearchService.saveMatchData(data);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

}

