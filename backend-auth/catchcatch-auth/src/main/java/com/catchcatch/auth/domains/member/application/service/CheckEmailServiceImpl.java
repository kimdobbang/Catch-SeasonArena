package com.catchcatch.auth.domains.member.application.service;

import com.catchcatch.auth.domains.member.application.port.in.CheckEmailUseCase;
import com.catchcatch.auth.domains.member.application.port.out.ExistsMemberPort;
import com.catchcatch.auth.global.exception.CustomException;
import com.catchcatch.auth.global.exception.ExceptionResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j(topic = "auth")
public class CheckEmailServiceImpl implements CheckEmailUseCase {

    private final ExistsMemberPort existsMemberPort;

    @Override
    public void checkEmail(String email) {
        if(existsMemberPort.existsByEmailAndIsDeleted(email, false)){
            log.error("BE/AUTH - 이미 유저 존재 : {}", CustomException.DUPLICATED_EMAIL_EXCEPTION);
            throw new ExceptionResponse(CustomException.DUPLICATED_EMAIL_EXCEPTION);
        };
    }
}
