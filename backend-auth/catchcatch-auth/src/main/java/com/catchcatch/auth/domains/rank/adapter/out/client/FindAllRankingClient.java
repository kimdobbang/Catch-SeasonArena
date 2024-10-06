package com.catchcatch.auth.domains.rank.adapter.out.client;


import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Map;

@FeignClient(name = "FindAllRankingClient", url = "https://j11b106.p.ssafy.io/api/rank/rankings")
public interface FindAllRankingClient {

    @GetMapping(value = "/all/{nickname}/{page}", consumes = "application/json")
    ResponseEntity<Map<String, Object>> findAllRanking(@PathVariable String nickname, @PathVariable Integer page);
}
