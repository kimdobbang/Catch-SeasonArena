package com.catchcatch.main.domains.item.adapter.out.persistence;


import org.springframework.data.jpa.repository.JpaRepository;


public interface ItemEntityRepository extends JpaRepository<ItemEntity, Long> {

    ItemEntity findByItemId(Long id);
}
