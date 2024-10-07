package com.catchcatch.auth.domains.rank.adapter.out.kafka;

import com.catchcatch.auth.domains.member.domain.Member;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class KafkaRankEntity {

	private String email;
	private Integer rank;


	public static KafkaRankEntity createKafkaRankEntity(Member member) {
		return new KafkaRankEntity(member.getEmail(), member.getRating());
	}
}