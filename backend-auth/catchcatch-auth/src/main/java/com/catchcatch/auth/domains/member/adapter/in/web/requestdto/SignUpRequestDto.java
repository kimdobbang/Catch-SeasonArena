package com.catchcatch.auth.domains.member.adapter.in.web.requestdto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

public record SignUpRequestDto(
        @NotBlank String email,
        @NotBlank String password){

}
