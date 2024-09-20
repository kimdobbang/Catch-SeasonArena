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
    private Password password;
    private Role role;
    private Nickname nickname;

    @Builder
    private SignUpMember(String email, Password password, Role role, Nickname nickname) {
        this.email = email;
        this.password = password;
        this.role = role;
        this.nickname = nickname;
    }

    public static SignUpMember createMemberMapper(MemberEntity memberEntity) {
        return SignUpMember.builder()
                .email(memberEntity.getEmail())
                .password(new Password(memberEntity.getPassword()))
                .role(memberEntity.getRole())
                .nickname(new Nickname(memberEntity.getNickname()))
                .build();
    }

    public static SignUpMember createSignUpMember(SignUpRequestDto signUpRequestDto) {
        return SignUpMember.builder()
                .email(signUpRequestDto.email())
                .password(new Password(signUpRequestDto.password()))
                .role(Role.ROLE_USER)
                .nickname(new Nickname(signUpRequestDto.email()))
                .build();
    }
}
