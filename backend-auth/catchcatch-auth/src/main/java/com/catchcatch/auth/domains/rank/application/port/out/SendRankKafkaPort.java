package com.catchcatch.auth.domains.rank.application.port.out;

import com.catchcatch.auth.domains.member.domain.Member;

public interface SendRankKafkaPort {

	void initRank(Member member);
}
