package com.catchcatchrank.domains.rank.adapter.out.redis;

import java.util.Set;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.catchcatchrank.domains.rank.application.port.out.GetMeRankPort;
import com.catchcatchrank.domains.rank.application.port.out.GetTop3RankPort;
import com.catchcatchrank.domains.rank.application.port.out.GetRatePort;
import com.catchcatchrank.domains.rank.application.port.out.GetUserTierPort;
import com.catchcatchrank.domains.rank.application.port.out.UpdateTierPort;
import com.catchcatchrank.domains.rank.application.port.out.SaveRankPort;
import com.catchcatchrank.domains.rank.domain.Rank;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Component
@Slf4j
public class RankRepositoryAdapter implements SaveRankPort, UpdateTierPort, GetRatePort, GetTop3RankPort,
	GetUserTierPort, GetMeRankPort {

	private final RedisTemplate<String, Object> redisTemplate;

	private String getTier(double rate) {
		if (rate <= 100) {
			return "ranking_bronze";
		} else if (rate <= 200) {
			return "ranking_sliver";
		} else {
			return "ranking_gold";
		}
	}

	@Override
	public void saveUserScore(Rank rank) {
		RedisRankEntity rankEntity = Rank.rankToRedisRankEntity(rank);
		String tier = getTier(rankEntity.getRate());
		redisTemplate.opsForZSet().add(tier, rankEntity.getNickName(), rankEntity.getRate());

		String key = rankEntity.getNickName() + "ranking";  // 이메일을 키로 사용
		redisTemplate.opsForValue().set(key, tier);
	}

	@Transactional
	@Override
	public void updateRank(Rank rank) {
		RedisRankEntity rankEntity = Rank.rankToRedisRankEntity(rank);
		String preTier = getUserTier(rankEntity.getNickName());
		String changedTier = getTier(rankEntity.getRate());

		log.info("현재 랭크 : {}" ,rankEntity.getRate());
		log.info("BE-RANK : 이전 티어 {}", preTier);
		log.info("BE-RANK : 변화 된 티어 {}", changedTier);

		if (preTier != null && !preTier.equals(changedTier)) {
			redisTemplate.opsForZSet().remove(preTier, rankEntity.getNickName());
		}
		redisTemplate.opsForZSet().add(changedTier, rankEntity.getNickName(), rankEntity.getRate());
		redisTemplate.opsForValue().set(rankEntity.getNickName() + "ranking", changedTier);
	}

	@Override
	public Integer getRate(String nickname) {
		String tier = getUserTier(nickname);
		log.info("BE-RANK 티어 : {}", tier);
		Double rate = redisTemplate.opsForZSet().score(tier, nickname);
		return rate != null ? rate.intValue() : null;
	}

	@Override
	public Set<ZSetOperations.TypedTuple<Object>> getTop3Rank(String tier) {
		return redisTemplate.opsForZSet().reverseRangeWithScores(tier,0,3);
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
}
