package com.catchcatchrank.domains.rank.adapter.out.redis;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import com.catchcatchrank.domains.rank.application.port.out.SaveRankPort;
import com.catchcatchrank.domains.rank.domain.Rank;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Component
@Slf4j
public class RankRepositoryAdapter implements SaveRankPort {

	private final RedisTemplate<String, Object> redisTemplateBronze;
	private final RedisTemplate<String, Object> redisTemplateSilver;
	private final RedisTemplate<String, Object> redisTemplateGold;

	private RedisTemplate<String, Object> getShard(double score) {
		if (score <= 100) {
			return redisTemplateBronze;
		}
		if (score <= 200) {
			return redisTemplateSilver;
		}

		return redisTemplateGold;
	}

	@Override
	public void saveUserScore(Rank rank) {
		RedisRankEntity rankEntity = Rank.rankToRedisRankEntity(rank);
		RedisTemplate<String, Object> shard = getShard(rankEntity.getRank());
		shard.opsForZSet().add("ranking", rankEntity.getNickName(), rankEntity.getRank());
	}
}
