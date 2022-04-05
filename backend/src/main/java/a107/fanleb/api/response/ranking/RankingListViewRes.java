package a107.fanleb.api.response.ranking;

import com.querydsl.core.annotations.QueryProjection;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@ToString
public class RankingListViewRes {
    private Integer id;

    private String nickname;

    private String userCategoryName;

    private int subscriptionCnt;

    private int contentsCnt;

    private double recentTradedPrice;

    private int ownerCnt;

    private String imgUrl;

    @QueryProjection
    public RankingListViewRes(String nickname, String userCategoryName, int subscriptionCnt, int contentsCnt, double recentTradedPrice, int ownerCnt, String imgUrl) {
        this.nickname = nickname;
        this.userCategoryName = userCategoryName;
        this.subscriptionCnt = subscriptionCnt;
        this.contentsCnt = contentsCnt;
        this.recentTradedPrice = recentTradedPrice;
        this.ownerCnt = ownerCnt;
        this.imgUrl = imgUrl;
    }

}
