package com.catchcatch.main.domains.dictionary.application.service;


import com.catchcatch.main.domains.dictionary.application.port.in.SaveDictionariesUseCase;
import com.catchcatch.main.domains.dictionary.application.port.out.FindDictionariesByEmailPort;
import com.catchcatch.main.domains.dictionary.application.port.out.SaveDictionariesPort;
import com.catchcatch.main.domains.dictionary.domain.Dictionaries;
import com.catchcatch.main.domains.inventory.adapter.in.kafka.KafkaSaveInventoryEntity;
import com.catchcatch.main.domains.item.port.out.FindItemPort;
import com.catchcatch.main.domains.member.application.port.out.FindMemberPort;
import com.catchcatch.main.domains.member.domain.Member;

import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class SaveDictionariesServiceImpl implements SaveDictionariesUseCase {

    private final FindMemberPort findMemberPort;
    private final SaveDictionariesPort saveDictionariesPort;
    private final FindDictionariesByEmailPort findDictionariesByEmailPort;
    private final FindItemPort findItemPort;

    @Override
    @EventListener
    @Async
    public void saveDictionaries(KafkaSaveInventoryEntity kafkaSaveInventoryEntity) {
        List<Dictionaries> dictionariesList = findDictionariesByEmailPort.findDictionariesByEmail(kafkaSaveInventoryEntity.getEmail());
        Member member = findMemberPort.findMember(kafkaSaveInventoryEntity.getEmail());
        Dictionaries existingDictionary = dictionariesList.stream()
                .filter(dictionary -> dictionary.getItemId().equals(kafkaSaveInventoryEntity.getItemId()))
                .findFirst()
                .orElse(null);
        if(existingDictionary != null){
            saveDictionariesPort.updateDictionaries(existingDictionary);
            return;
        }
        Dictionaries newDictionary = Dictionaries.builder()
                    .userId(member.getMemberId())
                    .itemId(kafkaSaveInventoryEntity.getItemId())
                    .count(1)
                    .build();
        saveDictionariesPort.saveDictionaries(newDictionary);
    }
}
