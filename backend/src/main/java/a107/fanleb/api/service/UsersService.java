package a107.fanleb.api.service;

import a107.fanleb.api.request.users.UsersEditReq;
import a107.fanleb.api.response.users.UserViewRes;
import a107.fanleb.common.exception.handler.NotExistedUserException;
import a107.fanleb.config.aws.S3Util;
import a107.fanleb.domain.users.Users;
import a107.fanleb.domain.users.UsersRepository;
import a107.fanleb.domain.users.UsersRepositorySupport;
import a107.fanleb.domain.usersCategory.UsersCategory;
import a107.fanleb.domain.usersCategory.UsersCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UsersService {

    private final UsersRepository usersRepository;
    private final UsersRepositorySupport usersRepositorySupport;
    private final UsersCategoryRepository usersCategoryRepository;
    private final S3Util s3util;

    @Transactional
    public void register(String userAddress) {
        usersRepository.save(Users.builder().userAddress(userAddress).build());
    }

    @Transactional(readOnly = true)
    public Users view(String userAddress) {
        return usersRepository.findByUserAddress(userAddress).get();
    }

    @Transactional
    public Users edit(UsersEditReq usersEditReq) {
        //유저 카테고리
        String userAddress = usersEditReq.getUser_address();

        Optional<Users> Opuser = usersRepository.findByUserAddress(userAddress);

        Users user = Opuser.orElseThrow(() -> new NotExistedUserException());

        Integer cnt = usersEditReq.getSubscription_cnt();

        if (cnt != null && cnt > 0)
            user.setMaxSubscribeCnt(cnt);

        user.setNickname(usersEditReq.getNickname());
        user.setUserDescription(usersEditReq.getUser_description());

        //카테고리
        String userCategoryReq = usersEditReq.getUser_category();
        UsersCategory userCategory = null;
        if (!userCategoryReq.isEmpty()) {
            userCategory = usersCategoryRepository.findByUserCategoryName(userCategoryReq);
        }
        user.setUsersCategory(userCategory);

        //s3 업로드
        MultipartFile img = usersEditReq.getImg();
        if (!img.isEmpty()) {
            try {
                String imgUrl = s3util.upload(usersEditReq.getImg(), "users");
                user.setImgUrl(imgUrl);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        usersRepository.save(user);


        return user;

    }

    @Transactional
    public void delete(String userAddress) {
        Optional<Users> byUserAddress = usersRepository.findByUserAddress(userAddress);
        Users user = byUserAddress.orElseThrow(() -> new NotExistedUserException());
        s3util.fileDelete(user.getImgUrl().split(".com/")[1]);

        usersRepository.delete(user);
    }

    @Transactional(readOnly = true)
    public List<UsersCategory> showCategory() {
        return usersCategoryRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Page<UserViewRes> showList(int page, String query, String userAddress) {
        PageRequest pageable = PageRequest.of(page - 1, 12, Sort.by("curSubscribeCnt").descending());

        return usersRepositorySupport.showList(pageable, query, userAddress);
    }

    @Transactional(readOnly = true)
    public void isDuplicateUseraddress(String userAddress) {
        Optional<Users> user = usersRepository.findByUserAddress(userAddress);

        user.ifPresent(u -> {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "등록된 사용자가 있습니다");
        });
    }

    @Transactional(readOnly = true)
    public void isDuplicateNickname(String userAddress) {
        Optional<Users> user = usersRepository.findByNickname(userAddress);

        user.ifPresent(u -> {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "등록된 사용자가 있습니다");
        });
    }
}
