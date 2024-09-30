package com.catchcatch.main.domains.inventory.application.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.catchcatch.main.domains.inventory.application.port.in.FindInventoriesUseCase;
import com.catchcatch.main.domains.inventory.domain.Inventory;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FindInventoryServiceImpl implements FindInventoriesUseCase {

	@Override
	public List<Inventory> findInventories(String userEmail) {
		List<Inventory> inventories = new ArrayList<>();
		return inventories;
	}
}
