package a107.fanleb.api.request.users;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class UsersEditReq {

    private String nickname;
    private String userDescription;
    private String userCategory;
    private String img;
    private String user_address;
}
