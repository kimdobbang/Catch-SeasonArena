package com.catchcatchrank.domains.rank.adapter.in.kafka;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class KafkaRankEntity {

	private String email;
	private Integer rank;

}
