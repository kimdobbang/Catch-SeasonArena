package com.catchcatch.main.domains.item.adapter.out.persistence;

import com.catchcatch.main.domains.item.domain.Item;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Builder
@Table(name = "item")
public class ItemEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String name;

	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private Season season;

	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private Type type;

	@Column(nullable = false)
	private Effect effect;

	@Column(nullable = false)
	private Description description;

	@Column(nullable = false)
	private String image;

	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private Grade grade;

	public static ItemEntity fromItem(Item item) {
		return ItemEntity.builder()
			.id(item.getId())
			.name(item.getName())
			.season(item.getSeason())
			.type(item.getType())
			.effect(item.getEffect())
			.description(item.getDescription())
			.image(item.getImage())
			.grade(item.getGrade())
			.build();
	}
}
