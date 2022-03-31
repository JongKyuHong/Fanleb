package a107.fanleb.api.controller;

import a107.fanleb.common.model.response.BaseResponseBody;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

@RestControllerAdvice
public class ExceptionAdvice {
    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<BaseResponseBody> Exception(
            ResponseStatusException e) {

        return ResponseEntity.status(e.getRawStatusCode())
                .body(new BaseResponseBody(e.getReason()));
    }
}
