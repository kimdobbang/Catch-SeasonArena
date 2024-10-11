package com.catchcatch.main.domains.inventory.application.port.in;

import com.catchcatch.main.domains.inventory.adapter.in.kafka.KafkaSaveInventoryEntity;
import com.catchcatch.main.domains.item.domain.Item;

public interface SaveInventoryUseCase {
	
	void saveInventory(KafkaSaveInventoryEntity kafkaSaveInventoryEntity);
	
}
