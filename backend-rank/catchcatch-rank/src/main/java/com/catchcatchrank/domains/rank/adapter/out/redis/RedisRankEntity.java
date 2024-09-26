package com.catchcatchrank.domains.rank.adapter.out.redis;

import lombok.Getter;

@Getter
public class RedisRankEntity {

	private String nickName;
	private Integer rate;

	public RedisRankEntity(String nickName, Integer rate) {
		this.nickName = nickName;
		this.rate = rate;
	}
}

