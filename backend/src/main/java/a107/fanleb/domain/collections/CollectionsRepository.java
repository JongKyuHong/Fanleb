package a107.fanleb.domain.collections;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CollectionsRepository extends JpaRepository<Collections, Integer> {
    Optional<Collections> findByCollectionNameAndUserAddress(String collectionName, String userAddress);
    Page<Collections> findByUserAddress(Pageable page, String userAddress);
    Page<Collections> findAll(Pageable page);
}