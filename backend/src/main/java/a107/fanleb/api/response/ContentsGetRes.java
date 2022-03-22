package a107.fanleb.api.response;

import a107.fanleb.domain.Status;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Builder
@ToString
public class ContentsGetRes {
    private Integer contentId;
    private Integer tokenId;

    private String contentTitle;

    private String contentDescription;

    private LocalDateTime createdAt;

    private Status onSaleYn;

    private String collection;

    private String imgUrl;
}