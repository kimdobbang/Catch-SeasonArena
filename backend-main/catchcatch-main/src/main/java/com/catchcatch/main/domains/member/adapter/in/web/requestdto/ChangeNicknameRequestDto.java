package com.catchcatch.main.domains.member.adapter.in.web.requestdto;

import jakarta.validation.constraints.NotBlank;

public record ChangeNicknameRequestDto(
        @NotBlank String nickname,
        @NotBlank String email){

}
