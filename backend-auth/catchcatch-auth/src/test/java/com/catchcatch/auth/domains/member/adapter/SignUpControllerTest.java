package com.catchcatch.auth.domains.member.adapter;

import com.catchcatch.auth.auth.WithMockAuthUser;
import com.catchcatch.auth.domains.member.adapter.in.web.SignUpController;
import com.catchcatch.auth.domains.member.adapter.in.web.requestdto.SignUpRequestDto;
import com.catchcatch.auth.domains.member.application.port.in.SignUpUseCase;
import com.catchcatch.auth.domains.member.domain.Role;
import com.catchcatch.auth.global.config.SecurityConfig;
import com.catchcatch.auth.global.util.HttpResponseUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.BDDMockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@WebMvcTest(
        controllers = SignUpController.class,
        excludeFilters = {
                @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = SecurityConfig.class)
        }
)
@MockBean(JpaMetamodelMappingContext.class)
public class SignUpControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private SignUpUseCase signUpUseCase;

    @MockBean
    private HttpResponseUtil responseUtil;

    private SignUpRequestDto requestDto;

    @BeforeEach
    public void setUp() throws Exception {
        requestDto = new SignUpRequestDto("test@test.com", "1234");
    }

    @Test
    @DisplayName("회원 가입 성공 테스트")
    @WithMockAuthUser(email = "test@gmail.com", role = Role.ROLE_USER)
    public void 회원가입_성공_테스트() throws Exception {
        //given
        String requestBody = objectMapper.writeValueAsString(requestDto);

        BDDMockito.doNothing().when(signUpUseCase).singUp(requestDto);

        ResultActions result = mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/members/signup")
                .with(SecurityMockMvcRequestPostProcessors.csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody));

        result.andExpect(MockMvcResultMatchers.status().isOk());
    }
}