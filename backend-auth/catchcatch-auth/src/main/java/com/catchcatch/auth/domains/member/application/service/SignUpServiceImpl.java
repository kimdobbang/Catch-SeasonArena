package com.catchcatch.auth.domains.member.application.service;

import com.catchcatch.auth.domains.member.adapter.in.web.requestdto.SignUpRequestDto;
import com.catchcatch.auth.domains.member.application.port.in.SignUpUseCase;
import com.catchcatch.auth.domains.member.application.port.out.ExistsMemberPort;
import com.catchcatch.auth.domains.member.application.port.out.SaveMemberPort;
import com.catchcatch.auth.domains.member.domain.SignUpMember;
import com.catchcatch.auth.global.exception.CustomException;
import com.catchcatch.auth.global.exception.ExceptionResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class SignUpServiceImpl implements SignUpUseCase {

    private final PasswordEncoder passwordEncoder;

    private final SaveMemberPort saveMemberPort;
    private final ExistsMemberPort existsMemberPort;

    @Override
    @Transactional
    public void singUp(SignUpRequestDto requestDto) {
        if(existsMemberPort.existsByEmailAndIsDeleted(requestDto.email(), false)){
            log.error("BACK-AUTH:ERROR {}", CustomException.DUPLICATED_EMAIL_EXCEPTION);
            throw new ExceptionResponse(CustomException.DUPLICATED_EMAIL_EXCEPTION);
        }

        SignUpMember member = SignUpMember.createSignUpMember(requestDto);
        member.changeEncodePassword(passwordEncoder.encode(requestDto.password()));
        saveMemberPort.save(member);
    }
}
