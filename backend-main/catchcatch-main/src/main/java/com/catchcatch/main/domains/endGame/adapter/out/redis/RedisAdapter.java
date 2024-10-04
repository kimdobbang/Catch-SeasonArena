package com.catchcatch.main.domains.endGame.adapter.out.redis;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import com.catchcatch.main.domains.endGame.application.port.out.EndGamePort;
import com.catchcatch.main.domains.endGame.domain.EndGame;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class RedisAdapter implements EndGamePort {

	private final RedisTemplate<String, Object> redisTemplate;

	@Override
	public EndGame getEndGame(String userNickname) {
		Integer getKill = Integer.parseInt((String)redisTemplate.opsForHash().get(userNickname, "kill"));
		Integer getTime = Integer.parseInt((String)redisTemplate.opsForHash().get(userNickname, "time"));
		Integer getRank = Integer.parseInt((String)redisTemplate.opsForHash().get(userNickname, "rank"));
		Integer getRating = Integer.parseInt((String)redisTemplate.opsForHash().get(userNickname, "rating"));
		EndGameEntity endGameEntity = EndGameEntity.of(getKill, getTime, getRank, getRating);
		return EndGame.fromEndGameEntity(endGameEntity);
	}
}
