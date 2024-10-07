package catchcatch.recommend.domain.recommend.service;

import catchcatch.recommend.domain.recommend.domain.MatchStatistics;
import catchcatch.recommend.domain.recommend.requestdto.MatchingDataDto;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.common.xcontent.XContentType;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ElasticsearchService {

    private final RestHighLevelClient client;
    private final ObjectMapper objectMapper;

    public ElasticsearchService(RestHighLevelClient client, ObjectMapper objectMapper) {
        this.client = client;
        this.objectMapper = objectMapper;
    }
    public void saveMatchData(MatchingDataDto data) throws IOException {
        IndexRequest request = new IndexRequest("matching-data-index");
        String jsonString = objectMapper.writeValueAsString(data);
        request.source(jsonString, XContentType.JSON);

        client.index(request, RequestOptions.DEFAULT);
    }
    public MatchStatistics calculateMatchStatistics() throws IOException {
        List<MatchingDataDto> matchingDataList = fetchMatchDataFromElasticsearch();

        MatchStatistics matchStatistics = new MatchStatistics();

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
        SearchRequest searchRequest = new SearchRequest("matching-data-index");
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        searchSourceBuilder.query(QueryBuilders.matchAllQuery());
        searchRequest.source(searchSourceBuilder);

        SearchResponse searchResponse = client.search(searchRequest, RequestOptions.DEFAULT);

        List<MatchingDataDto> matchingDataList = new ArrayList<>();
        searchResponse.getHits().forEach(hit -> {
            try {
                MatchingDataDto data = objectMapper.readValue(hit.getSourceAsString(), MatchingDataDto.class);
                matchingDataList.add(data);
            } catch (IOException e) {
                e.printStackTrace();
            }
        });

        return matchingDataList;
    }
    public void close() throws IOException {
        client.close();
    }
}
