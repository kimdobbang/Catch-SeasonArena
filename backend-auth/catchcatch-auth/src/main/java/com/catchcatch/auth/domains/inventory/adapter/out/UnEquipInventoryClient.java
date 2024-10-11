package com.catchcatch.auth.domains.inventory.adapter.out;

import java.util.Map;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

@FeignClient(name = "UnEquipInventoryClient", url = "https://j11b106.p.ssafy.io/api/main/inventories/items/unequipment")

public interface UnEquipInventoryClient {

	@PutMapping(value = "/{inventory_id}/member/{member_email}", consumes = "application/json")
	ResponseEntity<Map<String, Object>> equipInventory(@PathVariable("inventory_id") Long inventoryId, @PathVariable("member_email") String memberEmail);
}
