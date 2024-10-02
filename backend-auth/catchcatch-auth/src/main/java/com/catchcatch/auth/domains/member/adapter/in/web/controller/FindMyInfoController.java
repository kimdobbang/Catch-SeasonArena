package com.catchcatch.auth.domains.member.adapter.in.web.controller;

import com.catchcatch.auth.domains.member.adapter.out.persistence.client.FindMyInfoClient;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth/members/info")
@Slf4j(topic = "auth")
@RequiredArgsConstructor
public class FindMyInfoController {

    private final FindMyInfoClient findMyInfoClient;

    private final ObjectMapper objectMapper;

    @GetMapping("/test")
    public String test(){
        return "test";
    }

    @GetMapping
    public ResponseEntity<?> findMyInfo(Authentication authentication) {
        Member member = ((PrincipalDetails) authentication.getPrincipal()).getMember();
        try{
            ResponseEntity<?> response = findMyInfoClient.findMyInfo(member.getEmail());
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
