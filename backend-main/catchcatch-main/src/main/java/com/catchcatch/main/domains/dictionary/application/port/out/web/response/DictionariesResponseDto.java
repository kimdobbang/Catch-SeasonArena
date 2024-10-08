package com.catchcatch.main.domains.dictionary.application.port.out.web.response;

import com.catchcatch.main.domains.item.domain.Item;
import lombok.Builder;

import java.time.LocalDateTime;
@Builder
public record DictionariesResponseDto(
        ItemDto item,
        LocalDateTime createdAt,
        LocalDateTime modifiedAt,
        int count,
        boolean isCollect
) {
}
