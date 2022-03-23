package a107.fanleb.domain.collections;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CollectionsRepository extends JpaRepository<Collections, Integer> {
    Optional<Collections> findByCollectionNameAndUserAddress(String collectionName, String userAddress);
}