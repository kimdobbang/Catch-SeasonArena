package com.catchcatch.main.domains.dictionary.application.service;


import com.catchcatch.main.domains.dictionary.application.port.in.SaveDictionariesUseCase;
import com.catchcatch.main.domains.dictionary.application.port.out.FindDictionariesByEmailPort;
import com.catchcatch.main.domains.dictionary.application.port.out.SaveDictionariesPort;
import com.catchcatch.main.domains.dictionary.domain.Dictionaries;
import com.catchcatch.main.domains.item.port.out.FindItemPort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class SaveDictionariesServiceImpl implements SaveDictionariesUseCase {

    private final SaveDictionariesPort saveDictionariesPort;
    private final FindDictionariesByEmailPort findDictionariesByEmailPort;
    private final FindItemPort findItemPort;

    @Override
    public void saveDictionaries(String email, Long itemId) {
        List<Dictionaries> dictionariesList = findDictionariesByEmailPort.findDictionariesByEmail(email);

        Dictionaries existingDictionary = dictionariesList.stream()
                .filter(dictionary -> dictionary.getItemId().equals(itemId))
                .findFirst()
                .orElse(null);
        Dictionaries newDictionary = null;
        if (existingDictionary == null) {
            newDictionary = Dictionaries.builder()
                    .userId(existingDictionary.getUserId())
                    .itemId(itemId)
                    .createdAt(LocalDateTime.now())
                    .modifiedAt(LocalDateTime.now())
                    .count(1)
                    .build();
        } else {
            newDictionary = Dictionaries.builder()
                    .userId(existingDictionary.getUserId())
                    .itemId(itemId)
                    .createdAt(existingDictionary.getCreatedAt())
                    .modifiedAt(LocalDateTime.now())
                    .count(existingDictionary.getCount())
                    .build();
        }
        saveDictionariesPort.saveDictionaries(newDictionary);
    }
}
