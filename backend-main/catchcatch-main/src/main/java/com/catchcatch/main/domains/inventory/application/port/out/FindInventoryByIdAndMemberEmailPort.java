package com.catchcatch.main.domains.inventory.application.port.out;

import com.catchcatch.main.domains.inventory.adapter.out.persistence.InventoryEntity;
import com.catchcatch.main.domains.inventory.domain.Inventory;

public interface FindInventoryByIdAndMemberEmailPort {

	Inventory findInventoryByIdAndMemberEmail(Long id, String email);
}
