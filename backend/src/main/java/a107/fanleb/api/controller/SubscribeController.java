package a107.fanleb.api.controller;

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

    @PostMapping("/{fromUserAddress}/{toUserAddress}")
    public ResponseEntity<? extends BaseResponseBody> subscribe(@PathVariable String fromUserAddress, @PathVariable String toUserAddress) {
        subscribeService.subscribe(fromUserAddress, toUserAddress);
        return ResponseEntity.status(200).body(BaseResponseBody.of("success"));
    }

    @DeleteMapping("/{fromUserAddress}/{toUserAddress}")
    public ResponseEntity<? extends BaseResponseBody> unsubscribe(@PathVariable String fromUserAddress, @PathVariable String toUserAddress) {
        subscribeService.unsubscribe(fromUserAddress, toUserAddress);
        return ResponseEntity.status(200).body(BaseResponseBody.of("success"));
    }
}
