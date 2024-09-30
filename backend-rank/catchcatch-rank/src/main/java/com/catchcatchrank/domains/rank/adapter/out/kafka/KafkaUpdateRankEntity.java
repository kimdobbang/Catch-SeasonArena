package com.catchcatchrank.domains.rank.adapter.out.kafka;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class KafkaUpdateRankEntity {

	private String nickname;
	private Integer kill;
	private Integer time;
	private Integer rank;
	private Integer rating;
}
