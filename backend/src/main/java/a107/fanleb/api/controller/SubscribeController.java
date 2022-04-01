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

    @GetMapping("/valid/publish")
    public ResponseEntity<? extends BaseResponseBody> isPublishSubscribe(@RequestParam(name="user_address") String userAddress) {
        subscribeService.isPublishSubscribe(userAddress);
        return ResponseEntity.status(200).body(BaseResponseBody.of("구독권을 발행한 유저입니다"));
    }

    @GetMapping("/valid/{fromUserAddress}/{toUserAddress}")
    public ResponseEntity<? extends BaseResponseBody> isSubscribe(@PathVariable String fromUserAddress, @PathVariable String toUserAddress) {
        subscribeService.isSubscribe(fromUserAddress, toUserAddress);
        return ResponseEntity.status(200).body(BaseResponseBody.of("구독 중인 유저입니다"));
    }
}
