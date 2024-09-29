package com.catchcatch.main.domains.inventory.service;

import org.assertj.core.api.Assertions;
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
import com.catchcatch.main.domains.member.adapter.out.persistence.MemberEntity;
import com.catchcatch.main.domains.member.domain.Role;

@ExtendWith(MockitoExtension.class)
public class DeleteInventoryServiceTest {

	@InjectMocks
	private DeleteInventoryServiceImpl deleteInventoryService;

	@Mock
	private DeleteInventoryPort deleteInventoryPort;

	@Mock
	private FindInventoryByIdAndMemberEmailPort findInventoryByIdAndMemberEmailPort;

	@Mock
	private MemberEntity memberEntity;

	@Mock
	private InventoryEntity inventoryEntity;

	@Test
	@DisplayName("인벤토리 삭제 성공 테스트")
	public void 인벤토리_삭제_성공() {
		//given
		BDDMockito.given(findInventoryByIdAndMemberEmailPort.findInventoryByIdAndMemberEmail(1L, "test")).willReturn(inventoryEntity);
		BDDMockito.doNothing().when(deleteInventoryPort).deleteInventory(Mockito.any(Inventory.class));

		//when then
		Assertions.assertThatNoException().isThrownBy(() -> deleteInventoryService.deleteInventory(1L, "test"));

	}
}
