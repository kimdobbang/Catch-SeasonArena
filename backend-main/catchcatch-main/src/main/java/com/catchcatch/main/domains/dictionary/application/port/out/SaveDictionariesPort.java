package com.catchcatch.main.domains.dictionary.application.port.out;


import com.catchcatch.main.domains.dictionary.domain.Dictionaries;

public interface SaveDictionariesPort {
    void saveDictionaries(Dictionaries dictionaries);
    void updateDictionaries(Dictionaries dictionaries);
}
