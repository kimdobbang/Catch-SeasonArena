package com.catchcatch.auth.domains.member.adapter.in.web;

import com.catchcatch.auth.domains.member.adapter.in.web.message.SuccessSignUpMessage;
import com.catchcatch.auth.domains.member.adapter.in.web.requestdto.SignUpRequestDto;
import com.catchcatch.auth.domains.member.application.port.in.SignUpUseCase;
import com.catchcatch.auth.global.util.HttpResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth/members")
@RequiredArgsConstructor
@Slf4j(topic = "auth")
public class SignUpController {

    private final SignUpUseCase signUpUseCase;
    private final HttpResponseUtil responseUtil;

    @Operation(summary = "회원가입", description = "이메일, 비밀번호로 회원가입")
    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@Valid @RequestBody SignUpRequestDto requestDto){
        signUpUseCase.singUp(requestDto);

        ResponseEntity<?> response = responseUtil.createResponse(
                SuccessSignUpMessage.SUCCESS_SIGN_UP.getMessage(),
                SuccessSignUpMessage.SUCCESS_SIGN_UP,
                200);

        log.info("BACK-AUTH:SIGN-UP request: {}", requestDto);
        log.info("BACK-AUTH:SIGN-UP response: {}", response);

        return response;
    }
}
