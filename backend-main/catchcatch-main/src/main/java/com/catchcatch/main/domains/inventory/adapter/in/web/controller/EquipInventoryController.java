package com.catchcatch.main.domains.inventory.adapter.in.web.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.catchcatch.main.domains.inventory.adapter.in.web.message.SuccessEquipInventoryMessage;
import com.catchcatch.main.domains.inventory.application.port.in.EquipInventoryUseCase;
import com.catchcatch.main.global.util.HttpResponseUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/main/inventories/items/equipment")
@RequiredArgsConstructor
@Slf4j(topic = "main")
public class EquipInventoryController {

	private final EquipInventoryUseCase equipInventoryUseCase;
	private final HttpResponseUtil responseUtil;

	@PatchMapping("/{inventory_id}/member/{member_email}")
	public ResponseEntity<?> equipInventory(@PathVariable("inventory_id") Long inventoryId, @PathVariable("member_email") String memberEmail) {
		equipInventoryUseCase.equipInventory(inventoryId, memberEmail);

		ResponseEntity<?> response = responseUtil.createSuccessResponse(
			SuccessEquipInventoryMessage.SUCCESS_EQUIP_INVENTORY.getMessage(),
			SuccessEquipInventoryMessage.SUCCESS_EQUIP_INVENTORY,
			200
		);

		log.info("BE/MAIN - response 인벤토리 장착: {}", response);
		return response;
	}

}
