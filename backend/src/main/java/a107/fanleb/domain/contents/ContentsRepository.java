package a107.fanleb.domain.contents;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ContentsRepository extends JpaRepository<Contents, Integer> {
    @Modifying
    @Query("UPDATE Contents c SET c.tokenId=:tokenId, c.ownerAddress=:ownerAddress WHERE c.id=:contentId")
    void update(@Param("tokenId") int tokenId, @Param("ownerAddress") String ownerAddress, @Param("contentId") int contentId);

    Optional<Contents> findByTokenId(int tokenId);

    @Modifying
    @Query("DELETE FROM Contents WHERE tokenId=:tokenId")
    void deleteByTokenId(@Param("tokenId") int tokenId);
}