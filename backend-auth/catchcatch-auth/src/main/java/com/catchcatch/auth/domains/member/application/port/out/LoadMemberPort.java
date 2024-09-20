package com.catchcatch.auth.domains.member.application.port.out;

import com.catchcatch.auth.domains.member.domain.SignUpMember;

public interface LoadMemberPort {

    SignUpMember loadByEmailAndIsDeleted(String email, Boolean isDeleted);
}
