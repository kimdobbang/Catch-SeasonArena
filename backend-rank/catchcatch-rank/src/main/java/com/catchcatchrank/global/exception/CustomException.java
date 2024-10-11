package com.catchcatchrank.global.exception;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public enum CustomException {

    NOT_FOUND_MEMBER_EXCEPTION(400, "NotFoundUserException", "유저가 존재하지 않습니다.");

    private Integer statusNum;
    private String errorCode;
    private String errorMessage;
}
