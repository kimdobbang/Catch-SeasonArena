package com.catchcatchrank.domains.member.adapter.out.persistence;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public enum Role {

	ROLE_USER("ROLE_USER"),
	ROLE_ADMIN("ROLE_ADMIN");

	private String role;
}
