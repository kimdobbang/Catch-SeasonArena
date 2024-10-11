package com.catchcatch.main.domains.dictionary.domain;

import com.catchcatch.main.domains.dictionary.adapter.out.persistence.DictionariesEntity;
import com.catchcatch.main.domains.member.adapter.out.persistence.MemberEntity;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class Dictionaries {

    private Long id;
    private Long userId;
    private Long itemId;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private int count;

    @Builder
    public Dictionaries(Long id, Long userId, Long itemId, int count, LocalDateTime createdAt, LocalDateTime modifiedAt) {
        this.id = id;
        this.userId = userId;
        this.itemId = itemId;
        this.count = count;
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;
    }

    public static Dictionaries fromEntity(DictionariesEntity entity) {
        return Dictionaries.builder()
                .id(entity.getId())
                .userId(entity.getMember().getMemberId())
                .itemId(entity.getItemId())
                .count(entity.getCount())
                .createdAt(entity.getCreateDate())
                .modifiedAt(entity.getModifiedDate())
                .build();
    }
}
