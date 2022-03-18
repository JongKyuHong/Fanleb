package a107.fanleb.domain.users;

import a107.fanleb.domain.usersCategory.UsersCategory;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@ToString
@Builder
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, name = "user_category_id")
    private UsersCategory usersCategory;

    private String imgUrl;

    @ColumnDefault("0")
    private int subscriberCnt;

    @Column(unique = true, nullable = false)
    private String userAddress;

}