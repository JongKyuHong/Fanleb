package a107.fanleb.api.controller;

import a107.fanleb.api.service.ContentsService;
import a107.fanleb.common.model.response.AdvancedResponseBody;
import a107.fanleb.common.model.response.BaseResponseBody;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/contents")
public class MainController {

    private final ContentsService contentsService;
    
    //메인페이지
    //썸네일 페이지
    //상세 페이지

//    @GetMapping("/{tokenId}")
    public ResponseEntity<? extends BaseResponseBody> showDetail(@PathVariable int tokenId) {
        return ResponseEntity.status(200).body(AdvancedResponseBody.of("success", contentsService.showDetail(tokenId)));
    }
}