// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
// import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
// import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "./token/ERC721/ERC721.sol";
import "./access/Ownable.sol";
import "./token/ERC721/extensions/ERC721Enumerable.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

contract SubscribeNFT is ERC721, Ownable, ERC721Enumerable {
    using Counters for Counters.Counter;    
    using Strings for uint256;

    Counters.Counter private _tokenIdCounter;
    mapping(uint256 => string) tokenURIs;
    mapping(address => uint256[]) public originalAuthorAddrs;
    constructor() ERC721("Subscription", "FST") {}

    function _baseURI() internal pure override returns (string memory) {
        return "";
    }

    function safeMint(address to, string calldata url) public {
        uint256 tokenId = _tokenIdCounter.current();
        tokenURIs[tokenId] = url;
        originalAuthorAddrs[to].push(tokenId);
        _tokenIdCounter.increment();
        _mint(to, tokenId);
    }

      function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        string memory baseURI = _baseURI();
        return string(abi.encodePacked(baseURI, tokenURIs[tokenId]));
    }

    function batchMint(address to, uint amount, string calldata url) public {
        for (uint i = 0; i < amount; i++) {
            safeMint(to, url);
        }
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId) 
        public 
        view 
        override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}