package com.catchcatch.main.domains.inventory.adapter.out.persistence;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InventoryRepository extends JpaRepository<InventoryEntity, Long> {

	Optional<InventoryEntity> findByIdAndMember_Email(Long id, String email);
}
