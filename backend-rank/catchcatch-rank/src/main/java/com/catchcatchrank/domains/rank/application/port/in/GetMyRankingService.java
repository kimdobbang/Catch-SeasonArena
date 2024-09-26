package com.catchcatchrank.domains.rank.application.port.in;

import com.catchcatchrank.domains.rank.domain.MyRanking;

public interface GetMyRankingService {
	MyRanking getMyRanking(String nickname);
}
