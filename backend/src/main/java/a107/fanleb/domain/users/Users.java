package a107.fanleb.domain.users;

import a107.fanleb.domain.usersCategory.UsersCategory;
import lombok.*;

import javax.persistence.*;

@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Entity
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", nullable = false)
    private Integer id;

    @Column(unique = true, nullable = false)
    private String nickname;

    private String userDescription;

    @ManyToOne
    @JoinColumn(nullable = false, name = "user_category_id")
    private UsersCategory usersCategory;

    private String imgUrl;

    @Column(unique = true, nullable = false)
    private String userAddress;



}