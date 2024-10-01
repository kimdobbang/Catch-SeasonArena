package com.catchcatch.main.domains.inventory.application.port.out;

import java.util.List;

import com.catchcatch.main.domains.inventory.adapter.out.persistence.InventoryEntity;

public interface EquipInventoryListPort {

	List<InventoryEntity> inventoryList(String email);
}
