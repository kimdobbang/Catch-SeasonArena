package com.catchcatch.auth.domains.member.application.port.out;

public interface ExistsMemberPort {

    boolean existsByEmailAndIsDeleted(String email, boolean isDeleted);
}
