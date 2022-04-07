package a107.fanleb.api.response.users;

import a107.fanleb.domain.usersCategory.UsersCategory;
import com.querydsl.core.annotations.QueryProjection;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
public class UserViewRes {
    private Integer id;
    private String nickname;
    private String userDescription;
    private UsersCategory usersCategory;
    private String imgUrl;
    private String userAddress;
    private Integer maxSubscribeCnt;
    private int curSubscribeCnt;
    private int contentsCnt;
    private boolean subscribe;

    @QueryProjection
    public UserViewRes(Integer id, String nickname, String userDescription, UsersCategory usersCategory, String imgUrl, String userAddress, Integer maxSubscribeCnt, int curSubscribeCnt, int contentsCnt, boolean subscribe) {
        this.id = id;
        this.nickname = nickname;
        this.userDescription = userDescription;
        this.usersCategory = usersCategory;
        this.imgUrl = imgUrl;
        this.userAddress = userAddress;
        this.maxSubscribeCnt = maxSubscribeCnt;
        this.curSubscribeCnt = curSubscribeCnt;
        this.contentsCnt = contentsCnt;
        this.subscribe = subscribe;
    }
}
