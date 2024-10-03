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
    private int count;

    @Builder
    public Dictionaries(Long id, Long userId, Long itemId, int count) {
        this.id = id;
        this.userId = userId;
        this.itemId = itemId;
        this.count = count;
    }

    public static Dictionaries fromEntity(DictionariesEntity entity) {
        return Dictionaries.builder()
                .userId(entity.getMember().getMemberId())
                .itemId(entity.getItemId())
                .count(entity.getCount())
                .build();
    }

    public void update() {
        this.count++;
    }
}
