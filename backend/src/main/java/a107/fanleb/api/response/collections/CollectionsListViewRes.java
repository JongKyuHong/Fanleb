package a107.fanleb.api.response.collections;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
public class CollectionsListViewRes {
    private Integer id;

    private String collection_name;

    private String user_address;

    private String nickname;

    private String imgUrl;

    @QueryProjection
    public CollectionsListViewRes(Integer id, String collection_name, String user_address, String nickname, String imgUrl) {
        this.id = id;
        this.collection_name = collection_name;
        this.user_address = user_address;
        this.nickname = nickname;
        this.imgUrl = imgUrl;
    }
}
