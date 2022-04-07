package a107.fanleb.api.service;

import a107.fanleb.api.request.sales.SalesCompleteReq;
import a107.fanleb.api.request.sales.SalesSaveReq;
import a107.fanleb.common.exception.handler.NotExistedTokenIdException;
import a107.fanleb.common.exception.handler.NotUniqueSalesContractAddressException;
import a107.fanleb.domain.Status;
import a107.fanleb.domain.contents.Contents;
import a107.fanleb.domain.contents.ContentsRepository;
import a107.fanleb.domain.sales.Sales;
import a107.fanleb.domain.sales.SalesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class SalesService {
    private final SalesRepository salesRepository;
    private final ContentsRepository contentsRepository;

    @Transactional
    public void save(SalesSaveReq salesSaveReq) {
        //sales_contract_address와 tokenId는 unique
        String salesContractAddress = salesSaveReq.getSalesContractAddress();
        Optional<Sales> bySalesContractAddress = salesRepository.findBySaleContractAddress(salesContractAddress);
        bySalesContractAddress.ifPresent(sales -> {
            throw new NotUniqueSalesContractAddressException();
        });

        int tokenId = salesSaveReq.getTokenId();
//        Optional<Sales> byTokenId = salesRepository.findByTokenId(tokenId);
//        byTokenId.ifPresent(sales -> {
//            throw new NotUniqueTokenIdException();
//        });

        //else
        salesRepository.save(salesSaveReq.toSales());

        Contents content = contentsRepository.findByTokenId(tokenId).get();
        content.setOnSaleYn(Status.y);
        contentsRepository.save(content);
    }

    @Transactional(readOnly = true)
    public Sales detail(int tokenId) {
        return findSalesByTokenIdAndSaleYnIsNOrElseThrow(tokenId);
    }

    @Transactional
    public void complete(SalesCompleteReq salesCompleteReq) {
        int tokenId = salesCompleteReq.getTokenId();
        String buyerAddress = salesCompleteReq.getBuyerAddress();

        Sales sales = findSalesByTokenIdAndSaleYnIsNOrElseThrow(tokenId);
        sales.setBuyerAddress(buyerAddress);
        sales.setSaleYn(Status.y);
        salesRepository.save(sales);

        Contents content = contentsRepository.findByTokenId(tokenId).get();
        content.setOnSaleYn(Status.n);
        content.setRecentOwnerAddress(buyerAddress);
        contentsRepository.save(content);
    }

    @Transactional
    public void cancel(int tokenId) {
        Sales sales = findSalesByTokenIdAndSaleYnIsNOrElseThrow(tokenId);
        salesRepository.delete(sales);

        Contents content = contentsRepository.findByTokenId(tokenId).get();
        content.setOnSaleYn(Status.n);
        contentsRepository.save(content);
    }


    @Transactional(readOnly = true)
    public Page<Sales> recent(int page) {
        PageRequest pageable = PageRequest.of(page - 1, 12, Sort.by("id").descending());
        return salesRepository.findAll(pageable);
    }

    private Sales findSalesByTokenIdAndSaleYnIsNOrElseThrow(int tokenId) {
        Optional<Sales> byTokenId = salesRepository.findByTokenIdAndSaleYn(tokenId, Status.n);
        return byTokenId.orElseThrow(() -> new NotExistedTokenIdException());
    }

}
