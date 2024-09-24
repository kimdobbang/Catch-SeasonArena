package com.catchcatch.main.domains.member.application.service;

import com.catchcatch.main.domains.member.adapter.in.web.requestdto.ChangeAvatarRequestDto;
import com.catchcatch.main.domains.member.adapter.in.web.responsedto.ChangeAvatarResponseDto;
import com.catchcatch.main.domains.member.application.port.in.ChangeAvatarUseCase;
import com.catchcatch.main.domains.member.application.port.out.FindMemberPort;
import com.catchcatch.main.domains.member.application.port.out.UpdateMemberPort;
import com.catchcatch.main.domains.member.domain.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class ChangeAvatarServiceImpl implements ChangeAvatarUseCase {

    private final FindMemberPort findMemberPort;
    private final UpdateMemberPort updateMemberPort;

    @Override
    public ChangeAvatarResponseDto changeAvatar(ChangeAvatarRequestDto changeAvatarRequestDto) {
        Member member = findMemberPort.findMember(changeAvatarRequestDto.memberId());
        member.changeAvatar(changeAvatarRequestDto.avatar());
        updateMemberPort.updateMember(member);
        return new ChangeAvatarResponseDto(member.getAvatar());
    }
}
