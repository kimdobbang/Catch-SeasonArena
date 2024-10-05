package com.catchcatchrank.domains.rank.application.port.in;

import com.catchcatchrank.domains.rank.domain.MyTierRanking;

public interface GetMyTierRankingUseCase {
	MyTierRanking getMyTierRanking(String nickname, Integer start);
}
