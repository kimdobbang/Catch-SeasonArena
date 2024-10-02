package com.catchcatch.main.global.kafka.consumer;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import com.catchcatch.main.domains.inventory.adapter.in.kafka.KafkaInventoryEntity;
import com.catchcatch.main.domains.inventory.application.port.in.DecreaseDurabilityUseCase;
import com.catchcatch.main.domains.member.domain.Member;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class KafkaConsumer {

	private final DecreaseDurabilityUseCase decreaseDurabilityUseCase;

	@KafkaListener(topics = "game_result")
	public void listen(KafkaInventoryEntity inventoryEntity) {
		log.info("BE-MAIN : 게임 끝날시 컨슘 {}" , inventoryEntity.getNickname());
		decreaseDurabilityUseCase.decreaseDurability(inventoryEntity.getNickname());

	}
}
