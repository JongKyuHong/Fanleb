package a107.fanleb.domain.contents;

import a107.fanleb.domain.collections.Collections;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ContentsRepository extends JpaRepository<Contents, Integer> {
    @Modifying
    @Query(value = "UPDATE Contents c SET c.token_id=:tokenId, c.owner_address=:ownerAddress, c.collection_id=:collectionId WHERE c.content_id=:contentId", nativeQuery = true)
    void update(@Param("tokenId") int tokenId, @Param("ownerAddress") String ownerAddress, @Param("contentId") int contentId, @Param("collectionId") Integer collectionId);

    Optional<Contents> findByTokenId(int tokenId);

    @Modifying
    @Query("DELETE FROM Contents WHERE tokenId=:tokenId")
    void deleteByTokenId(@Param("tokenId") int tokenId);

    Page<Contents> findByOwnerAddress(Pageable pageable, String ownerAddress);

    List<Contents> findByOwnerAddress(String ownerAddress);

    Page<Contents> findByOwnerAddressAndCollection(Pageable pageable, String ownerAddress, Collections collection);

    Page<Contents> findByRecentOwnerAddress(Pageable pageable, String address);

}