package com.catchcatch.main.domains.inventory.contorller;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.BDDMockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.catchcatch.main.domains.inventory.adapter.in.web.controller.DeleteInventoryController;
import com.catchcatch.main.domains.inventory.application.port.in.DeleteInventoryUseCase;
import com.catchcatch.main.domains.member.adapter.in.web.ChangeAvatarController;
import com.catchcatch.main.global.util.HttpResponseUtil;

@WebMvcTest(
	controllers = DeleteInventoryController.class
)
@MockBean(JpaMetamodelMappingContext.class)
public class DeleteInventoryControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private DeleteInventoryUseCase deleteInventoryUseCase;

	@MockBean
	private HttpResponseUtil responseUtil;

	@Test
	@DisplayName("인벤토리 삭제 테스트")
	public void 인벤토리_삭제_테스트() throws Exception {

		//given
		BDDMockito.doNothing().when(deleteInventoryUseCase).deleteInventory(1L, "test1");

		//when then
		ResultActions resultActions = mockMvc.perform(MockMvcRequestBuilders.delete("/api/main/inventories/items/1/member/test")
			.contentType(MediaType.APPLICATION_JSON)
		);

		resultActions.andExpect(MockMvcResultMatchers.status().isOk());
	}
}
