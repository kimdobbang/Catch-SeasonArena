package com.catchcatchrank.domains.member.appclication.service;

import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.catchcatchrank.domains.member.appclication.port.GetMemberByEmailPort;
import com.catchcatchrank.domains.member.appclication.port.UpdateMemberRankPort;
import com.catchcatchrank.domains.member.domain.Member;
import com.catchcatchrank.domains.rank.domain.Rank;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j(topic = "rank")
public class MemberServiceImpl {

	private final GetMemberByEmailPort getMemberByNickNamePort;
	private final UpdateMemberRankPort updateMemberRankPort;

	@Transactional
	@EventListener
	@Async
	public void updateRank(Rank rank) {

		Member member = getMemberByNickNamePort.getMemberByEmail(rank.getEmail());
		log.info("BE-RANK :  member rate {}" , member.getRating());
		log.info("BE-RANK : rank {}" , rank.getRate());
		member.updateRate(rank.getRate());
		updateMemberRankPort.updateRank(member);
	}
}
