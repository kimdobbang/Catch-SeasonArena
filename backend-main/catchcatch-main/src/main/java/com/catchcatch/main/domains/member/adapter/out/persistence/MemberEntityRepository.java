package com.catchcatch.main.domains.member.adapter.out.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberEntityRepository extends JpaRepository<MemberEntity, Long> {

    Boolean existsByNicknameAndIsDeleted(String nickname, Boolean isDeleted);
}
