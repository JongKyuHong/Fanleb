package a107.fanleb.api.controller;

import a107.fanleb.common.model.response.BaseResponseBody;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/sales")
public class SalesController {

//    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<BaseResponseBody> register() {
        return ResponseEntity.status(200).body(BaseResponseBody.of("", ""));
    }
}