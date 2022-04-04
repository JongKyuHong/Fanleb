package a107.fanleb.common.exception.handler;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class NotExistedUserException extends ResponseStatusException {
    public NotExistedUserException(){
        super(HttpStatus.BAD_REQUEST, "해당 유저를 찾을 수 없습니다");
    }
}