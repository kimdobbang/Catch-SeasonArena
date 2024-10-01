package com.catchcatch.main.domains.member.service;

import com.catchcatch.main.domains.inventory.adapter.out.persistence.InventoryEntity;
import com.catchcatch.main.domains.inventory.application.port.out.FindEquipInventoryByEmailPort;
import com.catchcatch.main.domains.inventory.domain.Inventory;
import com.catchcatch.main.domains.member.adapter.in.web.responsedto.FindMyInfoResponseDto;
import com.catchcatch.main.domains.member.application.port.out.FindMemberPort;
import com.catchcatch.main.domains.member.application.service.FindMyInfoServiceImpl;
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

import java.util.List;

@ExtendWith(MockitoExtension.class)
public class FindMyInfoServiceTest {

    @InjectMocks
    private FindMyInfoServiceImpl findMyInfoService;

    @Mock
    private FindMemberPort findMemberPort;

    @Mock
    private FindEquipInventoryByEmailPort findEquipInventoryByEmailPort;

    @Mock
    private Member member;

    @Mock
    private List<Inventory> inventoryEntities;

    @Mock
    private List<Long> equipItems;

    private String email;
    private FindMyInfoResponseDto responseDto;

    @BeforeEach
    void setUp() {
        email = "email@email.com";
        responseDto = FindMyInfoResponseDto.createFindMyInfoResponseDto(
                member,
                equipItems
        );
    }

    @Test
    @DisplayName("내 정보 찾기 성공 테스트")
    public void 내_정보_찾기_성공_테스트(){
        //given
        BDDMockito.given(findMemberPort.findMember(email)).willReturn(member);
        BDDMockito.given(findEquipInventoryByEmailPort.findEquipInventoryByEmail(email))
                .willReturn(inventoryEntities);

        Assertions.assertThatNoException().isThrownBy(
                () -> findMyInfoService.findMyInfo(email)
        );
    }
}
