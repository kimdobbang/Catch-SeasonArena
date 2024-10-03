package com.catchcatch.auth.domains.member.usecase;

import com.catchcatch.auth.domains.member.adapter.in.web.requestdto.SignUpRequestDto;
import com.catchcatch.auth.domains.member.application.port.out.ExistsMemberPort;
import com.catchcatch.auth.domains.member.application.port.out.SaveMemberPort;
import com.catchcatch.auth.domains.member.application.service.SignUpServiceImpl;
import com.catchcatch.auth.domains.rank.application.port.out.SendRankKafkaPort;
import com.catchcatch.auth.global.exception.CustomException;
import com.catchcatch.auth.global.exception.ExceptionResponse;
import com.catchcatch.auth.global.security.jwt.JwtTokenProvider;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.BDDMockito;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

@ExtendWith(MockitoExtension.class)
public class SignUpServiceTest {

    @InjectMocks
    private SignUpServiceImpl signUpService;

    @Mock
    private SaveMemberPort saveMemberPort;

    @Mock
    private ExistsMemberPort existsMemberPort;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtTokenProvider jwtTokenProvider;

    @Mock
    private SendRankKafkaPort sendRankKafkaPort;

    private SignUpRequestDto requestDto;

    @BeforeEach
    public void setUp() {
        requestDto = new SignUpRequestDto("email@email.com", "password");
    }

    @Test
    @DisplayName("회원가입 성공 테스트")
    public void 회원가입_성공_테스트(){
        //given
        BDDMockito.given(existsMemberPort.existsByEmailAndIsDeleted(
                requestDto.email(), false)).willReturn(false);

        //when
        Assertions.assertThatNoException().isThrownBy(()
                -> signUpService.singUp(requestDto));
    }

    @Test
    @DisplayName("회원가입 중복 이메일 실패 테스트")
    public void  회원가입_중복_이메일_실패_테스트(){
        //given
        BDDMockito.given(existsMemberPort.existsByEmailAndIsDeleted(
                requestDto.email(), false)).willReturn(true);

        //when
        Assertions.assertThatThrownBy(()->signUpService.singUp(requestDto))
                .isInstanceOf(ExceptionResponse.class)
                .hasFieldOrPropertyWithValue("customException", CustomException.DUPLICATED_EMAIL_EXCEPTION);
    }
}