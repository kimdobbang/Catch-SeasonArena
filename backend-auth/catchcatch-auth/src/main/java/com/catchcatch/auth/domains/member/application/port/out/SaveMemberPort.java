package com.catchcatch.auth.domains.member.application.port.out;

import com.catchcatch.auth.domains.member.domain.SignUpMember;

public interface SaveMemberPort {

    void save(SignUpMember member);
}
