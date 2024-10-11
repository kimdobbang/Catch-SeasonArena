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
    private Member(Long memberId, String email, String password, Role role, String nickname, Integer rating, String avatar, Boolean isDeleted) {
        this.memberId = memberId;
        this.email = email;
        this.password = password;
        this.role = role;
        this.nickname = nickname;
        this.rating = rating;
        this.avatar = avatar;
        this.isDeleted = isDeleted;
    }

    public static Member createMemberToEntity(MemberEntity memberEntity) {
        return Member.builder()
                .memberId(memberEntity.getMemberId())
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
                .rating(500)
                .avatar("1")
                .isDeleted(false)
                .build();
    }

    public void changeEncodePassword(String encodePassword) {
        this.password = encodePassword;
    }
}
