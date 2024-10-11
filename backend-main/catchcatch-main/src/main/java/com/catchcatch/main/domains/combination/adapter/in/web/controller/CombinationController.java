package com.catchcatch.main.domains.combination.adapter.in.web.controller;

import com.catchcatch.main.domains.combination.application.port.in.CombinationUseCase;
import com.catchcatch.main.domains.combination.application.port.out.CombiResponseDto;
import com.catchcatch.main.domains.dictionary.application.port.in.SaveDictionariesUseCase;
import com.catchcatch.main.global.util.HttpResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/main/combinations")
@RequiredArgsConstructor
@Slf4j(topic = "main")
public class CombinationController {

    private final HttpResponseUtil responseUtil;
    private final CombinationUseCase combinationUseCase;

    @PostMapping("/{email}/{item1}/{item2}")
    public ResponseEntity<?> Combi(@PathVariable("email") String email, @PathVariable("item1") Long item1, @PathVariable("item2") Long item2) {
        CombiResponseDto responseDto = combinationUseCase.combiItem(email, item1, item2);
        return responseUtil.createResponse(responseDto);
    }
}
