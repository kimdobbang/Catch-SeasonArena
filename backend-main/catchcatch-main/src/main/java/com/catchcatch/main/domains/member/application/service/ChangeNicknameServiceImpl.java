package com.catchcatch.main.domains.member.application.service;

import com.catchcatch.main.domains.member.adapter.in.web.requestdto.ChangeNicknameRequestDto;
import com.catchcatch.main.domains.member.adapter.in.web.responsedto.ChangeNicknameResponseDto;
import com.catchcatch.main.domains.member.application.port.in.ChangeNicknameUseCase;
import com.catchcatch.main.domains.member.application.port.out.ExistsMemberPort;
import com.catchcatch.main.domains.member.application.port.out.FindMemberPort;
import com.catchcatch.main.domains.member.application.port.out.UpdateMemberPort;
import com.catchcatch.main.domains.member.domain.Member;
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
public class ChangeNicknameServiceImpl implements ChangeNicknameUseCase {

    private final ExistsMemberPort existsMemberPort;
    private final FindMemberPort findMemberPort;
    private final UpdateMemberPort updateMemberPort;

    @Override
    @Transactional
    public ChangeNicknameResponseDto changeNickname(ChangeNicknameRequestDto requestDto) {
        Member member = findMemberPort.findMember(requestDto.memberId());

        if(existsMemberPort.existsMemberByNickname(requestDto.nickname(), false))
            throw new ExceptionResponse(CustomException.DUPLICATED_NICKNAME_EXCEPTION);

        member.changeNickname(requestDto.nickname());
        updateMemberPort.updateMember(member);

        return new ChangeNicknameResponseDto(member.getNickname());
    }
}
