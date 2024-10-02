package com.catchcatch.main.domains.inventory.application.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.catchcatch.main.domains.inventory.application.port.in.DecreaseDurabilityUseCase;
import com.catchcatch.main.domains.inventory.application.port.out.DeleteInventoryPort;
import com.catchcatch.main.domains.inventory.application.port.out.FindEquipInventoryListPort;
import com.catchcatch.main.domains.inventory.application.port.out.UpdateInventoryPort;
import com.catchcatch.main.domains.inventory.domain.Inventory;
import com.catchcatch.main.domains.member.application.port.out.FindMemberPort;
import com.catchcatch.main.domains.member.domain.Member;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class DecreaseDurabilityServiceImpl implements DecreaseDurabilityUseCase {

	private final FindMemberPort findMemberPort;
	private final FindEquipInventoryListPort findEquipInventoryListPort;
	private final UpdateInventoryPort updateInventoryPort;
	private final DeleteInventoryPort deleteInventoryPort;


	@Override
	@Transactional
	public void decreaseDurability(String nickname) {

		Member member = findMemberPort.findMemberByNickname(nickname);
		List<Inventory> inventories = findEquipInventoryListPort.inventoryList(member.getEmail());

		for(Inventory inventory : inventories) {
			inventory.decreaseDurability();
			if(inventory.getDurability() == 0) {
				deleteInventoryPort.deleteInventory(inventory);
				continue;
			}
			updateInventoryPort.updateInventory(inventory);
		}
	}
}
