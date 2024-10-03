package com.catchcatch.main.domains.inventory.contorller;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.BDDMockito;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.catchcatch.main.domains.inventory.adapter.in.web.controller.FindInventoriesController;
import com.catchcatch.main.domains.inventory.application.port.in.FindInventoriesUseCase;
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
import com.catchcatch.main.global.util.HttpResponseUtil;

@WebMvcTest(
	controllers = FindInventoriesController.class
)
@MockBean(JpaMetamodelMappingContext.class)
public class FindInventoriesControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private FindInventoriesUseCase findInventoriesUseCase;

	@MockBean
	private HttpResponseUtil httpResponseUtil;

	private List<Inventory> inventories;

	@BeforeEach
	public void init() {
		MemberEntity member = MemberEntity.builder()
				.memberId(1L).build();
		ItemEntity item = new ItemEntity(1L, "test", Season.AUTUMN, Type.ACTIVE, Effect.BEAR, Description.BEAR, "IMAGE", Grade.LEGEND);
		inventories = new ArrayList<>();
		inventories.add(new Inventory(1L, Member.fromMemberEntity(member), Item.fromEntity(item),1, false));
	}

	@Test
	@DisplayName("인벤토리 찾기 컨트롤러 테스트")
	public void 인벤토리_찾기_컨트롤러_테스트() throws Exception {
		//given
		BDDMockito.given(findInventoriesUseCase.findInventories("test")).willReturn(inventories);

		//when then
		ResultActions resultActions = mockMvc.perform(MockMvcRequestBuilders.get("/api/main/inventories/items/test")
			.contentType(MediaType.APPLICATION_JSON)
		);

		resultActions.andExpect(MockMvcResultMatchers.status().isOk());
	}

}
