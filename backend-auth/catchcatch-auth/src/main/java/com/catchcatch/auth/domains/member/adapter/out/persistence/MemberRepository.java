package com.catchcatch.auth.domains.member.adapter.out.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<MemberEntity, Long> {

    boolean existsByEmailAndIsDeleted(String email, boolean isDeleted);
}
