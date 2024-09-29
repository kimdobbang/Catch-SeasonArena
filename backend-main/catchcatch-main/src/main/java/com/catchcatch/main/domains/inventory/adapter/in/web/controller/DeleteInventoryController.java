package com.catchcatch.main.domains.inventory.adapter.in.web.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.catchcatch.main.domains.inventory.adapter.in.web.message.SuccessDeleteInventoryMessage;
import com.catchcatch.main.domains.inventory.application.port.in.DeleteInventoryUseCase;
import com.catchcatch.main.domains.member.adapter.in.web.message.SuccessCheckNicknameMessage;
import com.catchcatch.main.global.util.HttpResponseUtil;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/main/inventories/items")
@RequiredArgsConstructor
public class DeleteInventoryController {

	private final DeleteInventoryUseCase deleteInventoryUseCase;
	private final HttpResponseUtil responseUtil;

	@DeleteMapping("/{inventory-id}/member/{member-email}")
	public ResponseEntity<?> deleteInventory(@PathVariable("inventory-id") Long inventoryId , @PathVariable("member-email") String memberEmail) {
		deleteInventoryUseCase.deleteInventory(inventoryId, memberEmail);

		ResponseEntity<?> response = responseUtil.createSuccessResponse(
			SuccessDeleteInventoryMessage.SUCCESS_DELETE_INVENTORY.getMessage(),
			SuccessDeleteInventoryMessage.SUCCESS_DELETE_INVENTORY,
			200
		);

		return response;
	}
}

