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
        usersService.register((String)body.get("user_address"));
        return ResponseEntity.status(200).body(BaseResponseBody.of("success"));
    }

    @GetMapping("/edit")
    public ResponseEntity<? extends BaseResponseBody> editView(@RequestBody Map<String, Object> body) {

        return ResponseEntity.status(200).body(AdvancedResponseBody.of("success", usersService.editView((String)body.get("user_address"))));
    }

    @PatchMapping("/edit")
    public ResponseEntity<? extends BaseResponseBody> edit(@ModelAttribute UsersEditReq usersEditReq){
        return ResponseEntity.status(200).body(AdvancedResponseBody.of("success", usersService.edit(usersEditReq)));
    }

    @DeleteMapping
    public ResponseEntity<? extends BaseResponseBody> delete(@RequestBody Map<String, Object> body) {
        usersService.delete((String)body.get("user_address"));
        return ResponseEntity.status(200).body(BaseResponseBody.of("success"));
    }

    @GetMapping("/categories")
    public ResponseEntity<? extends BaseResponseBody> showCategory() {
        return ResponseEntity.status(200).body(AdvancedResponseBody.of("success", usersService.showCategory()));
    }

    //todo
    @GetMapping
    public ResponseEntity<? extends BaseResponseBody> showList(@RequestParam(value = "page", defaultValue = "1") int page) {
        return ResponseEntity.status(200).body(AdvancedResponseBody.of("success", usersService.showList(page)));
    }

}