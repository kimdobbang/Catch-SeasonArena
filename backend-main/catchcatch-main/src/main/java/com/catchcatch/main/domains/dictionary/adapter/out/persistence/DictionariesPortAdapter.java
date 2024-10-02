package com.catchcatch.main.domains.dictionary.adapter.out.persistence;

import com.catchcatch.main.domains.dictionary.application.port.out.FindDictionariesByEmailPort;
import com.catchcatch.main.domains.dictionary.application.port.out.SaveDictionariesPort;
import com.catchcatch.main.domains.dictionary.domain.Dictionaries;
import com.catchcatch.main.domains.member.adapter.out.persistence.MemberEntity;
import com.catchcatch.main.domains.member.adapter.out.persistence.MemberEntityRepository;
import com.catchcatch.main.global.exception.CustomException;
import com.catchcatch.main.global.exception.ExceptionResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
@Slf4j(topic = "main")
public class DictionariesPortAdapter implements FindDictionariesByEmailPort, SaveDictionariesPort {

    private final DictionariesRepository dictionariesRepository;
    private final MemberEntityRepository memberEntityRepository;

    @Override
    public List<Dictionaries> findDictionariesByEmail(String email) {
        List<DictionariesEntity> dictionariesEntityList = dictionariesRepository.findAllByMember_Email(email);

        List<Dictionaries> dictionariesList = dictionariesEntityList.stream()
                .map(Dictionaries::fromEntity)
                .collect(Collectors.toList());

        return dictionariesList;
    }

    @Override
    public void saveDictionaries(Dictionaries dictionaries) {
        MemberEntity member = memberEntityRepository.findById(dictionaries.getUserId())
                        .orElseThrow(() -> {
            log.error("BE/MAIN - errorse", CustomException.NOT_EXISTS_MEMBER_EXCEPTION);
            return new ExceptionResponse(CustomException.NOT_EXISTS_MEMBER_EXCEPTION);
        });

        dictionariesRepository.save(DictionariesEntity.fromDomain(member, dictionaries));
    }




}
