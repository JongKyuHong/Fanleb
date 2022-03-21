package a107.fanleb.api.response;

import lombok.*;

@Getter
@Builder
@ToString
public class ContentsRegisterRes {
    Integer contentId;
    String imgUrl;
}