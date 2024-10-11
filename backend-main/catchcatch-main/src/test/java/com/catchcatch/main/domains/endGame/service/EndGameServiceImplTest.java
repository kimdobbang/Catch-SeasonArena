package com.catchcatch.main.domains.endGame.service;

import static org.mockito.ArgumentMatchers.*;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.BDDMockito;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.catchcatch.main.domains.endGame.adapter.out.redis.EndGameEntity;
import com.catchcatch.main.domains.endGame.application.port.out.EndGamePort;
import com.catchcatch.main.domains.endGame.application.service.EndGameServiceImpl;
import com.catchcatch.main.domains.endGame.domain.EndGame;

@ExtendWith(MockitoExtension.class)
public class EndGameServiceImplTest {

	@InjectMocks
	private EndGameServiceImpl endGameService;

	@Mock
	private EndGamePort endGamePort;

	private EndGame endGame;

	@BeforeEach
	public void setUp() {
		EndGameEntity endGameEntity = new EndGameEntity(1,1,1,1);
		endGame = EndGame.fromEndGameEntity(endGameEntity);
	}

	@Test
	@DisplayName("endGame 반환")
	public void testEndGame() {
		//given
		BDDMockito.given(endGamePort.getEndGame("1")).willReturn(endGame);

		//when then
		Assertions.assertThatNoException().isThrownBy(() -> endGamePort.getEndGame("1"));
	}
}
