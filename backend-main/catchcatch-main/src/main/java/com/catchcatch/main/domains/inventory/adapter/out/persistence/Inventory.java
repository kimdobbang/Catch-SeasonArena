package com.catchcatch.main.domains.inventory.adapter.out.persistence;

import com.catchcatch.main.domains.item.adapter.out.persistence.ItemEntity;
import com.catchcatch.main.domains.member.adapter.out.persistence.MemberEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Inventory {

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
}
