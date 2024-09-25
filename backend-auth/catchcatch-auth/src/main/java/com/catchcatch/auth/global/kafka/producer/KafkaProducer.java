package com.catchcatch.auth.global.kafka.producer;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import com.catchcatch.auth.domains.rank.adapter.out.kafka.KafkaRankEntity;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class KafkaProducer {

	private final KafkaTemplate<String, KafkaRankEntity> kafkaTemplate;

	public void sendMessage(KafkaRankEntity kafkaRankEntity) {
		kafkaTemplate.send("init_rank", kafkaRankEntity);
	}
}