package com.catchcatch.auth.domains.member.adapter.out.persistence.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Map;

@FeignClient(name = "FindMyInfoClient", url = "https://j11b106.p.ssafy.io/api/main/members/info")
public interface FindMyInfoClient {

    @GetMapping(value = "/{email}", consumes = "application/json")
    ResponseEntity<Map<String, Object>> findMyInfo(@PathVariable("email") String email);
}
