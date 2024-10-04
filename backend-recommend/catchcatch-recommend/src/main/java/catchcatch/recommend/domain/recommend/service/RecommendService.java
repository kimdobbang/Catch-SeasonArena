package catchcatch.recommend.domain.recommend.service;

import catchcatch.recommend.domain.recommend.domain.Player;
import catchcatch.recommend.domain.recommend.requestdto.EntryRequestDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Autowired
    private PlayerStore playerStore;

    @Value("${rating.range}")
    private Integer RATING_RANGE;

    @Value("${rating.max}")
    private Integer RATING_MAX;

    @Value("${player.size}")
    private Integer PLAYER_SIZE;

    @Value("${waiting.time}")
    private Long WAITING_TIME;

    public RecommendService(SimpMessagingTemplate messagingTemplate, RedisTemplate<String, Object> redisTemplate) {
        this.messagingTemplate = messagingTemplate;
        this.redisTemplate = redisTemplate;
        this.avatars = new HashMap<>();

        initializeAvatars();
    }

    private void initializeAvatars() {
        avatars.put("player1", 13);
        avatars.put("player2", 14);
        avatars.put("player3", 15);
        avatars.put("player4", 16);
    }

    public void entryPlayer(EntryRequestDto requestDto) {
        Player player = Player.createPlayer(requestDto);
        playerStore.getWaitingPlayers().add(player);
    }

    public void matchingGame(){
        if(playerStore.getWaitingPlayers().size() < PLAYER_SIZE){
            return;
        }

        for(int i=0; i < RATING_MAX; i += RATING_RANGE){
            Player lowerPlayer = Player.createRangePlayer(i);
            Player upperPlayer = Player.createRangePlayer(Math.min(i + RATING_RANGE - 1, RATING_MAX));

            NavigableSet<Player> matchedPlayers = playerStore.getWaitingPlayers().subSet(lowerPlayer, true, upperPlayer, true)
                    .stream().sorted(Comparator.comparingLong(Player::getEntryTime))
                    .collect(Collectors.toCollection(ConcurrentSkipListSet::new));

            if(matchedPlayers.size() == 0) return;

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
        redisTemplate.expire(key, 60, TimeUnit.SECONDS);
    }

    private void sendRoomIdToPlayer(Player player, String roomId) {
        messagingTemplate.convertAndSend("/api/matching/sub/game/" + player.getNickname(), roomId);
    }

}
