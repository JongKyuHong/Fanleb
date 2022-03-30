package a107.fanleb.api.service;

import a107.fanleb.api.request.contents.ContentsEditReq;
import a107.fanleb.api.request.contents.ContentsRegisterReq;
import a107.fanleb.api.request.contents.ContentsUpdateReq;
import a107.fanleb.api.response.contents.ContentsRegisterRes;
import a107.fanleb.config.aws.S3Util;
import a107.fanleb.domain.collections.Collections;
import a107.fanleb.domain.collections.CollectionsRepository;
import a107.fanleb.domain.contents.Contents;
import a107.fanleb.domain.contents.ContentsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ContentsService {

    private final S3Util s3util;
    private final ContentsRepository contentsRepository;
    private final CollectionsRepository collectionRepository;

    @Transactional
    public Contents showDetail(int tokenId) {
        return contentsRepository.findByTokenId(tokenId).get();
    }

    @Transactional
    public ContentsRegisterRes save(ContentsRegisterReq contentsRegisterReq) throws IOException {

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
        String ownerAddress = contentsUpdateReq.getOwnerAddress();

        Optional<Collections> collectionEntity = collectionRepository.findByCollectionNameAndUserAddress(collectionReq, ownerAddress);

        if (collectionEntity.isPresent()) {
            contentsRepository.update(contentsUpdateReq.getTokenId(), ownerAddress, contentId, collectionEntity.get().getId());
        } else {
            Collections collection = collectionRepository.save(Collections.builder().collectionName(collectionReq).userAddress(ownerAddress).build());
            contentsRepository.update(contentsUpdateReq.getTokenId(), ownerAddress, contentId, collection.getId());
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
        contentsRepository.deleteByTokenId(tokenId);
    }

}
