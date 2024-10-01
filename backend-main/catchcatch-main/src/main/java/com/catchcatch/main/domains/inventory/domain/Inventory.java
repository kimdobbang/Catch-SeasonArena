package com.catchcatch.main.domains.inventory.domain;

import com.catchcatch.main.domains.inventory.adapter.out.persistence.InventoryEntity;
import com.catchcatch.main.domains.item.adapter.out.persistence.ItemEntity;
import com.catchcatch.main.domains.member.adapter.out.persistence.MemberEntity;

import lombok.Builder;
import lombok.Getter;

@Getter
public class Inventory {

	private Long id;
	private MemberEntity member;
	private ItemEntity item;
	private Integer durability;
	private Boolean isEquipped;

	@Builder
	public Inventory(Long id, MemberEntity member, ItemEntity item, Integer durability, Boolean isEquipped) {
		this.id = id;
		this.member = member;
		this.item = item;
		this.durability = durability;
		this.isEquipped = isEquipped;
	}

	public static Inventory createInventory(InventoryEntity inventoryEntity) {
		return Inventory.builder()
			.id(inventoryEntity.getId())
			.member(inventoryEntity.getMember())
			.item(inventoryEntity.getItem())
			.durability(inventoryEntity.getDurability())
			.isEquipped(inventoryEntity.getIsEquipped())
			.build();
	}

	public static InventoryEntity InventoryToInventoryEntity(Inventory inventory) {
		return InventoryEntity.builder()
			.id(inventory.getId())
			.member(inventory.getMember())
			.item(inventory.getItem())
			.durability(inventory.getDurability())
			.isEquipped(inventory.getIsEquipped())
			.build();
	}
}
