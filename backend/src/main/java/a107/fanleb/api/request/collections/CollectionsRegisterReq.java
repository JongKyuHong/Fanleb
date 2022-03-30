package a107.fanleb.api.request.collections;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class CollectionsRegisterReq {

    private String userAddress;
    private String collection;

}
