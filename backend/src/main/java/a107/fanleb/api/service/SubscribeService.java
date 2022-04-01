package a107.fanleb.api.service;

import a107.fanleb.common.exception.handler.NotExistedUserException;
import a107.fanleb.domain.subscribe.SubscribeRepository;
import a107.fanleb.domain.users.Users;
import a107.fanleb.domain.users.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class SubscribeService {
    private final SubscribeRepository subscribeRepository;
    private final UsersRepository usersRepository;

    @Transactional
    public void subscribe(String fromUserAddress, String toUserAddress) {
        Optional<Users> Opuser = usersRepository.findByUserAddress(toUserAddress);
        Users user = Opuser.orElseThrow(() -> new NotExistedUserException());
//        if(user)
        subscribeRepository.subscribe(fromUserAddress, toUserAddress);
    }

    @Transactional
    public void unsubscribe(String fromUserAddress, String toUserAddress) {
        subscribeRepository.unsubscribe(fromUserAddress, toUserAddress);
    }

    @Transactional(readOnly = true)
    public void isPublishSubscribe(String userAddress) {
    }

    @Transactional(readOnly = true)
    public void isSubscribe(String fromUserAddress, String toUserAddress) {
        int cnt = subscribeRepository.findByFromUserAddressAndToUserAddress(fromUserAddress, toUserAddress);
        if(cnt<1)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "구독중인 유저가 아닙니다");
    }
}
