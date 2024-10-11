package com.catchcatch.main.domains.member.service;

import com.catchcatch.main.domains.member.application.port.out.ExistsMemberPort;
import com.catchcatch.main.domains.member.application.service.CheckNicknameServiceImpl;
import com.catchcatch.main.global.exception.CustomException;
import com.catchcatch.main.global.exception.ExceptionResponse;
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
public class CheckNicknameServiceTest {

    @InjectMocks
    private CheckNicknameServiceImpl checkNicknameService;

    @Mock
    private ExistsMemberPort existsMemberPort;

    private String nickname;

    @BeforeEach
    void setUp() {
        nickname = "nickname";
    }

    @Test
    @DisplayName("닉네임 중복 없음 테스트")
    public void 닉네임_중복_없음_테스트(){
        //given
        BDDMockito.given(existsMemberPort.existsMemberByNickname(nickname, false))
                .willReturn(false);

        //when
        Assertions.assertThatNoException().isThrownBy(() ->
                checkNicknameService.checkNickname(nickname));
    }

    @Test
    @DisplayName("닉네임 중복 테스트")
    public void 닉네임_중복_테스트(){
        //given
        BDDMockito.given(existsMemberPort.existsMemberByNickname(nickname, false))
                .willReturn(true);

        //when
        Assertions.assertThatThrownBy(() ->
                checkNicknameService.checkNickname(nickname))
                .isInstanceOf(ExceptionResponse.class)
                .hasFieldOrPropertyWithValue("customException", CustomException.DUPLICATED_NICKNAME_EXCEPTION);
    }

}
