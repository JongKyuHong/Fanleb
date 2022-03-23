package a107.fanleb.domain.contents;

import a107.fanleb.domain.Status;
import a107.fanleb.domain.collections.Collections;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.time.LocalDateTime;

@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Entity
@DynamicInsert
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

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;

    @Enumerated(EnumType.STRING)
    private Status onSaleYn;

    @ManyToOne
    @JoinColumn(name = "collection_id")
    private Collections collection;

    @Column(unique = true, nullable = false)
    private String imgUrl;

    @Enumerated(EnumType.STRING)
    private Status thumbnailYn;

    public void setContentTitle(String contentTitle){
        this.contentTitle=contentTitle;
    }

    public void setContentDescription(String contentDescription){
        this.contentDescription=contentDescription;
    }

    public void setCollection(Collections collection){
        this.collection=collection;
    }
}