package a107.fanleb.api.controller;

import a107.fanleb.api.request.users.UsersEditReq;
import a107.fanleb.api.service.UsersService;
import a107.fanleb.common.model.response.AdvancedResponseBody;
import a107.fanleb.common.model.response.BaseResponseBody;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/users")
public class UsersController {

    private final UsersService usersService;

    //지갑주소로 식별
    @PostMapping("/register")
    public ResponseEntity<? extends BaseResponseBody> register(@RequestBody Map<String, Object> body) {
        usersService.register((String) body.get("user_address"));
        return ResponseEntity.status(200).body(BaseResponseBody.of("success"));
    }

    @GetMapping("/address")
    public ResponseEntity<? extends BaseResponseBody> view(@RequestParam(name = "user_address") String userAddress) {

        return ResponseEntity.status(200).body(AdvancedResponseBody.of("success", usersService.view(userAddress)));
    }

    @PatchMapping("/edit")
    public ResponseEntity<? extends BaseResponseBody> edit(@ModelAttribute UsersEditReq usersEditReq) {
        return ResponseEntity.status(200).body(AdvancedResponseBody.of("success", usersService.edit(usersEditReq)));
    }

    @DeleteMapping
    public ResponseEntity<? extends BaseResponseBody> delete(@RequestParam(name = "user_address") String userAddress) {
        usersService.delete(userAddress);
        return ResponseEntity.status(200).body(BaseResponseBody.of("success"));
    }

    @GetMapping("/categories")
    public ResponseEntity<? extends BaseResponseBody> showCategory() {
        return ResponseEntity.status(200).body(AdvancedResponseBody.of("success", usersService.showCategory()));
    }


    @GetMapping("/list")
    public ResponseEntity<? extends BaseResponseBody> showList(@RequestParam(value = "page", defaultValue = "1") int page,
                                                               @RequestParam(required = false, name = "user_address") String userAddress,
                                                               @RequestParam(required = false, name = "search[query]") String query) {
        return ResponseEntity.status(200).body(AdvancedResponseBody.of("success", usersService.showList(page, query, userAddress)));
    }

    @GetMapping("/valid/first")
    public ResponseEntity<? extends BaseResponseBody> isDuplicateUseraddress(@RequestParam(name = "user_address") String userAddress) {
        usersService.isDuplicateUseraddress(userAddress);
        return ResponseEntity.status(200).body(BaseResponseBody.of("등록된 사용자가 없습니다"));
    }

    @GetMapping("/valid/nickname")
    public ResponseEntity<? extends BaseResponseBody> isDuplicateNickname(@RequestParam(name = "nickname") String nickname) {
        usersService.isDuplicateNickname(nickname);
        return ResponseEntity.status(200).body(BaseResponseBody.of("등록된 사용자가 없습니다"));
    }
}