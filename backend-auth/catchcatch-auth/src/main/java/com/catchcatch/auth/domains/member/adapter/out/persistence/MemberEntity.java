package com.catchcatch.auth.domains.member.adapter.out.persistence;

import com.catchcatch.auth.domains.member.domain.Member;
import com.catchcatch.auth.domains.member.domain.Role;
import com.catchcatch.auth.global.entity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "member")
public class MemberEntity extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id", nullable = false)
    private Long memberId;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "role", nullable = false)
    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(name = "nickname", nullable = false, unique = true)
    private String nickname;

    @Column(name = "rating", nullable = false)
    private Integer rating;

    @Column(name = "avatar", nullable = false)
    private String avatar;

    @Column(name = "is_deleted", nullable = false)
    private Boolean isDeleted;

    @Builder
    private MemberEntity(String email, String password, Role role, String nickname, Integer rating, String avatar) {
        this.email = email;
        this.password = password;
        this.role = role;
        this.nickname = nickname;
        this.rating = rating;
        this.avatar = avatar;
        this.isDeleted = false;
    }

    public static MemberEntity createMemberEntityToMember(Member member) {
        return MemberEntity.builder()
                .email(member.getEmail())
                .password(member.getPassword())
                .role(member.getRole())
                .nickname(member.getNickname())
                .rating(member.getRating())
                .avatar(member.getAvatar())
                .build();
    }
}
