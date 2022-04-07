package a107.fanleb.api.controller;

import a107.fanleb.api.service.RankingService;
import a107.fanleb.common.model.response.AdvancedResponseBody;
import a107.fanleb.common.model.response.BaseResponseBody;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/ranking")
public class RankingController {
    private final RankingService rankingService;

    @GetMapping//subscriptionCnt, contentsCnt, maxTradedPrice, ownerCnt
    public ResponseEntity<? extends BaseResponseBody> view(
            @RequestParam(required = false, name = "search[sortBy]") String sortedBy,
            @RequestParam(value = "page", defaultValue = "1") int page) {
        return ResponseEntity.status(200).body(AdvancedResponseBody.of("success", rankingService.view(page, sortedBy)));
    }
}
