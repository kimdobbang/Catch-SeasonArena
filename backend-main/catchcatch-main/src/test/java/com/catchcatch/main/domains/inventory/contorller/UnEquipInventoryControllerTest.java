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
import com.catchcatch.main.domains.inventory.adapter.in.web.controller.UnEquipInventoryController;
import com.catchcatch.main.domains.inventory.application.port.in.UnEquipInventoryUseCase;
import com.catchcatch.main.global.util.HttpResponseUtil;

@WebMvcTest(
	controllers = UnEquipInventoryController.class
)
@MockBean(JpaMetamodelMappingContext.class)
public class UnEquipInventoryControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private UnEquipInventoryUseCase unEquipInventoryUseCase;

	@MockBean
	private HttpResponseUtil httpResponseUtil;

	@Test
	@DisplayName("장착 해제 컨트롤러 테스트")
	public void 장착_헤제_컨트롤러_테스트() throws Exception {

		//given
		BDDMockito.doNothing().when(unEquipInventoryUseCase).unEquipInventory(1L,"test");

		//when then
		ResultActions resultActions = mockMvc.perform(MockMvcRequestBuilders.patch("/api/main/inventories/items/equipment/1/member/test")
			.contentType(MediaType.APPLICATION_JSON)
		);

		resultActions.andExpect(MockMvcResultMatchers.status().isOk());
	}
}
