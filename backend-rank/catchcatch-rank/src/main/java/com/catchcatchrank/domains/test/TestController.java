package com.catchcatchrank.domains.test;

import java.util.List;
import java.util.Random;
import java.util.Set;

import com.catchcatchrank.domains.member.adapter.out.persistence.MemberEntity;
import com.catchcatchrank.domains.member.domain.Member;
import com.catchcatchrank.domains.rank.adapter.out.redis.RankRepositoryAdapter;
import com.catchcatchrank.domains.rank.domain.Rank;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.catchcatchrank.domains.member.adapter.out.persistence.MemberRepository;
import com.catchcatchrank.domains.rank.adapter.in.kafka.KafkaUpdateRankEntity;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/rank")
@RequiredArgsConstructor
@Slf4j(topic = "elk")
public class TestController {

	private final KafkaProducer kafkaProducer;
	private final MemberRepository memberRepository;
	private final RedisTemplate<String, Object> redisTemplate;
	private final RankRepositoryAdapter rankRepositoryAdapter;
	@GetMapping
	public ResponseEntity<?> test() {
		Random random = new Random();

		// nickname을 1에서 100000 사이의 무작위 값으로 설정

		String nickname = String.valueOf(random.nextInt(100) + 1);

		// kill을 0 또는 1로 설정
		Integer kill = random.nextInt(2);  // 0 또는 1

		// time은 60으로 고정
		Integer time = 60;

		// rank는 100으로 고정
		Integer rank = 100;

		// rating을 -10에서 10 사이의 무작위 값으로 설정
		Integer rating = random.nextInt(21) - 10;  // -10에서 10

		KafkaUpdateRankEntity kafkaUpdateRankEntity = new KafkaUpdateRankEntity(nickname, kill, time, rank, rating);
		kafkaProducer.sendMessage(kafkaUpdateRankEntity);

		return ResponseEntity.ok().build();
	}


	@GetMapping("/db")
	public ResponseEntity<?> testDb() {
		log.info("test");
		return ResponseEntity.ok().body(memberRepository.findTop5ByOrderByRatingDesc());
	}

	@GetMapping("/init")
	public ResponseEntity<?> init() {
		redisTemplate.delete("ranking_all");

		// 티어별 랭킹 삭제
		redisTemplate.delete("ranking_bronze");
		redisTemplate.delete("ranking_silver");
		redisTemplate.delete("ranking_gold");
		redisTemplate.delete("ranking_platinum");
		redisTemplate.delete("ranking_dia");
		redisTemplate.delete("ranking_ruby");

		// 모든 사용자에 대한 티어 정보 삭제
		Set<String> userTierKeys = redisTemplate.keys("*ranking");  // 모든 사용자 티어 정보 키 찾기
		if (userTierKeys != null && !userTierKeys.isEmpty()) {
			redisTemplate.delete(userTierKeys);  // 티어 정보 삭제
		}
		// 모든 멤버 가져오기
		List<MemberEntity> allMembers = memberRepository.findAll();

		// 각 멤버에 대해 랭킹 초기화
		for (MemberEntity member : allMembers) {
			// 멤버의 이메일과 초기 레이팅 값으로 Rank 객체 생성
			Rank rank = new Rank(member.getEmail(), member.getRating());

			// 사용자 점수 및 티어 저장
			rankRepositoryAdapter.saveUserScore(rank);

			// 전체 랭킹 저장
			rankRepositoryAdapter.saveAllRank(rank);
		}

		log.info("All members' ranks have been initialized.");
		return ResponseEntity.ok("Ranks initialized for all members.");
	}
}
