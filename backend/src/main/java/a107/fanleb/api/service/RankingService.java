package a107.fanleb.api.service;

import a107.fanleb.api.response.ranking.RankingListViewRes;
import a107.fanleb.domain.RankingRepoistorySuppot;
import a107.fanleb.domain.contents.Contents;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class RankingService {

    private final RankingRepoistorySuppot rankingRepoistorySuppot;

    @Transactional(readOnly = true)
    public Page<RankingListViewRes> view(int page, String sortedBy) {
        PageRequest pageable = PageRequest.of(page - 1, 10);

        return rankingRepoistorySuppot.view(pageable, sortedBy);
    }
}
