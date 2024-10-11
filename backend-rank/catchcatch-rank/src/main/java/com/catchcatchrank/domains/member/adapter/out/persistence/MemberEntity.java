package com.catchcatchrank.domains.member.adapter.out.persistence;

import com.catchcatchrank.global.entity.BaseTimeEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
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

	@Column(name = "nickname", nullable = false)
	private String nickname;

	@Column(name = "rating", nullable = false)
	private Integer rating;

	@Column(name = "avatar", nullable = false)
	private String avatar;

	@Column(name = "is_deleted", nullable = false)
	private Boolean isDeleted;

	@Builder
	private MemberEntity(Long id, String email, String password, Role role, String nickname, Integer rating, String avatar, Boolean isDeleted) {
		this.memberId = id;
		this.email = email;
		this.password = password;
		this.role = role;
		this.nickname = nickname;
		this.rating = rating;
		this.avatar = avatar;
		this.isDeleted = false;
	}
}
