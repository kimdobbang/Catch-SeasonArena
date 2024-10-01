package com.catchcatch.main.domains.inventory.application.service;

import com.catchcatch.main.domains.inventory.application.port.in.SaveInventoryUseCase;
import com.catchcatch.main.domains.inventory.application.port.out.SaveInventoryPort;
import com.catchcatch.main.domains.inventory.domain.Inventory;
import com.catchcatch.main.domains.item.adapter.out.persistence.Grade;
import com.catchcatch.main.domains.item.domain.Item;
import com.catchcatch.main.domains.item.port.out.FindItemPort;
import com.catchcatch.main.domains.member.application.port.out.FindMemberPort;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SaveInventoryServiceImpl implements SaveInventoryUseCase {

	private final SaveInventoryPort saveInventoryPort;
	private final FindItemPort findItemPort;
	private final FindMemberPort findMemberPort;

	@Override
	@Transactional
	public Item saveInventory(String email, Long inventoryId) {
		Item item = Item.fromEntity(findItemPort.findItemById(inventoryId));
		Grade grade = item.getGrade();
		int durability = (grade == Grade.NORMAL) ? 5 : (grade == Grade.RARE) ? 10 : 15;

		Inventory inventory = Inventory.builder()
								.id(inventoryId)
								.member(null)
								.isEquipped(false)
								.item(null)
								.durability(durability)
								.build();
		saveInventoryPort.saveInventory(inventory);
		return item;
	}

}
