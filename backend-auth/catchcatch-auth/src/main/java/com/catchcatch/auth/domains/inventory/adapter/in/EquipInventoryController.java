package com.catchcatch.auth.domains.inventory.adapter.in;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.catchcatch.auth.domains.inventory.adapter.out.EquipInventoryClient;
import com.catchcatch.auth.domains.member.domain.Member;
import com.catchcatch.auth.global.security.auth.PrincipalDetails;
import com.fasterxml.jackson.databind.ObjectMapper;

import feign.FeignException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/auth/inventories/items/equipment")
@Slf4j(topic = "auth")
@RequiredArgsConstructor
public class EquipInventoryController {

	private final EquipInventoryClient equipInventoryClient;
	private final ObjectMapper objectMapper;

	@PutMapping("/{inventory_id}")
	public ResponseEntity<?> equipInventory(@PathVariable("inventory_id") Long inventoryId,
		Authentication authentication) {
		Member member = ((PrincipalDetails)authentication.getPrincipal()).getMember();
		try {
			ResponseEntity<Map<String, Object>> response = equipInventoryClient.equipInventory(inventoryId,
				member.getEmail());
			return ResponseEntity.ok().body(response.getBody());
		} catch (FeignException e) {
			try {
				String errorContent = e.contentUTF8();
				Map<String, Object> errorResponse = objectMapper.readValue(errorContent, Map.class);
				log.error("BE/MAIN -  equipInventory error: {}", errorResponse);
				return ResponseEntity.status(e.status()).body(errorResponse);
			} catch (Exception jsonException) {
				log.error("BE/MAIN - equipInventory error: {}", jsonException.getMessage());
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("서버 에러.");
			}
		}
	}
}
