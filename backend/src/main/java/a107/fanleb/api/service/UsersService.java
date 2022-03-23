package a107.fanleb.api.service;

import a107.fanleb.api.request.users.UsersEditReq;
import a107.fanleb.config.aws.S3Util;
import a107.fanleb.domain.users.Users;
import a107.fanleb.domain.users.UsersRepository;
import a107.fanleb.domain.usersCategory.UsersCategory;
import a107.fanleb.domain.usersCategory.UsersCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UsersService {

    private final UsersRepository usersRepository;
    private final UsersCategoryRepository usersCategoryRepository;
    private final S3Util s3util;

    @Transactional
    public void register(String userAddress) {
        usersRepository.save(Users.builder().userAddress(userAddress).build());
    }

    @Transactional(readOnly = true)
    public Users editView(String userAddress) {
        return usersRepository.findByUserAddress(userAddress).get();
    }

    @Transactional
    public Users edit(UsersEditReq usersEditReq) {
        //유저 카테고리
        String userAddress = usersEditReq.getUser_address();
        Optional<Users> user = usersRepository.findByUserAddress(userAddress);
        user.ifPresent(u -> {
            u.setNickname(usersEditReq.getNickname());
            u.setUserDescription(usersEditReq.getUser_description());

            //카테고리
            String userCategoryReq = usersEditReq.getUser_category();
            UsersCategory userCategory = null;
            if (userCategoryReq != null || userCategoryReq.isBlank()) {
                userCategory = usersCategoryRepository.findByUserCategoryName(userCategoryReq);
            }
            u.setUsersCategory(userCategory);

            //s3 업로드
            MultipartFile img = usersEditReq.getImg();
            if (!img.isEmpty()) {
                try {
                    String imgUrl = s3util.upload(usersEditReq.getImg(), "users");
                    u.setImgUrl(imgUrl);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

            usersRepository.save(u);
        });


        return user.get();

    }

    @Transactional
    public void delete(String userAddress) {
        usersRepository.deleteByUserAddress(userAddress);
    }

    @Transactional(readOnly = true)
    public List<UsersCategory> showCategory() {
        return usersCategoryRepository.findAll();
    }

    //구독자순
    @Transactional(readOnly = true)
    public Page<Users> showList(int page) {
        PageRequest pageable = PageRequest.of(page - 1, 12);

        return null;
    }

}
