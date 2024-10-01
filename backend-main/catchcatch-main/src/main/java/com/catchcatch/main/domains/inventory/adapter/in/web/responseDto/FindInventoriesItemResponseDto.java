package com.catchcatch.main.domains.inventory.adapter.in.web.responseDto;

import com.catchcatch.main.domains.item.adapter.out.persistence.Description;
import com.catchcatch.main.domains.item.adapter.out.persistence.ItemEntity;
import com.catchcatch.main.domains.item.adapter.out.persistence.Season;
import com.catchcatch.main.domains.item.adapter.out.persistence.Type;
import com.catchcatch.main.domains.item.adapter.out.persistence.Effect;

import lombok.Builder;

@Builder
public record FindInventoriesItemResponseDto(
	Long id,
	String name,
	Season season,
	Type type,
	Effect effect,
	Description description,
	String image
) {

	public static FindInventoriesItemResponseDto fromItemEntity(ItemEntity itemEntity) {
		return FindInventoriesItemResponseDto.builder()
			.id(itemEntity.getId())
			.name(itemEntity.getName())
			.season(itemEntity.getSeason())
			.type(itemEntity.getType())
			.effect(itemEntity.getEffect())
			.description(itemEntity.getDescription())
			.image(itemEntity.getImage())
			.build();
	}
}
