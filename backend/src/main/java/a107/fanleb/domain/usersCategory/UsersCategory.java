package a107.fanleb.domain.usersCategory;

import a107.fanleb.domain.users.Users;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@ToString(exclude = "users")
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

    @JsonIgnore
    @OneToMany(mappedBy = "usersCategory", cascade = CascadeType.ALL) //참조를 당하는 쪽에서 읽기만 가능!
    private List<Users> users = new ArrayList<>();
}