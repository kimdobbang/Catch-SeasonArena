package com.catchcatchrank.domains.rank.application.port.out;

import org.springframework.data.redis.core.ZSetOperations;

import java.util.Set;

public interface GetTierRankPort {

    Set<ZSetOperations.TypedTuple<Object>> getTierRank(String tier, Integer cursor);
}
