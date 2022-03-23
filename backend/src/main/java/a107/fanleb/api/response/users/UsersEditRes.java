package a107.fanleb.api.response.users;

import a107.fanleb.domain.usersCategory.UsersCategory;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
public class UsersEditRes {
    private int id;

    private String nickname;

    private String userDescription;

    private UsersCategory usersCategory;

    private String imgUrl;

    private int subscriberCnt;

    private String userAddress;
}