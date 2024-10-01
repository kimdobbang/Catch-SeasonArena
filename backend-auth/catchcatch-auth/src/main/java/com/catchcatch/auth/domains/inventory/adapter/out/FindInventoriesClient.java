package com.catchcatch.auth.domains.inventory.adapter.out;

import java.util.Map;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "FindInventoriesClient", url = "http://localhost:8081/api/main/inventories/items")
public interface FindInventoriesClient {

	@GetMapping(value = "/{memberEmail}", consumes = "application/json")
	ResponseEntity<Map<String, Object>> findInventories(@PathVariable("memberEmail") String memberEmail);
}
