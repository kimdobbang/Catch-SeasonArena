package com.catchcatch.main.domains.dictionary.application.port.out.web.response;

import com.catchcatch.main.domains.item.domain.Item;
import java.time.LocalDateTime;

public record DictionariesResponseDto(
        Item item,
        LocalDateTime createdAt,
        LocalDateTime modifiedAt,
        int count
) {
}
