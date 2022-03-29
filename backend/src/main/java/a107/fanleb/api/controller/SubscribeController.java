package a107.fanleb.api.controller;

import a107.fanleb.api.request.subscribe.SubscribeEditReq;
import a107.fanleb.api.service.SubscribeService;
import a107.fanleb.common.model.response.BaseResponseBody;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/subscribe")
public class SubscribeController {

    private final SubscribeService subscribeService;

    @PostMapping
    public ResponseEntity<? extends BaseResponseBody> subscribe(@RequestBody SubscribeEditReq subscribeEditReq) {
        subscribeService.subscribe(subscribeEditReq);
        return ResponseEntity.status(200).body(BaseResponseBody.of("success"));
    }

    @DeleteMapping
    public ResponseEntity<? extends BaseResponseBody> unsubscribe(@RequestBody SubscribeEditReq subscribeEditReq) {
        subscribeService.unsubscribe(subscribeEditReq);
        return ResponseEntity.status(200).body(BaseResponseBody.of("success"));
    }
}
