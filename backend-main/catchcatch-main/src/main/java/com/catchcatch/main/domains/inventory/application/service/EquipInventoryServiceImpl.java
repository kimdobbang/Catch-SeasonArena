package com.catchcatch.main.domains.inventory.application.service;

import java.util.List;

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
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j(topic = "main")
public class EquipInventoryServiceImpl implements EquipInventoryUseCase {

	private final FindInventoryByIdAndMemberEmailPort findInventoryByIdAndMemberEmailPort;
	private final UpdateInventoryPort updateInventoryPort;
	private final FindEquipInventoryListPort findEquipInventoryListPort;

	// 우선 내 장착 아이템이 3개이상이면 exception
	// 현재 아이템이 장착 중이면 exception

	@Transactional
	@Override
	public void equipInventory(Long inventoryId, String memberEmail) {
		List<Inventory> inventories = findEquipInventoryListPort.inventoryList(memberEmail);
		int equipInventorySize = inventories.size();

		if (equipInventorySize >= 3) {
			log.error("BE/MAIN - 장착 3개 초과 : {}", CustomException.INVENTORY_EQUIP_LIMIT_EXCEEDED_EXCEPTION);
			throw new ExceptionResponse(CustomException.INVENTORY_EQUIP_LIMIT_EXCEEDED_EXCEPTION);
		}

		Inventory inventory = findInventoryByIdAndMemberEmailPort.findInventoryByIdAndMemberEmail(
			inventoryId, memberEmail);

		if (inventory.getIsEquipped()) {
			log.error("BE/MAIN - 이미 장착중 : {}", CustomException.INVENTORY_ALREADY_EQUIPPED_EXCEPTION);
			throw new ExceptionResponse(CustomException.INVENTORY_ALREADY_EQUIPPED_EXCEPTION);
		}

		for(Inventory inventoryItem : inventories) {
			if(inventoryItem.getItem().getType().equals(inventory.getItem().getType())) {
				log.error("BE/MAIN - 이미 해당 타입 아이템 장착중" , CustomException.INVENTORY_EQUIP_TYPE_LIMIT_EXCEEDED_EXCEPTION);
				throw new ExceptionResponse(CustomException.INVENTORY_EQUIP_TYPE_LIMIT_EXCEEDED_EXCEPTION);
			}
		}

		inventory.equipInventory();
		updateInventoryPort.updateInventory(inventory);
	}
}
