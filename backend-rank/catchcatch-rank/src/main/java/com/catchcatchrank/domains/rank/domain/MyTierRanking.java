package com.catchcatchrank.domains.rank.domain;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MyTierRanking {

	List<UserRank> tierRanks;
	MyRank myRank;
}
