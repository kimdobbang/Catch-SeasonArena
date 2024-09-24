package com.catchcatch.auth.domains.member.usecase;

import com.catchcatch.auth.domains.member.application.port.out.ExistsMemberPort;
import com.catchcatch.auth.domains.member.application.service.CheckEmailServiceImpl;
import com.catchcatch.auth.global.exception.CustomException;
import com.catchcatch.auth.global.exception.ExceptionResponse;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.BDDMockito;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class CheckEmailServiceTest {

    @InjectMocks
    private CheckEmailServiceImpl checkEmailService;

    @Mock
    private ExistsMemberPort existsMemberPort;

    private String email;

    @BeforeEach
    void setUp() {
        email = "test@test.com";
    }

    @Test
    @DisplayName("이메일_중복_없음_테스트")
    public void 이메일_중복_없음_테스트(){
        //given
        BDDMockito.given(existsMemberPort.existsByEmailAndIsDeleted(email, false))
                        .willReturn(false);

        //when
        Assertions.assertThatNoException().isThrownBy(
                () -> checkEmailService.checkEmail(email));
    }

    @Test
    @DisplayName("이메일_중복_테스트")
    public void 이메일_중복_테스트(){
        //given
        BDDMockito.given(existsMemberPort.existsByEmailAndIsDeleted(email, false))
                .willReturn(true);

        //when
        Assertions.assertThatThrownBy(()->checkEmailService.checkEmail(email))
                .isInstanceOf(ExceptionResponse.class)
                .hasFieldOrPropertyWithValue("customException", CustomException.DUPLICATED_EMAIL_EXCEPTION);

    }
}
