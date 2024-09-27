package com.catchcatchrank.domains.rank.adapter.in.web;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.catchcatchrank.domains.rank.application.port.in.GetMyRankingService;
import com.catchcatchrank.domains.rank.domain.MyRanking;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/rank/rankings")
@Slf4j
public class RankController {

	private final GetMyRankingService getMyRankingService;

	@GetMapping("/me/{nickname}")
	public ResponseEntity<?> bestRank(@PathVariable String nickname) {

		MyRanking myRanking = getMyRankingService.getMyRanking(nickname);
		return ResponseEntity.ok().body(myRanking);
	}
}
