package com.catchcatchrank.global.kafka.consumer;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import com.catchcatchrank.domains.rank.adapter.out.kafka.KafkaRankEntity;
import com.catchcatchrank.domains.rank.application.port.in.SaveRankService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class KafkaConsumer {

	private final SaveRankService saveRankService;

	@KafkaListener(topics = "rank")
	public void listen(KafkaRankEntity rank) {
		log.info("rank-server rank 발행 : {}" , rank.toString());
		saveRankService.saveRank(rank);
	}
}
