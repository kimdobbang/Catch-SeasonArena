package com.catchcatch.auth.domains.member.adapter.in.web;

import com.catchcatch.auth.domains.member.adapter.in.web.message.SuccessCheckEmailMessage;
import com.catchcatch.auth.domains.member.application.port.in.CheckEmailUseCase;
import com.catchcatch.auth.global.util.HttpResponseUtil;
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
@Slf4j
public class CheckEmailController {

    private final CheckEmailUseCase checkEmailUseCase;
    private final HttpResponseUtil responseUtil;

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
