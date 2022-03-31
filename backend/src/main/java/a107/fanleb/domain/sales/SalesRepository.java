package a107.fanleb.domain.sales;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SalesRepository extends JpaRepository<Sales, Integer> {
    Optional<Sales> findBySaleContractAddress(String salesContractAddress);
    Optional<Sales> findByTokenId(int tokenId);
}