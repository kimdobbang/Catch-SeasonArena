package com.catchcatch.main.domains.member.adapter;

import com.catchcatch.main.domains.member.adapter.in.web.ChangeAvatarController;
import com.catchcatch.main.domains.member.adapter.in.web.requestdto.ChangeAvatarRequestDto;
import com.catchcatch.main.domains.member.adapter.in.web.responsedto.ChangeAvatarResponseDto;
import com.catchcatch.main.domains.member.application.port.in.ChangeAvatarUseCase;
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
        controllers = ChangeAvatarController.class
)
@MockBean(JpaMetamodelMappingContext.class)
public class ChangeAvatarControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private ChangeAvatarUseCase changeAvatarUseCase;

    @MockBean
    private HttpResponseUtil responseUtil;

    private ChangeAvatarRequestDto requestDto;
    private ChangeAvatarResponseDto responseDto;

    @BeforeEach
    public void setUp() throws Exception {
        requestDto = new ChangeAvatarRequestDto("avatar", 1L);
        responseDto = new ChangeAvatarResponseDto(requestDto.avatar());
    }

    @Test
    @DisplayName("아바타 변경 성공 테스트")
    public void 아바타_변경_성공_테스트() throws Exception {
        String requestBody = objectMapper.writeValueAsString(requestDto);

        BDDMockito.given(changeAvatarUseCase.changeAvatar(requestDto)).willReturn(responseDto);

        mockMvc.perform(MockMvcRequestBuilders.patch("/api/main/members/avatar")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }
}
