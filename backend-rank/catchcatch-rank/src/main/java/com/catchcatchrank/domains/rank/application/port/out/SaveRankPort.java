package com.catchcatchrank.domains.rank.application.port.out;

import com.catchcatchrank.domains.rank.domain.Rank;

public interface SaveRankPort {

	void saveUserScore(Rank rank);
}
