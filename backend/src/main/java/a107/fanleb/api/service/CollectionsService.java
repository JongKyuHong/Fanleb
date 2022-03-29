package a107.fanleb.api.service;

import a107.fanleb.api.request.collections.CollectionsRegisterReq;
import a107.fanleb.api.response.collections.CollectionsListViewRes;
import a107.fanleb.domain.collections.Collections;
import a107.fanleb.domain.collections.CollectionsRepository;
import a107.fanleb.domain.collections.CollectionsRepositorySupport;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class CollectionsService {

    private final CollectionsRepository collectionsRepository;
    private final CollectionsRepositorySupport collectionsRepositorySupport;

    @Transactional
    public void save(CollectionsRegisterReq collectionsRegisterReq) {
        collectionsRepository.save(Collections.builder().userAddress(collectionsRegisterReq.getUserAddress()).collectionName(collectionsRegisterReq.getCollection()).build());
    }

    @Transactional
    public List<Collections> show(String userAddress) {
        return collectionsRepository.findByUserAddress(userAddress);
    }

    //todo
    @Transactional
    public Page<CollectionsListViewRes> showList(int page, String query, String isAscending, String sortedBy) {
        PageRequest pageable = PageRequest.of(page - 1, 12, Sort.by("id").descending());
        //paging

        return collectionsRepositorySupport.findBySortedBy(pageable, query, sortedBy);
    }
}