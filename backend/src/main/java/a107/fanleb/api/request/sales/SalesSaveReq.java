package a107.fanleb.api.request.sales;

import a107.fanleb.domain.sales.Sales;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class SalesSaveReq {
    private int tokenId;
    private String sellerAddress;
    private String salesContractAddress;
    private String cashContractAddress;
    private double price;

    public Sales toSales(){
        return Sales.builder().tokenId(tokenId).sellerAddress(sellerAddress).price(price).saleContractAddress(salesContractAddress).cashContractAddress(cashContractAddress).build();
    }
}
