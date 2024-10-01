package com.catchcatch.main.domains.inventory.application.port.in;

import com.catchcatch.main.domains.inventory.domain.Inventory;

public interface UnEquipInventoryUseCase {

	void unEquipInventory(Long inventoryId, String userEmail);
}
