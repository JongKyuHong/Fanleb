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
    private Long id;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="from_user_id",nullable = false)
    private Users fromUserId; //팔로우 하는 멤버

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="to_user_id",nullable = false)
    private Users toUserId; //팔로우 받는 멤버
}