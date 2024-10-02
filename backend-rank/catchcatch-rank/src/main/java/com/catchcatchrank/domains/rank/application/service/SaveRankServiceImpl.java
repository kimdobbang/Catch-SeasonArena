package com.catchcatchrank.domains.rank.application.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.catchcatchrank.domains.rank.adapter.out.kafka.KafkaRankEntity;
import com.catchcatchrank.domains.rank.adapter.out.redis.RankRepositoryAdapter;
import com.catchcatchrank.domains.rank.application.port.in.SaveRankService;
import com.catchcatchrank.domains.rank.application.port.out.SaveRankPort;
import com.catchcatchrank.domains.rank.domain.Rank;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j(topic = "rank")
public class SaveRankServiceImpl implements SaveRankService {

	private final SaveRankPort saveRankPort;

	@Transactional
	@Override
	public void saveRank(KafkaRankEntity kafkaRankEntity) {
		Rank rank = KafkaRankEntity.rankEntityToRank(kafkaRankEntity);
		saveRankPort.saveUserScore(rank);
	}
}
