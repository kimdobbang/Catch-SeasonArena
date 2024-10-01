package com.catchcatch.main.domains.inventory.adapter.out.persistence;

import com.catchcatch.main.domains.item.adapter.out.persistence.ItemEntity;
import com.catchcatch.main.domains.member.adapter.out.persistence.MemberEntity;
import com.catchcatch.main.global.entity.BaseTimeEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "inventory")
@Getter
public class InventoryEntity extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "member_id")
	private MemberEntity member;

	@ManyToOne
	@JoinColumn(name = "item_id")
	private ItemEntity item;

	@Column(nullable = false)
	private Integer durability;

	@Column(nullable = false)
	private Boolean isEquipped;

	@Builder
	public InventoryEntity(Long id, MemberEntity member, ItemEntity item, Integer durability, Boolean isEquipped) {
		this.id = id;
		this.member = member;
		this.item = item;
		this.durability = durability;
		this.isEquipped = isEquipped;
	}
}