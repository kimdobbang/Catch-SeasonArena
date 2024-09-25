package com.catchcatch.main.domains.member.application.service;

import com.catchcatch.main.domains.member.application.port.in.CheckNicknameUseCase;
import com.catchcatch.main.domains.member.application.port.out.ExistsMemberPort;
import com.catchcatch.main.global.exception.CustomException;
import com.catchcatch.main.global.exception.ExceptionResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class CheckNicknameServiceImpl implements CheckNicknameUseCase {

    private final ExistsMemberPort existsMemberPort;

    @Override
    public void checkNickname(String nickname) {
        if(existsMemberPort.existsMemberByNickname(nickname, false)){
            throw new ExceptionResponse(CustomException.DUPLICATED_NICKNAME_EXCEPTION);
        }
    }
}
