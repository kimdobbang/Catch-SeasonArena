package com.catchcatch.main.domains.inventory.adapter.in.web.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.catchcatch.main.domains.inventory.adapter.in.web.responseDto.FindInventoriesResponseDto;
import com.catchcatch.main.domains.inventory.application.port.in.FindInventoriesUseCase;
import com.catchcatch.main.domains.inventory.domain.Inventory;
import com.catchcatch.main.global.util.HttpResponseUtil;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/main/inventories/items")
@RequiredArgsConstructor
public class FindInventoryController {

	private final FindInventoriesUseCase findInventoriesUseCase;
	private final HttpResponseUtil responseUtil;

	@GetMapping
	public ResponseEntity<?> findInventories(String email) {
		List <Inventory> inventories =  findInventoriesUseCase.findInventories(email);
		List<FindInventoriesResponseDto> inventoriesResponseDtos = new ArrayList<>();
		for (Inventory inventory : inventories) {
			FindInventoriesResponseDto findInventoriesResponseDto = FindInventoriesResponseDto.createFindInventoriesResponseDto(inventory);
			inventoriesResponseDtos.add(findInventoriesResponseDto);
		}
		return responseUtil.createResponse(inventoriesResponseDtos);
	}
}
