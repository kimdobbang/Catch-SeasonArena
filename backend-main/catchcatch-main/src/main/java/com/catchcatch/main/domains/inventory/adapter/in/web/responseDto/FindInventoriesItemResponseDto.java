package com.catchcatch.main.domains.inventory.adapter.in.web.responseDto;

import com.catchcatch.main.domains.item.adapter.out.persistence.ItemEntity;
import com.catchcatch.main.domains.item.adapter.out.persistence.Season;
import com.catchcatch.main.domains.item.adapter.out.persistence.Type;

import lombok.Builder;

@Builder
public record FindInventoriesItemResponseDto(
	Long id,
	String name,
	Season season,
	Type type,
	String effect,
	String description,
	String image
) {

	public static FindInventoriesItemResponseDto createFindInventoriesItemResponseDto(ItemEntity itemEntity) {
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
