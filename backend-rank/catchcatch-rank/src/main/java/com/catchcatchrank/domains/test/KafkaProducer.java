package com.catchcatchrank.domains.test;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import com.catchcatchrank.domains.rank.adapter.in.kafka.KafkaUpdateRankEntity;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class KafkaProducer {

	private final KafkaTemplate<String, KafkaUpdateRankEntity> kafkaTemplate;

	public void sendMessage(KafkaUpdateRankEntity kafkaRankEntity) {
		kafkaTemplate.send("game_result","game_result", kafkaRankEntity);
	}
}