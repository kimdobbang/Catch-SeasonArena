package com.catchcatch.auth.domains.member.application.port.out;

import com.catchcatch.auth.domains.member.domain.Member;

public interface SaveMemberPort {

    void save(Member member);
}
