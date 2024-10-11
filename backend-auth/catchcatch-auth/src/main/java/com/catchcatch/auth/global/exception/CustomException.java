package com.catchcatch.auth.global.exception;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public enum CustomException {

    NOT_FOUND_MEMBER_EXCEPTION(400, "NotFoundUserException", "유저가 존재하지 않습니다."),
    ID_PASSWORD_INPUT_EXCEPTION(400,"IdPasswordInputException", "아이디 패스워드 입력이 잘못 되었습니다."),
    DUPLICATED_EMAIL_EXCEPTION(400, "DuplicatedEmailException", "가입된 이메일입니다."),

    EXPIRED_JWT_EXCEPTION(401, "ExpiredJwtException", "토큰이 만료됐습니다."),
    NOT_VALID_JWT_EXCEPTION(401, "NotValidJwtException", "유효하지 않는 토큰입니다."),

    ACCESS_DENIEND_EXCEPTION(403,"AccessDeniendException","권한이 없습니다");

    private Integer statusNum;
    private String errorCode;
    private String errorMessage;
}
