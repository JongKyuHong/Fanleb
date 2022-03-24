package a107.fanleb.domain.usersCategory;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersCategoryRepository extends JpaRepository<UsersCategory, Integer> {
    UsersCategory findByUserCategoryName(String userCategoryName);
}