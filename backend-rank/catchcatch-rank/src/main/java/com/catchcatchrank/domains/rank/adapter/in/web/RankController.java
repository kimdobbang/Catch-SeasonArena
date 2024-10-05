package com.catchcatchrank.domains.rank.adapter.in.web;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.catchcatchrank.domains.rank.application.port.in.GetMyTierRankingUseCase;
import com.catchcatchrank.domains.rank.domain.MyTierRanking;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/rank/rankings")
@Slf4j(topic = "rank")
public class RankController {

	private final GetMyTierRankingUseCase getMyRankingService;

	@GetMapping("/tier/{nickname}/{start}")
	public ResponseEntity<?> bestRank(@PathVariable String nickname, @PathVariable Integer start) {

		MyTierRanking myRanking = getMyRankingService.getMyTierRanking(nickname, start);
		return ResponseEntity.ok().body(myRanking);
	}
}
