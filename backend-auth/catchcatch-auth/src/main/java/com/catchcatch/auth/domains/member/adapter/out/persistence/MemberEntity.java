package com.catchcatch.auth.domains.member.adapter.out.persistence;

import com.catchcatch.auth.domains.member.domain.Role;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Getter
@Table(name = "member")
public class MemberEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id", nullable = false)
    private Long memberId;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "password", nullable = true)
    private String password;

    @Column(name = "role", nullable = false)
    private Role role;

    @Column(name = "nickname", nullable = false)
    private String nickname;

    @Column(name = "rating", nullable = false)
    private int rating;

    @Column(name = "avatar", nullable = false)
    private String avatar;

    @Column(name = "is_deleted", nullable = false)
    private boolean isDeleted;

    @Builder
    private MemberEntity(String email, String password, Role role, String nickname, int rating, String avatar, boolean isDeleted) {
        this.email = email;
        this.password = password;
        this.role = role;
        this.nickname = nickname;
        this.rating = rating;
        this.avatar = avatar;
        this.isDeleted = isDeleted;
    }

    public static MemberEntity createMember(String email, String password, Role role, String nickname, int rating, String avatar, boolean isDeleted) {
        return MemberEntity.builder()
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
