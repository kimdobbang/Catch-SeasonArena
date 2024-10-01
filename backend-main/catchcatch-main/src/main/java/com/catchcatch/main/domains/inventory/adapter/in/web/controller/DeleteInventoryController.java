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
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/main/inventories/items")
@RequiredArgsConstructor
@Slf4j(topic = "main")
public class DeleteInventoryController {

	private final DeleteInventoryUseCase deleteInventoryUseCase;
	private final HttpResponseUtil responseUtil;

	@DeleteMapping("/{inventory-id}/member/{member-email}")
	public ResponseEntity<?> deleteInventory(@PathVariable("inventory-id") Long inventoryId , @PathVariable("member-email") String memberEmail) {
		log.info("BE/MAIN - request inventoryId : {}", inventoryId);
		log.info("BE/MAIN - request memberEmail : {}", memberEmail);
		deleteInventoryUseCase.deleteInventory(inventoryId, memberEmail);

		ResponseEntity<?> response = responseUtil.createSuccessResponse(
			SuccessDeleteInventoryMessage.SUCCESS_DELETE_INVENTORY.getMessage(),
			SuccessDeleteInventoryMessage.SUCCESS_DELETE_INVENTORY,
			200
		);

		log.info("BE/MAIN - response 인벤토리 삭제 성공 : {}", response);

		return response;
	}
}

