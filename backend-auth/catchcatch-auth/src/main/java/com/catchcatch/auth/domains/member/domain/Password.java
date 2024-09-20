package com.catchcatch.auth.domains.member.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class Password {

    private String password;

    public void changeEncodePassword(String encodePassword) {
        this.password = encodePassword;
    }
}
