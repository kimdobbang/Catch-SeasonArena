package com.catchcatch.main.domains.endGame.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.BDDMockito;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.catchcatch.main.domains.endGame.adapter.in.EndGameController;
import com.catchcatch.main.domains.endGame.adapter.out.redis.EndGameEntity;
import com.catchcatch.main.domains.endGame.application.port.in.EndGameUseCase;
import com.catchcatch.main.domains.endGame.domain.EndGame;
import com.catchcatch.main.global.util.HttpResponseUtil;

@WebMvcTest(
	controllers = EndGameController.class
)
@MockBean(JpaMetamodelMappingContext.class)
public class EndGameControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private EndGameUseCase endGameUseCase;

	@MockBean
	private HttpResponseUtil httpResponseUtil;

	private EndGame endGame;

	@BeforeEach
	public void setUp() {
		EndGameEntity endGameEntity = new EndGameEntity(1,1,1,1);
		endGame = EndGame.fromEndGameEntity(endGameEntity);
	}

	@Test
	@DisplayName("endGame 보여주기 테스트")
	public void endGame_보여주기_테스트() throws Exception {

		//given
		BDDMockito.given(endGameUseCase.getEndGame("1")).willReturn(endGame);

		//when then
		ResultActions resultActions = mockMvc.perform(MockMvcRequestBuilders.get("/api/main/endGame/1")
			.contentType(MediaType.APPLICATION_JSON)
		);

		resultActions.andExpect(MockMvcResultMatchers.status().isOk());
	}

}
