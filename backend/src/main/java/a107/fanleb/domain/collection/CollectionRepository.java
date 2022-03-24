package a107.fanleb.domain.collection;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CollectionRepository extends JpaRepository<Collection, Integer> {
    Optional<Collection> findByCollectionNameAndUserAddress(String collectionName, String userAddress);
}