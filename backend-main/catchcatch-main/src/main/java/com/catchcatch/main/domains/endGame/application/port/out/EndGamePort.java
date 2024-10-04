package com.catchcatch.main.domains.endGame.application.port.out;

import com.catchcatch.main.domains.endGame.domain.EndGame;

public interface EndGamePort {

	EndGame getEndGame(String userNickname);
}
