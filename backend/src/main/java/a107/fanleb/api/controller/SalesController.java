package a107.fanleb.api.controller;

import a107.fanleb.api.request.sales.SalesCompleteReq;
import a107.fanleb.api.request.sales.SalesSaveReq;
import a107.fanleb.api.service.SalesService;
import a107.fanleb.common.model.response.AdvancedResponseBody;
import a107.fanleb.common.model.response.BaseResponseBody;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping
    public ResponseEntity<? extends BaseResponseBody> detail(@RequestParam(name = "token_id") int tokenId) {
        return ResponseEntity.status(200).body(AdvancedResponseBody.of("success", salesService.detail(tokenId)));
    }

    @PatchMapping("/purchase")
    public ResponseEntity<? extends BaseResponseBody> complete(@RequestBody SalesCompleteReq salesCompleteReq) {
        salesService.complete(salesCompleteReq);
        return ResponseEntity.status(200).body(BaseResponseBody.of("success"));
    }

    @DeleteMapping
    public ResponseEntity<? extends BaseResponseBody> cancel(@RequestParam(name = "token_id") int tokenId) {
        salesService.cancel(tokenId);
        return ResponseEntity.status(200).body(BaseResponseBody.of("success"));
    }

    @GetMapping("/recent")
    public ResponseEntity<? extends BaseResponseBody> recent(@RequestParam(value = "page", defaultValue = "1") int page) {
        return ResponseEntity.status(200).body(AdvancedResponseBody.of("success", salesService.recent(page)));
    }
}