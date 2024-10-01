package com.catchcatch.main.domains.member.adapter.out.persistence;

import com.catchcatch.main.domains.member.application.port.out.ExistsMemberPort;
import com.catchcatch.main.domains.member.application.port.out.FindMemberPort;
import com.catchcatch.main.domains.member.application.port.out.UpdateMemberPort;
import com.catchcatch.main.domains.member.domain.Member;
import com.catchcatch.main.global.exception.CustomException;
import com.catchcatch.main.global.exception.ExceptionResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
@Slf4j
public class MemberPersistenceAdapter implements ExistsMemberPort, UpdateMemberPort, FindMemberPort {

    private final MemberEntityRepository memberEntityRepository;

    @Override
    public Boolean existsMemberByNickname(String nickname, Boolean isDeleted) {
        return memberEntityRepository.existsByNicknameAndIsDeleted(nickname, isDeleted);
    }

    @Override
    public void updateMember(Member member) {
        memberEntityRepository.save(MemberEntity.fromMember(member));
    }

    @Override
    public Member findMember(String email) {
        return Member.fromMemberEntity(memberEntityRepository.findByEmailAndIsDeleted(email, false)
                .orElseThrow(()-> new ExceptionResponse(CustomException.NOT_EXISTS_MEMBER_EXCEPTION)));
    }
}
