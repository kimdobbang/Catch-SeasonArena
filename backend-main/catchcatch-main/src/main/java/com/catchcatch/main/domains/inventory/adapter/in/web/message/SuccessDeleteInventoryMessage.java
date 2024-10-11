package com.catchcatch.main.domains.inventory.adapter.in.web.message;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public enum SuccessDeleteInventoryMessage {

    SUCCESS_DELETE_INVENTORY("인벤토리 삭제를 성공하였습니다.");

    private String message;
}
