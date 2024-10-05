package com.catchcatchrank.domains.rank.adapter.out.redis;

import java.util.Set;

import com.catchcatchrank.domains.rank.application.port.out.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.catchcatchrank.domains.rank.domain.Rank;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Component
@Slf4j(topic = "rank")
public class RankRepositoryAdapter implements SaveRankPort, UpdateTierPort, GetRatePort,
	GetUserTierPort, GetMeRankPort, GetTierRankPort {

	private final RedisTemplate<String, Object> redisTemplate;

	@Value("${rank.limit}")
	private Integer limit;

	private String getTier(double rate) {
		if (rate <= 500) {
			return "ranking_bronze";
		} else if (rate <= 1000) {
			return "ranking_sliver";
		} else if (rate <= 1500){
			return "ranking_gold";
		} else if (rate <= 2000) {
			return "ranking_platinum";
		} else if (rate <= 2500) {
			return "ranking_dia";
		} else {
			return "ranking_ruby";
		}
	}

	@Override
	public void saveUserScore(Rank rank) {
		RedisRankEntity rankEntity = RedisRankEntity.fromRank(rank);
		String tier = getTier(rankEntity.getRate());
		redisTemplate.opsForZSet().add(tier, rankEntity.getNickName(), rankEntity.getRate());

		String key = rankEntity.getNickName() + "ranking";  // 이메일을 키로 사용
		redisTemplate.opsForValue().set(key, tier);
	}

	@Override
	public void saveAllRank(Rank rank) {
		RedisRankEntity rankEntity = RedisRankEntity.fromRank(rank);
		redisTemplate.opsForZSet().add("ranking_all", rankEntity.getNickName(), rankEntity.getRate());
	}

	@Transactional
	@Override
	public void updateTierRank(Rank rank) {
		RedisRankEntity rankEntity = RedisRankEntity.fromRank(rank);
		String preTier = getUserTier(rankEntity.getNickName());
		String changedTier = getTier(rankEntity.getRate());

		log.info("BE-RANK 현재 랭크 : {}" ,rankEntity.getRate());
		log.info("BE-RANK : 이전 티어 {}", preTier);
		log.info("BE-RANK : 변화 된 티어 {}", changedTier);

		if (preTier != null && !preTier.equals(changedTier)) {
			redisTemplate.opsForZSet().remove(preTier, rankEntity.getNickName());
		}
		redisTemplate.opsForZSet().add(changedTier, rankEntity.getNickName(), rankEntity.getRate());
		redisTemplate.opsForValue().set(rankEntity.getNickName() + "ranking", changedTier);
	}

	@Transactional
	@Override
	public void updateAllRank(Rank rank) {
		RedisRankEntity rankEntity = RedisRankEntity.fromRank(rank);
		redisTemplate.opsForZSet().add("ranking_all", rankEntity.getNickName(), rankEntity.getRate());
	}

	@Override
	public Integer getRate(String nickname) {
		String tier = getUserTier(nickname);
		log.info("BE-RANK 티어 : {}", tier);
		Double rate = redisTemplate.opsForZSet().score(tier, nickname);
		return rate != null ? rate.intValue() : null;
	}

	@Override
	public String getUserTier(String nickname) {
		return  (String)redisTemplate.opsForValue().get(nickname + "ranking");
	}

	public Integer getTierOfUserRaking(String tier, String nickname) {
		return redisTemplate.opsForZSet().reverseRank(tier,nickname).intValue();
	}

	public Integer getUserRate(String tier, String nickname) {
		return redisTemplate.opsForZSet().score(tier, nickname).intValue();
	}

	@Override
	public Set<ZSetOperations.TypedTuple<Object>> getTierRank(String tier, Integer start) {
		return redisTemplate.opsForZSet().reverseRangeWithScores(tier, start, start + limit - 1);
	}
}
