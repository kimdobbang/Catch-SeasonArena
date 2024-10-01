package com.catchcatch.main.domains.inventory.application.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.catchcatch.main.domains.inventory.adapter.out.persistence.InventoryEntity;
import com.catchcatch.main.domains.inventory.application.port.in.FindInventoriesUseCase;
import com.catchcatch.main.domains.inventory.application.port.out.FindInventoriesByEmailPort;
import com.catchcatch.main.domains.inventory.domain.Inventory;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FindInventoryServiceImpl implements FindInventoriesUseCase {

	private final FindInventoriesByEmailPort findInventoriesByEmailPort;

	@Override
	public List<Inventory> findInventories(String userEmail) {
		List<InventoryEntity> inventoryEntities = findInventoriesByEmailPort.findInventoriesByEmail(userEmail);
		List<Inventory> inventories = new ArrayList<>();
		for(InventoryEntity inventoryEntity : inventoryEntities) {
			Inventory inventory = Inventory.createInventory(inventoryEntity);
			inventories.add(inventory);
		}
		return inventories;
	}
}
