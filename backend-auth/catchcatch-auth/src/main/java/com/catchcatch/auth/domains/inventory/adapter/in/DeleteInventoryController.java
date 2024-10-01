package com.catchcatch.auth.domains.inventory.adapter.in;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.catchcatch.auth.domains.inventory.adapter.out.DeleteInventoryClient;
import com.catchcatch.auth.domains.member.domain.Member;
import com.catchcatch.auth.global.security.auth.PrincipalDetails;
import com.catchcatch.auth.global.util.HttpResponseUtil;
import com.fasterxml.jackson.databind.ObjectMapper;

import feign.FeignException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/auth/inventories/items")
@Slf4j(topic = "auth")
@RequiredArgsConstructor
public class DeleteInventoryController {

	private final DeleteInventoryClient deleteInventoryClient;
	private final ObjectMapper objectMapper;

	@DeleteMapping("/{inventory-id}")
	public ResponseEntity<?> delete(@PathVariable("inventory-id") Long inventoryId, Authentication authentication) {
		Member member = ((PrincipalDetails)authentication.getPrincipal()).getMember();

		try {
			Map<String, Object> response = deleteInventoryClient.deleteMember(inventoryId, member.getEmail()).getBody();
			log.info("BE/MAIN - delete inventory : {}", response);
			return ResponseEntity.ok().body(response);
		}catch (FeignException e) {
			try {
				String errorContent = e.contentUTF8();
				Map<String, Object> errorResponse = objectMapper.readValue(errorContent, Map.class);
				log.error("BE/MAIN - delete inventory error: {}", errorResponse);
				return ResponseEntity.status(e.status()).body(errorResponse);
			} catch (Exception jsonException) {
				log.error("BE/MAIN - delete inventory error: {}", jsonException.getMessage());
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("서버 에러.");
			}
		}

	}
}
