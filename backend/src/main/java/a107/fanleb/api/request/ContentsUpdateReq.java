package a107.fanleb.api.request;

import lombok.*;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class ContentsUpdateReq {
    @NotNull
    private int tokenId;
    @NotNull
    private String ownerAddress;
}
