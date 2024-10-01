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
import com.catchcatch.main.domains.item.adapter.out.persistence.Grade;
import com.catchcatch.main.domains.item.adapter.out.persistence.ItemEntity;
import com.catchcatch.main.domains.item.adapter.out.persistence.Season;
import com.catchcatch.main.domains.item.adapter.out.persistence.Type;
import com.catchcatch.main.domains.member.adapter.out.persistence.MemberEntity;
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
	private InventoryEntity inventoryEntity;
	MemberEntity member;
	ItemEntity item;

	@BeforeEach
	public void init() throws Exception {
		member = MemberEntity.builder()
			.memberId(1L).email("test").build();
		item = new ItemEntity(1L, "test", Season.FALL, Type.ACTIVE, "EFFEC", "TEST", "IMAGE", Grade.LEGEND);
	}

	@Test
	@DisplayName("장착 성공 서비스")
	public void 장착_성공_서비스() {
		//given
		inventory = new Inventory(1L, member, item, 1, false);
		inventoryEntity = Inventory.InventoryToInventoryEntity(inventory);
		List<InventoryEntity> inventoryEntities = new ArrayList<>();
		inventoryEntities.add(inventoryEntity);

		BDDMockito.given(findEquipInventoryListPort.inventoryList("test")).willReturn(inventoryEntities);
		BDDMockito.given(findInventoryByIdAndMemberEmailPort.findInventoryByIdAndMemberEmail(1L, "test"))
			.willReturn(inventoryEntity);
		inventory.equipInventory();
		BDDMockito.doNothing().when(updateInventoryPort).updateInventory(any(Inventory.class));

		//when then
		Assertions.assertThatNoException().isThrownBy(() -> equipInventoryService.equipInventory(1L, "test"));
	}

	@Test
	@DisplayName("장착 실패 장착 개수 3개 초과 서비스")
	public void 장착_실패_장착_개수_3개_초과_서비스() {
		//given
		inventory = new Inventory(1L, member, item, 1, false);
		inventoryEntity = Inventory.InventoryToInventoryEntity(inventory);
		List<InventoryEntity> inventoryEntities = new ArrayList<>();
		inventoryEntities.add(inventoryEntity);
		inventoryEntities.add(inventoryEntity);
		inventoryEntities.add(inventoryEntity);

		BDDMockito.given(findEquipInventoryListPort.inventoryList("test")).willReturn(inventoryEntities);

		//when then
		Assertions.assertThatThrownBy(() -> equipInventoryService.equipInventory(1L, "test"))
			.isInstanceOf(Exception.class)
			.hasFieldOrPropertyWithValue("customException", CustomException.INVENTORY_EQUIP_LIMIT_EXCEEDED_EXCEPTION);
	}
}
