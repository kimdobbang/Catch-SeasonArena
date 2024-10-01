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
import com.catchcatch.main.domains.inventory.application.port.out.FindInventoriesByEmailPort;
import com.catchcatch.main.domains.inventory.application.service.FindInventoryServiceImpl;
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

@ExtendWith(MockitoExtension.class)
public class FindInventoryServiceTest {

	@InjectMocks
	private FindInventoryServiceImpl inventoryService;

	@Mock
	private FindInventoriesByEmailPort findInventoriesByEmailPort;

	private List<Inventory> inventories;

	@BeforeEach
	public void init() {
		MemberEntity member = MemberEntity.builder()
			.memberId(1L).email("test").build();
		ItemEntity item = new ItemEntity(1L, "test", Season.FALL, Type.ACTIVE, Effect.BEAR, Description.BEAR, "IMAGE",
			Grade.LEGEND);
		Inventory inventory = new Inventory(1L, Member.fromMemberEntity(member), Item.fromEntity(item), 1, true);
		inventories = new ArrayList<>();
		inventories.add(inventory);
	}

	@Test
	@DisplayName("인벤토리 찾기 성공 테스트")
	public void 인벤토리_찾기_테스트() {
		//given
		BDDMockito.given(findInventoriesByEmailPort.findInventoriesByEmail("test")).willReturn(inventories);

		//when
		List<Inventory> inventories = inventoryService.findInventories("test");

		//then
		Assertions.assertThat(inventories).isNotEmpty();
	}

}
