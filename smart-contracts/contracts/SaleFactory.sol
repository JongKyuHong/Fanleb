// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./access/Ownable.sol";
import "./token/ERC20/ERC20.sol";
import "./token/ERC721/ERC721.sol";
import "./SsafyNFT.sol";

/**
 * PJT Ⅲ - Req.1-SC1 SaleFactory 구현
 * 상태 변수나 함수의 시그니처, 이벤트는 구현에 따라 변경할 수 있습니다.
 */
contract SaleFactory is Ownable {
    address public admin;
    address[] public sales;

    event NewSale(
        address indexed _saleContract,
        address indexed _owner,
        uint256 _workId
    );

    constructor() {
        admin = msg.sender;
    }

    /**
     * @dev 반드시 구현해야하는 함수입니다. 
     */
    function createSale(
        uint256 itemId,
        uint256 purchasePrice,
        address currencyAddress,
        address nftAddress
    ) public returns (address) {
        // TODO
        Sale newContract = new Sale(admin, admin, itemId, purchasePrice, currencyAddress, nftAddress);
        emit NewSale(newContract.getAddress(), newContract.getSeller(), newContract.gettokenId());
        sales.push(newContract.getAddress());
        return newContract.getAddress();
    }

    function allSales() public view returns (address[] memory) {
        return sales;
    }
}

/**
 *  PJT Ⅲ - Req.1-SC2) Sale 구현
 */
contract Sale {
    // 생성자에 의해 정해지는 값
    address public seller;
    address public buyer;
    address admin;
    uint256 public purchasePrice;
    uint256 public tokenId;
    address public currencyAddress;
    address public nftAddress;
    bool public ended;

    // 현재 최고 입찰 상태
    address public highestBidder;
    uint256 public highestBid;

    IERC20 public erc20Contract;
    IERC721 public erc721Constract;

    event SaleEnded(address winner, uint256 amount);

    constructor(
        address _admin,
        address _seller,
        uint256 _tokenId,
        uint256 _purchasePrice,
        address _currencyAddress,
        address _nftAddress
    ) {
        require(_purchasePrice > 0);
        tokenId = _tokenId;
        purchasePrice = _purchasePrice;
        seller = _seller;
        admin = _admin;
        currencyAddress = _currencyAddress;
        nftAddress = _nftAddress;
        ended = false;
        erc20Contract = ERC20(_currencyAddress);
        erc721Constract = IERC721(_nftAddress);
    }

    function purchase(address _buyer) public onlySeller{ // onlyAfterStart
        // TODO
        require(seller != msg.sender);
        require(erc20Contract.approve(_buyer, purchasePrice));

        erc20Contract.approve(_buyer, purchasePrice);
        erc20Contract.transfer(_buyer, purchasePrice); // 구매자의 토큰을 즉시 구매가만큼 판매자에게 송금
        
        erc721Constract.transferFrom(seller, _buyer, tokenId); //erc721Constract // NFT소유권을 구매자에게 이전
        ended = true;// 컨트랙트의 거래 상태와 구매자 정보를 업데이트 구매자 정보 업데이트??
    }

    function confirmItem() public {
        // TODO 
    }
    
    function cancelSales() public{
        // TODO
        require(msg.sender == admin || msg.sender == seller);
        ended = true;
    }

    function getAddress() public view returns (address){
        return address(this);
    }

    function getSeller() public view returns (address){
        return seller;
    }

    function gettokenId() public view returns (uint256){
        return tokenId;
    }

    function getSaleInfo()
        public
        view
        returns (
            uint256,
            uint256,
            address,
            address
        )
    {
        return (
            purchasePrice,
            tokenId,
            currencyAddress,
            nftAddress
        );
    }


    // internal 혹은 private 함수 선언시 아래와 같이 _로 시작하도록 네이밍합니다.
    function _end() internal {
        ended = true;
    }

    function _getCurrencyAmount() private view returns (uint256) { 
        return erc20Contract.balanceOf(msg.sender); // 계정이 소유한 토큰의 양을 반환
    }

    // modifier를 사용하여 함수 동작 조건을 재사용하는 것을 권장합니다. 
    modifier onlySeller() {
        require(msg.sender == seller, "Sale: You are not seller."); 
        _;
    }
}
