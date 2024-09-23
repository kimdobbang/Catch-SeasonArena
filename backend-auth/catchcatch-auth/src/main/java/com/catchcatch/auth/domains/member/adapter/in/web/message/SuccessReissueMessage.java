package com.catchcatch.auth.domains.member.adapter.in.web.message;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum SuccessReissueMessage {

    SUCCESS_REISSUE("Access 토큰을 재발급했습니다.");

    private String message;
}
