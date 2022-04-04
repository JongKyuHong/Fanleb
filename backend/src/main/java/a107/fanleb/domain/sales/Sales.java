package a107.fanleb.domain.sales;

import a107.fanleb.domain.Status;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.time.LocalDateTime;

@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@DynamicInsert
@Entity
public class Sales {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sale_id", nullable = false)
    private Integer id;

    @Column(unique = true, nullable = false)
    private String saleContractAddress;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Status saleYn;

    @Column(unique = true)
    private Integer tokenId;
    private String cashContractAddress;
    private String sellerAddress;
    private String buyerAddress;

    private Double price;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @CreationTimestamp
    @Column(nullable = false)
    private LocalDateTime createdAt;

    public void setBuyerAddress(String buyerAddress) {
        this.buyerAddress = buyerAddress;
    }

    public void setSaleYn(Status saleYn) {
        this.saleYn = saleYn;
    }

    public void setPrice(double price) {
        this.price = price;
    }

}