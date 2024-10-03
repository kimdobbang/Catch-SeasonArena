package com.catchcatch.main.domains.dictionary.application.port.in;

import com.catchcatch.main.domains.inventory.adapter.in.kafka.KafkaSaveInventoryEntity;

public interface SaveDictionariesUseCase {
    void saveDictionaries(KafkaSaveInventoryEntity kafkaSaveInventoryEntity);
}
