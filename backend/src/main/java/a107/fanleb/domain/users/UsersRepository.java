package a107.fanleb.domain.users;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsersRepository extends JpaRepository<Users, Integer> {
    Optional<Users> findByUserAddress(String userAddress);
    void deleteByUserAddress(String userAddress);
}