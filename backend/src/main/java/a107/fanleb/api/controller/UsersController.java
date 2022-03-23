package a107.fanleb.api.controller;

import a107.fanleb.api.service.UserService;
import a107.fanleb.common.model.response.AdvancedResponseBody;
import a107.fanleb.common.model.response.BaseResponseBody;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/users")
public class UsersController {

    private final UserService userService;

    //지갑주소로 식별
//    @PostMapping
//    public ResponseEntity<? extends BaseResponseBody> register(String userAddress) {
//        userService.register(userAddress);
//        return ResponseEntity.status(200).body(BaseResponseBody.of(""));
//    }
//
//    @GetMapping
//    public ResponseEntity<? extends BaseResponseBody> editView(String userAddress) {
//        userService.editView(userAddress);
//        return ResponseEntity.status(200).body(AdvancedResponseBody.of("", ""));
//    }
//
//    @PatchMapping
//    public ResponseEntity<? extends BaseResponseBody> edit(@RequestBody UsersEditReq usersEditReq) {
//        return ResponseEntity.status(200).body(AdvancedResponseBody.of("", ""));
//    }

    @GetMapping()
    public ResponseEntity<? extends BaseResponseBody> showList(@RequestParam(value = "page", defaultValue = "1") int page) {
        return ResponseEntity.status(200).body(AdvancedResponseBody.of("success", userService.showList(page)));
    }

}