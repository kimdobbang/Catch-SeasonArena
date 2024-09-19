package com.catchcatch.auth.domains.member.adapter.in.web.requestdto;

import jakarta.validation.constraints.NotBlank;

public record LoginRequestDto(
        @NotBlank String email,
        @NotBlank String password){

}
