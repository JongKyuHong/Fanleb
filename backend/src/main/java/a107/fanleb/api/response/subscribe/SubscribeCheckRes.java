package a107.fanleb.api.response.subscribe;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
public class SubscribeCheckRes {
    private int maxSubscribeCnt;
    private int curSubscribeCnt;
}
