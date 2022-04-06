// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "./token/ERC721/extensions/ERC721Enumerable.sol";

/**
 * PJT Ⅰ - 과제 2) NFT Creator 구현
 * 상태 변수나 함수의 시그니처는 구현에 따라 변경할 수 있습니다.
 */
contract SsafyNFT is ERC721, ERC721Enumerable{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    // uint256 private _tokenIds; 

    mapping(uint256 => string) tokenURIs;

    constructor() ERC721("SSAFY", "SSF") {
        // TODO   
    }

    // function current() public view returns (uint256) {
    //     return _tokenIds;
    // }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        // TODO
        return tokenURIs[tokenId];
    }

    function create(address to, string memory _tokenURI) public returns (uint256) {
        // TODO
        _tokenIds.increment();
        uint256 new_ids = _tokenIds.current();
        _mint(to, new_ids);
        tokenURIs[new_ids] = _tokenURI;
        return new_ids;
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId) 
        public 
        view 
        override(ERC721, ERC721Enumerable) 
        returns (bool) 
    {
        return super.supportsInterface(interfaceId);
    }
}