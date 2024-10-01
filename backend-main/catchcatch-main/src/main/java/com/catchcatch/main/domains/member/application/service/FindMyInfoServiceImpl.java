package com.catchcatch.main.domains.member.application.service;

import com.catchcatch.main.domains.inventory.adapter.out.persistence.InventoryEntity;
import com.catchcatch.main.domains.inventory.application.port.out.FindEquipInventoryByEmailPort;
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

    @Override
    public FindMyInfoResponseDto findMyInfo(String email){
        Member member = findMemberPort.findMember(email);
        List<InventoryEntity> inventoryEntities = findEquipInventoryByEmailPort.findEquipInventoryByEmail(email);
        List<Long> equipItems = new ArrayList<>();
        for(int i=0; i<inventoryEntities.size(); i++){
            equipItems.add(inventoryEntities.get(i).getItem().getId());
        }

        FindMyInfoResponseDto responseDto = FindMyInfoResponseDto.createFindMyInfoResponseDto(
                findMemberPort.findMember(email), equipItems);

        return responseDto;
    }
}
