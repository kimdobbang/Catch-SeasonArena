package com.catchcatch.auth.domains.member.adapter.in.web.controller;

import com.catchcatch.auth.domains.member.adapter.out.persistence.client.CheckNicknameClient;
import com.catchcatch.auth.domains.member.domain.Member;
import com.catchcatch.auth.global.security.auth.PrincipalDetails;
import com.fasterxml.jackson.databind.ObjectMapper;
import feign.FeignException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth/members")
@RequiredArgsConstructor
@Slf4j(topic = "auth")
public class CheckNicknameController {

    private final CheckNicknameClient checkNicknameClient;
    private final ObjectMapper objectMapper;

    @GetMapping("/nickname/{nickname}")
    public ResponseEntity<?> checkNickname(Authentication authentication, @PathVariable("nickname") String nickname) {
        Member member = ((PrincipalDetails) authentication.getPrincipal()).getMember();

        try{
            ResponseEntity<Map<String, Object>> response = checkNicknameClient.checkNickname(nickname);
            return response;
        }catch(FeignException e){
            try{
                String errorContent = e.contentUTF8();
                Map<String, Object> errorResponse = objectMapper.readValue(errorContent, Map.class);
                log.error("BE/AUTH - find my info error: {}", errorResponse);
                return ResponseEntity.status(e.status()).body(errorResponse);
            } catch (Exception jsonException) {
                log.error("BE/AUTH - find my info error: {}", jsonException.getMessage());
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("서버 에러.");
            }
        }
    }
}
