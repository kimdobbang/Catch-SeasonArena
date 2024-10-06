package com.catchcatch.main.domains.member.application.service;

import com.catchcatch.main.domains.inventory.adapter.out.persistence.InventoryEntity;
import com.catchcatch.main.domains.inventory.application.port.out.FindEquipInventoryByEmailPort;
import com.catchcatch.main.domains.inventory.domain.Inventory;
import com.catchcatch.main.domains.member.adapter.in.web.responsedto.FindMyInfoResponseDto;
import com.catchcatch.main.domains.member.application.port.in.FindMyInfoUseCase;
import com.catchcatch.main.domains.member.application.port.out.FindMemberPort;
import com.catchcatch.main.domains.member.domain.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FindMyInfoServiceImpl implements FindMyInfoUseCase {

    private final FindMemberPort findMemberPort;
    private final FindEquipInventoryByEmailPort findEquipInventoryByEmailPort;

    @Transactional
    @Override
    public FindMyInfoResponseDto findMyInfo(String email){
        Member member = findMemberPort.findMember(email);
        List<Inventory> inventories = findEquipInventoryByEmailPort.findEquipInventoryByEmail(email);

        FindMyInfoResponseDto responseDto = FindMyInfoResponseDto.createFindMyInfoResponseDto(member, inventories);

        return responseDto;
    }
}
