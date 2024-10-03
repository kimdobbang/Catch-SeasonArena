package com.catchcatch.main.domains.inventory.application.service;

import com.catchcatch.main.domains.inventory.adapter.in.kafka.KafkaSaveInventoryEntity;
import com.catchcatch.main.domains.inventory.application.port.in.SaveInventoryUseCase;
import com.catchcatch.main.domains.inventory.application.port.out.SaveInventoryPort;
import com.catchcatch.main.domains.inventory.domain.Inventory;
import com.catchcatch.main.domains.item.adapter.out.persistence.Grade;
import com.catchcatch.main.domains.item.domain.Item;
import com.catchcatch.main.domains.item.port.out.FindItemPort;
import com.catchcatch.main.domains.member.adapter.out.persistence.MemberEntity;
import com.catchcatch.main.domains.member.application.port.out.FindMemberPort;
import com.catchcatch.main.domains.member.domain.Member;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SaveInventoryServiceImpl implements SaveInventoryUseCase {

	private final SaveInventoryPort saveInventoryPort;
	private final FindItemPort findItemPort;
	private final FindMemberPort findMemberPort;

	@Override
	@Transactional
	@EventListener
	@Async
	public void saveInventory(KafkaSaveInventoryEntity kafkaSaveInventoryEntity) {
		Item item = findItemPort.findItemById(kafkaSaveInventoryEntity.getItemId());
		Member member = findMemberPort.findMember(kafkaSaveInventoryEntity.getEmail());
		Grade grade = item.getGrade();
		int durability = (grade == Grade.NORMAL) ? 5 : (grade == Grade.RARE) ? 10 : 15;

		Inventory inventory = Inventory.builder()
								.member(member)
								.isEquipped(false)
								.item(item)
								.durability(durability)
								.build();
		saveInventoryPort.saveInventory(inventory);
	}

}
