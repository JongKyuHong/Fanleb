package a107.fanleb.api.controller;


import a107.fanleb.api.request.collections.CollectionsRegisterReq;
import a107.fanleb.api.service.CollectionsService;
import a107.fanleb.common.model.response.AdvancedResponseBody;
import a107.fanleb.common.model.response.BaseResponseBody;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/collections")
public class CollectionsController {
    private final CollectionsService collectionsService;

    @PostMapping
    public ResponseEntity<? extends BaseResponseBody> save(@RequestBody CollectionsRegisterReq collectionsRegisterReq) {
        collectionsService.save(collectionsRegisterReq);
        return ResponseEntity.status(200).body(BaseResponseBody.of("success"));
    }

    @GetMapping
    public ResponseEntity<? extends BaseResponseBody> show(@RequestBody Map<String, Object> body) {
        return ResponseEntity.status(200).body(AdvancedResponseBody.of("success", collectionsService.show((String)body.get("user_address"))));
    }

    //todo : 검색
    @GetMapping("/list")
    public ResponseEntity<? extends BaseResponseBody> showList(@RequestParam(required = false, name="search[query]") String query,
                                                               @RequestParam(required = false, name="search[sortAscending]") String isAscending,
                                                               @RequestParam(required = false, name="search[sortBy]", defaultValue = "singer") String sortedBy,
                                                               @RequestParam(value = "page", defaultValue = "1") int page) {
        return ResponseEntity.status(200).body(AdvancedResponseBody.of("success", collectionsService.showList(page, query, isAscending, sortedBy)));
    }
}
