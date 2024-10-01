package com.catchcatch.main.domains.inventory.adapter.in.web.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.catchcatch.main.domains.inventory.adapter.in.web.message.SuccessUnEquipInventoryMessage;
import com.catchcatch.main.domains.inventory.application.port.in.UnEquipInventoryUseCase;
import com.catchcatch.main.global.util.HttpResponseUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/main/inventories/items/equipment")
@RequiredArgsConstructor
@Slf4j(topic = "main")
public class UnEquipInventoryController {

	private final UnEquipInventoryUseCase unEquipInventoryUseCase;
	private final HttpResponseUtil responseUtil;

	@PatchMapping("/{inventory_id}/member/{member_email}")
	public ResponseEntity<?> unEquipInventory(@PathVariable("inventory_id") Long inventoryId, @PathVariable("member_email") String memberEmail) {
		unEquipInventoryUseCase.unEquipInventory(inventoryId, memberEmail);
		ResponseEntity<?> response = responseUtil.createSuccessResponse(
			SuccessUnEquipInventoryMessage.SUCCESS_UN_EQUIP_INVENTORY.getMessage(),
			SuccessUnEquipInventoryMessage.SUCCESS_UN_EQUIP_INVENTORY,
			200
		);

		log.info("BE/MAIN - response 인벤토리 장착 해제 : {}", response);
		return response;
	}

}
