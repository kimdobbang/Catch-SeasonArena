package com.catchcatch.main.domains.inventory.application.port.out;

import java.util.List;

import com.catchcatch.main.domains.inventory.adapter.out.persistence.InventoryEntity;

public interface FindInventoriesByEmailPort {

	List<InventoryEntity> findInventoriesByEmail(String email);
}
