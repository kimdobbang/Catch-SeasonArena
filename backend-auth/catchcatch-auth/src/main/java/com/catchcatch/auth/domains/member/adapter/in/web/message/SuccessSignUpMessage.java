package com.catchcatch.auth.domains.member.adapter.in.web.message;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public enum SuccessSignUpMessage {

    SUCCESS_SIGN_UP("회원가입을 완료했습니다.");

    private String message;
}
