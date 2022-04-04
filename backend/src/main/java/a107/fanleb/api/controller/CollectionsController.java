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
        return ResponseEntity.status(200).body(AdvancedResponseBody.of("success", collectionsService.save(collectionsRegisterReq)));
    }

    @GetMapping
    public ResponseEntity<? extends BaseResponseBody> show(@RequestParam(value = "page", defaultValue = "1") int page, @RequestParam(name="user_address") String userAddress) {
        return ResponseEntity.status(200).body(AdvancedResponseBody.of("success", collectionsService.show(page, userAddress)));
    }

    @GetMapping("/list")
    public ResponseEntity<? extends BaseResponseBody> showList(@RequestParam(required = false, name="search[query]") String query,
                                                               @RequestParam(required = false, name="search[sortAscending]") String isAscending,
                                                               @RequestParam(required = false, name="search[sortBy]") String sortedBy,
                                                               @RequestParam(value = "page", defaultValue = "1") int page) {
        return ResponseEntity.status(200).body(AdvancedResponseBody.of("success", collectionsService.showList(page, query, isAscending, sortedBy)));
    }

    @GetMapping("/{collectionId}/contents")
    public ResponseEntity<? extends BaseResponseBody> showContentsInCollection(@RequestParam(value = "page", defaultValue = "1") int page, @RequestParam(name="user_address") String userAddress, @PathVariable int collectionId) {
        return ResponseEntity.status(200).body(AdvancedResponseBody.of("success", collectionsService.showContentsInCollection(page, userAddress, collectionId)));
    }
}
