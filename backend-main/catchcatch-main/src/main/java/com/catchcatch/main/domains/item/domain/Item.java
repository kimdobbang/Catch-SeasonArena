package com.catchcatch.main.domains.item.domain;

import com.catchcatch.main.domains.item.adapter.out.persistence.*;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class Item {
	
    private Long id;
    private String name;
    private Season season;
    private Type type;
    private Effect effect;
    private Description description;
    private String image;
    private Grade grade;

    public static Item fromEntity(ItemEntity entity) {
        return Item.builder()
            .id(entity.getId())
            .name(entity.getName())
            .season(entity.getSeason())
            .type(entity.getType())
            .effect(entity.getEffect())
            .description(entity.getDescription())
            .image(entity.getImage())
            .grade(entity.getGrade())
            .build();
    }
}
