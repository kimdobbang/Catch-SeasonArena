package com.catchcatch.main.domains.inventory.application.port.out;

import com.catchcatch.main.domains.inventory.adapter.out.persistence.InventoryEntity;

public interface FindInventoryByIdAndMemberEmail {

	InventoryEntity findInventoryByIdAndMemberEmail(Long id, String email);
}
