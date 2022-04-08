package a107.fanleb.api.service;

import a107.fanleb.api.request.contents.ContentsEditReq;
import a107.fanleb.api.request.contents.ContentsRegisterReq;
import a107.fanleb.api.request.contents.ContentsUpdateReq;
import a107.fanleb.api.response.contents.ContentsRegisterRes;
import a107.fanleb.common.exception.handler.NotExistedTokenIdException;
import a107.fanleb.common.exception.handler.NotExistedUserException;
import a107.fanleb.common.exception.handler.NotUniqueTokenIdException;
import a107.fanleb.config.aws.S3Util;
import a107.fanleb.domain.collections.Collections;
import a107.fanleb.domain.collections.CollectionsRepository;
import a107.fanleb.domain.contents.Contents;
import a107.fanleb.domain.contents.ContentsRepository;
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

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ContentsService {

    private final S3Util s3util;
    private final ContentsRepository contentsRepository;
    private final CollectionsRepository collectionRepository;
    private final UsersRepository usersRepository;

    @Transactional(readOnly = true)
    public Contents showDetail(int tokenId) {
        return contentsRepository.findByTokenId(tokenId).get();
    }

    @Transactional
    public ContentsRegisterRes save(ContentsRegisterReq contentsRegisterReq) throws IOException {

        if (contentsRegisterReq.getImage().isEmpty())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "사진이 없습니다");
        //TODO : 해싱하기

        //s3 업로드
        String imgUrl = s3util.upload(contentsRegisterReq.getImage(), "contents");

        //DB 저장
        Contents content = contentsRepository.save(contentsRegisterReq.toContents(imgUrl));

        return ContentsRegisterRes.builder().id(content.getId()).imgUrl(content.getImgUrl()).build();
    }

    @Transactional
    public void update(int contentId, ContentsUpdateReq contentsUpdateReq) {
        String collectionReq = contentsUpdateReq.getCollection();

        if (collectionReq == null || collectionReq.isEmpty())
            collectionReq = "";

        int tokenId = contentsUpdateReq.getTokenId();
        Optional<Contents> byTokenId = contentsRepository.findByTokenId(tokenId);
        byTokenId.ifPresent(t -> {
            throw new NotUniqueTokenIdException();
        });


        String ownerAddress = contentsUpdateReq.getOwnerAddress();

        Optional<Users> byUserAddress = usersRepository.findByUserAddress(ownerAddress);
        Users user = byUserAddress.orElseThrow(() -> new NotExistedUserException());
        user.addContentsCnt();
        usersRepository.save(user);

        Optional<Collections> collectionEntity = collectionRepository.findByCollectionNameAndUserAddress(collectionReq, ownerAddress);

        if (collectionEntity.isPresent()) {
            contentsRepository.update(tokenId, ownerAddress, contentId, collectionEntity.get().getId());
        } else {
            Collections collection = collectionRepository.save(Collections.builder().collectionName(collectionReq).userAddress(ownerAddress).build());
            contentsRepository.update(tokenId, ownerAddress, contentId, collection.getId());
        }


    }


    @Transactional
    public Contents edit(int tokenId, ContentsEditReq contentsEditReq) {
        Optional<Contents> content = contentsRepository.findByTokenId(tokenId);

        content.ifPresent(
                c -> {
                    c.setContentTitle(contentsEditReq.getContentTitle());

                    c.setContentDescription(contentsEditReq.getContentDescription());

                    String collectionReq = contentsEditReq.getCollection();

                    if (collectionReq == null || collectionReq.isEmpty())
                        collectionReq = "";

                    String ownerAddress = contentsEditReq.getOwnerAddress();

                    Optional<Collections> collectionEntity = collectionRepository.findByCollectionNameAndUserAddress(collectionReq, ownerAddress);

                    if (collectionEntity.isPresent()) {
                        c.setCollection(collectionEntity.get());
                    } else {
                        Collections collection = collectionRepository.save(Collections.builder().collectionName(collectionReq).userAddress(ownerAddress).build());
                        c.setCollection(collection);
                    }

                    contentsRepository.save(c);
                });

        return content.get();

    }


    @Transactional
    public void delete(int tokenId) {
        Optional<Contents> byTokenId = contentsRepository.findByTokenId(tokenId);
        Contents content = byTokenId.orElseThrow(() -> new NotExistedTokenIdException());
        s3util.fileDelete(content.getImgUrl().split(".com/")[1]);
        contentsRepository.delete(content);

        Optional<Users> byUserAddress = usersRepository.findByUserAddress(content.getOwnerAddress());
        Users user = byUserAddress.orElseThrow(() -> new NotExistedUserException());
        user.decContentsCnt();
        usersRepository.save(user);

    }


    @Transactional(readOnly = true)
    public Page<Contents> showByAddress(int page, String address) {
        PageRequest pageable = PageRequest.of(page - 1, 10, Sort.by("id").descending());

        //recent_owner_address == null and owner_address=:
        //or
        //recent_owner_address ==:
//        return contentsRepository.findByRecentOwnerAddressIsNullAndOwnerAddressOrRecentOwnerAddress(pageable, address, address);
        return contentsRepository.findByRecentOwnerAddress(pageable, address);

    }

    @Transactional(readOnly = true)
    public Page<Contents> show(int page, String address) {
        PageRequest pageable = PageRequest.of(page - 1, 12, Sort.by("id").descending());
        return contentsRepository.findByOwnerAddress(pageable, address);
    }

    @Transactional(readOnly = true)
    public List<Contents> showThumbnail(String address) {
        return contentsRepository.findByOwnerAddress(address);
    }

}
