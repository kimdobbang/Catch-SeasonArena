package com.catchcatch.main.domains.inventory.adapter.out.persistence;

import java.util.List;

import com.catchcatch.main.domains.inventory.application.port.out.*;
import org.springframework.stereotype.Component;

import com.catchcatch.main.domains.inventory.domain.Inventory;
import com.catchcatch.main.global.exception.CustomException;
import com.catchcatch.main.global.exception.ExceptionResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j(topic = "main")
public class InventoryPortAdapter implements DeleteInventoryPort, FindInventoryByIdAndMemberEmailPort,
	FindInventoriesByEmailPort, UpdateInventoryPort, FindEquipInventoryByEmailPort {

	private final InventoryRepository inventoryRepository;

	@Override
	public void deleteInventory(Inventory inventory) {
		InventoryEntity inventoryEntity = Inventory.InventoryToInventoryEntity(inventory);
		inventoryRepository.delete(inventoryEntity);
	}

	@Override
	public InventoryEntity findInventoryByIdAndMemberEmail(Long id, String email) {
		InventoryEntity inventoryEntity = inventoryRepository.findByIdAndMember_Email(id, email)
			.orElseThrow(() -> {
				log.error("BE/MAIN - errorse", CustomException.NOT_EXISTS_INVENTORY_EXCEPTION);
				return new ExceptionResponse(CustomException.NOT_EXISTS_INVENTORY_EXCEPTION);
			});

		return inventoryEntity;
	}

	@Override
	public List<InventoryEntity> findInventoriesByEmail(String email) {
		return inventoryRepository.findAllByMember_Email(email);
	}

	@Override
	public void updateInventory(Inventory inventory) {
		InventoryEntity inventoryEntity = Inventory.InventoryToInventoryEntity(inventory);
		inventoryRepository.save(inventoryEntity);
	}

	@Override
	public List<InventoryEntity> findEquipInventoryByEmail(String email) {
		return inventoryRepository.findAllByMember_EmailAndIsEquipped(email, true);
	}
}
