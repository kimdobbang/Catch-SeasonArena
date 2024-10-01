package com.catchcatch.main.domains.member.application.port.in;

import com.catchcatch.main.domains.member.adapter.in.web.responsedto.FindMyInfoResponseDto;

public interface FindMyInfoUseCase {

    FindMyInfoResponseDto findMyInfo(String email);
}
