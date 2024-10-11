package com.catchcatch.main.domains.item.adapter.out.persistence;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ItemEntityRepository extends JpaRepository<ItemEntity, Long> {

    Optional<ItemEntity> findById(Long id);
}
