package com.catchcatchrank.domains.rank.application.port.out;

import com.catchcatchrank.domains.rank.domain.Rank;

public interface UpdateTierPort {

	void updateTierRank(Rank rank);
	void updateAllRank(Rank rank);
}
