package com.catchcatch.main.domains.inventory.adapter.in.web.message;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public enum SuccessUnEquipInventoryMessage {

	SUCCESS_UN_EQUIP_INVENTORY("인벤토리 장착 해제 를 성공하였습니다.");

	private String message;
}
