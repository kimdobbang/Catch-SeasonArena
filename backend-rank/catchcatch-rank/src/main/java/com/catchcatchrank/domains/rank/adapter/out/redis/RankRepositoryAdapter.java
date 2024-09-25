package com.catchcatchrank.domains.rank.adapter.out.redis;

import java.util.Set;

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

	private final RedisTemplate<String, Object> redisTemplate;

	private String getShard(double score) {
		if (score <= 100) {
			return "ranking_bronze";
		}
		if (score <= 200) {
			return "ranking_sliver";
		}

		return "ranking_gold";
	}

	@Override
	public void saveUserScore(Rank rank) {
		RedisRankEntity rankEntity = Rank.rankToRedisRankEntity(rank);
		String shard = getShard(rankEntity.getRank());
		redisTemplate.opsForZSet().add(shard, rankEntity.getNickName(), rankEntity.getRank());
	}

	public Set<Object> getTop10FromShard(Integer rank) {
		String shard = getShard(rank);
		return redisTemplate.opsForZSet().reverseRange(shard, 0, 9);
	}
}
