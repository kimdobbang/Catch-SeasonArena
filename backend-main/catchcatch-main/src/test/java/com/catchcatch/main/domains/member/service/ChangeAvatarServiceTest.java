package com.catchcatch.main.domains.member.service;

import com.catchcatch.main.domains.member.adapter.in.web.requestdto.ChangeAvatarRequestDto;
import com.catchcatch.main.domains.member.adapter.in.web.responsedto.ChangeAvatarResponseDto;
import com.catchcatch.main.domains.member.application.port.out.FindMemberPort;
import com.catchcatch.main.domains.member.application.port.out.UpdateMemberPort;
import com.catchcatch.main.domains.member.application.service.ChangeAvatarServiceImpl;
import com.catchcatch.main.domains.member.domain.Member;
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
public class ChangeAvatarServiceTest {

    @InjectMocks
    private ChangeAvatarServiceImpl changeAvatarService;

    @Mock
    private FindMemberPort findMemberPort;

    @Mock
    private UpdateMemberPort updateMemberPort;

    @Mock
    private Member member;

    private ChangeAvatarRequestDto requestDto;
    private ChangeAvatarResponseDto responseDto;

    @BeforeEach
    void setUp() {
        requestDto = new ChangeAvatarRequestDto("avatar", "test@test.com");
        responseDto = new ChangeAvatarResponseDto(requestDto.avatar());
    }

    @Test
    @DisplayName("아바타 변경 성공 테스트")
    public void 아바타_변경_성공_테스트(){
        //given
        BDDMockito.given(findMemberPort.findMember(requestDto.email()))
                .willReturn(member);
        BDDMockito.doNothing().when(updateMemberPort).updateMember(member);

        //when
        Assertions.assertThatNoException().isThrownBy(()->changeAvatarService.changeAvatar(requestDto));
    }
}
