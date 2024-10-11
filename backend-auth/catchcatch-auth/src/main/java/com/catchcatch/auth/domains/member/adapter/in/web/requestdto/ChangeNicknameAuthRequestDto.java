package com.catchcatch.auth.domains.member.adapter.in.web.requestdto;

import jakarta.validation.Valid;

public record ChangeNicknameAuthRequestDto(
        @Valid String nickname
) {

}
