package com.catchcatch.auth.domains.rank.adapter.out.kafka;

import org.springframework.stereotype.Component;

import com.catchcatch.auth.domains.member.domain.Member;
import com.catchcatch.auth.domains.rank.application.port.out.SendRankKafkaPort;
import com.catchcatch.auth.global.kafka.producer.KafkaProducer;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class KafkaAdapter implements SendRankKafkaPort {

	private final KafkaProducer kafkaProducer;

	@Override
	public void initRank(Member member) {
		KafkaRankEntity kafkaRankEntity = KafkaRankEntity.createKafkaRankEntity(member);
		kafkaProducer.sendMessage(kafkaRankEntity);
	}
}
