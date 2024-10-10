package com.catchcatchrank.domains.rank.application.service;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.catchcatchrank.domains.rank.adapter.in.kafka.KafkaUpdateRankEntity;
import com.catchcatchrank.domains.rank.application.port.in.UpdateRankUseCase;
import com.catchcatchrank.domains.rank.application.port.out.GetRatePort;
import com.catchcatchrank.domains.rank.application.port.out.UpdateTierPort;
import com.catchcatchrank.domains.rank.domain.Rank;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j(topic = "rank")
public class UpdateRankUseCaseImpl implements UpdateRankUseCase {

	private final UpdateTierPort updateTierPort;
	private final GetRatePort getRatePort;
	private final ApplicationEventPublisher eventPublisher;

	@Override
	@Transactional
	public void updateRank(KafkaUpdateRankEntity kafkaUpdateRankEntity) {
		log.info("BE-RANK :  userEmail {}", kafkaUpdateRankEntity.getEmail());
		log.info("BE-RANK :  kill {}", kafkaUpdateRankEntity.getKill());
		Integer score = calculateScore(kafkaUpdateRankEntity.getKill(), kafkaUpdateRankEntity.getTime(),
			kafkaUpdateRankEntity.getRank());
		Integer preRate = getRatePort.getRate(kafkaUpdateRankEntity.getEmail());
		Integer calculateRate = preRate + score;

		if (calculateRate < 0) {
			calculateRate = 0;
		}
		log.info("BE-RANK : score 계산 {}", score);
		log.info("BE-RANK : 이전 레이트 {}", preRate);
		log.info("BE-RANK : 계산된 레이트 {}", calculateRate);
		log.info("BE-RANK : email {}", kafkaUpdateRankEntity.getEmail());

		Rank rank = new Rank(kafkaUpdateRankEntity.getEmail(), calculateRate);
		updateTierPort.updateTierRank(rank);
		updateTierPort.updateAllRank(rank);
		eventPublisher.publishEvent(rank);
	}

	private Integer calculateScore(Integer kill, Integer time, Integer rank) {
		Integer score = 0;

		Integer killScore = 0;
		killScore += kill * 2;
		Integer rankScore = 0;
		rankScore += 5 * ( 4 - rank);

		score = killScore + rankScore;
		return score;
	}
}
