package com.catchcatch.main.domains.inventory.application.port.out;

import com.catchcatch.main.domains.inventory.domain.Inventory;

import java.util.List;

public interface FindEquipInventoryByEmailPort {

    List<Inventory> findEquipInventoryByEmail(String email);
}