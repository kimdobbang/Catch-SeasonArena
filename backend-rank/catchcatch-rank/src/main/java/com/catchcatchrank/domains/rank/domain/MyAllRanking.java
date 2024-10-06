package com.catchcatchrank.domains.rank.domain;

import java.util.List;

public record MyAllRanking(
        List<UserRank> allRanks,
        MyRank myRank
) {
}
