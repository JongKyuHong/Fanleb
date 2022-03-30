package a107.fanleb.api.request.subscribe;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class SubscribeEditReq{
    private String fromUserAddress;
    private String toUserAddress;
}
