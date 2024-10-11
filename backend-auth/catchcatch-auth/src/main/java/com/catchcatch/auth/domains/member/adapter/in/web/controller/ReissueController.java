package com.catchcatch.auth.domains.member.adapter.in.web.controller;

import com.catchcatch.auth.domains.member.adapter.in.web.message.SuccessReissueMessage;
import com.catchcatch.auth.domains.member.application.port.in.ReissueUseCase;
import com.catchcatch.auth.global.util.HttpResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Slf4j(topic = "auth")
public class ReissueController {

    private final ReissueUseCase reissueUseCase;
    private final HttpResponseUtil responseUtil;

    @Operation(summary = "Access 토큰 재발급", description = "Access 토큰 만료 시 재발급")
    @GetMapping("/reissue")
    public ResponseEntity<?> reissue(
            @CookieValue(value = "refreshToken", required = false) Cookie coookie,
            HttpServletResponse response
    ) {
        String accessToken = reissueUseCase.reissue(coookie);
        log.info("BACK-AUTH:REISSUE new accessToken: {}", accessToken);

        response.setHeader("Authorization", "Bearer " + accessToken);

        ResponseEntity<?> responseReissue = responseUtil.createResponse(
                SuccessReissueMessage.SUCCESS_REISSUE.getMessage(),
                SuccessReissueMessage.SUCCESS_REISSUE,
                200);

        log.info("BACK-AUTH:REISSUE response: {}", responseReissue);

        return responseReissue;
    }
}
