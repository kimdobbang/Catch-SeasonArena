package com.catchcatch.main.domains.inventory.adapter.out.persistence;

import org.springframework.stereotype.Component;

import com.catchcatch.main.domains.inventory.application.port.out.DeleteInventoryPort;
import com.catchcatch.main.domains.inventory.application.port.out.FindInventoryByIdAndMemberEmail;
import com.catchcatch.main.domains.inventory.domain.Inventory;
import com.catchcatch.main.global.exception.CustomException;
import com.catchcatch.main.global.exception.ExceptionResponse;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class InventoryAdapter implements DeleteInventoryPort, FindInventoryByIdAndMemberEmail {

	private final InventoryRepository inventoryRepository;

	@Override
	public void deleteInventory(Inventory inventory) {
		InventoryEntity inventoryEntity = Inventory.InventoryToInventoryEntity(inventory);
		inventoryRepository.delete(inventoryEntity);
	}

	@Override
	public InventoryEntity findInventoryByIdAndMemberEmail(Long id, String email) {
		InventoryEntity inventoryEntity = inventoryRepository.findByIdAndMember_Email(id, email)
			.orElseThrow(() -> new ExceptionResponse(
				CustomException.NOT_EXISTS_INVENTORY_EXCEPTION));

		return inventoryEntity;
	}
}
