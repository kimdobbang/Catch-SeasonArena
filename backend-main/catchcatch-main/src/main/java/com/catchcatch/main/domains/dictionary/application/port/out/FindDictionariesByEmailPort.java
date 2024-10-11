package com.catchcatch.main.domains.dictionary.application.port.out;


import com.catchcatch.main.domains.dictionary.domain.Dictionaries;

import java.util.List;

public interface FindDictionariesByEmailPort {
    List<Dictionaries> findDictionariesByEmail(String email);
}
