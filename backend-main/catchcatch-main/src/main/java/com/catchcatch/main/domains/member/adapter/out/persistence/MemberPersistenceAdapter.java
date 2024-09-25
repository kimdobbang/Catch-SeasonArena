package com.catchcatch.main.domains.member.adapter.out.persistence;

import com.catchcatch.main.domains.member.application.port.out.ExistsMemberPort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
@Slf4j
public class MemberPersistenceAdapter implements ExistsMemberPort {

    private final MemberEntityRepository memberEntityRepository;

    @Override
    public Boolean existsMemberByNickname(String nickname, Boolean isDeleted) {
        return memberEntityRepository.existsByNicknameAndIsDeleted(nickname, isDeleted);
    }
}
