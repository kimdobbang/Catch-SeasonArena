package catchcatch.recommend.global.config.elastic;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.json.jackson.JacksonJsonpMapper;
import co.elastic.clients.transport.rest_client.RestClientTransport;
import org.apache.http.HttpHost;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.elasticsearch.client.RestClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ElasticsearchConfig {

    @Bean
    public RestClient restClient(@Value("${spring.elasticsearch.rest.username}") String username,
                                 @Value("${spring.elasticsearch.rest.password}") String password,
                                 @Value("${spring.elasticsearch.rest.uris}") String url) {
        CredentialsProvider credentialsProvider = new BasicCredentialsProvider();
        credentialsProvider.setCredentials(AuthScope.ANY, new UsernamePasswordCredentials(username, password));

        return RestClient.builder(
                        new HttpHost(url, 9200)  // Elasticsearch 호스트와 포트 설정
                )
                .setHttpClientConfigCallback(httpClientBuilder ->
                        httpClientBuilder.setDefaultCredentialsProvider(credentialsProvider))
                .build();
    }

    @Bean
    public ElasticsearchClient elasticsearchClient(RestClient restClient) {
        // JacksonJsonpMapper는 JSON 변환을 위한 객체 매퍼
        RestClientTransport transport = new RestClientTransport(
            restClient, new JacksonJsonpMapper()
        );
        return new ElasticsearchClient(transport);
    }
}