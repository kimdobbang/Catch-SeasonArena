package com.catchcatch.main.domains.endGame.adapter.out.responseDto;

import com.catchcatch.main.domains.endGame.domain.EndGame;

import lombok.Builder;

@Builder
public record EndGameResponseDto(Integer kill,
	Integer time,
	Integer rank,
	Integer rating,
	Integer resultRating) {

	public static EndGameResponseDto from(EndGame endGame) {
		return EndGameResponseDto.builder()
			.time(endGame.getTime())
			.rank(endGame.getRank())
			.rating(endGame.getRating())
			.resultRating(endGame.getResultRating())
			.build();
	}
}
