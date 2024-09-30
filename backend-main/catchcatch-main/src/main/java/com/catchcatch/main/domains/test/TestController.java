package com.catchcatch.main.domains.test;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
public class TestController {

	@PostMapping("/api/main/inventories/items")
	public ResponseEntity<?> test(@RequestBody TestRequestDto testRequestDto) {
		log.info(testRequestDto.toString());

		return 	ResponseEntity.ok().body("test");
	}
}
