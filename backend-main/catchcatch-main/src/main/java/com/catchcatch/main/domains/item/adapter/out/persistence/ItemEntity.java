package com.catchcatch.main.domains.item.adapter.out.persistence;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "item")
public class ItemEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(nullable = false)
	private String name;

	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private Season season;

	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private Type type;

	@Column(nullable = false)
	private String effect;

	@Column(nullable = false)
	private String description;

	@Column(nullable = false)
	private String image;

	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private Grade grade;
}
