package com.catchcatchrank.domains.rank.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class TierRanking {

	List<UserRank> tierRanks;
}
