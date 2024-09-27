package com.catchcatchrank.domains.member.appclication.service;

import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.catchcatchrank.domains.member.adapter.out.persistence.MemberEntity;
import com.catchcatchrank.domains.member.appclication.port.GetMemberByNickNamePort;
import com.catchcatchrank.domains.member.appclication.port.UpdateMemberRankPort;
import com.catchcatchrank.domains.member.domain.Member;
import com.catchcatchrank.domains.rank.domain.Rank;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class MemberServiceImpl {

	private final GetMemberByNickNamePort getMemberByNickNamePort;
	private final UpdateMemberRankPort updateMemberRankPort;

	@Transactional
	@EventListener
	public void updateRank(Rank rank) {

		MemberEntity memberEntity = getMemberByNickNamePort.getMemberByNickName(rank.getNickName());
		log.info("BE-RANK :  member rate {}" , memberEntity.getRating());

		 Member member = Member.createMemberToEntity(memberEntity);
		 log.info("BE-RANK : rank {}" , rank.getRate());
		 member.updateRate(rank.getRate());
		 updateMemberRankPort.updateRank(member);
	}
}
