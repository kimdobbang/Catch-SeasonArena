package com.catchcatch.main.domains.item.adapter.out.persistence;

import org.springframework.stereotype.Component;


import com.catchcatch.main.domains.item.port.out.FindItemPort;
import com.catchcatch.main.global.exception.CustomException;
import com.catchcatch.main.global.exception.ExceptionResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j(topic = "main")
public class ItemAdapter implements FindItemPort{

	private final ItemEntityRepository itemRepository;

	@Override
	public ItemEntity findItemById(Long id) {
		ItemEntity itemEntity = itemRepository.findById(id)
				.orElseThrow(() -> new ExceptionResponse(
						CustomException.NOT_EXISTS_ITEM_EXCEPTION));
		
		log.error("BE/MAIN - error : {}", CustomException.NOT_EXISTS_ITEM_EXCEPTION);
		return itemEntity;
	}
}
