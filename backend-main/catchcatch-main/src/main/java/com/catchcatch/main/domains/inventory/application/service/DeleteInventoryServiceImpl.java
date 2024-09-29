package com.catchcatch.main.domains.inventory.application.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.catchcatch.main.domains.inventory.application.port.in.DeleteInventoryUseCase;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class DeleteInventoryServiceImpl implements DeleteInventoryUseCase {

	@Override
	public void deleteInventory(Long InventoryId, String userEmail) {

	}
}
