package com.catchcatch.main.domains.endGame.domain;

import com.catchcatch.main.domains.endGame.adapter.out.redis.EndGameEntity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class EndGame {

	private Integer kill;
	private Integer time;
	private Integer rank;
	private Integer rating;
	private Integer resultRating;

	@Builder
	private EndGame(Integer kill, Integer time, Integer rank, Integer rating, Integer resultRating) {
		this.kill = kill;
		this.time = time;
		this.rank = rank;
		this.rating = rating;
		this.resultRating = resultRating;
	}

	public static EndGame fromEndGameEntity(EndGameEntity endGameEntity){
		return EndGame.builder()
			.kill(endGameEntity.getKill())
			.time(endGameEntity.getTime())
			.rank(endGameEntity.getRank())
			.rating(endGameEntity.getRating())
			.build();
	}

	public void resultRating(int caculateScore) {
		resultRating = caculateScore;
	}
}
