package com.catchcatchrank.domains.rank.adapter.out.redis;

import com.catchcatchrank.domains.rank.domain.Rank;

import lombok.Getter;

@Getter
public class RedisRankEntity {

	private String nickName;
	private Integer rate;

	public RedisRankEntity(String nickName, Integer rate) {
		this.nickName = nickName;
		this.rate = rate;
	}

	public static RedisRankEntity fromRank(Rank rank) {
		return new RedisRankEntity(rank.getNickName(), rank.getRate());
	}
}

