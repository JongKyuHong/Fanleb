package a107.fanleb.common.exception.handler;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class NotExistedTokenIdException extends ResponseStatusException {
    public NotExistedTokenIdException() {
        super(HttpStatus.BAD_REQUEST, "존재하지 않는 tokenId입니다");
    }
}