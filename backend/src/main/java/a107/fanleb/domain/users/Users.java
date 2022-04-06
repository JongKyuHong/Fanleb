package a107.fanleb.domain.users;

import a107.fanleb.domain.usersCategory.UsersCategory;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@DynamicInsert
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

    private Integer maxSubscribeCnt;
    private int curSubscribeCnt;
    private int contentsCnt;

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public void setUserDescription(String userDescription) {
        this.userDescription = userDescription;
    }

    public void setUsersCategory(UsersCategory usersCategory) {
        this.usersCategory = usersCategory;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public void setMaxSubscribeCnt(int maxSubscribeCnt) {
        this.maxSubscribeCnt = maxSubscribeCnt;
    }

    public void addCurSubscribeCnt() {
        curSubscribeCnt++;
    }

    public void decCurSubscribeCnt() {
        curSubscribeCnt--;
    }

    public void addContentsCnt() {
        contentsCnt++;
    }

    public void decContentsCnt() {
        contentsCnt--;
    }
}