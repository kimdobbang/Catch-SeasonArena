package com.catchcatch.auth.domains.member.adapter.out.persistence;

import com.catchcatch.auth.domains.member.application.port.out.ExistsMemberPort;
import com.catchcatch.auth.domains.member.application.port.out.LoadMemberPort;
import com.catchcatch.auth.domains.member.application.port.out.SaveMemberPort;
import com.catchcatch.auth.domains.member.domain.Member;
import com.catchcatch.auth.global.exception.CustomException;
import com.catchcatch.auth.global.exception.ExceptionResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
@Slf4j
public class MemberPersistenceAdapter implements SaveMemberPort, ExistsMemberPort, LoadMemberPort {

    private final MemberRepository memberRepository;
    private final MemberMapper memberMapper;

    @Override
    public boolean existsByEmailAndIsDeleted(String email, boolean isDeleted) {
        return memberRepository.existsByEmailAndIsDeleted(email, isDeleted);
    }

    @Override
    public void save(Member member) {
        memberRepository.save(memberMapper.toEntity(member));
    }

    @Override
    public Member loadByEmailAndIsDeleted(String email, boolean isDeleted) {
        MemberEntity memberEntity = memberRepository.findByEmailAndIsDeleted(email, isDeleted)
                .orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_MEMBER_EXCEPTION));
        return memberMapper.toDomain(memberEntity);
    }
}
