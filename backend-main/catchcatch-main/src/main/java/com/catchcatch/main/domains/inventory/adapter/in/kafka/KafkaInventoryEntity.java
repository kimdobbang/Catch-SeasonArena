package com.catchcatch.main.domains.inventory.adapter.in.kafka;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class KafkaInventoryEntity {
	private String nickname;
}
