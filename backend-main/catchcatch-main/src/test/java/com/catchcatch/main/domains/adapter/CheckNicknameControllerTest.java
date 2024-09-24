package com.catchcatch.main.domains.adapter;

import com.catchcatch.main.domains.member.adapter.in.web.CheckNicknameController;
import com.catchcatch.main.domains.member.application.port.in.CheckNicknameUseCase;
import com.catchcatch.main.global.util.HttpResponseUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.BDDMockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@WebMvcTest(
        controllers = {CheckNicknameController.class}
)
@MockBean(JpaMetamodelMappingContext.class)
public class CheckNicknameControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CheckNicknameUseCase checkNicknameUseCase;

    @MockBean
    private HttpResponseUtil httpResponseUtil;

    private String nickname;

    @BeforeEach
    public void setUp() throws Exception {
        nickname = "nickname";
    }

    @Test
    @DisplayName("닉네임 중복 조회 테스트")
    public void 닉네임_중복_조회_테스트() throws Exception {
        BDDMockito.doNothing().when(checkNicknameUseCase).checkNickname(nickname);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/main/members/"+nickname)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk());

    }
}
