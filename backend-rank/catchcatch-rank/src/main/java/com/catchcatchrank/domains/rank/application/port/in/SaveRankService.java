package com.catchcatchrank.domains.rank.application.port.in;

import com.catchcatchrank.domains.rank.adapter.out.kafka.KafkaRankEntity;

public interface SaveRankService {

	void saveRank(KafkaRankEntity kafkaRankEntity);
}
