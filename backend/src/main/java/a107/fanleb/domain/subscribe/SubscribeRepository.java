package a107.fanleb.domain.subscribe;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SubscribeRepository extends JpaRepository<Subscribe, Integer> {
    @Modifying
    @Query(value = "INSERT INTO subscribe (from_user_address, to_user_address) VALUES (:fromUserAddress, :toUserAddress)", nativeQuery = true)
    void subscribe(@Param("fromUserAddress") String fromUserAddress, @Param("toUserAddress") String toUserAddress);

    @Modifying
    @Query(value = "DELETE FROM subscribe WHERE from_user_address=:fromUserAddress AND to_user_address=:toUserAddress", nativeQuery = true)
    void unsubscribe(@Param("fromUserAddress") String fromUserAddress, @Param("toUserAddress") String toUserAddress);

    @Query(value = "SELECT COUNT(*)>0 FROM Subscribe s WHERE from_user_address=:fromUserAddress AND to_user_address=:toUserAddress", nativeQuery = true)
    int findByFromUserAddressAndToUserAddress(@Param("fromUserAddress") String fromUserAddress, @Param("toUserAddress") String toUserAddress);
}