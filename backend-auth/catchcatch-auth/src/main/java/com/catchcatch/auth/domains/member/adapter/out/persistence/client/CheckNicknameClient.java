package com.catchcatch.auth.domains.member.adapter.out.persistence.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "CheckNicknameClient", url = "https://j11b106.p.ssafy.io/api/main/members")
public interface CheckNicknameClient {

    @GetMapping(value = "/{nickname}", consumes = "application/json")
    ResponseEntity<?> checkNickname(@PathVariable("nickname") String nickname);
}
