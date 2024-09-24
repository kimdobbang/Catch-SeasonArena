package com.catchcatchrank.domains.rank.adapter.out.kafka;

import com.catchcatchrank.domains.rank.domain.Rank;

import lombok.Getter;

@Getter
public class KafkaRankEntity {

	private String nickName;
	private Integer rank;

	public static Rank rankEntityToRank(KafkaRankEntity kafkaRankEntity) {
		return new Rank(kafkaRankEntity.nickName, kafkaRankEntity.rank);
	}
}
