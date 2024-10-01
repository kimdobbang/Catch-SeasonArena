package com.catchcatch.auth.domains.inventory.adapter.in;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.catchcatch.auth.domains.inventory.adapter.out.FindInventoriesClient;
import com.catchcatch.auth.domains.member.domain.Member;
import com.catchcatch.auth.global.security.auth.PrincipalDetails;
import com.fasterxml.jackson.databind.ObjectMapper;

import feign.FeignException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/auth/inventories/items")
@Slf4j(topic = "auth")
@RequiredArgsConstructor
public class FindInventoriesController {

	private final FindInventoriesClient findInventoriesClient;
	private final ObjectMapper objectMapper;

	@GetMapping
	public ResponseEntity<?> findInventories(Authentication authentication) {
		Member member = ((PrincipalDetails) authentication.getPrincipal()).getMember();
		try {
			ResponseEntity<Map<String, Object>> response = findInventoriesClient.findInventories(member.getEmail());
			return ResponseEntity.ok().body(response.getBody());

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
