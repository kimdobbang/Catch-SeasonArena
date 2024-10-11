package com.catchcatchrank.domains.member.adapter.out.persistence;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<MemberEntity, Long> {

	Optional<MemberEntity> findByEmailAndIsDeleted(String email, boolean deleted);

	@Query(value = "SELECT * FROM member WHERE is_deleted = false ORDER BY rating DESC LIMIT 5", nativeQuery = true)
	List<MemberEntity> findTop5ByOrderByRatingDesc();

}
