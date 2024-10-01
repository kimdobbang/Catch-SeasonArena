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
import com.catchcatch.main.domains.item.adapter.out.persistence.Grade;
import com.catchcatch.main.domains.item.adapter.out.persistence.ItemEntity;
import com.catchcatch.main.domains.item.adapter.out.persistence.Season;
import com.catchcatch.main.domains.item.adapter.out.persistence.Type;
import com.catchcatch.main.domains.member.adapter.out.persistence.MemberEntity;

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
	MemberEntity member;
	ItemEntity item;

	@BeforeEach
	public void init() throws Exception {
		member = MemberEntity.builder()
			.memberId(1L).email("test").build();
		item = new ItemEntity(1L, "test", Season.FALL, Type.ACTIVE, "EFFEC", "TEST", "IMAGE", Grade.LEGEND);
	}

	@Test
	@DisplayName("장착 해제 성공 서비스")
	public void 장착_해제_성공_서비스() {

		//given
		inventory = new Inventory(1L,member,item,1, true);
		inventoryEntity = Inventory.InventoryToInventoryEntity(inventory);
		BDDMockito.given(findInventoryByIdAndMemberEmailPort.findInventoryByIdAndMemberEmail(1L, "test")).willReturn(inventoryEntity);
		inventory.unEquipInventory();
		BDDMockito.doNothing().when(updateInventoryPort).updateInventory(any(Inventory.class));


		//when then
		Assertions.assertThatNoException().isThrownBy(() -> unEquipInventoryService.unEquipInventory(1L, "test"));
	}

}
