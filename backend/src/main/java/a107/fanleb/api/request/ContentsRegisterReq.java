package a107.fanleb.api.request;

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
    MultipartFile image;

    @NotNull
    String content_title;

    String content_description;

    String collection;

    @NotNull
    String owner_address;

    //    public Contents toContents(String imgUrl, String contentHash) {
//        return Contents.builder().imgUrl(imgUrl).contentTitle(content_title).contentDescription(content_description).collection(collection).contentHash(contentHash).ownerAddress(owner_address).build();
//    }
    public Contents toContents(String imgUrl) {
        return Contents.builder().imgUrl(imgUrl).contentTitle(content_title).contentDescription(content_description).collection(collection).ownerAddress(owner_address).build();
    }
}
