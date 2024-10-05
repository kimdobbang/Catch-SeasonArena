package com.catchcatchrank.domains.rank.application.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import com.catchcatchrank.domains.member.appclication.port.GetMemberByNickNamePort;
import com.catchcatchrank.domains.member.domain.Member;
import com.catchcatchrank.domains.rank.application.port.out.GetTierRankPort;
import com.catchcatchrank.domains.rank.domain.MyRank;
import com.catchcatchrank.domains.rank.domain.TierRanking;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.catchcatchrank.domains.rank.application.port.in.GetMyTierRankingUseCase;
import com.catchcatchrank.domains.rank.application.port.out.GetMeRankPort;
import com.catchcatchrank.domains.rank.application.port.out.GetUserTierPort;
import com.catchcatchrank.domains.rank.domain.MyTierRanking;
import com.catchcatchrank.domains.rank.domain.UserRank;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j(topic = "rank")
public class GetMyTierRankingUseCaseImpl implements GetMyTierRankingUseCase {

	private final GetUserTierPort getUserTierPort;
	private final GetMeRankPort getMeRankPort;
	private final GetTierRankPort getTierRankPort;
	private final GetMemberByNickNamePort getMemberByNickNamePort;

	@Value("${rank.limit:5}")
	private Integer limit;

	@Override
	public MyTierRanking getMyTierRanking(String nickname, Integer page) {
		Integer start = page * limit;
		log.info("BE-RANK :  start {}", start);
		String tier = getUserTierPort.getUserTier(nickname);
		log.info("BE-RANK : tier {}", tier);
		Set<ZSetOperations.TypedTuple<Object>> tierRanksSet = getTierRankPort.getTierRank(tier, start);
		List<UserRank> tierRanks = tierRank(tierRanksSet, tier, start);
		MyRank myRank = myRank(tier, nickname);
		return  new MyTierRanking(tierRanks, myRank);
	}

	@Override
	public TierRanking getTierRanking(String nickname, Integer page) {
		Integer start = page * limit;
		log.info("BE-RANK :  start {}", start);
		String tier = getUserTierPort.getUserTier(nickname);
		Set<ZSetOperations.TypedTuple<Object>> tierRanksSet = getTierRankPort.getTierRank(tier, start);
		List<UserRank> tierRanks = tierRank(tierRanksSet, tier, start);
		return  new TierRanking(tierRanks);
	}

	private List<UserRank> tierRank(Set<ZSetOperations.TypedTuple<Object>> tierRanksSet, String tier, Integer start) {
		int count = start+1;
		List<UserRank> ranks = new ArrayList<>();
		for (ZSetOperations.TypedTuple<Object> tuple : tierRanksSet) {
			String nickname = tuple.getValue().toString();
			Integer rate = tuple.getScore().intValue();
			Member member = getMemberByNickNamePort.getMemberByNickName(nickname);
			UserRank userRank = UserRank.createUserRank(tier, nickname, member.getAvatar(), count++, rate);
			ranks.add(userRank);
		}
		return ranks;
	}

	private MyRank myRank(String tier, String nickname) {
		Integer getMyRank = getMeRankPort.getTierOfUserRaking(tier, nickname) + 1;
		Integer getMyRate = getMeRankPort.getUserRate(tier, nickname);

		return MyRank.createMyRank(tier, nickname, getMyRank, getMyRank, getMyRate);
	}

}
