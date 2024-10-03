package com.catchcatch.main.domains.inventory.service;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.BDDMockito;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import com.catchcatch.main.domains.inventory.adapter.out.persistence.InventoryEntity;
import com.catchcatch.main.domains.inventory.application.port.out.DeleteInventoryPort;
import com.catchcatch.main.domains.inventory.application.port.out.FindInventoryByIdAndMemberEmailPort;
import com.catchcatch.main.domains.inventory.application.service.DeleteInventoryServiceImpl;
import com.catchcatch.main.domains.inventory.domain.Inventory;
import com.catchcatch.main.domains.item.adapter.out.persistence.Description;
import com.catchcatch.main.domains.item.adapter.out.persistence.Effect;
import com.catchcatch.main.domains.item.adapter.out.persistence.Grade;
import com.catchcatch.main.domains.item.adapter.out.persistence.ItemEntity;
import com.catchcatch.main.domains.item.adapter.out.persistence.Season;
import com.catchcatch.main.domains.item.adapter.out.persistence.Type;
import com.catchcatch.main.domains.item.domain.Item;
import com.catchcatch.main.domains.member.adapter.out.persistence.MemberEntity;
import com.catchcatch.main.domains.member.domain.Member;
import com.catchcatch.main.domains.member.domain.Role;
import com.catchcatch.main.global.exception.CustomException;
import com.catchcatch.main.global.exception.ExceptionResponse;

@ExtendWith(MockitoExtension.class)
public class DeleteInventoryServiceTest {

	@InjectMocks
	private DeleteInventoryServiceImpl deleteInventoryService;

	@Mock
	private DeleteInventoryPort deleteInventoryPort;

	@Mock
	private FindInventoryByIdAndMemberEmailPort findInventoryByIdAndMemberEmailPort;

	private MemberEntity member;
	private ItemEntity item;

	private Inventory inventory;

	@BeforeEach
	public void init() throws Exception {
		member = MemberEntity.builder()
			.memberId(1L).email("test").build();
		item = new ItemEntity(1L, "test", Season.AUTUMN, Type.ACTIVE, Effect.BEAR, Description.BEAR, "IMAGE", Grade.LEGEND);
		 inventory = new Inventory(1L, Member.fromMemberEntity(member), Item.fromEntity(item), 1, true);
	}

	@Test
	@DisplayName("인벤토리 삭제 성공 테스트")
	public void 인벤토리_삭제_성공() {
		//given
		BDDMockito.given(findInventoryByIdAndMemberEmailPort.findInventoryByIdAndMemberEmail(1L, "test")).willReturn(inventory);
		BDDMockito.doNothing().when(deleteInventoryPort).deleteInventory(Mockito.any(Inventory.class));

		//when then
		Assertions.assertThatNoException().isThrownBy(() -> deleteInventoryService.deleteInventory(1L, "test"));

	}

	@Test
	@DisplayName("인벤토리 삭제 실패 테슽트")
	public void 인벤토리_삭제_실패() {

		BDDMockito.given(findInventoryByIdAndMemberEmailPort.findInventoryByIdAndMemberEmail(1L, "test")).willThrow(new ExceptionResponse(CustomException.NOT_EXISTS_INVENTORY_EXCEPTION));


		//when then
		Assertions.assertThatThrownBy(() -> deleteInventoryService.deleteInventory(1L, "test"))
			.isInstanceOf(Exception.class)
			.hasFieldOrPropertyWithValue("customException", CustomException.NOT_EXISTS_INVENTORY_EXCEPTION);
	}
}
