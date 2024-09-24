package com.catchcatch.main.global.exception;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public enum CustomException {

    DUPLICATED_NICKNAME_EXCEPTION(400, "DuplicatedNicknameException", "존재하는 닉네임입니다."),
    NOT_EXISTS_MEMBER_EXCEPTION(400, "NotExistsMemberException", "존재하지 않는 멤버입니다.");

    private Integer statusNum;
    private String errorCode;
    private String errorMessage;
}
