package com.catchcatch.auth.domains.member.adapter.in.web.controller;

import com.catchcatch.auth.domains.member.adapter.in.web.requestdto.ChangeAvatarAuthRequestDto;
import com.catchcatch.auth.domains.member.adapter.in.web.requestdto.ChangeAvatarMainRequestDto;
import com.catchcatch.auth.domains.member.adapter.out.persistence.client.ChangeAvatarClient;
import com.catchcatch.auth.domains.member.domain.Member;
import com.catchcatch.auth.global.security.auth.PrincipalDetails;
import com.fasterxml.jackson.databind.ObjectMapper;
import feign.FeignException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth/members/avatar")
@RequiredArgsConstructor
@Slf4j(topic = "auth")
public class ChangeAvatarController {

    private final ChangeAvatarClient changeAvatarClient;
    private final ObjectMapper objectMapper;

    @PatchMapping
    public ResponseEntity<?> changeAvatar(Authentication authentication, @Valid @RequestBody ChangeAvatarAuthRequestDto requestDto){
        Member member = ((PrincipalDetails) authentication.getPrincipal()).getMember();
        try{
            ResponseEntity<?> response = changeAvatarClient.changeAvatar(new ChangeAvatarMainRequestDto(requestDto.avatar(), member.getEmail()));
            return ResponseEntity.ok().body(response.getBody());
        } catch(FeignException e){
            try{
                String errorContent = e.contentUTF8();
                Map<String, Object> errorResponse = objectMapper.readValue(errorContent, Map.class);
                log.error("BE/AUTH - change avatar error: {}", errorResponse);
                return ResponseEntity.status(e.status()).body(errorResponse);
            } catch (Exception jsonException) {
                log.error("BE/AUTH - change avatar error: {}", jsonException.getMessage());
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("서버 에러.");
            }
        }
    }
}
