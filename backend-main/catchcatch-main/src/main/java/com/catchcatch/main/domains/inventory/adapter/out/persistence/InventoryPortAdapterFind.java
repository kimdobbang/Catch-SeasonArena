package com.catchcatch.main.domains.inventory.adapter.out.persistence;

import java.util.List;

import org.springframework.stereotype.Component;

import com.catchcatch.main.domains.inventory.application.port.out.DeleteInventoryPort;
import com.catchcatch.main.domains.inventory.application.port.out.FindEquipInventoryListPort;
import com.catchcatch.main.domains.inventory.application.port.out.FindInventoriesByEmailPort;
import com.catchcatch.main.domains.inventory.application.port.out.FindInventoryByIdAndMemberEmailPort;
import com.catchcatch.main.domains.inventory.application.port.out.UpdateInventoryPort;
import com.catchcatch.main.domains.inventory.domain.Inventory;
import com.catchcatch.main.global.exception.CustomException;
import com.catchcatch.main.global.exception.ExceptionResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j(topic = "main")
public class InventoryPortAdapterFind implements DeleteInventoryPort, FindInventoryByIdAndMemberEmailPort,
	FindInventoriesByEmailPort, UpdateInventoryPort, FindEquipInventoryListPort {

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
	public List<InventoryEntity> inventoryList(String email) {
		List<InventoryEntity> inventoryEntities = inventoryRepository.findAllByMember_EmailAndIsEquipped(email, true);
		return inventoryEntities;
	}
}
