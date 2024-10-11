package com.catchcatch.main.domains.dictionary.adapter.in.web.controller;

import com.catchcatch.main.domains.dictionary.application.port.in.FindDictionariesUseCase;
import com.catchcatch.main.domains.dictionary.application.port.out.web.response.DictionariesResponseDto;
import com.catchcatch.main.global.util.HttpResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/main/dictionaries")
@RequiredArgsConstructor
@Slf4j
public class FindDicionariesController {

    private final HttpResponseUtil responseUtil;
    private final FindDictionariesUseCase findDictionariesUseCase;
    @GetMapping("/{email}")
    public ResponseEntity<?> findDictionaries(@PathVariable("email") String email) {
        List<DictionariesResponseDto> dictionariesResponseDtoList = findDictionariesUseCase.getDictionaries(email);
        return responseUtil.createResponse(dictionariesResponseDtoList);
    }
}
