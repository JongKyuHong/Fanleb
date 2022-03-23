package a107.fanleb.api.request.contents;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class ContentsEditReq {

    private String contentTitle;

    private String contentDescription;

    private String collection;

    private String ownerAddress;

}
