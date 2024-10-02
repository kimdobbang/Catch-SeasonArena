package com.catchcatch.main.domains.dictionary.domain;

import com.catchcatch.main.domains.dictionary.adapter.out.persistence.DictionariesEntity;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class Dictionaries {

    private Long userId;
    private Long itemId;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private int count;

    @Builder
    public Dictionaries(Long userId, Long itemId, LocalDateTime createdAt, LocalDateTime modifiedAt, int count) {
        this.userId = userId;
        this.itemId = itemId;
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;
        this.count = count;
    }

    public static Dictionaries fromEntity(DictionariesEntity entity) {
        return Dictionaries.builder()
                .userId(entity.getMember().getMemberId())
                .itemId(entity.getItemId())
                .createdAt(entity.getCreatedAt())
                .modifiedAt(entity.getModifiedAt())
                .count(entity.getCount())
                .build();
    }
}
