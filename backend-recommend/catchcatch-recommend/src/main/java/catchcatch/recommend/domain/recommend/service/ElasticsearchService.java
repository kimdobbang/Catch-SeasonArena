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
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.elasticsearch.client.RequestOptions;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
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
        log.info("BE/MATCING - 매칭 성공 저장 {}");

        // 데이터 색인화 요청
        IndexResponse response = client.index(i -> i
                .index(indexName)               // 인덱스 이름 설정
                .document(data)                // MatchingDataDto 객체 전달
        );

        // 결과 반환 (색인화 결과 확인)
        return response.result().name();
    }
    public MatchStatistics calculateMatchStatistics() throws IOException {
        List<MatchingDataDto> matchingDataList = fetchMatchDataFromElasticsearch();

        Map<String, Map<Integer, Map<Integer, List<MatchingDataDto>>>> groupedData = matchingDataList.stream()
                .collect(Collectors.groupingBy(
                        MatchingDataDto::dayOfWeek,
                        Collectors.groupingBy(
                                data -> (int) (data.entryTime() / (1000 * 60 * 60) % 24),
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

        return matchStatistics;
    }

    private int calculateRatingRange(int rating) {
        if (rating <= 500) return 0;
        else if (rating <= 1000) return 1;
        else if (rating <= 1500) return 2;
        else if (rating <= 2000) return 3;
        else if (rating <= 2500) return 4;
        else return 5;
    }


    private List<MatchingDataDto> fetchMatchDataFromElasticsearch() throws IOException {
        // Elasticsearch에서의 검색 요청
        SearchResponse<MatchingDataDto> searchResponse = client.search(s -> s
                .index("matching-data-index")  // 검색할 인덱스 설정
                .query(Query.of(q -> q         // 쿼리 설정
                        .matchAll(MatchAllQuery.of(m -> m))  // 모든 문서 검색
                )), MatchingDataDto.class);

        List<MatchingDataDto> matchingDataList = new ArrayList<>();
        HitsMetadata<MatchingDataDto> hits = searchResponse.hits();

        for (Hit<MatchingDataDto> hit : hits.hits()) {
            matchingDataList.add(hit.source()); // 검색 결과에서 소스 추가
        }

        return matchingDataList; // 결과 반환
    }
}
