package catchcatch.recommend.domain.recommend.service;

import catchcatch.recommend.domain.recommend.domain.MatchStatistics;
import catchcatch.recommend.domain.recommend.requestdto.MatchingDataDto;
import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch._types.query_dsl.MatchAllQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch.core.IndexRequest;
import co.elastic.clients.elasticsearch.core.IndexResponse;
import co.elastic.clients.elasticsearch.core.SearchRequest;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import co.elastic.clients.elasticsearch.core.search.Hit;
import co.elastic.clients.elasticsearch.core.search.HitsMetadata;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.elasticsearch.client.RequestOptions;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ElasticsearchService {

    private final ElasticsearchClient client;
    private final ObjectMapper objectMapper;
    private final MatchStatistics matchStatistics;

    public String saveMatchData(MatchingDataDto data) throws IOException {
        // 색인화할 데이터의 인덱스 이름 설정
        String indexName = "matching-data-index";
        log.info("BE/MATCING - 매칭 성공 저장 {}",data);

        // 데이터 색인화 요청
        IndexResponse response = client.index(i -> i
                .index(indexName)               // 인덱스 이름 설정
                .document(data)                // MatchingDataDto 객체 전달
        );

        // 결과 반환 (색인화 결과 확인)
        return response.result().name();
    }
    @PostConstruct
    public void init() {
        try {
            calculateMatchStatistics();
        } catch (IOException e) {
            log.error("초기화 중 Elasticsearch 통계 계산 오류 발생", e);
        }
    }
    public void calculateMatchStatistics() throws IOException {
        List<MatchingDataDto> matchingDataList = fetchMatchDataFromElasticsearch();
        Map<String, Map<Integer, Map<Integer, List<MatchingDataDto>>>> groupedData = matchingDataList.stream()
                .collect(Collectors.groupingBy(
                        MatchingDataDto::dayOfWeek,
                        Collectors.groupingBy(
                                MatchingDataDto::entryTime,
                                Collectors.groupingBy(
                                        data -> calculateRatingRange(data.rating())
                                )
                        )
                ));

        groupedData.forEach((day, hourMap) -> {
            hourMap.forEach((hour, ratingMap) -> {
                ratingMap.forEach((ratingRange, dataList) -> {
                    int averageMatchTime = (int) dataList.stream()
                            .mapToLong(MatchingDataDto::matchDuration)
                            .average()
                            .orElse(0);

                    int averageUserSize = (int) dataList.stream()
                            .mapToInt(MatchingDataDto::currentUserSize)
                            .average()
                            .orElse(0);

                    matchStatistics.updateMatchedData(day, hour, ratingRange, averageMatchTime, averageUserSize);
                });
            });
        });

        return ;
    }

    private int calculateRatingRange(int rating) {
        if (rating <= 500) return 0;
        else if (rating <= 1000) return 1;
        else if (rating <= 1500) return 2;
        else if (rating <= 2000) return 3;
        else if (rating <= 2500) return 4;
        else return 5;
    }


    public List<MatchingDataDto> fetchMatchDataFromElasticsearch() throws IOException {
        // Elasticsearch에서의 검색 요청
        SearchResponse<MatchingDataDto> searchResponse = client.search(s -> s
                .index("matching-data-index")  // 검색할 인덱스 설정
                .query(Query.of(q -> q         // 쿼리 설정
                        .matchAll(MatchAllQuery.of(m -> m))  // 모든 문서 검색
                )).size(10000)
                , MatchingDataDto.class);

        List<MatchingDataDto> matchingDataList = new ArrayList<>();
        HitsMetadata<MatchingDataDto> hits = searchResponse.hits();

        for (Hit<MatchingDataDto> hit : hits.hits()) {
            matchingDataList.add(hit.source()); // 검색 결과에서 소스 추가
        }

        return matchingDataList; // 결과 반환
    }
    private static final Random random = new Random();

    // 요일 별 가중치 설정
    private static final int WEEKDAY_WEIGHT = 70;  // 평일 가중치
    private static final int WEEKEND_WEIGHT = 120; // 주말 가중치

    // 시간대 별 가중치 설정
    private static final int[] TIME_WEIGHTS = {30, 20, 15, 40, 70, 100, 120, 130, 120, 110, 90, 80, 120, 130, 140, 150, 160, 150, 140, 130, 110, 100, 60, 40};
    public static MatchingDataDto generateRandomData() {
        // 요일 배열
        String[] daysOfWeek = {"MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"};

        // 랜덤 요일 선택
        String dayOfWeek = daysOfWeek[random.nextInt(daysOfWeek.length)];

        // 시간대에 따라 인원수 가중치 결정
        int currentHour = new Random().nextInt(24);
        int timeWeight = TIME_WEIGHTS[currentHour];

        // 인원수 계산 (최대 2000명까지)
        int userSize = 100 + random.nextInt(1700) * timeWeight / 150;

        // 매칭 소요 시간 계산 (유저사이즈가 클수록 시간이 줄어들도록 설정, 2000명을 기준으로)
        long matchDuration = 10 + random.nextInt(300) * (2000 - userSize) / 2000;

        // 랜덤한 레이팅 및 매칭 시간
        int rating = random.nextInt(3001); // 0 ~ 3000 레이팅
        long entryTime = System.currentTimeMillis() - matchDuration * 1000; // 매칭 시작 시간

        return MatchingDataDto.builder()
                .rating(rating)
                .entryTime(currentHour)
                .dayOfWeek(dayOfWeek)  // 랜덤 요일 할당
                .matchDuration(matchDuration)
                .currentUserSize(userSize)
                .build();
    }



    private static boolean isWeekend(LocalDate date) {
        return date.getDayOfWeek().toString().equals("SATURDAY") || date.getDayOfWeek().toString().equals("SUNDAY");
    }
}
