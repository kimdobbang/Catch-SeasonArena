package com.catchcatch.main.domains.item.service;

import org.springframework.stereotype.Service;

import com.catchcatch.main.domains.item.domain.Item;
import com.catchcatch.main.domains.item.port.in.FindItemUseCase;
import com.catchcatch.main.domains.item.port.out.FindItemPort;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ItemServiceImpl implements FindItemUseCase {

	private final FindItemPort findItemPort;
	
	@Override
	public Item findItemById(Long id) {
		return Item.fromEntity(findItemPort.findItemById(id));
	}

}
