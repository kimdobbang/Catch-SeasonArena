package com.catchcatch.main.domains.member.adapter.out.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberEntityRepository extends JpaRepository<MemberEntity, Long> {

    Boolean existsByNicknameAndIsDeleted(String nickname, Boolean isDeleted);
    Optional<MemberEntity> findByEmailAndIsDeleted(String email, Boolean isDeleted);
    Optional<MemberEntity> findByNicknameAndIsDeleted(String nickname, Boolean isDeleted);
}
