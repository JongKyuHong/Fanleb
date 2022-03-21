package a107.fanleb.common.model.response;

import lombok.*;

/**
 * 서버 요청에대한 기본 응답값(바디) 정의.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BaseResponseBody<T> {
    String message = null;
    T data;

    public static <T> BaseResponseBody of(String message, T data) {
        BaseResponseBody body = new BaseResponseBody();
        body.message = message;
        body.data = data;
        return body;
    }
}
