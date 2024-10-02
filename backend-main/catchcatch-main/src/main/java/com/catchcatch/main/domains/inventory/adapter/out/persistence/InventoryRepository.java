package com.catchcatch.main.domains.inventory.adapter.out.persistence;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InventoryRepository extends JpaRepository<InventoryEntity, Long> {

	Optional<InventoryEntity> findByIdAndMember_Email(Long id, String email);
	List<InventoryEntity> findAllByMember_Email(String email);
	@EntityGraph(attributePaths = {"item"})
	List<InventoryEntity> findAllByMember_EmailAndIsEquipped(String email, boolean isEquipped);
}
