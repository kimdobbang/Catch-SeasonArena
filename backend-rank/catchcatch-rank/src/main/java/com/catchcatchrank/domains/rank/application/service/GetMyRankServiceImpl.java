package com.catchcatchrank.domains.rank.application.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.catchcatchrank.domains.rank.application.port.in.GetMyRankingService;
import com.catchcatchrank.domains.rank.application.port.out.GetMeRankPort;
import com.catchcatchrank.domains.rank.application.port.out.GetTop3RankPort;
import com.catchcatchrank.domains.rank.application.port.out.GetUserTierPort;
import com.catchcatchrank.domains.rank.domain.MyRanking;
import com.catchcatchrank.domains.rank.domain.UserRank;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class GetMyRankServiceImpl implements GetMyRankingService {

	private final GetTop3RankPort getTop3RankPort;
	private final GetUserTierPort getUserTierPort;
	private final GetMeRankPort getMeRankPort;

	@Override
	public MyRanking getMyRanking(String nickname) {
		String tier = getUserTierPort.getUserTier(nickname);
		Set<ZSetOperations.TypedTuple<Object>> top3 = getTop3RankPort.getTop3Rank(tier);
		List<UserRank> top3Ranks = top3Rank(top3,tier);
		UserRank myRank = myRank(tier, nickname);
		return  new MyRanking(top3Ranks, myRank);
	}

	private List<UserRank> top3Rank(Set<ZSetOperations.TypedTuple<Object>> top3, String tier) {
		int count = 1;
		List<UserRank> ranks = new ArrayList<>();
		for (ZSetOperations.TypedTuple<Object> tuple : top3) {
			String nickname = tuple.getValue().toString();
			Integer rate = tuple.getScore().intValue();

			UserRank userRank = UserRank.createUserRank(tier, nickname, count++, rate);
			ranks.add(userRank);
		}
		return ranks;
	}

	private UserRank myRank(String tier, String nickname) {
		Integer getMyRank = getMeRankPort.getTierOfUserRaking(tier, nickname) + 1;
		Integer getMyRate = getMeRankPort.getUserRate(tier, nickname);

		return UserRank.createUserRank(tier, nickname, getMyRank, getMyRate);
	}

}
