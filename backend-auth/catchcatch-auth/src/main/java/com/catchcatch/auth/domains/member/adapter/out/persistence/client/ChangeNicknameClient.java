package com.catchcatch.auth.domains.member.adapter.out.persistence.client;

import com.catchcatch.auth.domains.member.adapter.in.web.requestdto.ChangeNicknameMainRequestDto;
import com.catchcatch.auth.global.config.FeignOkHttpConfiguration;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "ChangeNicknameClient", url = "https://j11b106.p.ssafy.io/api/main/members", configuration = FeignOkHttpConfiguration.class)
public interface ChangeNicknameClient {

    @PatchMapping(value = "/nickname")
    ResponseEntity<?> changeNickname(@RequestBody ChangeNicknameMainRequestDto requestDto);
}
