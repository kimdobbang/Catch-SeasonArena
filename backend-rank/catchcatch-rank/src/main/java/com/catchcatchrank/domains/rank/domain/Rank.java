package com.catchcatchrank.domains.rank.domain;

import com.catchcatchrank.domains.rank.adapter.in.kafka.KafkaRankEntity;

import lombok.Getter;

@Getter
public class Rank {

	private String email;
	private Integer rate;

	public Rank(String email, Integer rate) {
		this.email = email;
		this.rate = rate;
	}

	public static Rank fromKafkaRankEntity(KafkaRankEntity kafkaRankEntity) {
		return new Rank(kafkaRankEntity.getEmail(), kafkaRankEntity.getRank());
	}
}
