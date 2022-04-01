// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./token/ERC20/ERC20.sol";
import "./access/Ownable.sol";

/**
 * PJT Ⅲ - Req 1-SC3. 시나리오 테스트
 * 테스트 코드 작성을 위해 제공되는 컨트랙트 코드입니다.
 */ 
contract SsafyToken is ERC20, Ownable{
    
    constructor(string memory name, string memory symbol, uint8 decimal) ERC20(name, symbol, decimal) {}
    mapping(address => uint256) private _balances;
    
    function mint(uint256 amount) public onlyOwner{
        _mint(_msgSender(), amount);
    }
    
    function forceToTransfer(address from, address to, uint256 amount) public onlyOwner{
        _transfer(from, to, amount);
    }

    function getsupply() public view returns (uint256){
        return totalSupply();
    }

    function getCurrencyAmount() public view returns (uint256) { 
        return ERC20.balanceOf(msg.sender); // 계정이 소유한 토큰의 양을 반환
    }

    function balanceOf(address account) public view virtual override returns (uint256) {
        return _balances[account];
    }
}