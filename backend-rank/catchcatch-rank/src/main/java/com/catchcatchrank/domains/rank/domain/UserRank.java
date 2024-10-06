package com.catchcatchrank.domains.rank.domain;

import lombok.Builder;
import lombok.Getter;

@Getter
public class UserRank {

	private String tier;
	private String nickname;
	private String avatar;
	private Integer tierRanking;
	private Integer rating;

	@Builder
	private UserRank(String tier, String nickname, String avatar, Integer tierRanking, Integer rating) {
		this.tier = tier;
		this.nickname = nickname;
		this.avatar = avatar;
		this.tierRanking = tierRanking;
		this.rating = rating;
	}

	public static UserRank createUserRank(String tier, String nickname, String avatar, Integer tierRanking, Integer rating) {
		return UserRank.builder()
			.tier(tier)
			.nickname(nickname)
			.avatar(avatar)
			.tierRanking(tierRanking)
			.rating(rating)
			.build();
	}
}
