package com.catchcatch.main.domains.item.port.out;

import com.catchcatch.main.domains.item.adapter.out.persistence.ItemEntity;

public interface FindItemPort {
	ItemEntity findItemById(Long id);
}
