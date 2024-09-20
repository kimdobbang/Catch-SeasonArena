package com.catchcatch.auth.domains.member.domain;

import com.catchcatch.auth.domains.member.adapter.in.web.requestdto.SignUpRequestDto;
import com.catchcatch.auth.domains.member.adapter.out.persistence.MemberEntity;
import jakarta.validation.constraints.Email;
import lombok.Builder;
import lombok.Getter;
import org.springframework.security.core.parameters.P;

@Getter
public class SignUpMember {

    private String email;
    private String password;
    private Role role;
    private String nickname;

    @Builder
    private SignUpMember(String email, String password, Role role, String nickname) {
        this.email = email;
        this.password = password;
        this.role = role;
        this.nickname = nickname;
    }

    public static SignUpMember createMemberMapper(MemberEntity memberEntity) {
        return SignUpMember.builder()
                .email(memberEntity.getEmail())
                .password(memberEntity.getPassword())
                .role(memberEntity.getRole())
                .nickname(memberEntity.getNickname())
                .build();
    }

    public static SignUpMember createSignUpMember(SignUpRequestDto signUpRequestDto) {
        return SignUpMember.builder()
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
