package com.catchcatch.main.domains.inventory.application.port.out;

import java.util.List;

import com.catchcatch.main.domains.inventory.adapter.out.persistence.InventoryEntity;
import com.catchcatch.main.domains.inventory.domain.Inventory;

public interface FindEquipInventoryListPort {

	List<Inventory> inventoryList(String email);
}
