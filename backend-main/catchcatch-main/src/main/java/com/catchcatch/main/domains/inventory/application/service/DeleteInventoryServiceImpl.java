package com.catchcatch.main.domains.inventory.application.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.catchcatch.main.domains.inventory.adapter.out.persistence.InventoryEntity;
import com.catchcatch.main.domains.inventory.application.port.in.DeleteInventoryUseCase;
import com.catchcatch.main.domains.inventory.application.port.out.DeleteInventoryPort;
import com.catchcatch.main.domains.inventory.application.port.out.FindInventoryByIdAndMemberEmailPort;
import com.catchcatch.main.domains.inventory.domain.Inventory;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class DeleteInventoryServiceImpl implements DeleteInventoryUseCase {

	private final DeleteInventoryPort deleteInventoryPort;
	private final FindInventoryByIdAndMemberEmailPort findInventoryByIdAndMemberEmailPort;


	@Override
	public void deleteInventory(Long inventoryId, String userEmail) {
		InventoryEntity inventoryEntity = findInventoryByIdAndMemberEmailPort.findInventoryByIdAndMemberEmail(inventoryId, userEmail);
		Inventory inventory = Inventory.createInventory(inventoryEntity);
		deleteInventoryPort.deleteInventory(inventory);
	}
}
