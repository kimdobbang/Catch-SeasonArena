package com.catchcatch.auth.domains.member.application.port.out;

public interface ExistsMemberPort {

    Boolean existsByEmailAndIsDeleted(String email, Boolean isDeleted);
}
