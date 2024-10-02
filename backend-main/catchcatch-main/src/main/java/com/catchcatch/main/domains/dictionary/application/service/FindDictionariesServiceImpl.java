package com.catchcatch.main.domains.dictionary.application.service;

import com.catchcatch.main.domains.dictionary.application.port.in.FindDicionariesUseCase;
import com.catchcatch.main.domains.dictionary.application.port.out.FindDictionariesByEmailPort;
import com.catchcatch.main.domains.dictionary.application.port.out.web.response.DictionariesResponseDto;
import com.catchcatch.main.domains.dictionary.domain.Dictionaries;
import com.catchcatch.main.domains.item.port.out.FindItemPort;
import com.catchcatch.main.domains.item.domain.Item;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FindDictionariesServiceImpl implements FindDicionariesUseCase {

    private final FindDictionariesByEmailPort findDictionariesByEmailPort;
    private final FindItemPort findItemPort;
    @Override
    public List<DictionariesResponseDto> getDictionaries(String email) {
        List<Dictionaries> dictionariesList = findDictionariesByEmailPort.findDictionariesByEmail(email);

        return dictionariesList.stream()
                .map(dictionaries -> {
                    Item item = Item.fromEntity(findItemPort.findItemById(dictionaries.getItemId()));
                    return new DictionariesResponseDto(
                            item,
                            dictionaries.getCreatedAt(),
                            dictionaries.getModifiedAt(),
                            dictionaries.getCount()
                    );
                })
                .collect(Collectors.toList());
    }
}
