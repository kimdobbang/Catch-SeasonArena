package com.catchcatch.main.domains.dictionary.adapter.out.persistence;

import com.catchcatch.main.domains.inventory.adapter.out.persistence.InventoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DictionariesRepository  extends JpaRepository<DictionariesEntity, Long> {
    List<DictionariesEntity> findAllByMember_Email(String email);
}
