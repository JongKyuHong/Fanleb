package a107.fanleb.domain.subscribe;

import a107.fanleb.domain.users.Users;
import lombok.*;

import javax.persistence.*;

@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Entity
public class Subscribe {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="subscribe_id")
    private Integer id;

    private String fromUserAddress; //팔로우 하는 멤버

    private String toUserAddress; //팔로우 받는 멤버
}