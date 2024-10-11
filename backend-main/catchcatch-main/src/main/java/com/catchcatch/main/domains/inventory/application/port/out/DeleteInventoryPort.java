package com.catchcatch.main.domains.inventory.application.port.out;
import com.catchcatch.main.domains.inventory.domain.Inventory;

public interface DeleteInventoryPort {

	void deleteInventory(Inventory inventory);
}
