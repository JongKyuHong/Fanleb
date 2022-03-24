package a107.fanleb.common.model.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdvancedResponseBody<T> extends BaseResponseBody {
    T data;

    public static <T> AdvancedResponseBody of(String result, T data) {
        return AdvancedResponseBody.builder().result(result).data(data).build();
    }

    @Builder
    public AdvancedResponseBody(String result, T data) {
        super(result);
        this.data = data;
    }
}
