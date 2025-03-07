package com.catchcatch.auth.domains.member.adapter.in.web.controller;

import com.catchcatch.auth.domains.member.adapter.in.web.message.SuccessSignUpMessage;
import com.catchcatch.auth.domains.member.adapter.in.web.requestdto.SignUpRequestDto;
import com.catchcatch.auth.domains.member.application.port.in.SignUpUseCase;
import com.catchcatch.auth.global.util.HttpResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth/members")
@RequiredArgsConstructor
@Slf4j(topic = "auth")
public class SignUpController {

    private final SignUpUseCase signUpUseCase;
    private final HttpResponseUtil responseUtil;

    @Operation(summary = "회원가입", description = "이메일, 비밀번호로 회원가입")
    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@Valid @RequestBody SignUpRequestDto requestDto, HttpServletResponse response){
        String accessToken = signUpUseCase.singUp(requestDto);

        response.addHeader("Authorization", "Bearer " + accessToken);
        response.setContentType("application/json;charset=UTF-8");

        ResponseEntity<?> responseEntity = responseUtil.createResponse(
                SuccessSignUpMessage.SUCCESS_SIGN_UP.getMessage(),
                SuccessSignUpMessage.SUCCESS_SIGN_UP,
                200);

        log.info("BACK-AUTH:SIGN-UP request: {}", requestDto);
        log.info("BACK-AUTH:SIGN-UP response: {}", responseEntity);

        return responseEntity;
    }
}
