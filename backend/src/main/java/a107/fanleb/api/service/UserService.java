package a107.fanleb.api.service;

import a107.fanleb.domain.users.Users;
import a107.fanleb.domain.users.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UsersRepository usersRepository;

    @Transactional
    public void register() {

    }

    @Transactional
    public void editView() {

    }

    @Transactional
    public void edit() {

    }

    //구독자순
    @Transactional(readOnly = true)
    public Page<Users> showList(int page) {
        PageRequest pageable = PageRequest.of(page - 1, 12);

        return usersRepository.findAll(pageable);

    }

}
