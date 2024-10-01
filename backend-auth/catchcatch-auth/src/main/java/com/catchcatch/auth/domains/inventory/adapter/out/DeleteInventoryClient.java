package com.catchcatch.auth.domains.inventory.adapter.out;

import java.util.Map;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.catchcatch.auth.global.util.HttpResponseUtil;

@FeignClient(name = "DeleteInventoryClient", url = "https://j11b106.p.ssafy.io/api/main/inventories/items")
public interface DeleteInventoryClient {

    @DeleteMapping(value = "/{inventoryId}/member/{memberEmail}", consumes = "application/json")
    ResponseEntity<Map<String, Object>> deleteMember(@PathVariable("inventoryId") Long inventoryId, @PathVariable("memberEmail") String memberEmail);
}