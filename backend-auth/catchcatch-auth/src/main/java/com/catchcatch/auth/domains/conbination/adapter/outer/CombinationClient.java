package com.catchcatch.auth.domains.conbination.adapter.outer;

import java.util.Map;

import org.springframework.cloud.openfeign.FeignClient;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@FeignClient(name = "CombinationClient", url = "https://j11b106.p.ssafy.io/api/main/combinations")
public interface CombinationClient {

	@PostMapping(value = "/{memberEmail}/{inventoryId1}/{inventoryId2}", consumes = "application/json")
	ResponseEntity<Map<String, Object>> combinationInventory(@PathVariable("memberEmail") String memberEmail, @PathVariable("inventoryId1") Long inventoryId1, @PathVariable("inventoryId2") Long inventoryId2);
}
