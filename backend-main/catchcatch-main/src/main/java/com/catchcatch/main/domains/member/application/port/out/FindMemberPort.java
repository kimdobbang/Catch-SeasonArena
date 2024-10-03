package com.catchcatch.main.domains.member.application.port.out;

import com.catchcatch.main.domains.member.domain.Member;

public interface FindMemberPort {

    Member findMember(String email);
    Member findMemberByNickname(String nickname);
}
