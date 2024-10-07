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
        String email,
        String nickname,
        Integer rating,
        String selectedAvatar,
        EquipmentsDto equipment
) {

    public static FindMyInfoResponseDto createFindMyInfoResponseDto(Member member, List<Inventory> equipItems) {
        return FindMyInfoResponseDto.builder()
                .email(member.getEmail())
                .nickname(member.getNickname())
                .rating(member.getRating())
                .selectedAvatar(member.getAvatar())
                .equipment(createEquipment(equipItems))
                .build();
    }

    private static EquipmentsDto createEquipment(List<Inventory> equipItems) {
        EquipmentDto[] itemType = new EquipmentDto[3];

        for(int i=0; i<equipItems.size(); i++) {
            Inventory inventory = equipItems.get(i);
            if(inventory.getItem().getType().equals(Type.WEAPON)
                && itemType[0] == null){
                itemType[0] = new EquipmentDto(inventory.getId(), inventory.getItem().getId());
                continue;
            }
            if(inventory.getItem().getType().equals(Type.ACTIVE)
                && itemType[1] == null){
                itemType[1] = new EquipmentDto(inventory.getId(), inventory.getItem().getId());
                continue;
            }
            if(inventory.getItem().getType().equals(Type.PASSIVE)
                && itemType[2] == null){
                itemType[2] = new EquipmentDto(inventory.getId(), inventory.getItem().getId());
                continue;
            }

            throw new ExceptionResponse(CustomException.DUPLICATED_EQUIPMENT_TYPE_EXCEPTION);
        }

        return new EquipmentsDto(itemType[0], itemType[1], itemType[2]);
    }
}
