package com.catchcatchrank.domains.rank.application.port.out;

import org.springframework.data.redis.core.ZSetOperations;

import java.util.Set;

public interface GetAllRankPort {

    Set<ZSetOperations.TypedTuple<Object>> getAllRank(Integer start);
}
