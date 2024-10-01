package com.catchcatch.main.domains.item.port.in;

import com.catchcatch.main.domains.item.domain.Item;

public interface FindItemUseCase {
	Item findItemById(Long id);
}
