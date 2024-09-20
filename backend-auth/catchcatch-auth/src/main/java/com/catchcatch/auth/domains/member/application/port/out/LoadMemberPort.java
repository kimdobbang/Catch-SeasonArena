package com.catchcatch.auth.domains.member.application.port.out;

import com.catchcatch.auth.domains.member.domain.Member;

public interface LoadMemberPort {

    Member loadByEmailAndIsDeleted(String email, Boolean isDeleted);
}
