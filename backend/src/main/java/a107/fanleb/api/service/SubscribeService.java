package a107.fanleb.api.service;

import a107.fanleb.api.response.subscribe.SubscribeCheckRes;
import a107.fanleb.common.exception.handler.NotExistedUserException;
import a107.fanleb.domain.subscribe.Subscribe;
import a107.fanleb.domain.subscribe.SubscribeRepository;
import a107.fanleb.domain.subscribe.SubscribeRepositorySupport;
import a107.fanleb.domain.users.Users;
import a107.fanleb.domain.users.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class SubscribeService {
    private final SubscribeRepository subscribeRepository;
    private final SubscribeRepositorySupport subscribeRepositorySupport;
    private final UsersRepository usersRepository;

    @Transactional
    public void subscribe(String fromUserAddress, String toUserAddress) {
        Optional<Users> opUser = usersRepository.findByUserAddress(toUserAddress);
        Users user = opUser.orElseThrow(() -> new NotExistedUserException());

        if (user.getMaxSubscribeCnt() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "구독권을 발행한 유저가 아닙니다");
        } else if (user.getMaxSubscribeCnt() <= user.getCurSubscribeCnt())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "최대 구독수 제한을 초과했습니다");
        else {
            subscribeRepository.subscribe(fromUserAddress, toUserAddress);

            user.addCurSubscribeCnt();
            usersRepository.save(user);
        }
    }

    @Transactional
    public void unsubscribe(String fromUserAddress, String toUserAddress) {
        Optional<Users> opUser = usersRepository.findByUserAddress(toUserAddress);
        Users user = opUser.orElseThrow(() -> new NotExistedUserException());

        subscribeRepository.unsubscribe(fromUserAddress, toUserAddress);

        user.decCurSubscribeCnt();
        usersRepository.save(user);
    }

    @Transactional(readOnly = true)
    public void isSubscribe(String fromUserAddress, String toUserAddress) {
        int cnt = subscribeRepository.findByFromUserAddressAndToUserAddress(fromUserAddress, toUserAddress);
        if (cnt < 1)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "구독중인 유저가 아닙니다");
    }

    @Transactional(readOnly = true)
    public SubscribeCheckRes isPublishSubscribe(String userAddress) {
        Optional<Users> opUser = usersRepository.findByUserAddress(userAddress);
        Users user = opUser.orElseThrow(() -> new NotExistedUserException());
        if (user.getMaxSubscribeCnt() == null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "구독권을 발행한 유저가 아닙니다");
        else
            return SubscribeCheckRes.builder().curSubscribeCnt(user.getCurSubscribeCnt()).maxSubscribeCnt(user.getMaxSubscribeCnt()).build();

    }

    @Transactional(readOnly = true)
    public Page<Users> viewFromList(int page, String userAddress) {
        PageRequest pageable = PageRequest.of(page - 1, 12);

        return subscribeRepositorySupport.findByFromUserAddress(pageable, userAddress);
    }

    @Transactional(readOnly = true)
    public Page<Users> viewToList(int page, String userAddress) {
        PageRequest pageable = PageRequest.of(page - 1, 12);

        return subscribeRepositorySupport.findByToUserAddress(pageable, userAddress);
    }

}
