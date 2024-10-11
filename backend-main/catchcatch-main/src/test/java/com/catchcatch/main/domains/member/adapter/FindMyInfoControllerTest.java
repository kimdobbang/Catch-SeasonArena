package com.catchcatch.main.domains.member.adapter;

import com.catchcatch.main.domains.inventory.domain.Inventory;
import com.catchcatch.main.domains.member.adapter.in.web.controller.FindMyInfoController;
import com.catchcatch.main.domains.member.adapter.in.web.responsedto.FindMyInfoResponseDto;
import com.catchcatch.main.domains.member.application.port.in.FindMyInfoUseCase;
import com.catchcatch.main.domains.member.domain.Member;
import com.catchcatch.main.global.util.HttpResponseUtil;
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
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.List;

@WebMvcTest(
        controllers = FindMyInfoController.class
)
@MockBean(JpaMetamodelMappingContext.class)
public class FindMyInfoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private FindMyInfoUseCase findMyInfoUseCase;

    @MockBean
    private HttpResponseUtil responseUtil;

    @Mock
    private Member member;

    @Mock
    private List<Inventory> inventories;

    private String email;
    private FindMyInfoResponseDto responseDto;

    @BeforeEach
    void setUp() {
        email = "email@email.com";
        responseDto = FindMyInfoResponseDto.createFindMyInfoResponseDto(
                member,
                inventories
        );
    }

    @Test
    @DisplayName("내 정보 조회 성공 테스트")
    public void 내_정보_조회_성공_테스트() throws Exception {
        BDDMockito.given(findMyInfoUseCase.findMyInfo(email)).willReturn(responseDto);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/main/members/info/"+email)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }
}
