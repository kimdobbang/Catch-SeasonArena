package com.catchcatch.auth.domains.member.adapter;


import com.catchcatch.auth.auth.WithMockAuthUser;
import com.catchcatch.auth.domains.member.adapter.in.web.CheckEmailController;
import com.catchcatch.auth.domains.member.application.port.in.CheckEmailUseCase;
import com.catchcatch.auth.domains.member.domain.Role;
import com.catchcatch.auth.global.config.SecurityConfig;
import com.catchcatch.auth.global.util.HttpResponseUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.BDDMockito;
import org.mockito.Mock;
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
        controllers = { CheckEmailController.class },
        excludeFilters = {
                @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = SecurityConfig.class)
        }
)
@MockBean(JpaMetamodelMappingContext.class)
public class CheckEmailControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private CheckEmailUseCase checkEmailUseCase;

    @MockBean
    private HttpResponseUtil httpResponseUtil;

    private String email;

    @BeforeEach
    public void setUp() throws Exception {
        email = "test@test.com";
    }

    @Test
    @DisplayName("이메일 중복 체크 성공 테스트")
    @WithMockAuthUser(email = "test@test.com", role = Role.ROLE_USER)
    public void 이메일_중복_체크_성공_테스트() throws Exception{
        BDDMockito.doNothing().when(checkEmailUseCase).checkEmail(email);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/auth/members/"+email)
                .with(SecurityMockMvcRequestPostProcessors.csrf())
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }
}
