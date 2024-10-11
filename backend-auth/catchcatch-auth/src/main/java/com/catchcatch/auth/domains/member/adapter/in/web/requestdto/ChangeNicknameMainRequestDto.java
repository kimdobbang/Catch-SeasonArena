package com.catchcatch.auth.domains.member.adapter.in.web.requestdto;

import jakarta.validation.constraints.NotBlank;

public record ChangeNicknameMainRequestDto(
        String nickname,
        String email){

}
