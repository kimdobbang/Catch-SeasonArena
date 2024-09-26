package com.catchcatchrank.domains.test;

import java.util.Random;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.catchcatchrank.domains.member.adapter.out.persistence.MemberRepository;
import com.catchcatchrank.domains.rank.adapter.out.kafka.KafkaUpdateRankEntity;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/rank")
@RequiredArgsConstructor
public class TestController {

	private final KafkaProducer kafkaProducer;
	private final MemberRepository memberRepository;

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
		return ResponseEntity.ok().body(memberRepository.findTop5ByOrderByRatingDesc());
	}

}
