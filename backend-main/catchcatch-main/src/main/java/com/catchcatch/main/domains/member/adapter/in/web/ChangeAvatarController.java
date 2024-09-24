package com.catchcatch.main.domains.member.adapter.in.web;

import com.catchcatch.main.domains.member.adapter.in.web.requestdto.ChangeAvatarRequestDto;
import com.catchcatch.main.domains.member.adapter.in.web.responsedto.ChangeAvatarResponseDto;
import com.catchcatch.main.domains.member.application.port.in.ChangeAvatarUseCase;
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
public class ChangeAvatarController {

    private final ChangeAvatarUseCase changeAvatarUseCase;
    private final HttpResponseUtil responseUtil;

    @PatchMapping("/avatar")
    public ResponseEntity<?> changeAvatar(@Valid @RequestBody ChangeAvatarRequestDto requestDto){
        ChangeAvatarResponseDto responseDto = changeAvatarUseCase.changeAvatar(requestDto);
        return responseUtil.createResponse(responseDto);
    }

}
