package com.catchcatchrank.domains.member.domain;

import com.catchcatchrank.domains.member.adapter.out.persistence.MemberEntity;
import com.catchcatchrank.domains.member.adapter.out.persistence.Role;

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

	public static  MemberEntity MemberToMemberEntity(Member member) {
		return MemberEntity.builder()
			.id(member.getMemberId())
			.email(member.getEmail())
			.password(member.getPassword())
			.role(member.getRole())
			.nickname(member.getNickname())
			.rating(member.getRating())
			.avatar(member.getAvatar())
			.isDeleted(member.isDeleted)
			.build();
	}

	public void updateRate(Integer newRating) {
		this.rating = newRating;
	}
}
