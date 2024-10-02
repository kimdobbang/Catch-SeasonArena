package com.catchcatch.main.domains.inventory.application.port.out;
import com.catchcatch.main.domains.inventory.domain.Inventory;

public interface SaveInventoryPort {

	void saveInventory(Inventory inventory);
}
