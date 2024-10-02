package com.catchcatchrank.domains.rank.application.port.in;

import com.catchcatchrank.domains.rank.adapter.in.kafka.KafkaUpdateRankEntity;

public interface UpdateRankUseCase {

	void updateRank(KafkaUpdateRankEntity kafkaUpdateRankEntity);
}
