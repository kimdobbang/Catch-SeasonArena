package com.catchcatch.main.domains.combination.application.port.out;

import com.catchcatch.main.domains.item.domain.Item;
import lombok.Builder;

@Builder
public record CombiResponseDto(String message, Item item) {
}
