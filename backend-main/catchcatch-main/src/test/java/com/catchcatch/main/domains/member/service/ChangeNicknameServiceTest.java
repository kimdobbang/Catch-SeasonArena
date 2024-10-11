package com.catchcatch.main.domains.member.service;

import com.catchcatch.main.domains.member.adapter.in.web.requestdto.ChangeNicknameRequestDto;
import com.catchcatch.main.domains.member.application.port.out.ExistsMemberPort;
import com.catchcatch.main.domains.member.application.port.out.FindMemberPort;
import com.catchcatch.main.domains.member.application.port.out.UpdateMemberPort;
import com.catchcatch.main.domains.member.application.service.ChangeNicknameServiceImpl;
import com.catchcatch.main.domains.member.domain.Member;
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
public class ChangeNicknameServiceTest {

    @InjectMocks
    private ChangeNicknameServiceImpl changeNicknameService;

    @Mock
    private ExistsMemberPort existsMemberPort;

    @Mock
    private FindMemberPort findMemberPort;

    @Mock
    private UpdateMemberPort updateMemberPort;

    @Mock
    private Member member;

    private ChangeNicknameRequestDto requestDto;

    @BeforeEach
    void setUp() {
        requestDto = new ChangeNicknameRequestDto(
                "변경 후  닉네임",
                "test@test.com"
        );
    }

    @Test
    @DisplayName("닉네임 변경 성공 테스트")
    public void 닉네임_변경_성공_테스트(){
        //given
        BDDMockito.given(existsMemberPort.existsMemberByNickname(requestDto.nickname(), false))
                        .willReturn(false);
        BDDMockito.given(findMemberPort.findMember(requestDto.email()))
                .willReturn(member);
        BDDMockito.doNothing().when(member).changeNickname(requestDto.nickname());

        //when
        Assertions.assertThatNoException().isThrownBy(()->
                changeNicknameService.changeNickname(requestDto));
    }

    @Test
    @DisplayName("닉네임 중복 변경 실패 테스트")
    public void 닉네임_중복_변경_실패_테스트(){
        //given
        BDDMockito.given(findMemberPort.findMember(requestDto.email()))
                        .willReturn(member);
        BDDMockito.given(existsMemberPort.existsMemberByNickname(requestDto.nickname(), false))
                .willReturn(true);

        Assertions.assertThatThrownBy(()-> changeNicknameService.changeNickname(requestDto))
                .isInstanceOf(ExceptionResponse.class)
                .hasFieldOrPropertyWithValue("customException", CustomException.DUPLICATED_NICKNAME_EXCEPTION);
    }
}
