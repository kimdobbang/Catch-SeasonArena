package com.catchcatch.main.domains.inventory.service;

import static org.mockito.ArgumentMatchers.*;

import java.util.ArrayList;
import java.util.List;

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
import com.catchcatch.main.domains.inventory.application.port.out.FindEquipInventoryListPort;
import com.catchcatch.main.domains.inventory.application.port.out.FindInventoryByIdAndMemberEmailPort;
import com.catchcatch.main.domains.inventory.application.port.out.UpdateInventoryPort;
import com.catchcatch.main.domains.inventory.application.service.EquipInventoryServiceImpl;
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
public class EquipInventoryServiceTest {

	@InjectMocks
	private EquipInventoryServiceImpl equipInventoryService;

	@Mock
	private FindInventoryByIdAndMemberEmailPort findInventoryByIdAndMemberEmailPort;

	@Mock
	private UpdateInventoryPort updateInventoryPort;

	@Mock
	private FindEquipInventoryListPort findEquipInventoryListPort;

	private Inventory inventory;
	private MemberEntity member;
	private ItemEntity item;
	private ItemEntity item2;

	@BeforeEach
	public void init() throws Exception {
		member = MemberEntity.builder()
			.memberId(1L).email("test").build();
		item = new ItemEntity(1L, "test", Season.AUTUMN, Type.ACTIVE, Effect.BEAR, Description.BEAR, "IMAGE", Grade.LEGEND);
		item2 = new ItemEntity(2L, "test", Season.AUTUMN, Type.PASSIVE, Effect.BEAR, Description.BEAR, "IMAGE", Grade.LEGEND);
	}

	@Test
	@DisplayName("장착 성공 서비스")
	public void 장착_성공_서비스() {
		//given
		inventory = new Inventory(1L, Member.fromMemberEntity(member), Item.fromEntity(item), 1, false);

		List<Inventory> inventories = new ArrayList<>();

		BDDMockito.given(findEquipInventoryListPort.inventoryList("test")).willReturn(inventories);
		BDDMockito.given(findInventoryByIdAndMemberEmailPort.findInventoryByIdAndMemberEmail(1L, "test"))
			.willReturn(inventory);
		BDDMockito.doNothing().when(updateInventoryPort).updateInventory(any(Inventory.class));

		//when then
		Assertions.assertThatNoException().isThrownBy(() -> equipInventoryService.equipInventory(1L, "test"));
	}

	@Test
	@DisplayName("장착 실패 장착 개수 3개 초과 서비스")
	public void 장착_실패_장착_개수_3개_초과_서비스() {
		//given
		inventory = new Inventory(1L, Member.fromMemberEntity(member), Item.fromEntity(item), 1, false);

		List<Inventory> inventories = new ArrayList<>();
		inventories.add(inventory);
		inventories.add(inventory);
		inventories.add(inventory);

		BDDMockito.given(findEquipInventoryListPort.inventoryList("test")).willReturn(inventories);

		//when then
		Assertions.assertThatThrownBy(() -> equipInventoryService.equipInventory(1L, "test"))
			.isInstanceOf(Exception.class)
			.hasFieldOrPropertyWithValue("customException", CustomException.INVENTORY_EQUIP_LIMIT_EXCEEDED_EXCEPTION);
	}

	@Test
	@DisplayName("장착 실패 이미 장착 중 서비스")
	public void 장착_실패_이미_장착중__서비스() {
		//given
		inventory = new Inventory(1L, Member.fromMemberEntity(member), Item.fromEntity(item), 1, true);

		List<Inventory> inventories = new ArrayList<>();
		inventories.add(inventory);

		BDDMockito.given(findEquipInventoryListPort.inventoryList("test")).willReturn(inventories);
		BDDMockito.given(findInventoryByIdAndMemberEmailPort.findInventoryByIdAndMemberEmail(1L, "test"))
			.willReturn(inventory);

		//when then
		Assertions.assertThatThrownBy(() -> equipInventoryService.equipInventory(1L, "test"))
			.isInstanceOf(Exception.class)
			.hasFieldOrPropertyWithValue("customException", CustomException.INVENTORY_ALREADY_EQUIPPED_EXCEPTION);
	}

	@Test
	@DisplayName("장착 실패 해당 타입 이미 장착 중 서비스")
	public void 장착_실패_해당_타입_이미_장착중__서비스() {
		//given
		inventory = new Inventory(1L, Member.fromMemberEntity(member), Item.fromEntity(item), 1, true);
		inventory = new Inventory(2L, Member.fromMemberEntity(member), Item.fromEntity(item2), 1, false);

		List<Inventory> inventories = new ArrayList<>();
		inventories.add(inventory);

		BDDMockito.given(findEquipInventoryListPort.inventoryList("test")).willReturn(inventories);
		BDDMockito.given(findInventoryByIdAndMemberEmailPort.findInventoryByIdAndMemberEmail(2L, "test"))
			.willReturn(inventory);

		//when then
		Assertions.assertThatThrownBy(() -> equipInventoryService.equipInventory(2L, "test"))
			.isInstanceOf(Exception.class)
			.hasFieldOrPropertyWithValue("customException", CustomException.INVENTORY_EQUIP_TYPE_LIMIT_EXCEEDED_EXCEPTION);
	}
}
