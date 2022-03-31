package a107.fanleb.common.exception.handler;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class NotUniqueTokenIdException extends ResponseStatusException {
    public NotUniqueTokenIdException() {
        super(HttpStatus.BAD_REQUEST, "tokenId는 unique한 값을 가져야 합니다");
    }
}