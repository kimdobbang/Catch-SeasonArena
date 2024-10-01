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
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j(topic = "main")
public class UnEquipInventoryServiceImpl implements UnEquipInventoryUseCase {

	private final FindInventoryByIdAndMemberEmailPort findInventoryByIdAndMemberEmailPort;
	private final UpdateInventoryPort updateInventoryPort;

	@Transactional
	@Override
	public void unEquipInventory(Long inventoryId, String memberEmail) {
		Inventory inventory = findInventoryByIdAndMemberEmailPort.findInventoryByIdAndMemberEmail(
			inventoryId, memberEmail);

		if (!inventory.getIsEquipped()) {
			log.error("BE/MAIN - 이미 장착 해제 중 : {}", CustomException.INVENTORY_ALREADY_UN_EQUIPPED_EXCEPTION);
			throw new ExceptionResponse(CustomException.INVENTORY_ALREADY_UN_EQUIPPED_EXCEPTION);
		}

		inventory.unEquipInventory();
		updateInventoryPort.updateInventory(inventory);
	}
}
