package com.catchcatch.main.domains.inventory.adapter.in.web.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.catchcatch.main.domains.inventory.adapter.in.web.responseDto.FindInventoriesResponseDto;
import com.catchcatch.main.domains.inventory.application.port.in.FindInventoriesUseCase;
import com.catchcatch.main.domains.inventory.domain.Inventory;
import com.catchcatch.main.global.util.HttpResponseUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/main/inventories/items")
@RequiredArgsConstructor
@Slf4j
public class FindInventoriesController {

	private final FindInventoriesUseCase findInventoriesUseCase;
	private final HttpResponseUtil responseUtil;

	@GetMapping("/{email}")
	public ResponseEntity<?> findInventories(@PathVariable("email") String email) {
		List <Inventory> inventories =  findInventoriesUseCase.findInventories(email);
		List<FindInventoriesResponseDto> inventoriesResponseDtos = new ArrayList<>();
		for (Inventory inventory : inventories) {
			FindInventoriesResponseDto findInventoriesResponseDto = FindInventoriesResponseDto.createFindInventoriesResponseDto(inventory);
			inventoriesResponseDtos.add(findInventoriesResponseDto);
		}
		return responseUtil.createResponse(inventoriesResponseDtos);
	}

}
