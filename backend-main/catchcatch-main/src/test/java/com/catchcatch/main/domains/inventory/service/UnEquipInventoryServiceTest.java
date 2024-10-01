package com.catchcatch.main.domains.inventory.service;

import static org.mockito.ArgumentMatchers.*;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.BDDMockito;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.catchcatch.main.domains.inventory.adapter.out.persistence.InventoryEntity;
import com.catchcatch.main.domains.inventory.application.port.out.FindInventoryByIdAndMemberEmailPort;
import com.catchcatch.main.domains.inventory.application.port.out.UpdateInventoryPort;
import com.catchcatch.main.domains.inventory.application.service.UnEquipInventoryServiceImpl;
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
import com.catchcatch.main.global.exception.CustomException;

@ExtendWith(MockitoExtension.class)
public class UnEquipInventoryServiceTest {

	@InjectMocks
	private UnEquipInventoryServiceImpl unEquipInventoryService;

	@Mock
	private FindInventoryByIdAndMemberEmailPort findInventoryByIdAndMemberEmailPort;

	@Mock
	private UpdateInventoryPort updateInventoryPort;

	private Inventory inventory;
	private InventoryEntity inventoryEntity;
	private MemberEntity member;
	private ItemEntity item;

	@BeforeEach
	public void init() throws Exception {
		member = MemberEntity.builder()
			.memberId(1L).email("test").build();
		item = new ItemEntity(1L, "test", Season.AUTOM, Type.ACTIVE, Effect.BEAR, Description.BEAR, "IMAGE", Grade.LEGEND);
	}

	@Test
	@DisplayName("장착 해제 성공 서비스")
	public void 장착_해제_성공_서비스() {

		//given
		inventory = new Inventory(1L, Member.fromMemberEntity(member), Item.fromEntity(item), 1, true);
		BDDMockito.given(findInventoryByIdAndMemberEmailPort.findInventoryByIdAndMemberEmail(1L, "test"))
			.willReturn(inventory);
		BDDMockito.doNothing().when(updateInventoryPort).updateInventory(any(Inventory.class));

		//when then
		Assertions.assertThatNoException().isThrownBy(() -> unEquipInventoryService.unEquipInventory(1L, "test"));
	}

	@Test
	@DisplayName("장착 해제 실패 장착하지 않음 서비스")
	public void 장착_해제_실패_서비스() {

		//given
		inventory = new Inventory(1L, Member.fromMemberEntity(member), Item.fromEntity(item), 1, false);

		BDDMockito.given(findInventoryByIdAndMemberEmailPort.findInventoryByIdAndMemberEmail(1L, "test"))
			.willReturn(inventory);

		//when then
		Assertions.assertThatThrownBy(() -> unEquipInventoryService.unEquipInventory(1L, "test"))
			.isInstanceOf(Exception.class)
			.hasFieldOrPropertyWithValue("customException", CustomException.INVENTORY_ALREADY_UN_EQUIPPED_EXCEPTION);
	}

}
