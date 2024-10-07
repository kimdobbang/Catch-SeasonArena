package com.catchcatchrank.domains.rank.adapter.in.web;

import com.catchcatchrank.domains.rank.application.port.in.GetAllRankingUseCase;
import com.catchcatchrank.domains.rank.domain.AllRanking;
import com.catchcatchrank.domains.rank.domain.MyAllRanking;
import com.catchcatchrank.domains.rank.domain.TierRanking;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.catchcatchrank.domains.rank.application.port.in.GetTierRankingUseCase;
import com.catchcatchrank.domains.rank.domain.MyTierRanking;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/rank/rankings")
@Slf4j(topic = "rank")
public class RankController {

	private final GetTierRankingUseCase getRankingService;
	private final GetAllRankingUseCase getAllRankingUseCase;

	@GetMapping("/tier/{email}/{page}")
	public ResponseEntity<?> findTierRanking(@PathVariable String email, @PathVariable Integer page) {
		log.info("BE-RANK :  email {}, page {}", email, page);

		if(page == 0){
			MyTierRanking myRanking = getRankingService.getMyTierRanking(email, page);
			return ResponseEntity.ok().body(myRanking);
		}

		TierRanking tierRanking = getRankingService.getTierRanking(email, page);
		return ResponseEntity.ok().body(tierRanking);
	}

	@GetMapping("/all/{email}/{page}")
	public ResponseEntity<?> findAllRanking(@PathVariable String email, @PathVariable Integer page) {
		log.info("BE-RANK :  email {}, page {}", email, page);

		if(page == 0){
			MyAllRanking myRanking = getAllRankingUseCase.getMyAllRanking(email, page);
			return ResponseEntity.ok().body(myRanking);
		}

		AllRanking allRanking = getAllRankingUseCase.getAllRanking(page);
		return ResponseEntity.ok().body(allRanking);
	}
}
