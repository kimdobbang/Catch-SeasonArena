package com.catchcatch.auth.domains.member.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Role {

    ROLE_USER(0),
    ROLE_ADMIN(1);

    private int role;
}
