package a107.fanleb.api.controller;

import a107.fanleb.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
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

}