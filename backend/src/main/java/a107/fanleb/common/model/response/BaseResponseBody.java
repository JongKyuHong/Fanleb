package a107.fanleb.common.model.response;

import lombok.*;

/**
 * 서버 요청에대한 기본 응답값(바디) 정의.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BaseResponseBody {
    String result = null;

    public static BaseResponseBody of(String result) {
        BaseResponseBody body = new BaseResponseBody();
        body.result = result;
        return body;
    }
}

