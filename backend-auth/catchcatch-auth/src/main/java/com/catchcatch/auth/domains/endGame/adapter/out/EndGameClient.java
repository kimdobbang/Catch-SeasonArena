package com.catchcatch.auth.domains.endGame.adapter.out;

import java.util.Map;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "EndGameClient", url = "https://j11b106.p.ssafy.io/api/main/endGame")
public interface EndGameClient {

	@GetMapping(value = "/{nickname}", consumes = "application/json")
	ResponseEntity<Map<String, Object>> endGameInfo(@PathVariable("nickname") String nickname);
}