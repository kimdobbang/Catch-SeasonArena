package com.catchcatch.main.domains.member.adapter.in.web.responsedto;

public record EquipmentsDto(
        EquipmentDto weapon,
        EquipmentDto active,
        EquipmentDto passive
) {
}
