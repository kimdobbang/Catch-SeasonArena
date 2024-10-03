package com.catchcatch.main.global.kafka.consumer;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import com.catchcatch.main.domains.inventory.adapter.in.kafka.KafkaInventoryEntity;
import com.catchcatch.main.domains.inventory.adapter.in.kafka.KafkaSaveInventoryEntity;
import com.catchcatch.main.domains.inventory.application.port.in.DecreaseDurabilityUseCase;
import com.catchcatch.main.domains.member.domain.Member;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class KafkaConsumer {

	private final DecreaseDurabilityUseCase decreaseDurabilityUseCase;
	private final ApplicationEventPublisher applicationEventPublisher;

	@KafkaListener(topics = "game_result")
	public void listen(KafkaInventoryEntity inventoryEntity) {
		log.info("BE-MAIN : 게임 끝날시 컨슘 {}" , inventoryEntity.toString());
		decreaseDurabilityUseCase.decreaseDurability(inventoryEntity.getNickname());

	}

	@KafkaListener(topics = "create_inventory", containerFactory = "kafkaSaveInventoryListenerContainerFactory")
	public void listen(KafkaSaveInventoryEntity kafkaSaveInventoryEntity) {
		log.info("BE-MAIN : saveEntity 커슘 {}" , kafkaSaveInventoryEntity.toString());
		applicationEventPublisher.publishEvent(kafkaSaveInventoryEntity);
	}
}
