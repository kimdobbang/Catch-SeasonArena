package com.catchcatchrank.global.kafka.consumer;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import com.catchcatchrank.domains.rank.adapter.out.kafka.KafkaRankEntity;
import com.catchcatchrank.domains.rank.adapter.out.kafka.KafkaUpdateRankEntity;
import com.catchcatchrank.domains.rank.application.port.in.SaveRankService;
import com.catchcatchrank.domains.rank.application.port.in.UpdateRankService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class KafkaConsumer {

	private final SaveRankService saveRankService;
	private final UpdateRankService updateRankService;

	@KafkaListener(topics = "init_rank")
	public void listen(KafkaRankEntity rank) {
		log.info("BE-RANK : rank 커슘 {}" , rank.toString());
		saveRankService.saveRank(rank);
	}

	@KafkaListener(topics = "game_result", containerFactory = "kafkaUpdateRankListenerContainerFactory")
	public void listen(KafkaUpdateRankEntity updateRank) {
		log.info("BE-RANK : updateRank 커슘 {}" , updateRank.toString());
		updateRankService.updateRank(updateRank);
	}
}
