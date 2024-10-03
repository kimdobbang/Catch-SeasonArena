package com.catchcatch.main.domains.dictionary.application.service;

import com.catchcatch.main.domains.dictionary.application.port.in.FindDictionariesUseCase;
import com.catchcatch.main.domains.dictionary.application.port.out.FindDictionariesByEmailPort;
import com.catchcatch.main.domains.dictionary.application.port.out.web.response.DictionariesResponseDto;
import com.catchcatch.main.domains.dictionary.domain.Dictionaries;
import com.catchcatch.main.domains.item.port.out.FindItemPort;
import com.catchcatch.main.domains.item.domain.Item;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FindDictionariesServiceImpl implements FindDictionariesUseCase {

    private final FindDictionariesByEmailPort findDictionariesByEmailPort;
    private final FindItemPort findItemPort;

    @Override
    public List<DictionariesResponseDto> getDictionaries(String email) {
        List<Dictionaries> dictionariesList = findDictionariesByEmailPort.findDictionariesByEmail(email);
        List<Item> allItems = findItemPort.findAllItem();

        Map<Long, Dictionaries> dictionariesMap = dictionariesList.stream()
                .collect(Collectors.toMap(Dictionaries::getItemId, dictionaries -> dictionaries));

        return allItems.stream()
                .map(item -> {
                    Dictionaries dictionaries = dictionariesMap.get(item.getId());

                    return DictionariesResponseDto.builder()
                            .item(item)
                            .count(dictionaries != null ? dictionaries.getCount() : 0)
                            .isCollect(dictionaries != null)
                            .build();
                })
                .collect(Collectors.toList());
    }
}
