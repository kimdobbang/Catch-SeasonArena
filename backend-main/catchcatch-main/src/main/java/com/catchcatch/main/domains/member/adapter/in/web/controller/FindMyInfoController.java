package com.catchcatch.main.domains.member.adapter.in.web.controller;

import com.catchcatch.main.domains.member.adapter.in.web.responsedto.FindMyInfoResponseDto;
import com.catchcatch.main.domains.member.application.port.in.FindMyInfoUseCase;
import com.catchcatch.main.global.util.HttpResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/main/members")
@RequiredArgsConstructor
@Slf4j(topic = "main")
public class FindMyInfoController {

    private final FindMyInfoUseCase findMyInfoUseCase;
    private final HttpResponseUtil responseUtil;

    @GetMapping("/info/{member-email}")
    public ResponseEntity<?> findMyInfo(@PathVariable("member-email") String memberEmail) {
        log.info("BE/MAIN - request memberEmail : {}", memberEmail);
        FindMyInfoResponseDto responseDto = findMyInfoUseCase.findMyInfo(memberEmail);

        ResponseEntity<?> response = responseUtil.createResponse(responseDto);
        log.info("BE/MAIN - response : {}", response);

        return response;
    }
}
