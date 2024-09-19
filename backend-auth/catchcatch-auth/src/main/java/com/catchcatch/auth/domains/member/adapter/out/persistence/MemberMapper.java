package com.catchcatch.auth.domains.member.adapter.out.persistence;

import com.catchcatch.auth.domains.member.domain.Member;
import org.springframework.stereotype.Component;

@Component
public class MemberMapper {

    public Member toDomain(MemberEntity memberEntity) {
        return Member.createMember(
                memberEntity.getMemberId(),
                memberEntity.getEmail(),
                memberEntity.getPassword(),
                memberEntity.getRole(),
                memberEntity.getNickname(),
                memberEntity.getRating(),
                memberEntity.getAvatar(),
                memberEntity.isDeleted()
        );
    }

    public MemberEntity toEntity(Member member) {
        return MemberEntity.createMember(
                member.getEmail(),
                member.getPassword(),
                member.getRole(),
                member.getNickname(),
                member.getRating(),
                member.getAvatar(),
                member.isDeleted()
        );
    }
}
