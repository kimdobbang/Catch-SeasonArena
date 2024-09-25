package com.catchcatch.main.domains.member.application.port.in;

import com.catchcatch.main.domains.member.adapter.in.web.requestdto.ChangeNicknameRequestDto;
import com.catchcatch.main.domains.member.adapter.in.web.responsedto.ChangeNicknameResponseDto;

public interface ChangeNicknameUseCase {

    ChangeNicknameResponseDto changeNickname(ChangeNicknameRequestDto requestDto);
}
