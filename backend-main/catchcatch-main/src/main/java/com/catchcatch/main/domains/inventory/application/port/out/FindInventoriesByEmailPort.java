package com.catchcatch.main.domains.inventory.application.port.out;

import java.util.List;

import com.catchcatch.main.domains.inventory.adapter.out.persistence.InventoryEntity;
import com.catchcatch.main.domains.inventory.domain.Inventory;

public interface FindInventoriesByEmailPort {

	List<Inventory> findInventoriesByEmail(String email);
}
