package a107.fanleb.api.service;

import a107.fanleb.domain.subscribe.SubscribeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class SubscribeService {
    private final SubscribeRepository subscribeRepository;

    @Transactional
    public void subscribe(String fromUserAddress, String toUserAddress){
        subscribeRepository.subscribe(fromUserAddress, toUserAddress);
    }

    @Transactional
    public void unsubscribe(String fromUserAddress, String toUserAddress){
        subscribeRepository.unsubscribe(fromUserAddress, toUserAddress);
    }
}
