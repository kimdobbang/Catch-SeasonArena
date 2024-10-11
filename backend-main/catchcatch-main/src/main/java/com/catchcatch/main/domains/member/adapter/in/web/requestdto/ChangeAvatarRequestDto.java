package com.catchcatch.main.domains.member.adapter.in.web.requestdto;

import jakarta.validation.constraints.NotBlank;

public record ChangeAvatarRequestDto(
        @NotBlank String avatar,
        @NotBlank String email
) {
}
