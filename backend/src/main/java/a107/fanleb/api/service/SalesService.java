package a107.fanleb.api.service;

import a107.fanleb.api.request.sales.SalesSaveReq;
import a107.fanleb.domain.sales.SalesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class SalesService {
    private final SalesRepository salesRepository;

    @Transactional
    public void save(SalesSaveReq salesSaveReq) {
        salesRepository.save(salesSaveReq.toSales());
    }

    @Transactional
    public void detail() {
    }

    @Transactional
    public void update() {
    }

    @Transactional
    public void cancel() {
    }

    @Transactional
    public void complete() {
    }

    @Transactional
    public void recent() {
    }

}
