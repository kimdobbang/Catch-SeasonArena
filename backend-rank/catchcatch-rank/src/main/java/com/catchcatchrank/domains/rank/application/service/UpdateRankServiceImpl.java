package com.catchcatchrank.domains.rank.application.service;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import com.catchcatchrank.domains.rank.adapter.out.kafka.KafkaUpdateRankEntity;
import com.catchcatchrank.domains.rank.application.port.in.UpdateRankService;
import com.catchcatchrank.domains.rank.application.port.out.GetRatePort;
import com.catchcatchrank.domains.rank.application.port.out.UpdateTierPort;
import com.catchcatchrank.domains.rank.domain.Rank;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class UpdateRankServiceImpl implements UpdateRankService {

	private final UpdateTierPort updateTierPort;
	private final GetRatePort getRatePort;
	private final ApplicationEventPublisher eventPublisher;

	@Override
	public void updateRank(KafkaUpdateRankEntity kafkaUpdateRankEntity) {
		log.info("BE-RANK :  userNickname {}", kafkaUpdateRankEntity.getNickname());
		log.info("BE-RANK :  kill {}", kafkaUpdateRankEntity.getKill());
		Integer score = calculateScore(kafkaUpdateRankEntity.getKill(), kafkaUpdateRankEntity.getTime(),
			kafkaUpdateRankEntity.getRank());
		Integer preRate = getRatePort.getRate(kafkaUpdateRankEntity.getNickname());
		Integer calculateRate = preRate + score;

		if (calculateRate < 0) {
			calculateRate = 0;
		}
		log.info("BE-RANK : score 계산 {}", score);
		log.info("BE-RANK : 이전 레이트 {}", preRate);
		log.info("BE-RANK : 계산된 레이트 {}", calculateRate);
		log.info("BE-RANK : nickName {}", kafkaUpdateRankEntity.getNickname());

		Rank rank = new Rank(kafkaUpdateRankEntity.getNickname(), calculateRate);
		updateTierPort.updateRank(rank);
		eventPublisher.publishEvent(rank);
	}

	private Integer calculateScore(Integer kill, Integer time, Integer rank) {
		Integer score = 0;

		score += kill * 100;
		score += 5 - (rank - 1);

		return score;
	}
}
