package com.catchcatch.auth.domains.dictionary.adapter.out;

import java.util.Map;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "FindDictionariesClient", url = "https://j11b106.p.ssafy.io/api/main/dictionaries")
public interface FindDictionariesClient {


	@GetMapping(value = "/{memberEmail}", consumes = "application/json")
	ResponseEntity<Map<String, Object>> findDictionaries(@PathVariable("memberEmail") String memberEmail);
}
