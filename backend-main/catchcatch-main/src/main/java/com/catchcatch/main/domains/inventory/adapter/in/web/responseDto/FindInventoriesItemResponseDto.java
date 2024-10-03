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
	Long id,
	String name,
	Season season,
	Type type,
	Effect skill,
	Description description,
	Grade grade,
	String image
) {

	public static FindInventoriesItemResponseDto fromItem(Item item) {
		return FindInventoriesItemResponseDto.builder()
			.id(item.getId())
			.name(item.getName())
			.season(item.getSeason())
			.type(item.getType())
			.skill(item.getEffect())
			.description(item.getDescription())
			.grade(item.getGrade())
			.image(item.getImage())
			.build();
	}
}
