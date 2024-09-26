package com.catchcatchrank.domains.rank.domain;

import com.catchcatchrank.domains.rank.adapter.out.redis.RedisRankEntity;

import lombok.Getter;

@Getter
public class Rank {

	private String nickName;
	private Integer rate;

	public Rank(String nickName, Integer rate) {
		this.nickName = nickName;
		this.rate = rate;
	}

	public static RedisRankEntity rankToRedisRankEntity(Rank rank) {
		return new RedisRankEntity(rank.getNickName(), rank.getRate());
	}
}
