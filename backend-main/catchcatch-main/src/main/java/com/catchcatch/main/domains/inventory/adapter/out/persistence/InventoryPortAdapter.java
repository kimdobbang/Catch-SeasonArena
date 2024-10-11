package com.catchcatch.main.domains.inventory.adapter.out.persistence;

import java.util.ArrayList;
import java.util.List;

import com.catchcatch.main.domains.inventory.application.port.out.*;

import org.springframework.stereotype.Component;

import com.catchcatch.main.domains.inventory.application.port.out.DeleteInventoryPort;
import com.catchcatch.main.domains.inventory.application.port.out.FindEquipInventoryListPort;
import com.catchcatch.main.domains.inventory.application.port.out.FindInventoriesByEmailPort;
import com.catchcatch.main.domains.inventory.application.port.out.FindInventoryByIdAndMemberEmailPort;
import com.catchcatch.main.domains.inventory.application.port.out.SaveInventoryPort;

import com.catchcatch.main.domains.inventory.application.port.out.UpdateInventoryPort;
import com.catchcatch.main.domains.inventory.domain.Inventory;
import com.catchcatch.main.global.exception.CustomException;
import com.catchcatch.main.global.exception.ExceptionResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j(topic = "main")

public class InventoryPortAdapter implements DeleteInventoryPort, FindInventoryByIdAndMemberEmailPort,
		FindInventoriesByEmailPort, UpdateInventoryPort, FindEquipInventoryByEmailPort, FindEquipInventoryListPort,
		SaveInventoryPort {

	private final InventoryRepository inventoryRepository;

	@Override
	public void deleteInventory(Inventory inventory) {
		InventoryEntity inventoryEntity = InventoryEntity.fromInventory(inventory);
		inventoryRepository.delete(inventoryEntity);
	}

	@Override
	public Inventory findInventoryByIdAndMemberEmail(Long id, String email) {
		InventoryEntity inventoryEntity = inventoryRepository.findByIdAndMember_Email(id, email)
				.orElseThrow(() -> {
					log.error("BE/MAIN - errorse", CustomException.NOT_EXISTS_INVENTORY_EXCEPTION);
					return new ExceptionResponse(CustomException.NOT_EXISTS_INVENTORY_EXCEPTION);
				});

		return Inventory.fromInventoryEntity(inventoryEntity);
	}

	@Override
	public List<Inventory> findInventoriesByEmail(String email) {
		List<InventoryEntity> inventoryEntities = inventoryRepository.findAllByMember_Email(email);

		List<Inventory> inventories = new ArrayList<>();

		for(InventoryEntity inventoryEntity : inventoryEntities){
			inventories.add(Inventory.fromInventoryEntity(inventoryEntity));
		}
		return inventories;
	}

	@Override
	public void saveInventory(Inventory inventory) {
		inventoryRepository.save(InventoryEntity.fromInventory(inventory));
	}

	@Override
	public void updateInventory(Inventory inventory) {
		InventoryEntity inventoryEntity = InventoryEntity.fromInventory(inventory);
		inventoryRepository.save(inventoryEntity);
	}

	@Override
	public List<Inventory> inventoryList(String email) {
		List<InventoryEntity> inventoryEntities = inventoryRepository.findAllByMember_EmailAndIsEquipped(email, true);
		List<Inventory> inventories = new ArrayList<>();

		for(InventoryEntity inventoryEntity : inventoryEntities){
			inventories.add(Inventory.fromInventoryEntity(inventoryEntity));
		}
		return inventories;
	}

	@Override
	public List<Inventory> findEquipInventoryByEmail(String email) {
		List<InventoryEntity> inventoryEntities = inventoryRepository.findAllByMember_EmailAndIsEquipped(email, true);
		List<Inventory> inventories = new ArrayList<>();

		for(int i=0; i<inventoryEntities.size(); i++){
			inventories.add(Inventory.fromInventoryEntity(inventoryEntities.get(i)));
		}
		return inventories;
	}

}
