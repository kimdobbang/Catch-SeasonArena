package com.catchcatch.auth.domains.member.application.port.in;

import com.catchcatch.auth.domains.member.adapter.in.web.requestdto.SignUpRequestDto;

public interface SignUpUseCase {

    void singUp(SignUpRequestDto requestDto);
}
