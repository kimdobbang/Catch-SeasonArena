package com.catchcatch.main.domains.inventory.adapter.in.web.responseDto;

import com.catchcatch.main.domains.inventory.domain.Inventory;
import com.catchcatch.main.domains.item.adapter.out.persistence.ItemEntity;

import lombok.Builder;

@Builder
public record FindInventoriesResponseDto(
	Long id,
	FindInventoriesItemResponseDto findInventoriesItemResponseDto,
	Integer durability,
	Boolean isEquipped
) {

	public static FindInventoriesResponseDto createFindInventoriesResponseDto(Inventory inventory) {
		return FindInventoriesResponseDto.builder()
			.id(inventory.getId())
			.findInventoriesItemResponseDto(FindInventoriesItemResponseDto.fromItem(inventory.getItem()))
			.durability(inventory.getDurability())
			.isEquipped(inventory.getIsEquipped())
			.build();
	}
}
