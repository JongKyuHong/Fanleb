package a107.fanleb.domain.usersCategory;

import lombok.*;

import javax.persistence.*;

@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
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