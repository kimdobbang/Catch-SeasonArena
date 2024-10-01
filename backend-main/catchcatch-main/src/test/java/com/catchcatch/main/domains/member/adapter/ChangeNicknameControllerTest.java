package com.catchcatch.main.domains.member.adapter;

import com.catchcatch.main.domains.member.adapter.in.web.controller.ChangeNicknameController;
import com.catchcatch.main.domains.member.adapter.in.web.requestdto.ChangeNicknameRequestDto;
import com.catchcatch.main.domains.member.adapter.in.web.responsedto.ChangeNicknameResponseDto;
import com.catchcatch.main.domains.member.application.port.in.ChangeNicknameUseCase;
import com.catchcatch.main.global.util.HttpResponseUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
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
        controllers = ChangeNicknameController.class
)
@MockBean(JpaMetamodelMappingContext.class)
public class ChangeNicknameControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private ChangeNicknameUseCase changeNicknameUseCase;

    @MockBean
    private HttpResponseUtil responseUtil;

    private ChangeNicknameRequestDto requestDto;
    private ChangeNicknameResponseDto responseDto;

    @BeforeEach
    void setUp() throws Exception {
        requestDto = new ChangeNicknameRequestDto(
                "변경후닉네임",
                "test@test.com"
        );
        responseDto = new ChangeNicknameResponseDto(
                requestDto.nickname()
        );
    }

    @Test
    @DisplayName("닉네임 변경 성공 테스트")
    public void 닉네임_변경_성공_테스트() throws Exception {
        String requestBody = objectMapper.writeValueAsString(requestDto);

        BDDMockito.given(changeNicknameUseCase.changeNickname(requestDto))
                .willReturn(responseDto);

        mockMvc.perform(MockMvcRequestBuilders.patch("/api/main/members/nickname")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }
}
