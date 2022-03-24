package a107.fanleb.domain.collections;

import a107.fanleb.domain.contents.Contents;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Entity
public class Collections {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "collection_id", nullable = false)
    private Integer id;

    @Column(nullable = false)
    private String collectionName;

    private String userAddress;

    @JsonIgnore
    @OneToMany(mappedBy = "collection", cascade = CascadeType.ALL) //참조를 당하는 쪽에서 읽기만 가능!
    private List<Contents> contents = new ArrayList<>();
}