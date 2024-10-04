package com.catchcatch.main.domains.endGame.application.port.in;

import com.catchcatch.main.domains.endGame.domain.EndGame;

public interface EndGameUseCase {

	EndGame getEndGame(String userNickname);
}
