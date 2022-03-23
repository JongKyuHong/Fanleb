package a107.fanleb.api.request.contents;

import a107.fanleb.domain.contents.Contents;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class ContentsRegisterReq {
    @NotNull
    private MultipartFile image;

    @NotNull
    private String content_title;

    private String content_description;

    public Contents toContents(String imgUrl) {
//        return Contents.builder().imgUrl(imgUrl).contentTitle(content_title).contentDescription(content_description).collection(collection).build();
        return Contents.builder().imgUrl(imgUrl).contentTitle(content_title).contentDescription(content_description).build();
    }
}
