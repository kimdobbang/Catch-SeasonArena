package com.catchcatch.auth.domains.member.adapter.in.web.requestdto;

import jakarta.validation.constraints.NotBlank;

public record ChangeAvatarMainRequestDto(@NotBlank
        String avatar,
        String email
) {

}
