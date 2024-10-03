package com.catchcatch.main.domains.inventory.domain;

import com.catchcatch.main.domains.inventory.adapter.out.persistence.InventoryEntity;
import com.catchcatch.main.domains.item.adapter.out.persistence.ItemEntity;
import com.catchcatch.main.domains.item.domain.Item;
import com.catchcatch.main.domains.member.adapter.out.persistence.MemberEntity;
import com.catchcatch.main.domains.member.domain.Member;

import lombok.Builder;
import lombok.Getter;

@Getter
public class Inventory {

	private Long id;
	private Member member;
	private Item item;
	private Integer durability;
	private Boolean isEquipped;

	@Builder
	public Inventory(Long id, Member member, Item item, Integer durability, Boolean isEquipped) {
		this.id = id;
		this.member = member;
		this.item = item;
		this.durability = durability;
		this.isEquipped = isEquipped;
	}

	public static Inventory fromInventoryEntity(InventoryEntity inventoryEntity) {
		return Inventory.builder()
			.id(inventoryEntity.getId())
			.member(Member.fromMemberEntity(inventoryEntity.getMember()))
			.item(Item.fromEntity(inventoryEntity.getItem()))
			.durability(inventoryEntity.getDurability())
			.isEquipped(inventoryEntity.getIsEquipped())
			.build();
	}

	public void unEquipInventory() {
		this.isEquipped = false;
	}

	public void equipInventory() {
		this.isEquipped = true;
	}

	public void decreaseDurability(){
		this.durability -= 1;
	}
}
