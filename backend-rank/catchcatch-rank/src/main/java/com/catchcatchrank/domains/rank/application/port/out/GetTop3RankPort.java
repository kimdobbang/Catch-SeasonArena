package com.catchcatchrank.domains.rank.application.port.out;

import java.util.Set;

import org.springframework.data.redis.core.ZSetOperations;

public interface GetTop3RankPort {

	Set<ZSetOperations.TypedTuple<Object>> getTop3Rank(String tier);
}
