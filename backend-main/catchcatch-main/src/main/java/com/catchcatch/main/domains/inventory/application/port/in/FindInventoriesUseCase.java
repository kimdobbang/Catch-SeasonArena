package com.catchcatch.main.domains.inventory.application.port.in;

import java.util.List;

import com.catchcatch.main.domains.inventory.domain.Inventory;

public interface FindInventoriesUseCase {

	List<Inventory> findInventories(String userEmail);
}
