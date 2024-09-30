package com.catchcatchrank.domains.rank.application.port.in;

import com.catchcatchrank.domains.rank.adapter.out.kafka.KafkaUpdateRankEntity;

public interface UpdateRankService {

	void updateRank(KafkaUpdateRankEntity kafkaUpdateRankEntity);
}
