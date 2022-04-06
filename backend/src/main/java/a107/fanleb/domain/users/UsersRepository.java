package a107.fanleb.domain.users;

import a107.fanleb.domain.collections.Collections;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsersRepository extends JpaRepository<Users, Integer> {
    Optional<Users> findByUserAddress(String userAddress);
    Optional<Users> findByNickname(String nickname);
    Page<Users> findAll(Pageable page);
    Page<Users> findByNicknameContaining(Pageable page, String nickname);

}