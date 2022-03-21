package a107.fanleb.api.service;

import a107.fanleb.api.request.ContentsRegisterReq;
import a107.fanleb.api.response.ContentsRegisterRes;
import a107.fanleb.config.aws.S3Util;
import a107.fanleb.domain.contents.Contents;
import a107.fanleb.domain.contents.ContentsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;

@RequiredArgsConstructor
@Service
public class ContentsService {

    private final S3Util s3util;
    private final ContentsRepository contentsRepository;

    @Transactional
    public ContentsRegisterRes save(ContentsRegisterReq contentsRegisterReq) throws IOException {

        //TODO : 해싱하기

        System.out.println(contentsRepository.findAll());
        //s3 업로드
        String imgUrl = s3util.upload(contentsRegisterReq.getImage(), "contents");

        //DB 저장
        Contents content = contentsRepository.save(contentsRegisterReq.toContents(imgUrl));

        return ContentsRegisterRes.builder().contentId(content.getId()).imgUrl(content.getImgUrl()).build();
    }

}
