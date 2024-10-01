package com.catchcatch.main.domains.inventory.application.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.catchcatch.main.domains.inventory.adapter.out.persistence.InventoryEntity;
import com.catchcatch.main.domains.inventory.application.port.in.EquipInventoryUseCase;
import com.catchcatch.main.domains.inventory.application.port.out.FindEquipInventoryListPort;
import com.catchcatch.main.domains.inventory.application.port.out.FindInventoryByIdAndMemberEmailPort;
import com.catchcatch.main.domains.inventory.application.port.out.UpdateInventoryPort;
import com.catchcatch.main.domains.inventory.domain.Inventory;
import com.catchcatch.main.global.exception.CustomException;
import com.catchcatch.main.global.exception.ExceptionResponse;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class EquipInventoryServiceImpl implements EquipInventoryUseCase {

	private final FindInventoryByIdAndMemberEmailPort findInventoryByIdAndMemberEmailPort;
	private final UpdateInventoryPort updateInventoryPort;
	private final FindEquipInventoryListPort findEquipInventoryListPort;

	// 우선 내 장착 아이템이 3개이상이면 exception
	// 현재 아이템이 장착 중이면 exception

	@Override
	public void equipInventory(Long inventoryId, String memberEmail) {
		int equipInventorySize = findEquipInventoryListPort.inventoryList(memberEmail).size();

		if (equipInventorySize >= 3) {
			throw new ExceptionResponse(CustomException.INVENTORY_EQUIP_LIMIT_EXCEEDED_EXCEPTION);
		}

		InventoryEntity inventoryEntity = findInventoryByIdAndMemberEmailPort.findInventoryByIdAndMemberEmail(
			inventoryId, memberEmail);
		Inventory inventory = Inventory.createInventory(inventoryEntity);

		if (inventory.getIsEquipped()) {
			throw new ExceptionResponse(CustomException.INVENTORY_ALREADY_EQUIPPED_EXCEPTION);
		}

		inventory.equipInventory();
		updateInventoryPort.updateInventory(inventory);
	}
}
