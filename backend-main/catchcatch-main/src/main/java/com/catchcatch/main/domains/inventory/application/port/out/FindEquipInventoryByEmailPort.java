package com.catchcatch.main.domains.inventory.application.port.out;

import com.catchcatch.main.domains.inventory.adapter.out.persistence.InventoryEntity;

import java.util.List;

public interface FindEquipInventoryByEmailPort {

    List<InventoryEntity> findEquipInventoryByEmail(String email);
}
