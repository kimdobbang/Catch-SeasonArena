package com.catchcatch.main.domains.item.port.out;

import com.catchcatch.main.domains.item.adapter.out.persistence.ItemEntity;
import com.catchcatch.main.domains.item.domain.Item;

import java.util.List;

public interface FindItemPort {
	Item findItemById(Long id);
	List<Item> findAllItem();
}
