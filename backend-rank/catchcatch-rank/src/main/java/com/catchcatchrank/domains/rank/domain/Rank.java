package com.catchcatchrank.domains.rank.domain;

import com.catchcatchrank.domains.rank.adapter.out.redis.RedisRankEntity;

import lombok.Getter;

@Getter
public class Rank {

	private String nickName;
	private Integer rank;

	public Rank(String nickName, Integer rank) {
		this.nickName = nickName;
		this.rank = rank;
	}

	public static RedisRankEntity rankToRedisRankEntity(Rank rank) {
		return new RedisRankEntity(rank.getNickName(), rank.getRank());
	}
}
