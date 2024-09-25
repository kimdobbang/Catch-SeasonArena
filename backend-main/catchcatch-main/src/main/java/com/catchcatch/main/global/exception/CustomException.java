package com.catchcatch.main.global.exception;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public enum CustomException {

    DUPLICATED_NICKNAME_EXCEPTION(400, "DuplicatedNicknameException", "존재하는 닉네임입니다.");

    private Integer statusNum;
    private String errorCode;
    private String errorMessage;
}
