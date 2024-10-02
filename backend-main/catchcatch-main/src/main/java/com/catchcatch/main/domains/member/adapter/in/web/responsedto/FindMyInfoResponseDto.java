package com.catchcatch.main.domains.member.adapter.in.web.responsedto;

import com.catchcatch.main.domains.inventory.domain.Inventory;
import com.catchcatch.main.domains.item.adapter.out.persistence.Type;
import com.catchcatch.main.domains.member.domain.Member;
import com.catchcatch.main.global.exception.CustomException;
import com.catchcatch.main.global.exception.ExceptionResponse;
import lombok.Builder;

import java.util.List;

@Builder
public record FindMyInfoResponseDto(
        UserInfoDto userInfo,
        Integer rating,
        String avatar,
        EquipmentDto equipment
) {

    public static FindMyInfoResponseDto createFindMyInfoResponseDto(Member member, List<Inventory> equipItems) {
        return FindMyInfoResponseDto.builder()
                .userInfo(new UserInfoDto(member.getEmail(), member.getNickname()))
                .rating(member.getRating())
                .avatar(member.getAvatar())
                .equipment(createEquipment(equipItems))
                .build();
    }

    private static EquipmentDto createEquipment(List<Inventory> equipItems) {
        Long[] itemType = new Long[3];
        for(int i=0; i<3; i++) itemType[i] = 0L;

        for(int i=0; i<equipItems.size(); i++) {
            Inventory inventory = equipItems.get(i);
            if(inventory.getItem().getType().equals(Type.WEAPON)
                && itemType[0] == 0L){
                itemType[0] = inventory.getId();
                continue;
            }
            if(inventory.getItem().getType().equals(Type.ACTIVE)
                && itemType[1] == 0L){
                itemType[1] = inventory.getId();
                continue;
            }
            if(inventory.getItem().getType().equals(Type.PASSIVE)
                && itemType[2] == 0L){
                itemType[2] = inventory.getId();
                continue;
            }

            throw new ExceptionResponse(CustomException.DUPLICATED_EQUIPMENT_TYPE_EXCEPTION);
        }

        return new EquipmentDto(itemType[0], itemType[1], itemType[2]);
    }
}
