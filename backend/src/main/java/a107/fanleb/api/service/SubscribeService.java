package a107.fanleb.api.service;

import a107.fanleb.api.request.subscribe.SubscribeEditReq;
import a107.fanleb.domain.subscribe.SubscribeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class SubscribeService {
    private final SubscribeRepository subscribeRepository;

    @Transactional
    public void subscribe(SubscribeEditReq subscribeEditReq){
        subscribeRepository.subscribe(subscribeEditReq.getFromUserAddress(), subscribeEditReq.getToUserAddress());
    }

    @Transactional
    public void unsubscribe(SubscribeEditReq subscribeEditReq){
        subscribeRepository.unsubscribe(subscribeEditReq.getFromUserAddress(), subscribeEditReq.getToUserAddress());
    }
}
