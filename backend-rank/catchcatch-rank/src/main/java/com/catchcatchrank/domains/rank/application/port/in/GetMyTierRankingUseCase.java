package com.catchcatchrank.domains.rank.application.port.in;

import com.catchcatchrank.domains.rank.domain.MyTierRanking;
import com.catchcatchrank.domains.rank.domain.TierRanking;

public interface GetMyTierRankingUseCase {
	MyTierRanking getMyTierRanking(String nickname, Integer start);
	TierRanking getTierRanking(String nickname, Integer start);
}
