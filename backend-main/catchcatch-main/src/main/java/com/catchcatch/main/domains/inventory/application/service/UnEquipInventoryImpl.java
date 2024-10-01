package com.catchcatch.main.domains.inventory.application.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.catchcatch.main.domains.inventory.application.port.in.UnEquipInventoryUseCase;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UnEquipInventoryImpl implements UnEquipInventoryUseCase {


	@Override
	public void unEquipInventory(Long inventoryId, String userEmail) {

	}
}
