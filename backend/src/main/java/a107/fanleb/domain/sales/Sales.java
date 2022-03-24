package a107.fanleb.domain.sales;

import a107.fanleb.domain.Status;
import lombok.*;
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
    private Integer saleContractAddress;

    @Column(nullable = false)
    private Status saleYn;

    @Column(unique = true)
    private Integer tokenId;
    private String cashContractAddress;
    private String sellerAddress;
    private String buyerAddress;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    private LocalDateTime completedAt;

}