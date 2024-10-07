package com.catchcatch.main.domains.endGame.adapter.in;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.catchcatch.main.domains.endGame.adapter.out.redis.RedisAdapter;
import com.catchcatch.main.domains.endGame.adapter.out.responseDto.EndGameResponseDto;
import com.catchcatch.main.domains.endGame.application.port.in.EndGameUseCase;
import com.catchcatch.main.domains.endGame.domain.EndGame;
import com.catchcatch.main.global.util.HttpResponseUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/main/endGame")
@Slf4j(topic = "main")
public class EndGameController {

	private final EndGameUseCase endGameUseCase;
	private final HttpResponseUtil httpResponseUtil;

	@GetMapping("/{member-email}")
	public ResponseEntity<?> endGame(@PathVariable("member-email") String memberEmail) {
		EndGame endGame = endGameUseCase.getEndGame(memberEmail);

		return httpResponseUtil.createResponse(endGame);
	}
}
