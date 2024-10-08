package com.catchcatch.main.domains.dictionary.application.port.out.web.response;

import com.catchcatch.main.domains.item.domain.Item;
import lombok.Builder;

@Builder
public record ItemDto(
        Long id,
        String name,
        String season,
        String type,
        String effect,
        String description,
        String image,
        String grade
) {
    public static ItemDto fromItem(Item item) {
        return ItemDto.builder()
                .id(item.getId())
                .name(item.getName())
                .season(item.getSeason().toString())
                .type(item.getType().toString())
                .effect(item.getEffect().toString())
                .description(item.getDescription().toString())
                .image(item.getImage())
                .grade(item.getGrade().toString())
                .build();
    }
}
