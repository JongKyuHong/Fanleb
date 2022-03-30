package a107.fanleb.api.controller;

import a107.fanleb.api.request.sales.SalesSaveReq;
import a107.fanleb.api.service.SalesService;
import a107.fanleb.common.model.response.AdvancedResponseBody;
import a107.fanleb.common.model.response.BaseResponseBody;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/sales")
public class SalesController {

    private final SalesService salesService;

    @PostMapping
    public ResponseEntity<? extends BaseResponseBody> save(@RequestBody SalesSaveReq salesSaveReq) {
        salesService.save(salesSaveReq);
        return ResponseEntity.status(200).body(BaseResponseBody.of("success"));
    }
//
//    @PostMapping
//    public ResponseEntity<? extends BaseResponseBody> detail() {
//        return ResponseEntity.status(200).body(AdvancedResponseBody.of("", ""));
//    }
//
//    @PostMapping
//    public ResponseEntity<? extends BaseResponseBody> update() {
//        return ResponseEntity.status(200).body(AdvancedResponseBody.of("", ""));
//    }
//
//    @PostMapping
//    public ResponseEntity<? extends BaseResponseBody> cancel() {
//        return ResponseEntity.status(200).body(AdvancedResponseBody.of("", ""));
//    }
//
//    @PostMapping
//    public ResponseEntity<? extends BaseResponseBody> complete() {
//        return ResponseEntity.status(200).body(AdvancedResponseBody.of("", ""));
//    }
//
//    @PostMapping
//    public ResponseEntity<? extends BaseResponseBody> recent() {
//        return ResponseEntity.status(200).body(AdvancedResponseBody.of("", ""));
//    }
}