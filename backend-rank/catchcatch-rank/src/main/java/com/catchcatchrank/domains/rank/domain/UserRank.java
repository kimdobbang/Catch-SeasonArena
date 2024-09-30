package com.catchcatchrank.domains.rank.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
public class UserRank {

	private String tier;
	private String nickName;
	private Integer tierRank;
	private Integer rate;

	@Builder
	private UserRank(String tier, String nickName, Integer tierRank, Integer rate) {
		this.tier = tier;
		this.nickName = nickName;
		this.tierRank = tierRank;
		this.rate = rate;
	}

	public static UserRank createUserRank(String tier, String nickName, Integer tierRank, Integer rate) {
		return UserRank.builder()
			.tier(tier)
			.nickName(nickName)
			.tierRank(tierRank)
			.rate(rate)
			.build();
	}
}
