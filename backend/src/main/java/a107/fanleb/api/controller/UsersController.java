package a107.fanleb.api.controller;

import a107.fanleb.api.service.UserService;
import a107.fanleb.common.model.response.AdvancedResponseBody;
import a107.fanleb.common.model.response.BaseResponseBody;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/users")
public class UsersController {

    private final UserService userService;

    //지갑주소로 식별
    @PostMapping("/signup")
    public ResponseEntity<? extends BaseResponseBody> register() {
        return ResponseEntity.status(200).body(AdvancedResponseBody.of("", ""));
    }

    @PostMapping("/signup")
    public ResponseEntity<? extends BaseResponseBody> editView() {
        return ResponseEntity.status(200).body(AdvancedResponseBody.of("", ""));
    }

    @PostMapping("/signup")
    public ResponseEntity<? extends BaseResponseBody> edit() {
        return ResponseEntity.status(200).body(AdvancedResponseBody.of("", ""));
    }

    @GetMapping()
    public ResponseEntity<? extends BaseResponseBody> showList(@RequestParam(value = "page", defaultValue = "1") int page) {
        return ResponseEntity.status(200).body(AdvancedResponseBody.of("success", userService.showList(page)));
    }

}