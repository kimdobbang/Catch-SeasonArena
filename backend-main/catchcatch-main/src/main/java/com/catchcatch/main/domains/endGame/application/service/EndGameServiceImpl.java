package com.catchcatch.main.domains.endGame.application.service;

import org.springframework.stereotype.Service;

import com.catchcatch.main.domains.endGame.application.port.in.EndGameUseCase;
import com.catchcatch.main.domains.endGame.application.port.out.EndGamePort;
import com.catchcatch.main.domains.endGame.domain.EndGame;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EndGameServiceImpl implements EndGameUseCase {

	private final EndGamePort endGamePort;

	@Override
	public EndGame getEndGame(String memberEmail) {
		EndGame endGame = endGamePort.getEndGame(memberEmail);
		Integer score = calculateScore(endGame.getKill(), endGame.getTime(),
			endGame.getRank());
		Integer preRate = endGame.getRating();
		Integer calculateRate = preRate + score;

		endGame.resultRating(calculateRate);
		return endGame;
	}

	private Integer calculateScore(Integer kill, Integer time, Integer rank) {
		Integer score = 0;

		Integer killScore = 0;
		killScore += kill * 2;
		Integer rankScore = 0;
		rankScore += 5 * ( 5 - rank);

		score = killScore + rankScore;
		return score;
	}
}
