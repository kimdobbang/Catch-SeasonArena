package com.catchcatchrank.domains.rank.domain;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MyRanking {

	List<UserRank> topRanks;
	UserRank myRank;
}
