package a107.fanleb.domain.usersCategory;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@ToString
@Builder
@NoArgsConstructor
@Getter
@Entity
public class UsersCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_category_id", nullable = false)
    private Integer id;

    @Column(unique = true, nullable = false)
    private String userCategoryName;
}