package com.catchcatch.main.domains.item.adapter.out.persistence;

import com.catchcatch.main.domains.item.domain.Item;
import org.springframework.stereotype.Component;


import com.catchcatch.main.domains.item.port.out.FindItemPort;
import com.catchcatch.main.global.exception.CustomException;
import com.catchcatch.main.global.exception.ExceptionResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
@Slf4j(topic = "main")
public class ItemAdapter implements FindItemPort{

	private final ItemEntityRepository itemRepository;

	@Override
	public Item findItemById(Long id) {
		ItemEntity itemEntity = itemRepository.findById(id)
				.orElseThrow(() -> new ExceptionResponse(
						CustomException.NOT_EXISTS_ITEM_EXCEPTION));
		
		log.error("BE/MAIN - error : {}", CustomException.NOT_EXISTS_ITEM_EXCEPTION);
		return Item.fromEntity(itemEntity);
	}

	@Override
	public List<Item> findAllItem() {
		// 1. ItemEntity 리스트를 조회
		List<ItemEntity> itemEntities = itemRepository.findAll();

		// 2. ItemEntity를 Item으로 변환하여 리스트 반환
		return itemEntities.stream()
				.map(Item::fromEntity) // 각 ItemEntity를 Item으로 변환
				.collect(Collectors.toList());
	}
}
