package com.catchcatch.main.domains.dictionary.adapter.in.web.controller;

import com.catchcatch.main.domains.dictionary.application.port.in.SaveDictionariesUseCase;
import com.catchcatch.main.global.util.HttpResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/main/dictionaries")
@RequiredArgsConstructor
@Slf4j(topic = "main")
public class SaveDictionariesController {

    private final HttpResponseUtil responseUtil;
    private final SaveDictionariesUseCase saveDicionariesUseCase;

    @PostMapping("{itemId}/{email}")
    public ResponseEntity<?> saveDictionaries(@PathVariable("email") String email, @PathVariable("itemId") Long id) {
        saveDicionariesUseCase.saveDictionaries(email, id);
        return responseUtil.createSuccessResponse("success","suuc","201");
    }
}
