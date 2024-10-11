package com.catchcatchrank.global.kafka.consumer;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import com.catchcatchrank.domains.rank.adapter.in.kafka.KafkaRankEntity;
import com.catchcatchrank.domains.rank.adapter.in.kafka.KafkaUpdateRankEntity;
import com.catchcatchrank.domains.rank.application.port.in.SaveRankUseCase;
import com.catchcatchrank.domains.rank.application.port.in.UpdateRankUseCase;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j(topic = "rank")
public class KafkaConsumer {

	private final SaveRankUseCase saveRankUseCase;
	private final UpdateRankUseCase updateRankUseCase;

	@KafkaListener(topics = "init_rank")
	public void listen(KafkaRankEntity rank) {
		log.info("BE-RANK : rank 컨슘 {}" , rank.toString());
		saveRankUseCase.saveRank(rank);
	}

	@KafkaListener(topics = "game_result", containerFactory = "kafkaUpdateRankListenerContainerFactory")
	public void listen(KafkaUpdateRankEntity updateRank) {
		log.info("BE-RANK : updateRank 커슘 {}" , updateRank.toString());
		updateRankUseCase.updateRank(updateRank);
	}
}
