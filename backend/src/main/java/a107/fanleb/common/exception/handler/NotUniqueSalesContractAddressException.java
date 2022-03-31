package a107.fanleb.common.exception.handler;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class NotUniqueSalesContractAddressException extends ResponseStatusException {
    public NotUniqueSalesContractAddressException(){
        super(HttpStatus.BAD_REQUEST, "sales_contract_address는 unique한 값을 가져야 합니다");
    }
}