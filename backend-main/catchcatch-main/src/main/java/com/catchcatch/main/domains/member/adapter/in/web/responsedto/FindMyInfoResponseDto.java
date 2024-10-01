package com.catchcatch.main.domains.member.adapter.in.web.responsedto;

import com.catchcatch.main.domains.member.domain.Member;
import lombok.Builder;

import java.util.List;

@Builder
public record FindMyInfoResponseDto(
        String email,
        String nickname,
        Integer rating,
        String avatar,
        List<Long> equipItems
) {

    public static FindMyInfoResponseDto createFindMyInfoResponseDto(Member member, List<Long> equipItems) {
        return FindMyInfoResponseDto.builder()
                .email(member.getEmail())
                .nickname(member.getNickname())
                .rating(member.getRating())
                .avatar(member.getAvatar())
                .equipItems(equipItems)
                .build();
    }
}
