package a107.fanleb.api.controller;

import a107.fanleb.api.request.contents.ContentsEditReq;
import a107.fanleb.api.request.contents.ContentsRegisterReq;
import a107.fanleb.api.request.contents.ContentsUpdateReq;
import a107.fanleb.api.service.ContentsService;
import a107.fanleb.common.model.response.AdvancedResponseBody;
import a107.fanleb.common.model.response.BaseResponseBody;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/contents")
public class ContentsController {

    private final ContentsService contentsService;

    @PostMapping
    public ResponseEntity<? extends BaseResponseBody> save(@ModelAttribute ContentsRegisterReq contentsRegisterReq) throws IOException {
        return ResponseEntity.status(200).body(AdvancedResponseBody.of("success", contentsService.save(contentsRegisterReq)));
    }

    @GetMapping
    public ResponseEntity<? extends BaseResponseBody> show(@RequestParam(value = "page", defaultValue = "1") int page, @RequestParam(name="user_address") String userAddress) {
        return ResponseEntity.status(200).body(AdvancedResponseBody.of("success", contentsService.show(page, userAddress)));
    }

    @GetMapping("/{tokenId}")
    public ResponseEntity<? extends BaseResponseBody> showDetail(@PathVariable int tokenId) {
        return ResponseEntity.status(200).body(AdvancedResponseBody.of("success", contentsService.showDetail(tokenId)));
    }

    @PostMapping("/{contentId}")
    public ResponseEntity<? extends BaseResponseBody> update(@PathVariable int contentId, @RequestBody ContentsUpdateReq contentsUpdateReq) {
        contentsService.update(contentId, contentsUpdateReq);
        return ResponseEntity.status(200).body(BaseResponseBody.of("success"));
    }

    @PatchMapping("/{tokenId}")
    public ResponseEntity<BaseResponseBody> edit(@PathVariable int tokenId, @RequestBody ContentsEditReq contentsEditReq) {
        return ResponseEntity.status(200).body(AdvancedResponseBody.of("success", contentsService.edit(tokenId, contentsEditReq)));
    }

    @DeleteMapping("/{tokenId}")
    public ResponseEntity<BaseResponseBody> delete(@PathVariable int tokenId) {
        contentsService.delete(tokenId);
        return ResponseEntity.status(200).body(BaseResponseBody.of("success"));
    }

    @GetMapping("/address")
    public ResponseEntity<? extends BaseResponseBody> showByAddress(@RequestParam(name="user_address") String userAddress, @RequestParam(value = "page", defaultValue = "1") int page) throws IOException {
        return ResponseEntity.status(200).body(AdvancedResponseBody.of("success", contentsService.showByAddress(page, userAddress)));
    }

    @GetMapping("/thumbnail")
    public ResponseEntity<? extends BaseResponseBody> showThumbnail(@RequestParam(name="user_address") String userAddress) throws IOException {
        return ResponseEntity.status(200).body(AdvancedResponseBody.of("success", contentsService.showThumbnail((String) userAddress)));
    }

}