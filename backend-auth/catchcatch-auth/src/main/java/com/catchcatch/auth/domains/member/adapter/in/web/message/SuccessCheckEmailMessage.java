package com.catchcatch.auth.domains.member.adapter.in.web.message;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum SuccessCheckEmailMessage {

    SUCCESS_CHECK_EMAIL("가입되지 않은 이메일입니다.");

    private String message;
}
