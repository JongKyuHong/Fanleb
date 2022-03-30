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
    SsafyNFT public SsafyNFTAddresss;
    address public test;
    event NewSale(
        address indexed _saleContract,
        address indexed _owner,
        uint256 _workId
    );

    constructor() {
        admin = msg.sender;
        // SsafyNFTAddresss = SsafyNFT(_SsafyNFTAddresss);
        // test = _SsafyNFTAddresss;
    }

    /**
     * @dev 반드시 구현해야하는 함수입니다. 
     */
    function createSale(
        uint256 itemId,
        // uint256 minPrice,
        uint256 purchasePrice,
        // uint256 startTime,
        // uint256 endTime,
        address currencyAddress,
        address nftAddress
    ) public returns (address) {
        // TODO
        Sale newContract = new Sale(admin,admin,itemId,purchasePrice,currencyAddress,nftAddress);
        emit NewSale(newContract.nftAddress(), newContract.seller(), newContract.tokenId());
        return newContract.nftAddress();
        // return
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
    // uint256 public saleStartTime;
    // uint256 public saleEndTime;
    //uint256 public minPrice;
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

    event HighestBidIncereased(address bidder, uint256 amount);
    event SaleEnded(address winner, uint256 amount);

    constructor(
        address _admin,
        address _seller,
        uint256 _tokenId,
        //uint256 _minPrice,
        uint256 _purchasePrice,
        // uint256 startTime,
        // uint256 endTime,
        address _currencyAddress,
        address _nftAddress
    ) {
        require(_purchasePrice > 0); // _minPrice > 0
        tokenId = _tokenId;
        //minPrice = _minPrice;
        purchasePrice = _purchasePrice;
        seller = _seller;
        admin = _admin;
        // saleStartTime = startTime;
        // saleEndTime = endTime;
        currencyAddress = _currencyAddress;
        nftAddress = _nftAddress;
        ended = false;
        erc20Contract = IERC20(_currencyAddress);
        erc721Constract = IERC721(_nftAddress);
    }

    function bid(uint256 bid_amount) public onlySeller { //onlyAfterStart
        // TODO
        // int256 success = getTimeLeft();
        // require(success > 0);
        require(erc20Contract.approve(buyer, bid_amount));
    }

    function purchase() public onlySeller{ // onlyAfterStart
        // TODO 
        // int256 success = getTimeLeft();
        // require(success > 0);
        require(erc20Contract.approve(buyer, purchasePrice));

        erc20Contract.transfer(buyer,purchasePrice); // 구매자의 토큰을 즉시 구매가만큼 판매자에게 송금
        erc20Contract.approve(buyer,purchasePrice);
        //erc721Constract // NFT소유권을 구매자에게 이전
        // 컨트랙트의 거래 상태와 구매자 정보를 업데이트


    }

    function confirmItem() public {
        // TODO 
        // int256 success = getTimeLeft();
        // require(success < 0);
        require(msg.sender == highestBidder);
        
        erc20Contract.transfer(msg.sender,purchasePrice);
        //erc721Constract // NFT소유권을 구매자에게 이전
        // 컨트랙트의 거래 상태와 구매자 정보를 업데이트
    }
    
    function cancelSales() public view{
        // TODO
        // int256 success = getTimeLeft();
        // require(success > 0);
        require(msg.sender == admin);
        require(msg.sender == seller);

        //_burn // 환불진행
        // NFT소유권 돌려줌
        // 컨트랙트의 거래 상태를 업데이트

    }

    // function getTimeLeft() public view returns (int256) {
    //     return (int256)(saleEndTime - block.timestamp);
    // }

    function getSaleInfo()
        public
        view
        returns (
            // uint256,
            // uint256,
            //uint256,
            uint256,
            uint256,
            address,
            uint256,
            address,
            address
        )
    {
        return (
            // saleStartTime,
            // saleEndTime,
            //minPrice,
            purchasePrice,
            tokenId,
            highestBidder,
            highestBid,
            currencyAddress,
            nftAddress
        );
    }

    function getHighestBid() public view returns(uint256){
        return highestBid;
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

    // modifier onlyAfterStart() {
    //     require(
    //         block.timestamp >= saleStartTime,
    //         "Sale: This sale is not started."
    //     );
    //     _;
    // }
}
