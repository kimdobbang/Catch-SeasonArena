package com.catchcatch.main.domains.member.adapter.in.web;

import com.catchcatch.main.domains.member.adapter.in.web.message.SuccessCheckNicknameMessage;
import com.catchcatch.main.domains.member.application.port.in.CheckNicknameUseCase;
import com.catchcatch.main.global.util.HttpResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/main/members")
@RequiredArgsConstructor
@Slf4j
public class CheckNicknameController {

    private final CheckNicknameUseCase checkNicknameUseCase;
    private final HttpResponseUtil responseUtil;

    @GetMapping("/{nickname}")
    public ResponseEntity<?> checkNickname(@PathVariable("nickname") String nickname) {
        checkNicknameUseCase.checkNickname(nickname);

        ResponseEntity<?> response = responseUtil.createResponse(
                SuccessCheckNicknameMessage.SUCCESS_CHECK_NICKNAME.getMessage(),
                SuccessCheckNicknameMessage.SUCCESS_CHECK_NICKNAME,
                200
        );

        return response;
    }
}
