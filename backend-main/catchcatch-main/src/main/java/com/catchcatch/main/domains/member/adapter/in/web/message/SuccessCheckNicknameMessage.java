package com.catchcatch.main.domains.member.adapter.in.web.message;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public enum SuccessCheckNicknameMessage {

    SUCCESS_CHECK_NICKNAME("존재하지 않는 닉네임입니다.");

    private String message;
}
