package com.catchcatch.auth.domains.member.adapter.in.web;

import com.catchcatch.auth.domains.member.adapter.in.web.message.SuccessSignUpMessage;
import com.catchcatch.auth.domains.member.adapter.in.web.requestdto.SignUpRequestDto;
import com.catchcatch.auth.domains.member.application.port.in.SignUpUseCase;
import com.catchcatch.auth.global.util.HttpResponseUtil;
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
@Slf4j
public class SignUpController {

    private final SignUpUseCase signUpUseCase;
    private final HttpResponseUtil responseUtil;

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@Valid @RequestBody SignUpRequestDto requestDto){
        signUpUseCase.singUp(requestDto);

        Map<String, Object> data = new HashMap<>();
        data.put("msg", SuccessSignUpMessage.SUCCESS_SIGN_UP.getMessage());
        data.put("code", SuccessSignUpMessage.SUCCESS_SIGN_UP);
        data.put("status", 200);
        ResponseEntity<?> response = responseUtil.createResponse(data);

        log.info("BACK-AUTH:SIGN-UP request: {}", requestDto);
        log.info("BACK-AUTH:SIGN-UP response: {}", response);

        return response;
    }
}
