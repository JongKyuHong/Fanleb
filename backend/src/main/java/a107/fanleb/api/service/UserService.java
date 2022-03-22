package a107.fanleb.api.service;

import a107.fanleb.domain.users.UsersRepository;
import lombok.RequiredArgsConstructor;
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

}
