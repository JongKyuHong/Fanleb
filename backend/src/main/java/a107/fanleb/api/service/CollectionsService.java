package a107.fanleb.api.service;

import a107.fanleb.api.request.collections.CollectionsRegisterReq;
import a107.fanleb.domain.collections.Collections;
import a107.fanleb.domain.collections.CollectionsRepository;
import a107.fanleb.domain.contents.Contents;
import a107.fanleb.domain.contents.ContentsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class CollectionsService {

    private final CollectionsRepository collectionsRepository;
    private final ContentsRepository contentsRepository;


    @Transactional
    public void save(CollectionsRegisterReq collectionsRegisterReq) {
        collectionsRepository.save(Collections.builder().userAddress(collectionsRegisterReq.getUserAddress()).collectionName(collectionsRegisterReq.getCollection()).build());
    }

    @Transactional
    public Page<Collections> show(int page, String userAddress) {
        PageRequest pageable = PageRequest.of(page - 1, 12, Sort.by("id").descending());
        return collectionsRepository.findByUserAddress(pageable, userAddress);
    }

    @Transactional
    public Page<Collections> showList(int page, String query, String isAscending, String sortedBy) {
        PageRequest pageable = PageRequest.of(page - 1, 12, Sort.by("id").descending());
        return collectionsRepository.findAll(pageable);
    }

    @Transactional
    public Page<Contents> showContentsInCollection(int page, String userAddress, int collectionId) {
        PageRequest pageable = PageRequest.of(page - 1, 12, Sort.by("id").descending());
        Collections collection = collectionsRepository.findById(collectionId).get();
        return contentsRepository.findByOwnerAddressAndCollection(pageable, userAddress, collection);
    }

}