package com.catchcatch.main.domains.inventory.adapter.in.web.controller;

import com.catchcatch.main.domains.item.domain.Item;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.catchcatch.main.domains.inventory.application.port.in.SaveInventoryUseCase;
import com.catchcatch.main.global.util.HttpResponseUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/main/inventories/items")
@RequiredArgsConstructor
@Slf4j(topic = "main")
public class SaveInventoryController {

	private final SaveInventoryUseCase saveInventoryUseCase;
	private final HttpResponseUtil responseUtil;

	@PostMapping
	public ResponseEntity<?> saveInventory(@PathVariable("inventoryId") Long inventoryId , @PathVariable("member-email") String memberEmail) {
		log.info("BE/MAIN - request memberEmail : {}", memberEmail);
		Item item = saveInventoryUseCase.saveInventory(memberEmail, inventoryId);

		ResponseEntity<?> response = responseUtil.createSuccessResponse(
			1,
			item,
			200
		);

		log.info("BE/MAIN - response : {}", response);

		return response;
	}
}

