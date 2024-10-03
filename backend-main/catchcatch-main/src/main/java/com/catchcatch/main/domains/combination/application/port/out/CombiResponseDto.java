package com.catchcatch.main.domains.combination.application.port.out;

import com.catchcatch.main.domains.item.domain.Item;
import lombok.AllArgsConstructor;
import lombok.Builder;

@Builder
@AllArgsConstructor
public class CombiResponseDto {
    private String message; // 성공/실패 메시지
    private Item item;
}
