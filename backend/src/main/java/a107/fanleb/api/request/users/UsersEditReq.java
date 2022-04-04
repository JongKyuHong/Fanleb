package a107.fanleb.api.request.users;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class UsersEditReq {

    private String nickname;
    private String user_description;
    private String user_category;
    private MultipartFile img;
    private String user_address;
    private Integer subscription_cnt;
}
