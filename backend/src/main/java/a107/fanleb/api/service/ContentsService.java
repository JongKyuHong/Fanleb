package a107.fanleb.api.service;

import a107.fanleb.api.request.contents.ContentsEditReq;
import a107.fanleb.api.request.contents.ContentsRegisterReq;
import a107.fanleb.api.request.contents.ContentsUpdateReq;
import a107.fanleb.api.response.contents.ContentsRegisterRes;
import a107.fanleb.config.aws.S3Util;
import a107.fanleb.domain.collection.Collection;
import a107.fanleb.domain.collection.CollectionRepository;
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
    private final CollectionRepository collectionRepository;

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
        String ownerAddress = contentsUpdateReq.getOwnerAddress();

        if (collectionReq == null || collectionReq.isBlank()) {
            contentsRepository.update(contentsUpdateReq.getTokenId(), ownerAddress, contentId, null);
        } else {
            Optional<Collection> collectionEntity = collectionRepository.findByCollectionNameAndUserAddress(collectionReq, ownerAddress);
            contentsRepository.update(contentsUpdateReq.getTokenId(), ownerAddress, contentId, collectionEntity.get().getId());
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

                    if (collectionReq == null || collectionReq.isBlank()) {
                        c.setCollection(null);
                    } else {

                        String ownerAddress = contentsEditReq.getOwnerAddress();

                        Optional<Collection> collectionEntity = collectionRepository.findByCollectionNameAndUserAddress(collectionReq, ownerAddress);

                        c.setCollection(collectionEntity.get());
                    }
                });

        return content.get();

    }

    @Transactional
    public void delete(int tokenId) {
        contentsRepository.deleteByTokenId(tokenId);
    }

}
