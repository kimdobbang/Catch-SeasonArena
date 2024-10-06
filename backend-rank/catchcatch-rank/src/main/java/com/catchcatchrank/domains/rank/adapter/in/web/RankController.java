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

	@GetMapping("/tier/{nickname}/{page}")
	public ResponseEntity<?> findTierRanking(@PathVariable String nickname, @PathVariable Integer page) {
		log.info("BE-RANK :  nickname {}, page {}", nickname, page);

		if(page == 0){
			MyTierRanking myRanking = getRankingService.getMyTierRanking(nickname, page);
			return ResponseEntity.ok().body(myRanking);
		}

		TierRanking tierRanking = getRankingService.getTierRanking(nickname, page);
		return ResponseEntity.ok().body(tierRanking);
	}

	@GetMapping("/all/{nickname}/{page}")
	public ResponseEntity<?> findAllRanking(@PathVariable String nickname, @PathVariable Integer page) {
		log.info("BE-RANK :  nickname {}, page {}", nickname, page);

		if(page == 0){
			MyAllRanking myRanking = getAllRankingUseCase.getMyAllRanking(nickname, page);
			return ResponseEntity.ok().body(myRanking);
		}

		AllRanking allRanking = getAllRankingUseCase.getAllRanking(page);
		return ResponseEntity.ok().body(allRanking);
	}
}
