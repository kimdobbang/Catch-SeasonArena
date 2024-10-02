package com.catchcatchrank.domains.rank.application.port.in;

import com.catchcatchrank.domains.rank.adapter.in.kafka.KafkaRankEntity;

public interface SaveRankUseCase {

	void saveRank(KafkaRankEntity kafkaRankEntity);
}
