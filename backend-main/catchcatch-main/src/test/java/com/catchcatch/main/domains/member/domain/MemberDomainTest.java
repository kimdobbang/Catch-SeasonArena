package com.catchcatch.main.domains.member.domain;

import com.catchcatch.main.domains.member.domain.Member;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.BDDMockito;
import org.mockito.Mockito;

public class MemberDomainTest {

    private Member member;
    private String nickname;
    private String avatar;

    @BeforeEach
    void setUp() {
        member = Mockito.mock(Member.class);
        nickname = "Nickname";
        avatar = "Avatar";
    }

    @Test
    @DisplayName("닉네임 변경 도메인 테스트")
    public void 닉네임_변경_도메인_테스트(){
        BDDMockito.doNothing().when(member).changeNickname(nickname);
        Assertions.assertThatNoException().isThrownBy(() -> member.changeNickname(nickname));
    }

    @Test
    @DisplayName("아바타 변경 도메인 테스트")
    public void 아바타_변경_도메인_테스트(){
        BDDMockito.doNothing().when(member).changeAvatar(avatar);
        Assertions.assertThatNoException().isThrownBy(() -> member.changeAvatar(avatar));
    }
}
