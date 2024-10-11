package com.catchcatch.main.domains.inventory.adapter.in.web.responseDto;

import com.catchcatch.main.domains.item.adapter.out.persistence.Description;
import com.catchcatch.main.domains.item.adapter.out.persistence.Grade;
import com.catchcatch.main.domains.item.adapter.out.persistence.ItemEntity;
import com.catchcatch.main.domains.item.adapter.out.persistence.Season;
import com.catchcatch.main.domains.item.adapter.out.persistence.Type;
import com.catchcatch.main.domains.item.adapter.out.persistence.Effect;
import com.catchcatch.main.domains.item.domain.Item;

import lombok.Builder;

@Builder
public record FindInventoriesItemResponseDto(
	Long itemId,
	String name,
	Season season,
	Type type,
	String effect,
	String description,
	Grade grade,
	String image
) {

	public static FindInventoriesItemResponseDto fromItem(Item item) {
		return FindInventoriesItemResponseDto.builder()
			.itemId(item.getId())
			.name(item.getName())
			.season(item.getSeason())
			.type(item.getType())
			.effect(item.getEffect().toString())
			.description(item.getDescription().toString())
			.grade(item.getGrade())
			.image(item.getImage())
			.build();
	}
}
