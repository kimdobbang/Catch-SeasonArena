package com.catchcatch.main.domains.dictionary.application.port.in;

import com.catchcatch.main.domains.dictionary.application.port.out.web.response.DictionariesResponseDto;

import java.util.List;

public interface FindDictionariesUseCase {
    List<DictionariesResponseDto> getDictionaries(String email);
}
