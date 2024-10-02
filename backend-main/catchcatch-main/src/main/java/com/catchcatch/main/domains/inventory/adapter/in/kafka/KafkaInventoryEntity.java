package com.catchcatch.main.domains.inventory.adapter.in.kafka;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class KafkaInventoryEntity {
	private String nickname;
}
