package com.catchcatch.main.domains.inventory.application.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.catchcatch.main.domains.inventory.application.port.in.EquipInventoryUseCase;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class EquipInventoryServiceImpl implements EquipInventoryUseCase {

	@Override
	public void equipInventory(Long inventoryId, String memberEmail) {

	}
}
