package com.catchcatch.main.domains.member.application.port.in;

import com.catchcatch.main.domains.member.adapter.in.web.requestdto.ChangeAvatarRequestDto;
import com.catchcatch.main.domains.member.adapter.in.web.responsedto.ChangeAvatarResponseDto;

public interface ChangeAvatarUseCase {

    ChangeAvatarResponseDto changeAvatar(ChangeAvatarRequestDto changeAvatarRequestDto);
}
