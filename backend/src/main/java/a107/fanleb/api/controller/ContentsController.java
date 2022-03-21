package a107.fanleb.api.controller;

import a107.fanleb.api.request.ContentsRegisterReq;
import a107.fanleb.api.service.ContentsService;
import a107.fanleb.common.model.response.BaseResponseBody;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RequiredArgsConstructor
@RestController
@RequestMapping("/contents")
public class ContentsController {

    private final ContentsService contentsService;

    @PostMapping
    public ResponseEntity<BaseResponseBody> save(@ModelAttribute ContentsRegisterReq contentsRegisterReq) throws IOException {
        return ResponseEntity.status(200).body(BaseResponseBody.of("success", contentsService.save(contentsRegisterReq)));
    }
    
    //TODO : 수정, 삭제
}