package a107.fanleb.api.request.sales;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class SalesCompleteReq {
    private int tokenId;
    private String buyerAddress;
}
