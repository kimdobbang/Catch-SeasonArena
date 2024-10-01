package com.catchcatch.main.domains.inventory.application.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.catchcatch.main.domains.inventory.adapter.out.persistence.InventoryEntity;
import com.catchcatch.main.domains.inventory.application.port.in.UnEquipInventoryUseCase;
import com.catchcatch.main.domains.inventory.application.port.out.FindInventoryByIdAndMemberEmailPort;
import com.catchcatch.main.domains.inventory.application.port.out.UpdateInventoryPort;
import com.catchcatch.main.domains.inventory.domain.Inventory;
import com.catchcatch.main.global.exception.CustomException;
import com.catchcatch.main.global.exception.ExceptionResponse;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UnEquipInventoryServiceImpl implements UnEquipInventoryUseCase {

	private final FindInventoryByIdAndMemberEmailPort findInventoryByIdAndMemberEmailPort;
	private final UpdateInventoryPort updateInventoryPort;

	@Transactional
	@Override
	public void unEquipInventory(Long inventoryId, String userEmail) {
		InventoryEntity inventoryEntity = findInventoryByIdAndMemberEmailPort.findInventoryByIdAndMemberEmail(
			inventoryId, userEmail);
		Inventory inventory = Inventory.createInventory(inventoryEntity);

		if (!inventory.getIsEquipped()) {
			throw new ExceptionResponse(CustomException.INVENTORY_ALREADY_UN_EQUIPPED_EXCEPTION);
		}

		inventory.unEquipInventory();
		updateInventoryPort.updateInventory(inventory);
	}
}
