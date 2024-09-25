package com.catchcatchrank.domains.rank.adapter.out.redis;

import lombok.Getter;

@Getter
public class RedisRankEntity {

	private String nickName;
	private Integer rank;

	public RedisRankEntity(String nickName, Integer rank) {
		this.nickName = nickName;
		this.rank = rank;
	}
}

