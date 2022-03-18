package a107.fanleb.domain.contents;

import a107.fanleb.domain.Status;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@ToString
@Builder
@NoArgsConstructor
@Getter
@Entity
public class Contents {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "content_id", nullable = false)
    private Integer id;

    @Column(unique = true)
    private Integer tokenId;

    @Column(unique = true)
    private String contentHash;

    @Column(nullable = false)
    private String contentTitle;
    private String contentDescription;
    private String ownerAddress;

    private LocalDateTime createdAt;

    private Status onSaleYn;

    private String collection;

    @Column(unique=true, nullable = false)
    private String imgUrl;

}