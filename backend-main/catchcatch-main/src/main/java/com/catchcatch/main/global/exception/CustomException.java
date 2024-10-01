package com.catchcatch.main.global.exception;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public enum CustomException {

    DUPLICATED_NICKNAME_EXCEPTION(400, "DuplicatedNicknameException", "존재하는 닉네임입니다."),
    NOT_EXISTS_INVENTORY_EXCEPTION(400, "NotExistsInventoryException", "존재하지 않는 인벤토리 입니다."),
    INVENTORY_ALREADY_UN_EQUIPPED_EXCEPTION(400, "InventoryAlreadyUnequippedException", "이미 장착 해제된 인벤토리 입니다."),
    INVENTORY_ALREADY_EQUIPPED_EXCEPTION(400, "InventoryAlreadyEquippedException", "이미 장착된 인벤토리 입니다."),
    INVENTORY_EQUIP_LIMIT_EXCEEDED_EXCEPTION(400, "InventoryEquipLimitExceededException", "장착 개수가 3을 초과했습니다."),
    NOT_EXISTS_MEMBER_EXCEPTION(400, "NotExistsMemberException", "존재하지 않는 멤버입니다.");

    private Integer statusNum;
    private String errorCode;
    private String errorMessage;
}
