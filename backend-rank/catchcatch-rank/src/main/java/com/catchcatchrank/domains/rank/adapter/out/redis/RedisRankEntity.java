package com.catchcatchrank.domains.rank.adapter.out.redis;

import com.catchcatchrank.domains.rank.domain.Rank;

import lombok.Getter;

@Getter
public class RedisRankEntity {

	private String email;
	private Integer rate;

	public RedisRankEntity(String email, Integer rate) {
		this.email = email;
		this.rate = rate;
	}

	public static RedisRankEntity fromRank(Rank rank) {

		return new RedisRankEntity(rank.getEmail(), rank.getRate());
	}
}

