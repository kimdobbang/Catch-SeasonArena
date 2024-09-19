package com.catchcatch.auth.domains.member.domain;

import lombok.Builder;
import lombok.Getter;

@Getter
public class Member {

    private Long memberId;
    private String email;
    private String password;
    private Role role;
    private String nickname;
    private int rating;
    private String avatar;
    private boolean isDeleted;

    @Builder
    private Member(Long memberId, String email, String password, Role role, String nickname, int rating, String avatar, boolean isDeleted) {
        this.memberId = memberId;
        this.email = email;
        this.password = password;
        this.role = role;
        this.nickname = nickname;
        this.rating = rating;
        this.avatar = avatar;
        this.isDeleted = isDeleted;
    }

    public static Member createMember(Long memberId, String email, String password, Role role, String nickname, int rating, String avatar, boolean isDeleted) {
        return Member.builder()
                .memberId(memberId)
                .email(email)
                .password(password)
                .role(role)
                .nickname(nickname)
                .rating(rating)
                .avatar(avatar)
                .isDeleted(isDeleted)
                .build();
    }
}
