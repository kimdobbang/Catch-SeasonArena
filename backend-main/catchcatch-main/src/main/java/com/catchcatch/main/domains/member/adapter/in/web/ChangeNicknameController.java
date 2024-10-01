package com.catchcatch.main.domains.member.adapter.in.web;

import com.catchcatch.main.domains.member.adapter.in.web.requestdto.ChangeNicknameRequestDto;
import com.catchcatch.main.domains.member.adapter.in.web.responsedto.ChangeNicknameResponseDto;
import com.catchcatch.main.domains.member.application.port.in.ChangeNicknameUseCase;
import com.catchcatch.main.global.util.HttpResponseUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/main/members")
@RequiredArgsConstructor
@Slf4j
public class ChangeNicknameController {

    private final ChangeNicknameUseCase changeNicknameUseCase;
    private final HttpResponseUtil responseUtil;

    @PatchMapping("/nickname")
    public ResponseEntity<?> changeNickname(@Valid @RequestBody ChangeNicknameRequestDto requestDto) {
        ChangeNicknameResponseDto responseDto = changeNicknameUseCase.changeNickname(requestDto);

        ResponseEntity<?> response = responseUtil.createResponse(responseDto);
        return response;
    }
}
