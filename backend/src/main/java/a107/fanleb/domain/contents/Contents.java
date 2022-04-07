package a107.fanleb.domain.contents;

import a107.fanleb.domain.Status;
import a107.fanleb.domain.collections.Collections;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.time.LocalDateTime;

@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@DynamicInsert
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

    private String ownerAddress; //원작자

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @CreationTimestamp
    private LocalDateTime createdAt;

    @Enumerated(EnumType.STRING)
    private Status onSaleYn;

    @ManyToOne
    @JoinColumn(name = "collection_id")
    private Collections collection;


    @Column(unique = true, nullable = false)
    private String imgUrl;
    
    String recentOwnerAddress; //구매자

    public void setContentTitle(String contentTitle) {
        this.contentTitle = contentTitle;
    }

    public void setContentDescription(String contentDescription) {
        this.contentDescription = contentDescription;
    }

    public void setCollection(Collections collection) {
        this.collection = collection;
    }

    public void setOnSaleYn(Status onSaleYn) {
        this.onSaleYn = onSaleYn;
    }

    public void setRecentOwnerAddress(String recentOwnerAddress) {
        this.recentOwnerAddress = recentOwnerAddress;
    }


}