package com.catchcatch.main.domains.endGame.adapter.out.redis;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class EndGameEntity {

	private Integer kill;
	private Integer time;
	private Integer rank;
	private Integer rating;

	@Builder
	public EndGameEntity(Integer kill, Integer time, Integer rank, Integer rating) {
		this.kill = kill;
		this.time = time;
		this.rank = rank;
		this.rating = rating;
	}

	public static EndGameEntity of(Integer kill, Integer time, Integer rank, Integer rating) {
		return EndGameEntity.builder()
			.kill(kill)
			.time(time)
			.rank(rank)
			.rating(rating)
			.build();
	}
}
