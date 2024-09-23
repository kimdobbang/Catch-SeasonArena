package com.catchcatch.auth.domains.member.domain;

import com.catchcatch.auth.domains.member.adapter.in.web.requestdto.SignUpRequestDto;
import com.catchcatch.auth.domains.member.adapter.out.persistence.MemberEntity;
import lombok.Builder;
import lombok.Getter;

@Getter
public class Member {

    private Long memberId;
    private String email;
    private String password;
    private Role role;
    private String nickname;
    private Integer rating;
    private String avatar;
    private Boolean isDeleted;

    @Builder
    private Member(String email, String password, Role role, String nickname) {
        this.email = email;
        this.password = password;
        this.role = role;
        this.nickname = nickname;
        this.rating = 0;
        this.avatar = "기본 아바타";
        this.isDeleted = false;
    }

    public static Member createMemberToEntity(MemberEntity memberEntity) {
        return Member.builder()
                .email(memberEntity.getEmail())
                .password(memberEntity.getPassword())
                .role(memberEntity.getRole())
                .nickname(memberEntity.getNickname())
                .build();
    }

    public static Member createSignUpMember(SignUpRequestDto signUpRequestDto) {
        return Member.builder()
                .email(signUpRequestDto.email())
                .password(signUpRequestDto.password())
                .role(Role.ROLE_USER)
                .nickname(signUpRequestDto.email().split("@")[0])
                .build();
    }

    public void changeEncodePassword(String encodePassword) {
        this.password = encodePassword;
    }
}
