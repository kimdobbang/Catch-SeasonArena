package com.catchcatch.main.domains.item.adapter.out.persistence;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public enum Type {

	WEAPON,
	ACTIVE,
	PASSIVE,
}
