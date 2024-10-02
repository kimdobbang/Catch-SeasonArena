package com.catchcatch.auth.domains.member.adapter.in.web;

import com.catchcatch.auth.domains.member.adapter.in.web.message.SuccessCheckEmailMessage;
import com.catchcatch.auth.domains.member.application.port.in.CheckEmailUseCase;
import com.catchcatch.auth.global.util.HttpResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth/members")
@RequiredArgsConstructor
@Slf4j(topic = "auth")
public class CheckEmailController {

    private final CheckEmailUseCase checkEmailUseCase;
    private final HttpResponseUtil responseUtil;

    @Operation(summary = "이메일 중복 조회", description = "회원가입 시 이메일 중복 조회")
    @GetMapping("/{email}")
    public ResponseEntity<?> checkEmail(@PathVariable String email) {
        checkEmailUseCase.checkEmail(email);

        ResponseEntity<?> response = responseUtil.createResponse(
                SuccessCheckEmailMessage.SUCCESS_CHECK_EMAIL.getMessage(),
                SuccessCheckEmailMessage.SUCCESS_CHECK_EMAIL,
                200
        );

        log.info("BACK-AUTH:CHECK-EMAIL request: {}", email);
        log.info("BACK-AUTH:CHECK-EMAIL response: {}", response);

        return response;
    }
}
