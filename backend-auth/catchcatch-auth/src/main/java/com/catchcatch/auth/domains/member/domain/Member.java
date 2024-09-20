package com.catchcatch.auth.domains.member.domain;

import com.catchcatch.auth.domains.member.adapter.in.web.requestdto.SignUpRequestDto;
import com.catchcatch.auth.domains.member.adapter.out.persistence.MemberEntity;
import lombok.Builder;
import lombok.Getter;

@Getter
public class Member {

    private String email;
    private String password;
    private Role role;
    private String nickname;
    private Integer rating;
    private String avatar;
    private Boolean isDeleted;

    @Builder
    private Member(String email, String password, Role role, String nickname, Integer rating, String avatar, Boolean isDeleted) {
        this.email = email;
        this.password = password;
        this.role = role;
        this.nickname = nickname;
        this.rating = rating;
        this.avatar = avatar;
        this.isDeleted = isDeleted;
    }

    public static Member createMemberMapper(MemberEntity memberEntity) {
        return Member.builder()
                .email(memberEntity.getEmail())
                .password(memberEntity.getPassword())
                .role(memberEntity.getRole())
                .nickname(memberEntity.getNickname())
                .rating(memberEntity.getRating())
                .avatar(memberEntity.getAvatar())
                .isDeleted(memberEntity.getIsDeleted())
                .build();
    }

    public static Member createSignUpMember(SignUpRequestDto signUpRequestDto) {
        return Member.builder()
                .email(signUpRequestDto.email())
                .password(signUpRequestDto.password())
                .role(Role.ROLE_USER)
                .nickname(signUpRequestDto.email())
                .rating(0)
                .avatar("기본 아바타")
                .isDeleted(false)
                .build();
    }
}
