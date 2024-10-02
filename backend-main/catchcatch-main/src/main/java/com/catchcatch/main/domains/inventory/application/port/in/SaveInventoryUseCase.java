package com.catchcatch.main.domains.inventory.application.port.in;

import com.catchcatch.main.domains.item.domain.Item;

public interface SaveInventoryUseCase {
	
	Item saveInventory(String email,Long inventoryId);
	
}
