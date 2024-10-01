package com.catchcatch.main.domains.inventory.application.port.in;

public interface DeleteInventoryUseCase {

	void deleteInventory(Long InventoryId, String userEmail);
}
