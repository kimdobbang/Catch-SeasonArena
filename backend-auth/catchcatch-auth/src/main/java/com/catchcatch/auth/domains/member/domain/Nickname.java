package com.catchcatch.auth.domains.member.domain;

import lombok.Getter;

@Getter
public class Nickname {

    private String nickname;

    public Nickname(String email) {
        this.nickname = splitEmail(email);
    }

    private String splitEmail(String email) {
        return email.split("@")[0];
    }
}
