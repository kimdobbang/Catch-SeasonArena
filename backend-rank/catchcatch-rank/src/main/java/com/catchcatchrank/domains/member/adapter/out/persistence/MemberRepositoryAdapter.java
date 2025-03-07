package com.catchcatchrank.domains.member.adapter.out.persistence;

import org.springframework.stereotype.Component;

import com.catchcatchrank.domains.member.appclication.port.GetMemberByEmailPort;
import com.catchcatchrank.domains.member.appclication.port.UpdateMemberRankPort;
import com.catchcatchrank.domains.member.domain.Member;
import com.catchcatchrank.global.exception.CustomException;
import com.catchcatchrank.global.exception.ExceptionResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j(topic = "rank")
public class MemberRepositoryAdapter implements GetMemberByEmailPort, UpdateMemberRankPort {

	private final MemberRepository memberRepository;

	@Override
	public Member getMemberByEmail(String email) {
		return Member.createMemberToEntity(memberRepository.findByEmailAndIsDeleted(email,false)
				.orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_MEMBER_EXCEPTION)));
	}

	@Override
	public void updateRank(Member member) {
		log.info("BE-RANK ");
		MemberEntity memberEntity = Member.MemberToMemberEntity(member);
		log.info("BE-RANK : member id {}" , memberEntity.getMemberId());
		log.info("BE-RANK : member rating {}" , memberEntity.getRating());
		memberRepository.save(memberEntity);
	}
}
