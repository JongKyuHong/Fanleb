package a107.fanleb.api.service;

import a107.fanleb.api.request.ContentsEditReq;
import a107.fanleb.api.request.ContentsRegisterReq;
import a107.fanleb.api.request.ContentsUpdateReq;
import a107.fanleb.api.response.ContentsRegisterRes;
import a107.fanleb.config.aws.S3Util;
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

    @Transactional
    public Contents showDetail(int tokenId) {
        return contentsRepository.findByTokenId(tokenId).get();
    }

    @Transactional
    public ContentsRegisterRes save(ContentsRegisterReq contentsRegisterReq) throws IOException {

        //TODO : 해싱하기

        //s3 업로드
        String imgUrl = s3util.upload(contentsRegisterReq.getImage(), "contents");

        //TODO : 콜렉션 정보랑 매핑하기

        //DB 저장
        Contents content = contentsRepository.save(contentsRegisterReq.toContents(imgUrl));

        return ContentsRegisterRes.builder().contentId(content.getId()).imgUrl(content.getImgUrl()).build();
    }

    @Transactional
    public void update(int contentId, ContentsUpdateReq contentsUpdateReq) {
        contentsRepository.update(contentsUpdateReq.getTokenId(), contentsUpdateReq.getOwnerAddress(), contentId);
    }

    @Transactional
    public Contents edit(int tokenId, ContentsEditReq contentsEditReq) {
        Optional<Contents> content = contentsRepository.findByTokenId(tokenId);

        content.ifPresent(c -> {
            if (contentsEditReq.getContentTitle() != null) {
                c.setContentTitle(contentsEditReq.getContentTitle());
            }

            if (contentsEditReq.getContentDescription() != null) {
                c.setContentDescription(contentsEditReq.getContentDescription());
            }

            if (contentsEditReq.getCollection() != null) {
                c.setCollection(contentsEditReq.getCollection());
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
