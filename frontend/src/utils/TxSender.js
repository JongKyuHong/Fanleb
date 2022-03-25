// import Web3 from 'web3';
// import Tx from 'ethereumjs-tx';

// // Web3
// const web3 = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_ETHEREUM_RPC_URL));

// /**
//  * 트랜잭션 전송을 위한 공통 로직을 아래에 구현합니다. 
//  * 전달받은 개인키로 서명한 트랜잭션을 전송합니다. 
//  * @param {*} fromAddr 보내는 주소
//  * @param {*} privKey 보내는 주소의 개인키
//  * @param {*} toAddr 받는 주소
//  * @param {*} data 입력 데이터
//  * @returns 트랜잭션의 결과 
//  */
// export default async function sendTransaction(fromAddr, privKey, toAddr, data) {
//   try {
//     // TODO
//   } catch (e) {
//     console.log(e);
//   }
// }
const Web3 = require("web3");
const fs = require("fs");

// 네트워크 기본 설정
const ssafyProvider = new Web3.providers.HttpProvider("http://20.196.209.2.:8545");
// const localProvider = new Web3.providers.HttpProvider("http://localhost:7545");
const web3 = new Web3(ssafyProvider);

// Contract sendTransaction 시 입력해야 할 것
// 1. 사피 지갑 정보 (walletAddress, privateKey)
// 2. 사피 네트워크에 배포한 계약 정보 (contractAddr, contractABI)
// 3. 실행할 메소드 정보 (contractMethod)
//

// 1. 사피 지갑 정보`
// const walletAddress = "[사피 지갑주소: 0x1234...]";
// const privateKey = '[사피 지갑개인키: 0x1234...]';

//const walletAddress = "0x316Cccdc7D62Ca20cC45496c83F12A4a9EC27a21";
//const privateKey = '68bb22025e0b6c6a14fa1d71c2aa1c53834d248cbfddcbba0183bd641ce36036';

//const walletAccount = web3.eth.accounts.privateKeyToAccount(privateKey);

// 2. 사피 네트워크에 배포한 계약 정보
// const contractAddr = "[배포한 계약 주소: 0x1234...]";
// const { abi: contractABI } = JSON.parse(fs.readFileSync('./build/contracts/[Truffle compile한 결과물].json'));

// const contractAddr = "0x7d544ddD5CA5D6f9E613eD3AB22f7683Bd726A81";

// const { abi: contractABI } = JSON.parse(fs.readFileSync('./build/contracts/SsafyNFT.json'));
// ABI를 불러오는데 오류가 있어서 일단 임시로 파일 안에 직접 입력했습니다.
const { abi: contractABI } = {
  "contractName": "SsafyNFT",
  "abi": [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "approved",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "ApprovalForAll",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getApproved",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        }
      ],
      "name": "isApprovedForAll",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "ownerOf",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "_data",
          "type": "bytes"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "setApprovalForAll",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "interfaceId",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "current",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "tokenURI",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_tokenURI",
          "type": "string"
        }
      ],
      "name": "create",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "metadata": "{\"compiler\":{\"version\":\"0.8.10+commit.fc410830\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"approved\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"Approval\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"operator\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"bool\",\"name\":\"approved\",\"type\":\"bool\"}],\"name\":\"ApprovalForAll\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"Transfer\",\"type\":\"event\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"approve\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"}],\"name\":\"balanceOf\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"string\",\"name\":\"_tokenURI\",\"type\":\"string\"}],\"name\":\"create\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"current\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"getApproved\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"operator\",\"type\":\"address\"}],\"name\":\"isApprovedForAll\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"name\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"ownerOf\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"safeTransferFrom\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"},{\"internalType\":\"bytes\",\"name\":\"_data\",\"type\":\"bytes\"}],\"name\":\"safeTransferFrom\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"operator\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"approved\",\"type\":\"bool\"}],\"name\":\"setApprovalForAll\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes4\",\"name\":\"interfaceId\",\"type\":\"bytes4\"}],\"name\":\"supportsInterface\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"symbol\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"tokenURI\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"transferFrom\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}],\"devdoc\":{\"kind\":\"dev\",\"methods\":{\"approve(address,uint256)\":{\"details\":\"See {IERC721-approve}.\"},\"balanceOf(address)\":{\"details\":\"See {IERC721-balanceOf}.\"},\"getApproved(uint256)\":{\"details\":\"See {IERC721-getApproved}.\"},\"isApprovedForAll(address,address)\":{\"details\":\"See {IERC721-isApprovedForAll}.\"},\"name()\":{\"details\":\"See {IERC721Metadata-name}.\"},\"ownerOf(uint256)\":{\"details\":\"See {IERC721-ownerOf}.\"},\"safeTransferFrom(address,address,uint256)\":{\"details\":\"See {IERC721-safeTransferFrom}.\"},\"safeTransferFrom(address,address,uint256,bytes)\":{\"details\":\"See {IERC721-safeTransferFrom}.\"},\"setApprovalForAll(address,bool)\":{\"details\":\"See {IERC721-setApprovalForAll}.\"},\"supportsInterface(bytes4)\":{\"details\":\"See {IERC165-supportsInterface}.\"},\"symbol()\":{\"details\":\"See {IERC721Metadata-symbol}.\"},\"tokenURI(uint256)\":{\"details\":\"See {IERC721Metadata-tokenURI}.\"},\"transferFrom(address,address,uint256)\":{\"details\":\"See {IERC721-transferFrom}.\"}},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{},\"notice\":\"PJT \\u2160 - \\uacfc\\uc81c 2) NFT Creator \\uad6c\\ud604 \\uc0c1\\ud0dc \\ubcc0\\uc218\\ub098 \\ud568\\uc218\\uc758 \\uc2dc\\uadf8\\ub2c8\\ucc98\\ub294 \\uad6c\\ud604\\uc5d0 \\ub530\\ub77c \\ubcc0\\uacbd\\ud560 \\uc218 \\uc788\\uc2b5\\ub2c8\\ub2e4.\",\"version\":1}},\"settings\":{\"compilationTarget\":{\"project:/contracts/SsafyNFT.sol\":\"SsafyNFT\"},\"evmVersion\":\"london\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":false,\"runs\":200},\"remappings\":[]},\"sources\":{\"project:/contracts/SsafyNFT.sol\":{\"keccak256\":\"0xae802991756054b55e68c613d74ab05470e3e053c5a2343fb3555e686e2b84ea\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://e161664f2288ea8c07339659122c14a3150ad6cbc1d0d823fb1125ced7ac7e54\",\"dweb:/ipfs/QmVDWiM5E9E4KM3W2E1yGuawNjDn9wZdBtfKa9NAiJYGgb\"]},\"project:/contracts/token/ERC721/ERC721.sol\":{\"keccak256\":\"0xfd05a6588d3d4eac67f65bf9aacbc14059d6014d0558b57ac00396755485ea52\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://8df698d609fede026b60d3a44de4e9e1d6c10c6d070eb270ccbf3f5487a6360e\",\"dweb:/ipfs/QmZqKWLAJDosdXbibY4J6sxHtTX5wJCbBN3pofoFrxvJXU\"]},\"project:/contracts/token/ERC721/IERC721.sol\":{\"keccak256\":\"0x7d46ae705c48880d435f3128a5f36e102452c1035a880eb314f9cab5cb3248b6\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://114d79b2fba48981056703bd70200b528331f6e7b3c85f7fa0fcaed7d91f6025\",\"dweb:/ipfs/QmReeV1Z7UiW73Zr4iLbqvoRB9YiW9V68uEiNqXcjzi8xh\"]},\"project:/contracts/token/ERC721/IERC721Receiver.sol\":{\"keccak256\":\"0x7cb02bc96de2719a6701ab18ef3873c6928e392ebaa624124499dda76c88b067\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://a6d6aacfc8b749b7dc40f341cad484e5feb571073959d5d5b8103bf57fb573bd\",\"dweb:/ipfs/QmZDJqj2pciNw4v5N5FMeC2Q1vhBv2jHU3uDQvC5STgsT4\"]},\"project:/contracts/token/ERC721/extensions/IERC721Metadata.sol\":{\"keccak256\":\"0xb61391c8adec70c983c47cff53d490d8ddc71bf37a12da18dc053b45b4d813ae\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://5d08e865414ac6e52f1a61c93acc173079fb3471db5138e3a2c23db2550114cd\",\"dweb:/ipfs/QmUhQ71H29HyjX9GnSWXdZ1Lnh4EPWAbXPhMyuWgSrDxby\"]},\"project:/contracts/utils/Address.sol\":{\"keccak256\":\"0x4cdad91fcb345358c77f4c752b2b3983f783fb6bcd4c6f7f42dba588612907be\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://678c1bfbb9fc26b0aaa34d404adbe08aa36b88b51c9eba6eba13389dac8580b7\",\"dweb:/ipfs/QmZdv53JrE4MtTR915KRpDjao32uCg6TPAXs3p95HMFvw1\"]},\"project:/contracts/utils/Context.sol\":{\"keccak256\":\"0xdb19f5cb22f6551fbb03ba38b8af9e543e26deb4d23788f2946f25c091256ca3\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://9381d108c93f3fdd1e5a4580834362f20d0f5e919d97820afd55be553ef10c19\",\"dweb:/ipfs/QmWjioeW1kKfZHtmgrpxDYhwF2sVZ8gXoWTA9mKZvWvZot\"]},\"project:/contracts/utils/Strings.sol\":{\"keccak256\":\"0x90bf9a67cda8539274966706149096a2c6df1c5504aa1a4c36e8be275db822e8\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://29937e4bb514219e1873d0b765e9980c86d2815e521e2b8608c981e284e808cd\",\"dweb:/ipfs/QmeJTbsBXFsdkL1KQERnwr1GPqsqci2dB4jzzcVrgGtBHi\"]},\"project:/contracts/utils/introspection/ERC165.sol\":{\"keccak256\":\"0xf0389fb699481b09fe24019d5a53d6a9e4af3c3fb5d0083eed137aed8020ff69\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://ddebb3d549798a232d7e7c74547a802f7fd075a6e4f02a7560e902b5e6f6d995\",\"dweb:/ipfs/QmP1XhRy71vYxiU5eZfo3D4zZvzxgb4VjGhfjm6N4sK683\"]},\"project:/contracts/utils/introspection/IERC165.sol\":{\"keccak256\":\"0xe09bdf91dde6872fa597c6554ced17e679727988578019bf8aa7954e4479ef76\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://d262e8e7efe5037ade4db603f32b45e320609777241d01498b988acbad81c8e4\",\"dweb:/ipfs/Qme5ngXzkphT96C1qKWz7XP7yFhYboiP9tVt8AMQHBEkYZ\"]}},\"version\":1}",
  "bytecode": "0x60806040523480156200001157600080fd5b506040518060400160405280600581526020017f5f6e616d650000000000000000000000000000000000000000000000000000008152506040518060400160405280600781526020017f5f73796d626f6c00000000000000000000000000000000000000000000000000815250816000908051906020019062000096929190620000b8565b508060019080519060200190620000af929190620000b8565b505050620001cd565b828054620000c69062000197565b90600052602060002090601f016020900481019282620000ea576000855562000136565b82601f106200010557805160ff191683800117855562000136565b8280016001018555821562000136579182015b828111156200013557825182559160200191906001019062000118565b5b50905062000145919062000149565b5090565b5b80821115620001645760008160009055506001016200014a565b5090565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680620001b057607f821691505b60208210811415620001c757620001c662000168565b5b50919050565b61258880620001dd6000396000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c806370a0823111610097578063a22cb46511610066578063a22cb46514610298578063b88d4fde146102b4578063c87b56dd146102d0578063e985e9c514610300576100f5565b806370a08231146101fc57806395d89b411461022c5780639fa6a6e31461024a578063a15ab08d14610268576100f5565b8063095ea7b3116100d3578063095ea7b31461017857806323b872dd1461019457806342842e0e146101b05780636352211e146101cc576100f5565b806301ffc9a7146100fa57806306fdde031461012a578063081812fc14610148575b600080fd5b610114600480360381019061010f919061169b565b610330565b60405161012191906116e3565b60405180910390f35b610132610412565b60405161013f9190611797565b60405180910390f35b610162600480360381019061015d91906117ef565b6104a4565b60405161016f919061185d565b60405180910390f35b610192600480360381019061018d91906118a4565b6104e1565b005b6101ae60048036038101906101a991906118e4565b61068e565b005b6101ca60048036038101906101c591906118e4565b610761565b005b6101e660048036038101906101e191906117ef565b610781565b6040516101f3919061185d565b60405180910390f35b61021660048036038101906102119190611937565b610866565b6040516102239190611973565b60405180910390f35b61023461091e565b6040516102419190611797565b60405180910390f35b6102526109b0565b60405161025f9190611973565b60405180910390f35b610282600480360381019061027d9190611ac3565b6109ba565b60405161028f9190611973565b60405180910390f35b6102b260048036038101906102ad9190611b4b565b610a0f565b005b6102ce60048036038101906102c99190611c2c565b610b7b565b005b6102ea60048036038101906102e591906117ef565b610be3565b6040516102f79190611797565b60405180910390f35b61031a60048036038101906103159190611caf565b610c88565b60405161032791906116e3565b60405180910390f35b60007f80ac58cd000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614806103fb57507f5b5e139f000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b8061040b575061040a82610d1c565b5b9050919050565b60606000805461042190611d1e565b80601f016020809104026020016040519081016040528092919081815260200182805461044d90611d1e565b801561049a5780601f1061046f5761010080835404028352916020019161049a565b820191906000526020600020905b81548152906001019060200180831161047d57829003601f168201915b5050505050905090565b60006004600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b60006104ec82610781565b90508073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141561055d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161055490611dc2565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16148061059d575061059c8133610c88565b5b6105dc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105d390611e54565b60405180910390fd5b826004600084815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550818373ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a4505050565b61069781610781565b73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16146106ce57600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16141561070857600080fd5b6107123382610d86565b610751576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161074890611ee6565b60405180910390fd5b61075c838383610e64565b505050565b61077c83838360405180602001604052806000815250610b7b565b505050565b6000806002600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141561082a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161082190611f78565b60405180910390fd5b6002600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16915050919050565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156108d7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108ce9061200a565b60405180910390fd5b600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b60606001805461092d90611d1e565b80601f016020809104026020016040519081016040528092919081815260200182805461095990611d1e565b80156109a65780601f1061097b576101008083540402835291602001916109a6565b820191906000526020600020905b81548152906001019060200180831161098957829003601f168201915b5050505050905090565b6000600654905090565b60008060016109c76109b0565b6109d19190612059565b90506109dd84826110cb565b82600760008381526020019081526020016000209080519060200190610a0492919061158c565b508091505092915050565b3373ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610a7e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a75906120fb565b60405180910390fd5b80600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3183604051610b6f91906116e3565b60405180910390a35050565b610b87848484846112a5565b610bc6576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610bbd9061218d565b60405180910390fd5b610bd184848461068e565b610bdd848484846113e8565b50505050565b6060600760008381526020019081526020016000208054610c0390611d1e565b80601f0160208091040260200160405190810160405280929190818152602001828054610c2f90611d1e565b8015610c7c5780601f10610c5157610100808354040283529160200191610c7c565b820191906000526020600020905b815481529060010190602001808311610c5f57829003601f168201915b50505050509050919050565b6000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b6000610d9182611444565b610dd0576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610dc79061221f565b60405180910390fd5b6000610ddb83610781565b90508073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161480610e4a57508373ffffffffffffffffffffffffffffffffffffffff16610e32846104a4565b73ffffffffffffffffffffffffffffffffffffffff16145b80610e5b5750610e5a8185610c88565b5b91505092915050565b8273ffffffffffffffffffffffffffffffffffffffff16610e8482610781565b73ffffffffffffffffffffffffffffffffffffffff1614610eda576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ed1906122b1565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610f4a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f4190612343565b60405180910390fd5b610f558383836114b6565b610f606000826114bb565b6001600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610fb09190612363565b925050819055506001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546110079190612059565b92505081905550816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a46110c6838383611574565b505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16141561113b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611132906123e3565b60405180910390fd5b61114481611444565b15611184576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161117b9061244f565b60405180910390fd5b611190600083836114b6565b816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546112329190612059565b92505081905550808273ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a46112a160008383611574565b5050565b60006112c68473ffffffffffffffffffffffffffffffffffffffff16611579565b1580156113005750600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1614155b1561130e57600190506113e0565b60008473ffffffffffffffffffffffffffffffffffffffff1663150b7a02338887876040518563ffffffff1660e01b815260040161134f94939291906124c4565b6020604051808303816000875af115801561136e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113929190612525565b905063150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149150505b949350505050565b6113f3848484610e64565b6113ff848484846112a5565b61143e576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016114359061218d565b60405180910390fd5b50505050565b6000806002600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415915050919050565b505050565b816004600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff1661152e83610781565b73ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b505050565b600080823b905060008111915050919050565b82805461159890611d1e565b90600052602060002090601f0160209004810192826115ba5760008555611601565b82601f106115d357805160ff1916838001178555611601565b82800160010185558215611601579182015b828111156116005782518255916020019190600101906115e5565b5b50905061160e9190611612565b5090565b5b8082111561162b576000816000905550600101611613565b5090565b6000604051905090565b600080fd5b600080fd5b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b61167881611643565b811461168357600080fd5b50565b6000813590506116958161166f565b92915050565b6000602082840312156116b1576116b0611639565b5b60006116bf84828501611686565b91505092915050565b60008115159050919050565b6116dd816116c8565b82525050565b60006020820190506116f860008301846116d4565b92915050565b600081519050919050565b600082825260208201905092915050565b60005b8381101561173857808201518184015260208101905061171d565b83811115611747576000848401525b50505050565b6000601f19601f8301169050919050565b6000611769826116fe565b6117738185611709565b935061178381856020860161171a565b61178c8161174d565b840191505092915050565b600060208201905081810360008301526117b1818461175e565b905092915050565b6000819050919050565b6117cc816117b9565b81146117d757600080fd5b50565b6000813590506117e9816117c3565b92915050565b60006020828403121561180557611804611639565b5b6000611813848285016117da565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006118478261181c565b9050919050565b6118578161183c565b82525050565b6000602082019050611872600083018461184e565b92915050565b6118818161183c565b811461188c57600080fd5b50565b60008135905061189e81611878565b92915050565b600080604083850312156118bb576118ba611639565b5b60006118c98582860161188f565b92505060206118da858286016117da565b9150509250929050565b6000806000606084860312156118fd576118fc611639565b5b600061190b8682870161188f565b935050602061191c8682870161188f565b925050604061192d868287016117da565b9150509250925092565b60006020828403121561194d5761194c611639565b5b600061195b8482850161188f565b91505092915050565b61196d816117b9565b82525050565b60006020820190506119886000830184611964565b92915050565b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6119d08261174d565b810181811067ffffffffffffffff821117156119ef576119ee611998565b5b80604052505050565b6000611a0261162f565b9050611a0e82826119c7565b919050565b600067ffffffffffffffff821115611a2e57611a2d611998565b5b611a378261174d565b9050602081019050919050565b82818337600083830152505050565b6000611a66611a6184611a13565b6119f8565b905082815260208101848484011115611a8257611a81611993565b5b611a8d848285611a44565b509392505050565b600082601f830112611aaa57611aa961198e565b5b8135611aba848260208601611a53565b91505092915050565b60008060408385031215611ada57611ad9611639565b5b6000611ae88582860161188f565b925050602083013567ffffffffffffffff811115611b0957611b0861163e565b5b611b1585828601611a95565b9150509250929050565b611b28816116c8565b8114611b3357600080fd5b50565b600081359050611b4581611b1f565b92915050565b60008060408385031215611b6257611b61611639565b5b6000611b708582860161188f565b9250506020611b8185828601611b36565b9150509250929050565b600067ffffffffffffffff821115611ba657611ba5611998565b5b611baf8261174d565b9050602081019050919050565b6000611bcf611bca84611b8b565b6119f8565b905082815260208101848484011115611beb57611bea611993565b5b611bf6848285611a44565b509392505050565b600082601f830112611c1357611c1261198e565b5b8135611c23848260208601611bbc565b91505092915050565b60008060008060808587031215611c4657611c45611639565b5b6000611c548782880161188f565b9450506020611c658782880161188f565b9350506040611c76878288016117da565b925050606085013567ffffffffffffffff811115611c9757611c9661163e565b5b611ca387828801611bfe565b91505092959194509250565b60008060408385031215611cc657611cc5611639565b5b6000611cd48582860161188f565b9250506020611ce58582860161188f565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680611d3657607f821691505b60208210811415611d4a57611d49611cef565b5b50919050565b7f4552433732313a20617070726f76616c20746f2063757272656e74206f776e6560008201527f7200000000000000000000000000000000000000000000000000000000000000602082015250565b6000611dac602183611709565b9150611db782611d50565b604082019050919050565b60006020820190508181036000830152611ddb81611d9f565b9050919050565b7f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760008201527f6e6572206e6f7220617070726f76656420666f7220616c6c0000000000000000602082015250565b6000611e3e603883611709565b9150611e4982611de2565b604082019050919050565b60006020820190508181036000830152611e6d81611e31565b9050919050565b7f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f60008201527f776e6572206e6f7220617070726f766564000000000000000000000000000000602082015250565b6000611ed0603183611709565b9150611edb82611e74565b604082019050919050565b60006020820190508181036000830152611eff81611ec3565b9050919050565b7f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460008201527f656e7420746f6b656e0000000000000000000000000000000000000000000000602082015250565b6000611f62602983611709565b9150611f6d82611f06565b604082019050919050565b60006020820190508181036000830152611f9181611f55565b9050919050565b7f4552433732313a2062616c616e636520717565727920666f7220746865207a6560008201527f726f206164647265737300000000000000000000000000000000000000000000602082015250565b6000611ff4602a83611709565b9150611fff82611f98565b604082019050919050565b6000602082019050818103600083015261202381611fe7565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000612064826117b9565b915061206f836117b9565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156120a4576120a361202a565b5b828201905092915050565b7f4552433732313a20617070726f766520746f2063616c6c657200000000000000600082015250565b60006120e5601983611709565b91506120f0826120af565b602082019050919050565b60006020820190508181036000830152612114816120d8565b9050919050565b7f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560008201527f63656976657220696d706c656d656e7465720000000000000000000000000000602082015250565b6000612177603283611709565b91506121828261211b565b604082019050919050565b600060208201905081810360008301526121a68161216a565b9050919050565b7f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860008201527f697374656e7420746f6b656e0000000000000000000000000000000000000000602082015250565b6000612209602c83611709565b9150612214826121ad565b604082019050919050565b60006020820190508181036000830152612238816121fc565b9050919050565b7f4552433732313a207472616e736665722066726f6d20696e636f72726563742060008201527f6f776e6572000000000000000000000000000000000000000000000000000000602082015250565b600061229b602583611709565b91506122a68261223f565b604082019050919050565b600060208201905081810360008301526122ca8161228e565b9050919050565b7f4552433732313a207472616e7366657220746f20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b600061232d602483611709565b9150612338826122d1565b604082019050919050565b6000602082019050818103600083015261235c81612320565b9050919050565b600061236e826117b9565b9150612379836117b9565b92508282101561238c5761238b61202a565b5b828203905092915050565b7f4552433732313a206d696e7420746f20746865207a65726f2061646472657373600082015250565b60006123cd602083611709565b91506123d882612397565b602082019050919050565b600060208201905081810360008301526123fc816123c0565b9050919050565b7f4552433732313a20746f6b656e20616c7265616479206d696e74656400000000600082015250565b6000612439601c83611709565b915061244482612403565b602082019050919050565b600060208201905081810360008301526124688161242c565b9050919050565b600081519050919050565b600082825260208201905092915050565b60006124968261246f565b6124a0818561247a565b93506124b081856020860161171a565b6124b98161174d565b840191505092915050565b60006080820190506124d9600083018761184e565b6124e6602083018661184e565b6124f36040830185611964565b8181036060830152612505818461248b565b905095945050505050565b60008151905061251f8161166f565b92915050565b60006020828403121561253b5761253a611639565b5b600061254984828501612510565b9150509291505056fea2646970667358221220f886187a97e43e271db0042add651d2fb0a8d4b37cc08864bb6c27e9dea6fca864736f6c634300080a0033",
  "deployedBytecode": "0x608060405234801561001057600080fd5b50600436106100f55760003560e01c806370a0823111610097578063a22cb46511610066578063a22cb46514610298578063b88d4fde146102b4578063c87b56dd146102d0578063e985e9c514610300576100f5565b806370a08231146101fc57806395d89b411461022c5780639fa6a6e31461024a578063a15ab08d14610268576100f5565b8063095ea7b3116100d3578063095ea7b31461017857806323b872dd1461019457806342842e0e146101b05780636352211e146101cc576100f5565b806301ffc9a7146100fa57806306fdde031461012a578063081812fc14610148575b600080fd5b610114600480360381019061010f919061169b565b610330565b60405161012191906116e3565b60405180910390f35b610132610412565b60405161013f9190611797565b60405180910390f35b610162600480360381019061015d91906117ef565b6104a4565b60405161016f919061185d565b60405180910390f35b610192600480360381019061018d91906118a4565b6104e1565b005b6101ae60048036038101906101a991906118e4565b61068e565b005b6101ca60048036038101906101c591906118e4565b610761565b005b6101e660048036038101906101e191906117ef565b610781565b6040516101f3919061185d565b60405180910390f35b61021660048036038101906102119190611937565b610866565b6040516102239190611973565b60405180910390f35b61023461091e565b6040516102419190611797565b60405180910390f35b6102526109b0565b60405161025f9190611973565b60405180910390f35b610282600480360381019061027d9190611ac3565b6109ba565b60405161028f9190611973565b60405180910390f35b6102b260048036038101906102ad9190611b4b565b610a0f565b005b6102ce60048036038101906102c99190611c2c565b610b7b565b005b6102ea60048036038101906102e591906117ef565b610be3565b6040516102f79190611797565b60405180910390f35b61031a60048036038101906103159190611caf565b610c88565b60405161032791906116e3565b60405180910390f35b60007f80ac58cd000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614806103fb57507f5b5e139f000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b8061040b575061040a82610d1c565b5b9050919050565b60606000805461042190611d1e565b80601f016020809104026020016040519081016040528092919081815260200182805461044d90611d1e565b801561049a5780601f1061046f5761010080835404028352916020019161049a565b820191906000526020600020905b81548152906001019060200180831161047d57829003601f168201915b5050505050905090565b60006004600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b60006104ec82610781565b90508073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141561055d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161055490611dc2565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16148061059d575061059c8133610c88565b5b6105dc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105d390611e54565b60405180910390fd5b826004600084815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550818373ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a4505050565b61069781610781565b73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16146106ce57600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16141561070857600080fd5b6107123382610d86565b610751576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161074890611ee6565b60405180910390fd5b61075c838383610e64565b505050565b61077c83838360405180602001604052806000815250610b7b565b505050565b6000806002600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141561082a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161082190611f78565b60405180910390fd5b6002600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16915050919050565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156108d7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108ce9061200a565b60405180910390fd5b600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b60606001805461092d90611d1e565b80601f016020809104026020016040519081016040528092919081815260200182805461095990611d1e565b80156109a65780601f1061097b576101008083540402835291602001916109a6565b820191906000526020600020905b81548152906001019060200180831161098957829003601f168201915b5050505050905090565b6000600654905090565b60008060016109c76109b0565b6109d19190612059565b90506109dd84826110cb565b82600760008381526020019081526020016000209080519060200190610a0492919061158c565b508091505092915050565b3373ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610a7e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a75906120fb565b60405180910390fd5b80600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3183604051610b6f91906116e3565b60405180910390a35050565b610b87848484846112a5565b610bc6576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610bbd9061218d565b60405180910390fd5b610bd184848461068e565b610bdd848484846113e8565b50505050565b6060600760008381526020019081526020016000208054610c0390611d1e565b80601f0160208091040260200160405190810160405280929190818152602001828054610c2f90611d1e565b8015610c7c5780601f10610c5157610100808354040283529160200191610c7c565b820191906000526020600020905b815481529060010190602001808311610c5f57829003601f168201915b50505050509050919050565b6000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b6000610d9182611444565b610dd0576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610dc79061221f565b60405180910390fd5b6000610ddb83610781565b90508073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161480610e4a57508373ffffffffffffffffffffffffffffffffffffffff16610e32846104a4565b73ffffffffffffffffffffffffffffffffffffffff16145b80610e5b5750610e5a8185610c88565b5b91505092915050565b8273ffffffffffffffffffffffffffffffffffffffff16610e8482610781565b73ffffffffffffffffffffffffffffffffffffffff1614610eda576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ed1906122b1565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610f4a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f4190612343565b60405180910390fd5b610f558383836114b6565b610f606000826114bb565b6001600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610fb09190612363565b925050819055506001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546110079190612059565b92505081905550816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a46110c6838383611574565b505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16141561113b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611132906123e3565b60405180910390fd5b61114481611444565b15611184576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161117b9061244f565b60405180910390fd5b611190600083836114b6565b816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546112329190612059565b92505081905550808273ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a46112a160008383611574565b5050565b60006112c68473ffffffffffffffffffffffffffffffffffffffff16611579565b1580156113005750600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1614155b1561130e57600190506113e0565b60008473ffffffffffffffffffffffffffffffffffffffff1663150b7a02338887876040518563ffffffff1660e01b815260040161134f94939291906124c4565b6020604051808303816000875af115801561136e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113929190612525565b905063150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149150505b949350505050565b6113f3848484610e64565b6113ff848484846112a5565b61143e576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016114359061218d565b60405180910390fd5b50505050565b6000806002600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415915050919050565b505050565b816004600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff1661152e83610781565b73ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b505050565b600080823b905060008111915050919050565b82805461159890611d1e565b90600052602060002090601f0160209004810192826115ba5760008555611601565b82601f106115d357805160ff1916838001178555611601565b82800160010185558215611601579182015b828111156116005782518255916020019190600101906115e5565b5b50905061160e9190611612565b5090565b5b8082111561162b576000816000905550600101611613565b5090565b6000604051905090565b600080fd5b600080fd5b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b61167881611643565b811461168357600080fd5b50565b6000813590506116958161166f565b92915050565b6000602082840312156116b1576116b0611639565b5b60006116bf84828501611686565b91505092915050565b60008115159050919050565b6116dd816116c8565b82525050565b60006020820190506116f860008301846116d4565b92915050565b600081519050919050565b600082825260208201905092915050565b60005b8381101561173857808201518184015260208101905061171d565b83811115611747576000848401525b50505050565b6000601f19601f8301169050919050565b6000611769826116fe565b6117738185611709565b935061178381856020860161171a565b61178c8161174d565b840191505092915050565b600060208201905081810360008301526117b1818461175e565b905092915050565b6000819050919050565b6117cc816117b9565b81146117d757600080fd5b50565b6000813590506117e9816117c3565b92915050565b60006020828403121561180557611804611639565b5b6000611813848285016117da565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006118478261181c565b9050919050565b6118578161183c565b82525050565b6000602082019050611872600083018461184e565b92915050565b6118818161183c565b811461188c57600080fd5b50565b60008135905061189e81611878565b92915050565b600080604083850312156118bb576118ba611639565b5b60006118c98582860161188f565b92505060206118da858286016117da565b9150509250929050565b6000806000606084860312156118fd576118fc611639565b5b600061190b8682870161188f565b935050602061191c8682870161188f565b925050604061192d868287016117da565b9150509250925092565b60006020828403121561194d5761194c611639565b5b600061195b8482850161188f565b91505092915050565b61196d816117b9565b82525050565b60006020820190506119886000830184611964565b92915050565b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6119d08261174d565b810181811067ffffffffffffffff821117156119ef576119ee611998565b5b80604052505050565b6000611a0261162f565b9050611a0e82826119c7565b919050565b600067ffffffffffffffff821115611a2e57611a2d611998565b5b611a378261174d565b9050602081019050919050565b82818337600083830152505050565b6000611a66611a6184611a13565b6119f8565b905082815260208101848484011115611a8257611a81611993565b5b611a8d848285611a44565b509392505050565b600082601f830112611aaa57611aa961198e565b5b8135611aba848260208601611a53565b91505092915050565b60008060408385031215611ada57611ad9611639565b5b6000611ae88582860161188f565b925050602083013567ffffffffffffffff811115611b0957611b0861163e565b5b611b1585828601611a95565b9150509250929050565b611b28816116c8565b8114611b3357600080fd5b50565b600081359050611b4581611b1f565b92915050565b60008060408385031215611b6257611b61611639565b5b6000611b708582860161188f565b9250506020611b8185828601611b36565b9150509250929050565b600067ffffffffffffffff821115611ba657611ba5611998565b5b611baf8261174d565b9050602081019050919050565b6000611bcf611bca84611b8b565b6119f8565b905082815260208101848484011115611beb57611bea611993565b5b611bf6848285611a44565b509392505050565b600082601f830112611c1357611c1261198e565b5b8135611c23848260208601611bbc565b91505092915050565b60008060008060808587031215611c4657611c45611639565b5b6000611c548782880161188f565b9450506020611c658782880161188f565b9350506040611c76878288016117da565b925050606085013567ffffffffffffffff811115611c9757611c9661163e565b5b611ca387828801611bfe565b91505092959194509250565b60008060408385031215611cc657611cc5611639565b5b6000611cd48582860161188f565b9250506020611ce58582860161188f565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680611d3657607f821691505b60208210811415611d4a57611d49611cef565b5b50919050565b7f4552433732313a20617070726f76616c20746f2063757272656e74206f776e6560008201527f7200000000000000000000000000000000000000000000000000000000000000602082015250565b6000611dac602183611709565b9150611db782611d50565b604082019050919050565b60006020820190508181036000830152611ddb81611d9f565b9050919050565b7f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760008201527f6e6572206e6f7220617070726f76656420666f7220616c6c0000000000000000602082015250565b6000611e3e603883611709565b9150611e4982611de2565b604082019050919050565b60006020820190508181036000830152611e6d81611e31565b9050919050565b7f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f60008201527f776e6572206e6f7220617070726f766564000000000000000000000000000000602082015250565b6000611ed0603183611709565b9150611edb82611e74565b604082019050919050565b60006020820190508181036000830152611eff81611ec3565b9050919050565b7f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460008201527f656e7420746f6b656e0000000000000000000000000000000000000000000000602082015250565b6000611f62602983611709565b9150611f6d82611f06565b604082019050919050565b60006020820190508181036000830152611f9181611f55565b9050919050565b7f4552433732313a2062616c616e636520717565727920666f7220746865207a6560008201527f726f206164647265737300000000000000000000000000000000000000000000602082015250565b6000611ff4602a83611709565b9150611fff82611f98565b604082019050919050565b6000602082019050818103600083015261202381611fe7565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000612064826117b9565b915061206f836117b9565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156120a4576120a361202a565b5b828201905092915050565b7f4552433732313a20617070726f766520746f2063616c6c657200000000000000600082015250565b60006120e5601983611709565b91506120f0826120af565b602082019050919050565b60006020820190508181036000830152612114816120d8565b9050919050565b7f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560008201527f63656976657220696d706c656d656e7465720000000000000000000000000000602082015250565b6000612177603283611709565b91506121828261211b565b604082019050919050565b600060208201905081810360008301526121a68161216a565b9050919050565b7f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860008201527f697374656e7420746f6b656e0000000000000000000000000000000000000000602082015250565b6000612209602c83611709565b9150612214826121ad565b604082019050919050565b60006020820190508181036000830152612238816121fc565b9050919050565b7f4552433732313a207472616e736665722066726f6d20696e636f72726563742060008201527f6f776e6572000000000000000000000000000000000000000000000000000000602082015250565b600061229b602583611709565b91506122a68261223f565b604082019050919050565b600060208201905081810360008301526122ca8161228e565b9050919050565b7f4552433732313a207472616e7366657220746f20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b600061232d602483611709565b9150612338826122d1565b604082019050919050565b6000602082019050818103600083015261235c81612320565b9050919050565b600061236e826117b9565b9150612379836117b9565b92508282101561238c5761238b61202a565b5b828203905092915050565b7f4552433732313a206d696e7420746f20746865207a65726f2061646472657373600082015250565b60006123cd602083611709565b91506123d882612397565b602082019050919050565b600060208201905081810360008301526123fc816123c0565b9050919050565b7f4552433732313a20746f6b656e20616c7265616479206d696e74656400000000600082015250565b6000612439601c83611709565b915061244482612403565b602082019050919050565b600060208201905081810360008301526124688161242c565b9050919050565b600081519050919050565b600082825260208201905092915050565b60006124968261246f565b6124a0818561247a565b93506124b081856020860161171a565b6124b98161174d565b840191505092915050565b60006080820190506124d9600083018761184e565b6124e6602083018661184e565b6124f36040830185611964565b8181036060830152612505818461248b565b905095945050505050565b60008151905061251f8161166f565b92915050565b60006020828403121561253b5761253a611639565b5b600061254984828501612510565b9150509291505056fea2646970667358221220f886187a97e43e271db0042add651d2fb0a8d4b37cc08864bb6c27e9dea6fca864736f6c634300080a0033",
  "immutableReferences": {},
  "generatedSources": [
    {
      "ast": {
        "nodeType": "YulBlock",
        "src": "0:516:18",
        "statements": [
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "35:152:18",
              "statements": [
                {
                  "expression": {
                    "arguments": [
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "52:1:18",
                        "type": "",
                        "value": "0"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "55:77:18",
                        "type": "",
                        "value": "35408467139433450592217433187231851964531694900788300625387963629091585785856"
                      }
                    ],
                    "functionName": {
                      "name": "mstore",
                      "nodeType": "YulIdentifier",
                      "src": "45:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "45:88:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "45:88:18"
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "149:1:18",
                        "type": "",
                        "value": "4"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "152:4:18",
                        "type": "",
                        "value": "0x22"
                      }
                    ],
                    "functionName": {
                      "name": "mstore",
                      "nodeType": "YulIdentifier",
                      "src": "142:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "142:15:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "142:15:18"
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "173:1:18",
                        "type": "",
                        "value": "0"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "176:4:18",
                        "type": "",
                        "value": "0x24"
                      }
                    ],
                    "functionName": {
                      "name": "revert",
                      "nodeType": "YulIdentifier",
                      "src": "166:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "166:15:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "166:15:18"
                }
              ]
            },
            "name": "panic_error_0x22",
            "nodeType": "YulFunctionDefinition",
            "src": "7:180:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "244:269:18",
              "statements": [
                {
                  "nodeType": "YulAssignment",
                  "src": "254:22:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "data",
                        "nodeType": "YulIdentifier",
                        "src": "268:4:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "274:1:18",
                        "type": "",
                        "value": "2"
                      }
                    ],
                    "functionName": {
                      "name": "div",
                      "nodeType": "YulIdentifier",
                      "src": "264:3:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "264:12:18"
                  },
                  "variableNames": [
                    {
                      "name": "length",
                      "nodeType": "YulIdentifier",
                      "src": "254:6:18"
                    }
                  ]
                },
                {
                  "nodeType": "YulVariableDeclaration",
                  "src": "285:38:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "data",
                        "nodeType": "YulIdentifier",
                        "src": "315:4:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "321:1:18",
                        "type": "",
                        "value": "1"
                      }
                    ],
                    "functionName": {
                      "name": "and",
                      "nodeType": "YulIdentifier",
                      "src": "311:3:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "311:12:18"
                  },
                  "variables": [
                    {
                      "name": "outOfPlaceEncoding",
                      "nodeType": "YulTypedName",
                      "src": "289:18:18",
                      "type": ""
                    }
                  ]
                },
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "362:51:18",
                    "statements": [
                      {
                        "nodeType": "YulAssignment",
                        "src": "376:27:18",
                        "value": {
                          "arguments": [
                            {
                              "name": "length",
                              "nodeType": "YulIdentifier",
                              "src": "390:6:18"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "398:4:18",
                              "type": "",
                              "value": "0x7f"
                            }
                          ],
                          "functionName": {
                            "name": "and",
                            "nodeType": "YulIdentifier",
                            "src": "386:3:18"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "386:17:18"
                        },
                        "variableNames": [
                          {
                            "name": "length",
                            "nodeType": "YulIdentifier",
                            "src": "376:6:18"
                          }
                        ]
                      }
                    ]
                  },
                  "condition": {
                    "arguments": [
                      {
                        "name": "outOfPlaceEncoding",
                        "nodeType": "YulIdentifier",
                        "src": "342:18:18"
                      }
                    ],
                    "functionName": {
                      "name": "iszero",
                      "nodeType": "YulIdentifier",
                      "src": "335:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "335:26:18"
                  },
                  "nodeType": "YulIf",
                  "src": "332:81:18"
                },
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "465:42:18",
                    "statements": [
                      {
                        "expression": {
                          "arguments": [],
                          "functionName": {
                            "name": "panic_error_0x22",
                            "nodeType": "YulIdentifier",
                            "src": "479:16:18"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "479:18:18"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "479:18:18"
                      }
                    ]
                  },
                  "condition": {
                    "arguments": [
                      {
                        "name": "outOfPlaceEncoding",
                        "nodeType": "YulIdentifier",
                        "src": "429:18:18"
                      },
                      {
                        "arguments": [
                          {
                            "name": "length",
                            "nodeType": "YulIdentifier",
                            "src": "452:6:18"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "460:2:18",
                            "type": "",
                            "value": "32"
                          }
                        ],
                        "functionName": {
                          "name": "lt",
                          "nodeType": "YulIdentifier",
                          "src": "449:2:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "449:14:18"
                      }
                    ],
                    "functionName": {
                      "name": "eq",
                      "nodeType": "YulIdentifier",
                      "src": "426:2:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "426:38:18"
                  },
                  "nodeType": "YulIf",
                  "src": "423:84:18"
                }
              ]
            },
            "name": "extract_byte_array_length",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "data",
                "nodeType": "YulTypedName",
                "src": "228:4:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "length",
                "nodeType": "YulTypedName",
                "src": "237:6:18",
                "type": ""
              }
            ],
            "src": "193:320:18"
          }
        ]
      },
      "contents": "{\n\n    function panic_error_0x22() {\n        mstore(0, 35408467139433450592217433187231851964531694900788300625387963629091585785856)\n        mstore(4, 0x22)\n        revert(0, 0x24)\n    }\n\n    function extract_byte_array_length(data) -> length {\n        length := div(data, 2)\n        let outOfPlaceEncoding := and(data, 1)\n        if iszero(outOfPlaceEncoding) {\n            length := and(length, 0x7f)\n        }\n\n        if eq(outOfPlaceEncoding, lt(length, 32)) {\n            panic_error_0x22()\n        }\n    }\n\n}\n",
      "id": 18,
      "language": "Yul",
      "name": "#utility.yul"
    }
  ],
  "deployedGeneratedSources": [
    {
      "ast": {
        "nodeType": "YulBlock",
        "src": "0:27503:18",
        "statements": [
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "47:35:18",
              "statements": [
                {
                  "nodeType": "YulAssignment",
                  "src": "57:19:18",
                  "value": {
                    "arguments": [
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "73:2:18",
                        "type": "",
                        "value": "64"
                      }
                    ],
                    "functionName": {
                      "name": "mload",
                      "nodeType": "YulIdentifier",
                      "src": "67:5:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "67:9:18"
                  },
                  "variableNames": [
                    {
                      "name": "memPtr",
                      "nodeType": "YulIdentifier",
                      "src": "57:6:18"
                    }
                  ]
                }
              ]
            },
            "name": "allocate_unbounded",
            "nodeType": "YulFunctionDefinition",
            "returnVariables": [
              {
                "name": "memPtr",
                "nodeType": "YulTypedName",
                "src": "40:6:18",
                "type": ""
              }
            ],
            "src": "7:75:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "177:28:18",
              "statements": [
                {
                  "expression": {
                    "arguments": [
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "194:1:18",
                        "type": "",
                        "value": "0"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "197:1:18",
                        "type": "",
                        "value": "0"
                      }
                    ],
                    "functionName": {
                      "name": "revert",
                      "nodeType": "YulIdentifier",
                      "src": "187:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "187:12:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "187:12:18"
                }
              ]
            },
            "name": "revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b",
            "nodeType": "YulFunctionDefinition",
            "src": "88:117:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "300:28:18",
              "statements": [
                {
                  "expression": {
                    "arguments": [
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "317:1:18",
                        "type": "",
                        "value": "0"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "320:1:18",
                        "type": "",
                        "value": "0"
                      }
                    ],
                    "functionName": {
                      "name": "revert",
                      "nodeType": "YulIdentifier",
                      "src": "310:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "310:12:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "310:12:18"
                }
              ]
            },
            "name": "revert_error_c1322bf8034eace5e0b5c7295db60986aa89aae5e0ea0873e4689e076861a5db",
            "nodeType": "YulFunctionDefinition",
            "src": "211:117:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "378:105:18",
              "statements": [
                {
                  "nodeType": "YulAssignment",
                  "src": "388:89:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "value",
                        "nodeType": "YulIdentifier",
                        "src": "403:5:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "410:66:18",
                        "type": "",
                        "value": "0xffffffff00000000000000000000000000000000000000000000000000000000"
                      }
                    ],
                    "functionName": {
                      "name": "and",
                      "nodeType": "YulIdentifier",
                      "src": "399:3:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "399:78:18"
                  },
                  "variableNames": [
                    {
                      "name": "cleaned",
                      "nodeType": "YulIdentifier",
                      "src": "388:7:18"
                    }
                  ]
                }
              ]
            },
            "name": "cleanup_t_bytes4",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "value",
                "nodeType": "YulTypedName",
                "src": "360:5:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "cleaned",
                "nodeType": "YulTypedName",
                "src": "370:7:18",
                "type": ""
              }
            ],
            "src": "334:149:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "531:78:18",
              "statements": [
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "587:16:18",
                    "statements": [
                      {
                        "expression": {
                          "arguments": [
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "596:1:18",
                              "type": "",
                              "value": "0"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "599:1:18",
                              "type": "",
                              "value": "0"
                            }
                          ],
                          "functionName": {
                            "name": "revert",
                            "nodeType": "YulIdentifier",
                            "src": "589:6:18"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "589:12:18"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "589:12:18"
                      }
                    ]
                  },
                  "condition": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "value",
                            "nodeType": "YulIdentifier",
                            "src": "554:5:18"
                          },
                          {
                            "arguments": [
                              {
                                "name": "value",
                                "nodeType": "YulIdentifier",
                                "src": "578:5:18"
                              }
                            ],
                            "functionName": {
                              "name": "cleanup_t_bytes4",
                              "nodeType": "YulIdentifier",
                              "src": "561:16:18"
                            },
                            "nodeType": "YulFunctionCall",
                            "src": "561:23:18"
                          }
                        ],
                        "functionName": {
                          "name": "eq",
                          "nodeType": "YulIdentifier",
                          "src": "551:2:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "551:34:18"
                      }
                    ],
                    "functionName": {
                      "name": "iszero",
                      "nodeType": "YulIdentifier",
                      "src": "544:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "544:42:18"
                  },
                  "nodeType": "YulIf",
                  "src": "541:62:18"
                }
              ]
            },
            "name": "validator_revert_t_bytes4",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "value",
                "nodeType": "YulTypedName",
                "src": "524:5:18",
                "type": ""
              }
            ],
            "src": "489:120:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "666:86:18",
              "statements": [
                {
                  "nodeType": "YulAssignment",
                  "src": "676:29:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "offset",
                        "nodeType": "YulIdentifier",
                        "src": "698:6:18"
                      }
                    ],
                    "functionName": {
                      "name": "calldataload",
                      "nodeType": "YulIdentifier",
                      "src": "685:12:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "685:20:18"
                  },
                  "variableNames": [
                    {
                      "name": "value",
                      "nodeType": "YulIdentifier",
                      "src": "676:5:18"
                    }
                  ]
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "name": "value",
                        "nodeType": "YulIdentifier",
                        "src": "740:5:18"
                      }
                    ],
                    "functionName": {
                      "name": "validator_revert_t_bytes4",
                      "nodeType": "YulIdentifier",
                      "src": "714:25:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "714:32:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "714:32:18"
                }
              ]
            },
            "name": "abi_decode_t_bytes4",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "offset",
                "nodeType": "YulTypedName",
                "src": "644:6:18",
                "type": ""
              },
              {
                "name": "end",
                "nodeType": "YulTypedName",
                "src": "652:3:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "value",
                "nodeType": "YulTypedName",
                "src": "660:5:18",
                "type": ""
              }
            ],
            "src": "615:137:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "823:262:18",
              "statements": [
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "869:83:18",
                    "statements": [
                      {
                        "expression": {
                          "arguments": [],
                          "functionName": {
                            "name": "revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b",
                            "nodeType": "YulIdentifier",
                            "src": "871:77:18"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "871:79:18"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "871:79:18"
                      }
                    ]
                  },
                  "condition": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "dataEnd",
                            "nodeType": "YulIdentifier",
                            "src": "844:7:18"
                          },
                          {
                            "name": "headStart",
                            "nodeType": "YulIdentifier",
                            "src": "853:9:18"
                          }
                        ],
                        "functionName": {
                          "name": "sub",
                          "nodeType": "YulIdentifier",
                          "src": "840:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "840:23:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "865:2:18",
                        "type": "",
                        "value": "32"
                      }
                    ],
                    "functionName": {
                      "name": "slt",
                      "nodeType": "YulIdentifier",
                      "src": "836:3:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "836:32:18"
                  },
                  "nodeType": "YulIf",
                  "src": "833:119:18"
                },
                {
                  "nodeType": "YulBlock",
                  "src": "962:116:18",
                  "statements": [
                    {
                      "nodeType": "YulVariableDeclaration",
                      "src": "977:15:18",
                      "value": {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "991:1:18",
                        "type": "",
                        "value": "0"
                      },
                      "variables": [
                        {
                          "name": "offset",
                          "nodeType": "YulTypedName",
                          "src": "981:6:18",
                          "type": ""
                        }
                      ]
                    },
                    {
                      "nodeType": "YulAssignment",
                      "src": "1006:62:18",
                      "value": {
                        "arguments": [
                          {
                            "arguments": [
                              {
                                "name": "headStart",
                                "nodeType": "YulIdentifier",
                                "src": "1040:9:18"
                              },
                              {
                                "name": "offset",
                                "nodeType": "YulIdentifier",
                                "src": "1051:6:18"
                              }
                            ],
                            "functionName": {
                              "name": "add",
                              "nodeType": "YulIdentifier",
                              "src": "1036:3:18"
                            },
                            "nodeType": "YulFunctionCall",
                            "src": "1036:22:18"
                          },
                          {
                            "name": "dataEnd",
                            "nodeType": "YulIdentifier",
                            "src": "1060:7:18"
                          }
                        ],
                        "functionName": {
                          "name": "abi_decode_t_bytes4",
                          "nodeType": "YulIdentifier",
                          "src": "1016:19:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "1016:52:18"
                      },
                      "variableNames": [
                        {
                          "name": "value0",
                          "nodeType": "YulIdentifier",
                          "src": "1006:6:18"
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            "name": "abi_decode_tuple_t_bytes4",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "headStart",
                "nodeType": "YulTypedName",
                "src": "793:9:18",
                "type": ""
              },
              {
                "name": "dataEnd",
                "nodeType": "YulTypedName",
                "src": "804:7:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "value0",
                "nodeType": "YulTypedName",
                "src": "816:6:18",
                "type": ""
              }
            ],
            "src": "758:327:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "1133:48:18",
              "statements": [
                {
                  "nodeType": "YulAssignment",
                  "src": "1143:32:18",
                  "value": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "value",
                            "nodeType": "YulIdentifier",
                            "src": "1168:5:18"
                          }
                        ],
                        "functionName": {
                          "name": "iszero",
                          "nodeType": "YulIdentifier",
                          "src": "1161:6:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "1161:13:18"
                      }
                    ],
                    "functionName": {
                      "name": "iszero",
                      "nodeType": "YulIdentifier",
                      "src": "1154:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "1154:21:18"
                  },
                  "variableNames": [
                    {
                      "name": "cleaned",
                      "nodeType": "YulIdentifier",
                      "src": "1143:7:18"
                    }
                  ]
                }
              ]
            },
            "name": "cleanup_t_bool",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "value",
                "nodeType": "YulTypedName",
                "src": "1115:5:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "cleaned",
                "nodeType": "YulTypedName",
                "src": "1125:7:18",
                "type": ""
              }
            ],
            "src": "1091:90:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "1246:50:18",
              "statements": [
                {
                  "expression": {
                    "arguments": [
                      {
                        "name": "pos",
                        "nodeType": "YulIdentifier",
                        "src": "1263:3:18"
                      },
                      {
                        "arguments": [
                          {
                            "name": "value",
                            "nodeType": "YulIdentifier",
                            "src": "1283:5:18"
                          }
                        ],
                        "functionName": {
                          "name": "cleanup_t_bool",
                          "nodeType": "YulIdentifier",
                          "src": "1268:14:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "1268:21:18"
                      }
                    ],
                    "functionName": {
                      "name": "mstore",
                      "nodeType": "YulIdentifier",
                      "src": "1256:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "1256:34:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "1256:34:18"
                }
              ]
            },
            "name": "abi_encode_t_bool_to_t_bool_fromStack",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "value",
                "nodeType": "YulTypedName",
                "src": "1234:5:18",
                "type": ""
              },
              {
                "name": "pos",
                "nodeType": "YulTypedName",
                "src": "1241:3:18",
                "type": ""
              }
            ],
            "src": "1187:109:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "1394:118:18",
              "statements": [
                {
                  "nodeType": "YulAssignment",
                  "src": "1404:26:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "headStart",
                        "nodeType": "YulIdentifier",
                        "src": "1416:9:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "1427:2:18",
                        "type": "",
                        "value": "32"
                      }
                    ],
                    "functionName": {
                      "name": "add",
                      "nodeType": "YulIdentifier",
                      "src": "1412:3:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "1412:18:18"
                  },
                  "variableNames": [
                    {
                      "name": "tail",
                      "nodeType": "YulIdentifier",
                      "src": "1404:4:18"
                    }
                  ]
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "name": "value0",
                        "nodeType": "YulIdentifier",
                        "src": "1478:6:18"
                      },
                      {
                        "arguments": [
                          {
                            "name": "headStart",
                            "nodeType": "YulIdentifier",
                            "src": "1491:9:18"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "1502:1:18",
                            "type": "",
                            "value": "0"
                          }
                        ],
                        "functionName": {
                          "name": "add",
                          "nodeType": "YulIdentifier",
                          "src": "1487:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "1487:17:18"
                      }
                    ],
                    "functionName": {
                      "name": "abi_encode_t_bool_to_t_bool_fromStack",
                      "nodeType": "YulIdentifier",
                      "src": "1440:37:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "1440:65:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "1440:65:18"
                }
              ]
            },
            "name": "abi_encode_tuple_t_bool__to_t_bool__fromStack_reversed",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "headStart",
                "nodeType": "YulTypedName",
                "src": "1366:9:18",
                "type": ""
              },
              {
                "name": "value0",
                "nodeType": "YulTypedName",
                "src": "1378:6:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "tail",
                "nodeType": "YulTypedName",
                "src": "1389:4:18",
                "type": ""
              }
            ],
            "src": "1302:210:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "1577:40:18",
              "statements": [
                {
                  "nodeType": "YulAssignment",
                  "src": "1588:22:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "value",
                        "nodeType": "YulIdentifier",
                        "src": "1604:5:18"
                      }
                    ],
                    "functionName": {
                      "name": "mload",
                      "nodeType": "YulIdentifier",
                      "src": "1598:5:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "1598:12:18"
                  },
                  "variableNames": [
                    {
                      "name": "length",
                      "nodeType": "YulIdentifier",
                      "src": "1588:6:18"
                    }
                  ]
                }
              ]
            },
            "name": "array_length_t_string_memory_ptr",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "value",
                "nodeType": "YulTypedName",
                "src": "1560:5:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "length",
                "nodeType": "YulTypedName",
                "src": "1570:6:18",
                "type": ""
              }
            ],
            "src": "1518:99:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "1719:73:18",
              "statements": [
                {
                  "expression": {
                    "arguments": [
                      {
                        "name": "pos",
                        "nodeType": "YulIdentifier",
                        "src": "1736:3:18"
                      },
                      {
                        "name": "length",
                        "nodeType": "YulIdentifier",
                        "src": "1741:6:18"
                      }
                    ],
                    "functionName": {
                      "name": "mstore",
                      "nodeType": "YulIdentifier",
                      "src": "1729:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "1729:19:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "1729:19:18"
                },
                {
                  "nodeType": "YulAssignment",
                  "src": "1757:29:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "pos",
                        "nodeType": "YulIdentifier",
                        "src": "1776:3:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "1781:4:18",
                        "type": "",
                        "value": "0x20"
                      }
                    ],
                    "functionName": {
                      "name": "add",
                      "nodeType": "YulIdentifier",
                      "src": "1772:3:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "1772:14:18"
                  },
                  "variableNames": [
                    {
                      "name": "updated_pos",
                      "nodeType": "YulIdentifier",
                      "src": "1757:11:18"
                    }
                  ]
                }
              ]
            },
            "name": "array_storeLengthForEncoding_t_string_memory_ptr_fromStack",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "pos",
                "nodeType": "YulTypedName",
                "src": "1691:3:18",
                "type": ""
              },
              {
                "name": "length",
                "nodeType": "YulTypedName",
                "src": "1696:6:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "updated_pos",
                "nodeType": "YulTypedName",
                "src": "1707:11:18",
                "type": ""
              }
            ],
            "src": "1623:169:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "1847:258:18",
              "statements": [
                {
                  "nodeType": "YulVariableDeclaration",
                  "src": "1857:10:18",
                  "value": {
                    "kind": "number",
                    "nodeType": "YulLiteral",
                    "src": "1866:1:18",
                    "type": "",
                    "value": "0"
                  },
                  "variables": [
                    {
                      "name": "i",
                      "nodeType": "YulTypedName",
                      "src": "1861:1:18",
                      "type": ""
                    }
                  ]
                },
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "1926:63:18",
                    "statements": [
                      {
                        "expression": {
                          "arguments": [
                            {
                              "arguments": [
                                {
                                  "name": "dst",
                                  "nodeType": "YulIdentifier",
                                  "src": "1951:3:18"
                                },
                                {
                                  "name": "i",
                                  "nodeType": "YulIdentifier",
                                  "src": "1956:1:18"
                                }
                              ],
                              "functionName": {
                                "name": "add",
                                "nodeType": "YulIdentifier",
                                "src": "1947:3:18"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "1947:11:18"
                            },
                            {
                              "arguments": [
                                {
                                  "arguments": [
                                    {
                                      "name": "src",
                                      "nodeType": "YulIdentifier",
                                      "src": "1970:3:18"
                                    },
                                    {
                                      "name": "i",
                                      "nodeType": "YulIdentifier",
                                      "src": "1975:1:18"
                                    }
                                  ],
                                  "functionName": {
                                    "name": "add",
                                    "nodeType": "YulIdentifier",
                                    "src": "1966:3:18"
                                  },
                                  "nodeType": "YulFunctionCall",
                                  "src": "1966:11:18"
                                }
                              ],
                              "functionName": {
                                "name": "mload",
                                "nodeType": "YulIdentifier",
                                "src": "1960:5:18"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "1960:18:18"
                            }
                          ],
                          "functionName": {
                            "name": "mstore",
                            "nodeType": "YulIdentifier",
                            "src": "1940:6:18"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "1940:39:18"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "1940:39:18"
                      }
                    ]
                  },
                  "condition": {
                    "arguments": [
                      {
                        "name": "i",
                        "nodeType": "YulIdentifier",
                        "src": "1887:1:18"
                      },
                      {
                        "name": "length",
                        "nodeType": "YulIdentifier",
                        "src": "1890:6:18"
                      }
                    ],
                    "functionName": {
                      "name": "lt",
                      "nodeType": "YulIdentifier",
                      "src": "1884:2:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "1884:13:18"
                  },
                  "nodeType": "YulForLoop",
                  "post": {
                    "nodeType": "YulBlock",
                    "src": "1898:19:18",
                    "statements": [
                      {
                        "nodeType": "YulAssignment",
                        "src": "1900:15:18",
                        "value": {
                          "arguments": [
                            {
                              "name": "i",
                              "nodeType": "YulIdentifier",
                              "src": "1909:1:18"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "1912:2:18",
                              "type": "",
                              "value": "32"
                            }
                          ],
                          "functionName": {
                            "name": "add",
                            "nodeType": "YulIdentifier",
                            "src": "1905:3:18"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "1905:10:18"
                        },
                        "variableNames": [
                          {
                            "name": "i",
                            "nodeType": "YulIdentifier",
                            "src": "1900:1:18"
                          }
                        ]
                      }
                    ]
                  },
                  "pre": {
                    "nodeType": "YulBlock",
                    "src": "1880:3:18",
                    "statements": []
                  },
                  "src": "1876:113:18"
                },
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "2023:76:18",
                    "statements": [
                      {
                        "expression": {
                          "arguments": [
                            {
                              "arguments": [
                                {
                                  "name": "dst",
                                  "nodeType": "YulIdentifier",
                                  "src": "2073:3:18"
                                },
                                {
                                  "name": "length",
                                  "nodeType": "YulIdentifier",
                                  "src": "2078:6:18"
                                }
                              ],
                              "functionName": {
                                "name": "add",
                                "nodeType": "YulIdentifier",
                                "src": "2069:3:18"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "2069:16:18"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "2087:1:18",
                              "type": "",
                              "value": "0"
                            }
                          ],
                          "functionName": {
                            "name": "mstore",
                            "nodeType": "YulIdentifier",
                            "src": "2062:6:18"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "2062:27:18"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "2062:27:18"
                      }
                    ]
                  },
                  "condition": {
                    "arguments": [
                      {
                        "name": "i",
                        "nodeType": "YulIdentifier",
                        "src": "2004:1:18"
                      },
                      {
                        "name": "length",
                        "nodeType": "YulIdentifier",
                        "src": "2007:6:18"
                      }
                    ],
                    "functionName": {
                      "name": "gt",
                      "nodeType": "YulIdentifier",
                      "src": "2001:2:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "2001:13:18"
                  },
                  "nodeType": "YulIf",
                  "src": "1998:101:18"
                }
              ]
            },
            "name": "copy_memory_to_memory",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "src",
                "nodeType": "YulTypedName",
                "src": "1829:3:18",
                "type": ""
              },
              {
                "name": "dst",
                "nodeType": "YulTypedName",
                "src": "1834:3:18",
                "type": ""
              },
              {
                "name": "length",
                "nodeType": "YulTypedName",
                "src": "1839:6:18",
                "type": ""
              }
            ],
            "src": "1798:307:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "2159:54:18",
              "statements": [
                {
                  "nodeType": "YulAssignment",
                  "src": "2169:38:18",
                  "value": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "value",
                            "nodeType": "YulIdentifier",
                            "src": "2187:5:18"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "2194:2:18",
                            "type": "",
                            "value": "31"
                          }
                        ],
                        "functionName": {
                          "name": "add",
                          "nodeType": "YulIdentifier",
                          "src": "2183:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "2183:14:18"
                      },
                      {
                        "arguments": [
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "2203:2:18",
                            "type": "",
                            "value": "31"
                          }
                        ],
                        "functionName": {
                          "name": "not",
                          "nodeType": "YulIdentifier",
                          "src": "2199:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "2199:7:18"
                      }
                    ],
                    "functionName": {
                      "name": "and",
                      "nodeType": "YulIdentifier",
                      "src": "2179:3:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "2179:28:18"
                  },
                  "variableNames": [
                    {
                      "name": "result",
                      "nodeType": "YulIdentifier",
                      "src": "2169:6:18"
                    }
                  ]
                }
              ]
            },
            "name": "round_up_to_mul_of_32",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "value",
                "nodeType": "YulTypedName",
                "src": "2142:5:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "result",
                "nodeType": "YulTypedName",
                "src": "2152:6:18",
                "type": ""
              }
            ],
            "src": "2111:102:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "2311:272:18",
              "statements": [
                {
                  "nodeType": "YulVariableDeclaration",
                  "src": "2321:53:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "value",
                        "nodeType": "YulIdentifier",
                        "src": "2368:5:18"
                      }
                    ],
                    "functionName": {
                      "name": "array_length_t_string_memory_ptr",
                      "nodeType": "YulIdentifier",
                      "src": "2335:32:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "2335:39:18"
                  },
                  "variables": [
                    {
                      "name": "length",
                      "nodeType": "YulTypedName",
                      "src": "2325:6:18",
                      "type": ""
                    }
                  ]
                },
                {
                  "nodeType": "YulAssignment",
                  "src": "2383:78:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "pos",
                        "nodeType": "YulIdentifier",
                        "src": "2449:3:18"
                      },
                      {
                        "name": "length",
                        "nodeType": "YulIdentifier",
                        "src": "2454:6:18"
                      }
                    ],
                    "functionName": {
                      "name": "array_storeLengthForEncoding_t_string_memory_ptr_fromStack",
                      "nodeType": "YulIdentifier",
                      "src": "2390:58:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "2390:71:18"
                  },
                  "variableNames": [
                    {
                      "name": "pos",
                      "nodeType": "YulIdentifier",
                      "src": "2383:3:18"
                    }
                  ]
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "value",
                            "nodeType": "YulIdentifier",
                            "src": "2496:5:18"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "2503:4:18",
                            "type": "",
                            "value": "0x20"
                          }
                        ],
                        "functionName": {
                          "name": "add",
                          "nodeType": "YulIdentifier",
                          "src": "2492:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "2492:16:18"
                      },
                      {
                        "name": "pos",
                        "nodeType": "YulIdentifier",
                        "src": "2510:3:18"
                      },
                      {
                        "name": "length",
                        "nodeType": "YulIdentifier",
                        "src": "2515:6:18"
                      }
                    ],
                    "functionName": {
                      "name": "copy_memory_to_memory",
                      "nodeType": "YulIdentifier",
                      "src": "2470:21:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "2470:52:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "2470:52:18"
                },
                {
                  "nodeType": "YulAssignment",
                  "src": "2531:46:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "pos",
                        "nodeType": "YulIdentifier",
                        "src": "2542:3:18"
                      },
                      {
                        "arguments": [
                          {
                            "name": "length",
                            "nodeType": "YulIdentifier",
                            "src": "2569:6:18"
                          }
                        ],
                        "functionName": {
                          "name": "round_up_to_mul_of_32",
                          "nodeType": "YulIdentifier",
                          "src": "2547:21:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "2547:29:18"
                      }
                    ],
                    "functionName": {
                      "name": "add",
                      "nodeType": "YulIdentifier",
                      "src": "2538:3:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "2538:39:18"
                  },
                  "variableNames": [
                    {
                      "name": "end",
                      "nodeType": "YulIdentifier",
                      "src": "2531:3:18"
                    }
                  ]
                }
              ]
            },
            "name": "abi_encode_t_string_memory_ptr_to_t_string_memory_ptr_fromStack",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "value",
                "nodeType": "YulTypedName",
                "src": "2292:5:18",
                "type": ""
              },
              {
                "name": "pos",
                "nodeType": "YulTypedName",
                "src": "2299:3:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "end",
                "nodeType": "YulTypedName",
                "src": "2307:3:18",
                "type": ""
              }
            ],
            "src": "2219:364:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "2707:195:18",
              "statements": [
                {
                  "nodeType": "YulAssignment",
                  "src": "2717:26:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "headStart",
                        "nodeType": "YulIdentifier",
                        "src": "2729:9:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "2740:2:18",
                        "type": "",
                        "value": "32"
                      }
                    ],
                    "functionName": {
                      "name": "add",
                      "nodeType": "YulIdentifier",
                      "src": "2725:3:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "2725:18:18"
                  },
                  "variableNames": [
                    {
                      "name": "tail",
                      "nodeType": "YulIdentifier",
                      "src": "2717:4:18"
                    }
                  ]
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "headStart",
                            "nodeType": "YulIdentifier",
                            "src": "2764:9:18"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "2775:1:18",
                            "type": "",
                            "value": "0"
                          }
                        ],
                        "functionName": {
                          "name": "add",
                          "nodeType": "YulIdentifier",
                          "src": "2760:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "2760:17:18"
                      },
                      {
                        "arguments": [
                          {
                            "name": "tail",
                            "nodeType": "YulIdentifier",
                            "src": "2783:4:18"
                          },
                          {
                            "name": "headStart",
                            "nodeType": "YulIdentifier",
                            "src": "2789:9:18"
                          }
                        ],
                        "functionName": {
                          "name": "sub",
                          "nodeType": "YulIdentifier",
                          "src": "2779:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "2779:20:18"
                      }
                    ],
                    "functionName": {
                      "name": "mstore",
                      "nodeType": "YulIdentifier",
                      "src": "2753:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "2753:47:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "2753:47:18"
                },
                {
                  "nodeType": "YulAssignment",
                  "src": "2809:86:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "value0",
                        "nodeType": "YulIdentifier",
                        "src": "2881:6:18"
                      },
                      {
                        "name": "tail",
                        "nodeType": "YulIdentifier",
                        "src": "2890:4:18"
                      }
                    ],
                    "functionName": {
                      "name": "abi_encode_t_string_memory_ptr_to_t_string_memory_ptr_fromStack",
                      "nodeType": "YulIdentifier",
                      "src": "2817:63:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "2817:78:18"
                  },
                  "variableNames": [
                    {
                      "name": "tail",
                      "nodeType": "YulIdentifier",
                      "src": "2809:4:18"
                    }
                  ]
                }
              ]
            },
            "name": "abi_encode_tuple_t_string_memory_ptr__to_t_string_memory_ptr__fromStack_reversed",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "headStart",
                "nodeType": "YulTypedName",
                "src": "2679:9:18",
                "type": ""
              },
              {
                "name": "value0",
                "nodeType": "YulTypedName",
                "src": "2691:6:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "tail",
                "nodeType": "YulTypedName",
                "src": "2702:4:18",
                "type": ""
              }
            ],
            "src": "2589:313:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "2953:32:18",
              "statements": [
                {
                  "nodeType": "YulAssignment",
                  "src": "2963:16:18",
                  "value": {
                    "name": "value",
                    "nodeType": "YulIdentifier",
                    "src": "2974:5:18"
                  },
                  "variableNames": [
                    {
                      "name": "cleaned",
                      "nodeType": "YulIdentifier",
                      "src": "2963:7:18"
                    }
                  ]
                }
              ]
            },
            "name": "cleanup_t_uint256",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "value",
                "nodeType": "YulTypedName",
                "src": "2935:5:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "cleaned",
                "nodeType": "YulTypedName",
                "src": "2945:7:18",
                "type": ""
              }
            ],
            "src": "2908:77:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "3034:79:18",
              "statements": [
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "3091:16:18",
                    "statements": [
                      {
                        "expression": {
                          "arguments": [
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "3100:1:18",
                              "type": "",
                              "value": "0"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "3103:1:18",
                              "type": "",
                              "value": "0"
                            }
                          ],
                          "functionName": {
                            "name": "revert",
                            "nodeType": "YulIdentifier",
                            "src": "3093:6:18"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "3093:12:18"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "3093:12:18"
                      }
                    ]
                  },
                  "condition": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "value",
                            "nodeType": "YulIdentifier",
                            "src": "3057:5:18"
                          },
                          {
                            "arguments": [
                              {
                                "name": "value",
                                "nodeType": "YulIdentifier",
                                "src": "3082:5:18"
                              }
                            ],
                            "functionName": {
                              "name": "cleanup_t_uint256",
                              "nodeType": "YulIdentifier",
                              "src": "3064:17:18"
                            },
                            "nodeType": "YulFunctionCall",
                            "src": "3064:24:18"
                          }
                        ],
                        "functionName": {
                          "name": "eq",
                          "nodeType": "YulIdentifier",
                          "src": "3054:2:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "3054:35:18"
                      }
                    ],
                    "functionName": {
                      "name": "iszero",
                      "nodeType": "YulIdentifier",
                      "src": "3047:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "3047:43:18"
                  },
                  "nodeType": "YulIf",
                  "src": "3044:63:18"
                }
              ]
            },
            "name": "validator_revert_t_uint256",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "value",
                "nodeType": "YulTypedName",
                "src": "3027:5:18",
                "type": ""
              }
            ],
            "src": "2991:122:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "3171:87:18",
              "statements": [
                {
                  "nodeType": "YulAssignment",
                  "src": "3181:29:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "offset",
                        "nodeType": "YulIdentifier",
                        "src": "3203:6:18"
                      }
                    ],
                    "functionName": {
                      "name": "calldataload",
                      "nodeType": "YulIdentifier",
                      "src": "3190:12:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "3190:20:18"
                  },
                  "variableNames": [
                    {
                      "name": "value",
                      "nodeType": "YulIdentifier",
                      "src": "3181:5:18"
                    }
                  ]
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "name": "value",
                        "nodeType": "YulIdentifier",
                        "src": "3246:5:18"
                      }
                    ],
                    "functionName": {
                      "name": "validator_revert_t_uint256",
                      "nodeType": "YulIdentifier",
                      "src": "3219:26:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "3219:33:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "3219:33:18"
                }
              ]
            },
            "name": "abi_decode_t_uint256",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "offset",
                "nodeType": "YulTypedName",
                "src": "3149:6:18",
                "type": ""
              },
              {
                "name": "end",
                "nodeType": "YulTypedName",
                "src": "3157:3:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "value",
                "nodeType": "YulTypedName",
                "src": "3165:5:18",
                "type": ""
              }
            ],
            "src": "3119:139:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "3330:263:18",
              "statements": [
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "3376:83:18",
                    "statements": [
                      {
                        "expression": {
                          "arguments": [],
                          "functionName": {
                            "name": "revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b",
                            "nodeType": "YulIdentifier",
                            "src": "3378:77:18"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "3378:79:18"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "3378:79:18"
                      }
                    ]
                  },
                  "condition": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "dataEnd",
                            "nodeType": "YulIdentifier",
                            "src": "3351:7:18"
                          },
                          {
                            "name": "headStart",
                            "nodeType": "YulIdentifier",
                            "src": "3360:9:18"
                          }
                        ],
                        "functionName": {
                          "name": "sub",
                          "nodeType": "YulIdentifier",
                          "src": "3347:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "3347:23:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "3372:2:18",
                        "type": "",
                        "value": "32"
                      }
                    ],
                    "functionName": {
                      "name": "slt",
                      "nodeType": "YulIdentifier",
                      "src": "3343:3:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "3343:32:18"
                  },
                  "nodeType": "YulIf",
                  "src": "3340:119:18"
                },
                {
                  "nodeType": "YulBlock",
                  "src": "3469:117:18",
                  "statements": [
                    {
                      "nodeType": "YulVariableDeclaration",
                      "src": "3484:15:18",
                      "value": {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "3498:1:18",
                        "type": "",
                        "value": "0"
                      },
                      "variables": [
                        {
                          "name": "offset",
                          "nodeType": "YulTypedName",
                          "src": "3488:6:18",
                          "type": ""
                        }
                      ]
                    },
                    {
                      "nodeType": "YulAssignment",
                      "src": "3513:63:18",
                      "value": {
                        "arguments": [
                          {
                            "arguments": [
                              {
                                "name": "headStart",
                                "nodeType": "YulIdentifier",
                                "src": "3548:9:18"
                              },
                              {
                                "name": "offset",
                                "nodeType": "YulIdentifier",
                                "src": "3559:6:18"
                              }
                            ],
                            "functionName": {
                              "name": "add",
                              "nodeType": "YulIdentifier",
                              "src": "3544:3:18"
                            },
                            "nodeType": "YulFunctionCall",
                            "src": "3544:22:18"
                          },
                          {
                            "name": "dataEnd",
                            "nodeType": "YulIdentifier",
                            "src": "3568:7:18"
                          }
                        ],
                        "functionName": {
                          "name": "abi_decode_t_uint256",
                          "nodeType": "YulIdentifier",
                          "src": "3523:20:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "3523:53:18"
                      },
                      "variableNames": [
                        {
                          "name": "value0",
                          "nodeType": "YulIdentifier",
                          "src": "3513:6:18"
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            "name": "abi_decode_tuple_t_uint256",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "headStart",
                "nodeType": "YulTypedName",
                "src": "3300:9:18",
                "type": ""
              },
              {
                "name": "dataEnd",
                "nodeType": "YulTypedName",
                "src": "3311:7:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "value0",
                "nodeType": "YulTypedName",
                "src": "3323:6:18",
                "type": ""
              }
            ],
            "src": "3264:329:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "3644:81:18",
              "statements": [
                {
                  "nodeType": "YulAssignment",
                  "src": "3654:65:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "value",
                        "nodeType": "YulIdentifier",
                        "src": "3669:5:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "3676:42:18",
                        "type": "",
                        "value": "0xffffffffffffffffffffffffffffffffffffffff"
                      }
                    ],
                    "functionName": {
                      "name": "and",
                      "nodeType": "YulIdentifier",
                      "src": "3665:3:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "3665:54:18"
                  },
                  "variableNames": [
                    {
                      "name": "cleaned",
                      "nodeType": "YulIdentifier",
                      "src": "3654:7:18"
                    }
                  ]
                }
              ]
            },
            "name": "cleanup_t_uint160",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "value",
                "nodeType": "YulTypedName",
                "src": "3626:5:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "cleaned",
                "nodeType": "YulTypedName",
                "src": "3636:7:18",
                "type": ""
              }
            ],
            "src": "3599:126:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "3776:51:18",
              "statements": [
                {
                  "nodeType": "YulAssignment",
                  "src": "3786:35:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "value",
                        "nodeType": "YulIdentifier",
                        "src": "3815:5:18"
                      }
                    ],
                    "functionName": {
                      "name": "cleanup_t_uint160",
                      "nodeType": "YulIdentifier",
                      "src": "3797:17:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "3797:24:18"
                  },
                  "variableNames": [
                    {
                      "name": "cleaned",
                      "nodeType": "YulIdentifier",
                      "src": "3786:7:18"
                    }
                  ]
                }
              ]
            },
            "name": "cleanup_t_address",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "value",
                "nodeType": "YulTypedName",
                "src": "3758:5:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "cleaned",
                "nodeType": "YulTypedName",
                "src": "3768:7:18",
                "type": ""
              }
            ],
            "src": "3731:96:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "3898:53:18",
              "statements": [
                {
                  "expression": {
                    "arguments": [
                      {
                        "name": "pos",
                        "nodeType": "YulIdentifier",
                        "src": "3915:3:18"
                      },
                      {
                        "arguments": [
                          {
                            "name": "value",
                            "nodeType": "YulIdentifier",
                            "src": "3938:5:18"
                          }
                        ],
                        "functionName": {
                          "name": "cleanup_t_address",
                          "nodeType": "YulIdentifier",
                          "src": "3920:17:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "3920:24:18"
                      }
                    ],
                    "functionName": {
                      "name": "mstore",
                      "nodeType": "YulIdentifier",
                      "src": "3908:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "3908:37:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "3908:37:18"
                }
              ]
            },
            "name": "abi_encode_t_address_to_t_address_fromStack",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "value",
                "nodeType": "YulTypedName",
                "src": "3886:5:18",
                "type": ""
              },
              {
                "name": "pos",
                "nodeType": "YulTypedName",
                "src": "3893:3:18",
                "type": ""
              }
            ],
            "src": "3833:118:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "4055:124:18",
              "statements": [
                {
                  "nodeType": "YulAssignment",
                  "src": "4065:26:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "headStart",
                        "nodeType": "YulIdentifier",
                        "src": "4077:9:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "4088:2:18",
                        "type": "",
                        "value": "32"
                      }
                    ],
                    "functionName": {
                      "name": "add",
                      "nodeType": "YulIdentifier",
                      "src": "4073:3:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "4073:18:18"
                  },
                  "variableNames": [
                    {
                      "name": "tail",
                      "nodeType": "YulIdentifier",
                      "src": "4065:4:18"
                    }
                  ]
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "name": "value0",
                        "nodeType": "YulIdentifier",
                        "src": "4145:6:18"
                      },
                      {
                        "arguments": [
                          {
                            "name": "headStart",
                            "nodeType": "YulIdentifier",
                            "src": "4158:9:18"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "4169:1:18",
                            "type": "",
                            "value": "0"
                          }
                        ],
                        "functionName": {
                          "name": "add",
                          "nodeType": "YulIdentifier",
                          "src": "4154:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "4154:17:18"
                      }
                    ],
                    "functionName": {
                      "name": "abi_encode_t_address_to_t_address_fromStack",
                      "nodeType": "YulIdentifier",
                      "src": "4101:43:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "4101:71:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "4101:71:18"
                }
              ]
            },
            "name": "abi_encode_tuple_t_address__to_t_address__fromStack_reversed",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "headStart",
                "nodeType": "YulTypedName",
                "src": "4027:9:18",
                "type": ""
              },
              {
                "name": "value0",
                "nodeType": "YulTypedName",
                "src": "4039:6:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "tail",
                "nodeType": "YulTypedName",
                "src": "4050:4:18",
                "type": ""
              }
            ],
            "src": "3957:222:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "4228:79:18",
              "statements": [
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "4285:16:18",
                    "statements": [
                      {
                        "expression": {
                          "arguments": [
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "4294:1:18",
                              "type": "",
                              "value": "0"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "4297:1:18",
                              "type": "",
                              "value": "0"
                            }
                          ],
                          "functionName": {
                            "name": "revert",
                            "nodeType": "YulIdentifier",
                            "src": "4287:6:18"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "4287:12:18"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "4287:12:18"
                      }
                    ]
                  },
                  "condition": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "value",
                            "nodeType": "YulIdentifier",
                            "src": "4251:5:18"
                          },
                          {
                            "arguments": [
                              {
                                "name": "value",
                                "nodeType": "YulIdentifier",
                                "src": "4276:5:18"
                              }
                            ],
                            "functionName": {
                              "name": "cleanup_t_address",
                              "nodeType": "YulIdentifier",
                              "src": "4258:17:18"
                            },
                            "nodeType": "YulFunctionCall",
                            "src": "4258:24:18"
                          }
                        ],
                        "functionName": {
                          "name": "eq",
                          "nodeType": "YulIdentifier",
                          "src": "4248:2:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "4248:35:18"
                      }
                    ],
                    "functionName": {
                      "name": "iszero",
                      "nodeType": "YulIdentifier",
                      "src": "4241:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "4241:43:18"
                  },
                  "nodeType": "YulIf",
                  "src": "4238:63:18"
                }
              ]
            },
            "name": "validator_revert_t_address",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "value",
                "nodeType": "YulTypedName",
                "src": "4221:5:18",
                "type": ""
              }
            ],
            "src": "4185:122:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "4365:87:18",
              "statements": [
                {
                  "nodeType": "YulAssignment",
                  "src": "4375:29:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "offset",
                        "nodeType": "YulIdentifier",
                        "src": "4397:6:18"
                      }
                    ],
                    "functionName": {
                      "name": "calldataload",
                      "nodeType": "YulIdentifier",
                      "src": "4384:12:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "4384:20:18"
                  },
                  "variableNames": [
                    {
                      "name": "value",
                      "nodeType": "YulIdentifier",
                      "src": "4375:5:18"
                    }
                  ]
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "name": "value",
                        "nodeType": "YulIdentifier",
                        "src": "4440:5:18"
                      }
                    ],
                    "functionName": {
                      "name": "validator_revert_t_address",
                      "nodeType": "YulIdentifier",
                      "src": "4413:26:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "4413:33:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "4413:33:18"
                }
              ]
            },
            "name": "abi_decode_t_address",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "offset",
                "nodeType": "YulTypedName",
                "src": "4343:6:18",
                "type": ""
              },
              {
                "name": "end",
                "nodeType": "YulTypedName",
                "src": "4351:3:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "value",
                "nodeType": "YulTypedName",
                "src": "4359:5:18",
                "type": ""
              }
            ],
            "src": "4313:139:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "4541:391:18",
              "statements": [
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "4587:83:18",
                    "statements": [
                      {
                        "expression": {
                          "arguments": [],
                          "functionName": {
                            "name": "revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b",
                            "nodeType": "YulIdentifier",
                            "src": "4589:77:18"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "4589:79:18"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "4589:79:18"
                      }
                    ]
                  },
                  "condition": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "dataEnd",
                            "nodeType": "YulIdentifier",
                            "src": "4562:7:18"
                          },
                          {
                            "name": "headStart",
                            "nodeType": "YulIdentifier",
                            "src": "4571:9:18"
                          }
                        ],
                        "functionName": {
                          "name": "sub",
                          "nodeType": "YulIdentifier",
                          "src": "4558:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "4558:23:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "4583:2:18",
                        "type": "",
                        "value": "64"
                      }
                    ],
                    "functionName": {
                      "name": "slt",
                      "nodeType": "YulIdentifier",
                      "src": "4554:3:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "4554:32:18"
                  },
                  "nodeType": "YulIf",
                  "src": "4551:119:18"
                },
                {
                  "nodeType": "YulBlock",
                  "src": "4680:117:18",
                  "statements": [
                    {
                      "nodeType": "YulVariableDeclaration",
                      "src": "4695:15:18",
                      "value": {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "4709:1:18",
                        "type": "",
                        "value": "0"
                      },
                      "variables": [
                        {
                          "name": "offset",
                          "nodeType": "YulTypedName",
                          "src": "4699:6:18",
                          "type": ""
                        }
                      ]
                    },
                    {
                      "nodeType": "YulAssignment",
                      "src": "4724:63:18",
                      "value": {
                        "arguments": [
                          {
                            "arguments": [
                              {
                                "name": "headStart",
                                "nodeType": "YulIdentifier",
                                "src": "4759:9:18"
                              },
                              {
                                "name": "offset",
                                "nodeType": "YulIdentifier",
                                "src": "4770:6:18"
                              }
                            ],
                            "functionName": {
                              "name": "add",
                              "nodeType": "YulIdentifier",
                              "src": "4755:3:18"
                            },
                            "nodeType": "YulFunctionCall",
                            "src": "4755:22:18"
                          },
                          {
                            "name": "dataEnd",
                            "nodeType": "YulIdentifier",
                            "src": "4779:7:18"
                          }
                        ],
                        "functionName": {
                          "name": "abi_decode_t_address",
                          "nodeType": "YulIdentifier",
                          "src": "4734:20:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "4734:53:18"
                      },
                      "variableNames": [
                        {
                          "name": "value0",
                          "nodeType": "YulIdentifier",
                          "src": "4724:6:18"
                        }
                      ]
                    }
                  ]
                },
                {
                  "nodeType": "YulBlock",
                  "src": "4807:118:18",
                  "statements": [
                    {
                      "nodeType": "YulVariableDeclaration",
                      "src": "4822:16:18",
                      "value": {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "4836:2:18",
                        "type": "",
                        "value": "32"
                      },
                      "variables": [
                        {
                          "name": "offset",
                          "nodeType": "YulTypedName",
                          "src": "4826:6:18",
                          "type": ""
                        }
                      ]
                    },
                    {
                      "nodeType": "YulAssignment",
                      "src": "4852:63:18",
                      "value": {
                        "arguments": [
                          {
                            "arguments": [
                              {
                                "name": "headStart",
                                "nodeType": "YulIdentifier",
                                "src": "4887:9:18"
                              },
                              {
                                "name": "offset",
                                "nodeType": "YulIdentifier",
                                "src": "4898:6:18"
                              }
                            ],
                            "functionName": {
                              "name": "add",
                              "nodeType": "YulIdentifier",
                              "src": "4883:3:18"
                            },
                            "nodeType": "YulFunctionCall",
                            "src": "4883:22:18"
                          },
                          {
                            "name": "dataEnd",
                            "nodeType": "YulIdentifier",
                            "src": "4907:7:18"
                          }
                        ],
                        "functionName": {
                          "name": "abi_decode_t_uint256",
                          "nodeType": "YulIdentifier",
                          "src": "4862:20:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "4862:53:18"
                      },
                      "variableNames": [
                        {
                          "name": "value1",
                          "nodeType": "YulIdentifier",
                          "src": "4852:6:18"
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            "name": "abi_decode_tuple_t_addresst_uint256",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "headStart",
                "nodeType": "YulTypedName",
                "src": "4503:9:18",
                "type": ""
              },
              {
                "name": "dataEnd",
                "nodeType": "YulTypedName",
                "src": "4514:7:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "value0",
                "nodeType": "YulTypedName",
                "src": "4526:6:18",
                "type": ""
              },
              {
                "name": "value1",
                "nodeType": "YulTypedName",
                "src": "4534:6:18",
                "type": ""
              }
            ],
            "src": "4458:474:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "5038:519:18",
              "statements": [
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "5084:83:18",
                    "statements": [
                      {
                        "expression": {
                          "arguments": [],
                          "functionName": {
                            "name": "revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b",
                            "nodeType": "YulIdentifier",
                            "src": "5086:77:18"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "5086:79:18"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "5086:79:18"
                      }
                    ]
                  },
                  "condition": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "dataEnd",
                            "nodeType": "YulIdentifier",
                            "src": "5059:7:18"
                          },
                          {
                            "name": "headStart",
                            "nodeType": "YulIdentifier",
                            "src": "5068:9:18"
                          }
                        ],
                        "functionName": {
                          "name": "sub",
                          "nodeType": "YulIdentifier",
                          "src": "5055:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "5055:23:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "5080:2:18",
                        "type": "",
                        "value": "96"
                      }
                    ],
                    "functionName": {
                      "name": "slt",
                      "nodeType": "YulIdentifier",
                      "src": "5051:3:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "5051:32:18"
                  },
                  "nodeType": "YulIf",
                  "src": "5048:119:18"
                },
                {
                  "nodeType": "YulBlock",
                  "src": "5177:117:18",
                  "statements": [
                    {
                      "nodeType": "YulVariableDeclaration",
                      "src": "5192:15:18",
                      "value": {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "5206:1:18",
                        "type": "",
                        "value": "0"
                      },
                      "variables": [
                        {
                          "name": "offset",
                          "nodeType": "YulTypedName",
                          "src": "5196:6:18",
                          "type": ""
                        }
                      ]
                    },
                    {
                      "nodeType": "YulAssignment",
                      "src": "5221:63:18",
                      "value": {
                        "arguments": [
                          {
                            "arguments": [
                              {
                                "name": "headStart",
                                "nodeType": "YulIdentifier",
                                "src": "5256:9:18"
                              },
                              {
                                "name": "offset",
                                "nodeType": "YulIdentifier",
                                "src": "5267:6:18"
                              }
                            ],
                            "functionName": {
                              "name": "add",
                              "nodeType": "YulIdentifier",
                              "src": "5252:3:18"
                            },
                            "nodeType": "YulFunctionCall",
                            "src": "5252:22:18"
                          },
                          {
                            "name": "dataEnd",
                            "nodeType": "YulIdentifier",
                            "src": "5276:7:18"
                          }
                        ],
                        "functionName": {
                          "name": "abi_decode_t_address",
                          "nodeType": "YulIdentifier",
                          "src": "5231:20:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "5231:53:18"
                      },
                      "variableNames": [
                        {
                          "name": "value0",
                          "nodeType": "YulIdentifier",
                          "src": "5221:6:18"
                        }
                      ]
                    }
                  ]
                },
                {
                  "nodeType": "YulBlock",
                  "src": "5304:118:18",
                  "statements": [
                    {
                      "nodeType": "YulVariableDeclaration",
                      "src": "5319:16:18",
                      "value": {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "5333:2:18",
                        "type": "",
                        "value": "32"
                      },
                      "variables": [
                        {
                          "name": "offset",
                          "nodeType": "YulTypedName",
                          "src": "5323:6:18",
                          "type": ""
                        }
                      ]
                    },
                    {
                      "nodeType": "YulAssignment",
                      "src": "5349:63:18",
                      "value": {
                        "arguments": [
                          {
                            "arguments": [
                              {
                                "name": "headStart",
                                "nodeType": "YulIdentifier",
                                "src": "5384:9:18"
                              },
                              {
                                "name": "offset",
                                "nodeType": "YulIdentifier",
                                "src": "5395:6:18"
                              }
                            ],
                            "functionName": {
                              "name": "add",
                              "nodeType": "YulIdentifier",
                              "src": "5380:3:18"
                            },
                            "nodeType": "YulFunctionCall",
                            "src": "5380:22:18"
                          },
                          {
                            "name": "dataEnd",
                            "nodeType": "YulIdentifier",
                            "src": "5404:7:18"
                          }
                        ],
                        "functionName": {
                          "name": "abi_decode_t_address",
                          "nodeType": "YulIdentifier",
                          "src": "5359:20:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "5359:53:18"
                      },
                      "variableNames": [
                        {
                          "name": "value1",
                          "nodeType": "YulIdentifier",
                          "src": "5349:6:18"
                        }
                      ]
                    }
                  ]
                },
                {
                  "nodeType": "YulBlock",
                  "src": "5432:118:18",
                  "statements": [
                    {
                      "nodeType": "YulVariableDeclaration",
                      "src": "5447:16:18",
                      "value": {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "5461:2:18",
                        "type": "",
                        "value": "64"
                      },
                      "variables": [
                        {
                          "name": "offset",
                          "nodeType": "YulTypedName",
                          "src": "5451:6:18",
                          "type": ""
                        }
                      ]
                    },
                    {
                      "nodeType": "YulAssignment",
                      "src": "5477:63:18",
                      "value": {
                        "arguments": [
                          {
                            "arguments": [
                              {
                                "name": "headStart",
                                "nodeType": "YulIdentifier",
                                "src": "5512:9:18"
                              },
                              {
                                "name": "offset",
                                "nodeType": "YulIdentifier",
                                "src": "5523:6:18"
                              }
                            ],
                            "functionName": {
                              "name": "add",
                              "nodeType": "YulIdentifier",
                              "src": "5508:3:18"
                            },
                            "nodeType": "YulFunctionCall",
                            "src": "5508:22:18"
                          },
                          {
                            "name": "dataEnd",
                            "nodeType": "YulIdentifier",
                            "src": "5532:7:18"
                          }
                        ],
                        "functionName": {
                          "name": "abi_decode_t_uint256",
                          "nodeType": "YulIdentifier",
                          "src": "5487:20:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "5487:53:18"
                      },
                      "variableNames": [
                        {
                          "name": "value2",
                          "nodeType": "YulIdentifier",
                          "src": "5477:6:18"
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            "name": "abi_decode_tuple_t_addresst_addresst_uint256",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "headStart",
                "nodeType": "YulTypedName",
                "src": "4992:9:18",
                "type": ""
              },
              {
                "name": "dataEnd",
                "nodeType": "YulTypedName",
                "src": "5003:7:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "value0",
                "nodeType": "YulTypedName",
                "src": "5015:6:18",
                "type": ""
              },
              {
                "name": "value1",
                "nodeType": "YulTypedName",
                "src": "5023:6:18",
                "type": ""
              },
              {
                "name": "value2",
                "nodeType": "YulTypedName",
                "src": "5031:6:18",
                "type": ""
              }
            ],
            "src": "4938:619:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "5629:263:18",
              "statements": [
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "5675:83:18",
                    "statements": [
                      {
                        "expression": {
                          "arguments": [],
                          "functionName": {
                            "name": "revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b",
                            "nodeType": "YulIdentifier",
                            "src": "5677:77:18"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "5677:79:18"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "5677:79:18"
                      }
                    ]
                  },
                  "condition": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "dataEnd",
                            "nodeType": "YulIdentifier",
                            "src": "5650:7:18"
                          },
                          {
                            "name": "headStart",
                            "nodeType": "YulIdentifier",
                            "src": "5659:9:18"
                          }
                        ],
                        "functionName": {
                          "name": "sub",
                          "nodeType": "YulIdentifier",
                          "src": "5646:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "5646:23:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "5671:2:18",
                        "type": "",
                        "value": "32"
                      }
                    ],
                    "functionName": {
                      "name": "slt",
                      "nodeType": "YulIdentifier",
                      "src": "5642:3:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "5642:32:18"
                  },
                  "nodeType": "YulIf",
                  "src": "5639:119:18"
                },
                {
                  "nodeType": "YulBlock",
                  "src": "5768:117:18",
                  "statements": [
                    {
                      "nodeType": "YulVariableDeclaration",
                      "src": "5783:15:18",
                      "value": {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "5797:1:18",
                        "type": "",
                        "value": "0"
                      },
                      "variables": [
                        {
                          "name": "offset",
                          "nodeType": "YulTypedName",
                          "src": "5787:6:18",
                          "type": ""
                        }
                      ]
                    },
                    {
                      "nodeType": "YulAssignment",
                      "src": "5812:63:18",
                      "value": {
                        "arguments": [
                          {
                            "arguments": [
                              {
                                "name": "headStart",
                                "nodeType": "YulIdentifier",
                                "src": "5847:9:18"
                              },
                              {
                                "name": "offset",
                                "nodeType": "YulIdentifier",
                                "src": "5858:6:18"
                              }
                            ],
                            "functionName": {
                              "name": "add",
                              "nodeType": "YulIdentifier",
                              "src": "5843:3:18"
                            },
                            "nodeType": "YulFunctionCall",
                            "src": "5843:22:18"
                          },
                          {
                            "name": "dataEnd",
                            "nodeType": "YulIdentifier",
                            "src": "5867:7:18"
                          }
                        ],
                        "functionName": {
                          "name": "abi_decode_t_address",
                          "nodeType": "YulIdentifier",
                          "src": "5822:20:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "5822:53:18"
                      },
                      "variableNames": [
                        {
                          "name": "value0",
                          "nodeType": "YulIdentifier",
                          "src": "5812:6:18"
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            "name": "abi_decode_tuple_t_address",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "headStart",
                "nodeType": "YulTypedName",
                "src": "5599:9:18",
                "type": ""
              },
              {
                "name": "dataEnd",
                "nodeType": "YulTypedName",
                "src": "5610:7:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "value0",
                "nodeType": "YulTypedName",
                "src": "5622:6:18",
                "type": ""
              }
            ],
            "src": "5563:329:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "5963:53:18",
              "statements": [
                {
                  "expression": {
                    "arguments": [
                      {
                        "name": "pos",
                        "nodeType": "YulIdentifier",
                        "src": "5980:3:18"
                      },
                      {
                        "arguments": [
                          {
                            "name": "value",
                            "nodeType": "YulIdentifier",
                            "src": "6003:5:18"
                          }
                        ],
                        "functionName": {
                          "name": "cleanup_t_uint256",
                          "nodeType": "YulIdentifier",
                          "src": "5985:17:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "5985:24:18"
                      }
                    ],
                    "functionName": {
                      "name": "mstore",
                      "nodeType": "YulIdentifier",
                      "src": "5973:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "5973:37:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "5973:37:18"
                }
              ]
            },
            "name": "abi_encode_t_uint256_to_t_uint256_fromStack",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "value",
                "nodeType": "YulTypedName",
                "src": "5951:5:18",
                "type": ""
              },
              {
                "name": "pos",
                "nodeType": "YulTypedName",
                "src": "5958:3:18",
                "type": ""
              }
            ],
            "src": "5898:118:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "6120:124:18",
              "statements": [
                {
                  "nodeType": "YulAssignment",
                  "src": "6130:26:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "headStart",
                        "nodeType": "YulIdentifier",
                        "src": "6142:9:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "6153:2:18",
                        "type": "",
                        "value": "32"
                      }
                    ],
                    "functionName": {
                      "name": "add",
                      "nodeType": "YulIdentifier",
                      "src": "6138:3:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "6138:18:18"
                  },
                  "variableNames": [
                    {
                      "name": "tail",
                      "nodeType": "YulIdentifier",
                      "src": "6130:4:18"
                    }
                  ]
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "name": "value0",
                        "nodeType": "YulIdentifier",
                        "src": "6210:6:18"
                      },
                      {
                        "arguments": [
                          {
                            "name": "headStart",
                            "nodeType": "YulIdentifier",
                            "src": "6223:9:18"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "6234:1:18",
                            "type": "",
                            "value": "0"
                          }
                        ],
                        "functionName": {
                          "name": "add",
                          "nodeType": "YulIdentifier",
                          "src": "6219:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "6219:17:18"
                      }
                    ],
                    "functionName": {
                      "name": "abi_encode_t_uint256_to_t_uint256_fromStack",
                      "nodeType": "YulIdentifier",
                      "src": "6166:43:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "6166:71:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "6166:71:18"
                }
              ]
            },
            "name": "abi_encode_tuple_t_uint256__to_t_uint256__fromStack_reversed",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "headStart",
                "nodeType": "YulTypedName",
                "src": "6092:9:18",
                "type": ""
              },
              {
                "name": "value0",
                "nodeType": "YulTypedName",
                "src": "6104:6:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "tail",
                "nodeType": "YulTypedName",
                "src": "6115:4:18",
                "type": ""
              }
            ],
            "src": "6022:222:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "6339:28:18",
              "statements": [
                {
                  "expression": {
                    "arguments": [
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "6356:1:18",
                        "type": "",
                        "value": "0"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "6359:1:18",
                        "type": "",
                        "value": "0"
                      }
                    ],
                    "functionName": {
                      "name": "revert",
                      "nodeType": "YulIdentifier",
                      "src": "6349:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "6349:12:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "6349:12:18"
                }
              ]
            },
            "name": "revert_error_1b9f4a0a5773e33b91aa01db23bf8c55fce1411167c872835e7fa00a4f17d46d",
            "nodeType": "YulFunctionDefinition",
            "src": "6250:117:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "6462:28:18",
              "statements": [
                {
                  "expression": {
                    "arguments": [
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "6479:1:18",
                        "type": "",
                        "value": "0"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "6482:1:18",
                        "type": "",
                        "value": "0"
                      }
                    ],
                    "functionName": {
                      "name": "revert",
                      "nodeType": "YulIdentifier",
                      "src": "6472:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "6472:12:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "6472:12:18"
                }
              ]
            },
            "name": "revert_error_987264b3b1d58a9c7f8255e93e81c77d86d6299019c33110a076957a3e06e2ae",
            "nodeType": "YulFunctionDefinition",
            "src": "6373:117:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "6524:152:18",
              "statements": [
                {
                  "expression": {
                    "arguments": [
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "6541:1:18",
                        "type": "",
                        "value": "0"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "6544:77:18",
                        "type": "",
                        "value": "35408467139433450592217433187231851964531694900788300625387963629091585785856"
                      }
                    ],
                    "functionName": {
                      "name": "mstore",
                      "nodeType": "YulIdentifier",
                      "src": "6534:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "6534:88:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "6534:88:18"
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "6638:1:18",
                        "type": "",
                        "value": "4"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "6641:4:18",
                        "type": "",
                        "value": "0x41"
                      }
                    ],
                    "functionName": {
                      "name": "mstore",
                      "nodeType": "YulIdentifier",
                      "src": "6631:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "6631:15:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "6631:15:18"
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "6662:1:18",
                        "type": "",
                        "value": "0"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "6665:4:18",
                        "type": "",
                        "value": "0x24"
                      }
                    ],
                    "functionName": {
                      "name": "revert",
                      "nodeType": "YulIdentifier",
                      "src": "6655:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "6655:15:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "6655:15:18"
                }
              ]
            },
            "name": "panic_error_0x41",
            "nodeType": "YulFunctionDefinition",
            "src": "6496:180:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "6725:238:18",
              "statements": [
                {
                  "nodeType": "YulVariableDeclaration",
                  "src": "6735:58:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "memPtr",
                        "nodeType": "YulIdentifier",
                        "src": "6757:6:18"
                      },
                      {
                        "arguments": [
                          {
                            "name": "size",
                            "nodeType": "YulIdentifier",
                            "src": "6787:4:18"
                          }
                        ],
                        "functionName": {
                          "name": "round_up_to_mul_of_32",
                          "nodeType": "YulIdentifier",
                          "src": "6765:21:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "6765:27:18"
                      }
                    ],
                    "functionName": {
                      "name": "add",
                      "nodeType": "YulIdentifier",
                      "src": "6753:3:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "6753:40:18"
                  },
                  "variables": [
                    {
                      "name": "newFreePtr",
                      "nodeType": "YulTypedName",
                      "src": "6739:10:18",
                      "type": ""
                    }
                  ]
                },
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "6904:22:18",
                    "statements": [
                      {
                        "expression": {
                          "arguments": [],
                          "functionName": {
                            "name": "panic_error_0x41",
                            "nodeType": "YulIdentifier",
                            "src": "6906:16:18"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "6906:18:18"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "6906:18:18"
                      }
                    ]
                  },
                  "condition": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "newFreePtr",
                            "nodeType": "YulIdentifier",
                            "src": "6847:10:18"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "6859:18:18",
                            "type": "",
                            "value": "0xffffffffffffffff"
                          }
                        ],
                        "functionName": {
                          "name": "gt",
                          "nodeType": "YulIdentifier",
                          "src": "6844:2:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "6844:34:18"
                      },
                      {
                        "arguments": [
                          {
                            "name": "newFreePtr",
                            "nodeType": "YulIdentifier",
                            "src": "6883:10:18"
                          },
                          {
                            "name": "memPtr",
                            "nodeType": "YulIdentifier",
                            "src": "6895:6:18"
                          }
                        ],
                        "functionName": {
                          "name": "lt",
                          "nodeType": "YulIdentifier",
                          "src": "6880:2:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "6880:22:18"
                      }
                    ],
                    "functionName": {
                      "name": "or",
                      "nodeType": "YulIdentifier",
                      "src": "6841:2:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "6841:62:18"
                  },
                  "nodeType": "YulIf",
                  "src": "6838:88:18"
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "6942:2:18",
                        "type": "",
                        "value": "64"
                      },
                      {
                        "name": "newFreePtr",
                        "nodeType": "YulIdentifier",
                        "src": "6946:10:18"
                      }
                    ],
                    "functionName": {
                      "name": "mstore",
                      "nodeType": "YulIdentifier",
                      "src": "6935:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "6935:22:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "6935:22:18"
                }
              ]
            },
            "name": "finalize_allocation",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "memPtr",
                "nodeType": "YulTypedName",
                "src": "6711:6:18",
                "type": ""
              },
              {
                "name": "size",
                "nodeType": "YulTypedName",
                "src": "6719:4:18",
                "type": ""
              }
            ],
            "src": "6682:281:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "7010:88:18",
              "statements": [
                {
                  "nodeType": "YulAssignment",
                  "src": "7020:30:18",
                  "value": {
                    "arguments": [],
                    "functionName": {
                      "name": "allocate_unbounded",
                      "nodeType": "YulIdentifier",
                      "src": "7030:18:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "7030:20:18"
                  },
                  "variableNames": [
                    {
                      "name": "memPtr",
                      "nodeType": "YulIdentifier",
                      "src": "7020:6:18"
                    }
                  ]
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "name": "memPtr",
                        "nodeType": "YulIdentifier",
                        "src": "7079:6:18"
                      },
                      {
                        "name": "size",
                        "nodeType": "YulIdentifier",
                        "src": "7087:4:18"
                      }
                    ],
                    "functionName": {
                      "name": "finalize_allocation",
                      "nodeType": "YulIdentifier",
                      "src": "7059:19:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "7059:33:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "7059:33:18"
                }
              ]
            },
            "name": "allocate_memory",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "size",
                "nodeType": "YulTypedName",
                "src": "6994:4:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "memPtr",
                "nodeType": "YulTypedName",
                "src": "7003:6:18",
                "type": ""
              }
            ],
            "src": "6969:129:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "7171:241:18",
              "statements": [
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "7276:22:18",
                    "statements": [
                      {
                        "expression": {
                          "arguments": [],
                          "functionName": {
                            "name": "panic_error_0x41",
                            "nodeType": "YulIdentifier",
                            "src": "7278:16:18"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "7278:18:18"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "7278:18:18"
                      }
                    ]
                  },
                  "condition": {
                    "arguments": [
                      {
                        "name": "length",
                        "nodeType": "YulIdentifier",
                        "src": "7248:6:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "7256:18:18",
                        "type": "",
                        "value": "0xffffffffffffffff"
                      }
                    ],
                    "functionName": {
                      "name": "gt",
                      "nodeType": "YulIdentifier",
                      "src": "7245:2:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "7245:30:18"
                  },
                  "nodeType": "YulIf",
                  "src": "7242:56:18"
                },
                {
                  "nodeType": "YulAssignment",
                  "src": "7308:37:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "length",
                        "nodeType": "YulIdentifier",
                        "src": "7338:6:18"
                      }
                    ],
                    "functionName": {
                      "name": "round_up_to_mul_of_32",
                      "nodeType": "YulIdentifier",
                      "src": "7316:21:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "7316:29:18"
                  },
                  "variableNames": [
                    {
                      "name": "size",
                      "nodeType": "YulIdentifier",
                      "src": "7308:4:18"
                    }
                  ]
                },
                {
                  "nodeType": "YulAssignment",
                  "src": "7382:23:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "size",
                        "nodeType": "YulIdentifier",
                        "src": "7394:4:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "7400:4:18",
                        "type": "",
                        "value": "0x20"
                      }
                    ],
                    "functionName": {
                      "name": "add",
                      "nodeType": "YulIdentifier",
                      "src": "7390:3:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "7390:15:18"
                  },
                  "variableNames": [
                    {
                      "name": "size",
                      "nodeType": "YulIdentifier",
                      "src": "7382:4:18"
                    }
                  ]
                }
              ]
            },
            "name": "array_allocation_size_t_string_memory_ptr",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "length",
                "nodeType": "YulTypedName",
                "src": "7155:6:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "size",
                "nodeType": "YulTypedName",
                "src": "7166:4:18",
                "type": ""
              }
            ],
            "src": "7104:308:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "7469:103:18",
              "statements": [
                {
                  "expression": {
                    "arguments": [
                      {
                        "name": "dst",
                        "nodeType": "YulIdentifier",
                        "src": "7492:3:18"
                      },
                      {
                        "name": "src",
                        "nodeType": "YulIdentifier",
                        "src": "7497:3:18"
                      },
                      {
                        "name": "length",
                        "nodeType": "YulIdentifier",
                        "src": "7502:6:18"
                      }
                    ],
                    "functionName": {
                      "name": "calldatacopy",
                      "nodeType": "YulIdentifier",
                      "src": "7479:12:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "7479:30:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "7479:30:18"
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "dst",
                            "nodeType": "YulIdentifier",
                            "src": "7550:3:18"
                          },
                          {
                            "name": "length",
                            "nodeType": "YulIdentifier",
                            "src": "7555:6:18"
                          }
                        ],
                        "functionName": {
                          "name": "add",
                          "nodeType": "YulIdentifier",
                          "src": "7546:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "7546:16:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "7564:1:18",
                        "type": "",
                        "value": "0"
                      }
                    ],
                    "functionName": {
                      "name": "mstore",
                      "nodeType": "YulIdentifier",
                      "src": "7539:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "7539:27:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "7539:27:18"
                }
              ]
            },
            "name": "copy_calldata_to_memory",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "src",
                "nodeType": "YulTypedName",
                "src": "7451:3:18",
                "type": ""
              },
              {
                "name": "dst",
                "nodeType": "YulTypedName",
                "src": "7456:3:18",
                "type": ""
              },
              {
                "name": "length",
                "nodeType": "YulTypedName",
                "src": "7461:6:18",
                "type": ""
              }
            ],
            "src": "7418:154:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "7662:328:18",
              "statements": [
                {
                  "nodeType": "YulAssignment",
                  "src": "7672:75:18",
                  "value": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "length",
                            "nodeType": "YulIdentifier",
                            "src": "7739:6:18"
                          }
                        ],
                        "functionName": {
                          "name": "array_allocation_size_t_string_memory_ptr",
                          "nodeType": "YulIdentifier",
                          "src": "7697:41:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "7697:49:18"
                      }
                    ],
                    "functionName": {
                      "name": "allocate_memory",
                      "nodeType": "YulIdentifier",
                      "src": "7681:15:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "7681:66:18"
                  },
                  "variableNames": [
                    {
                      "name": "array",
                      "nodeType": "YulIdentifier",
                      "src": "7672:5:18"
                    }
                  ]
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "name": "array",
                        "nodeType": "YulIdentifier",
                        "src": "7763:5:18"
                      },
                      {
                        "name": "length",
                        "nodeType": "YulIdentifier",
                        "src": "7770:6:18"
                      }
                    ],
                    "functionName": {
                      "name": "mstore",
                      "nodeType": "YulIdentifier",
                      "src": "7756:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "7756:21:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "7756:21:18"
                },
                {
                  "nodeType": "YulVariableDeclaration",
                  "src": "7786:27:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "array",
                        "nodeType": "YulIdentifier",
                        "src": "7801:5:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "7808:4:18",
                        "type": "",
                        "value": "0x20"
                      }
                    ],
                    "functionName": {
                      "name": "add",
                      "nodeType": "YulIdentifier",
                      "src": "7797:3:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "7797:16:18"
                  },
                  "variables": [
                    {
                      "name": "dst",
                      "nodeType": "YulTypedName",
                      "src": "7790:3:18",
                      "type": ""
                    }
                  ]
                },
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "7851:83:18",
                    "statements": [
                      {
                        "expression": {
                          "arguments": [],
                          "functionName": {
                            "name": "revert_error_987264b3b1d58a9c7f8255e93e81c77d86d6299019c33110a076957a3e06e2ae",
                            "nodeType": "YulIdentifier",
                            "src": "7853:77:18"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "7853:79:18"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "7853:79:18"
                      }
                    ]
                  },
                  "condition": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "src",
                            "nodeType": "YulIdentifier",
                            "src": "7832:3:18"
                          },
                          {
                            "name": "length",
                            "nodeType": "YulIdentifier",
                            "src": "7837:6:18"
                          }
                        ],
                        "functionName": {
                          "name": "add",
                          "nodeType": "YulIdentifier",
                          "src": "7828:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "7828:16:18"
                      },
                      {
                        "name": "end",
                        "nodeType": "YulIdentifier",
                        "src": "7846:3:18"
                      }
                    ],
                    "functionName": {
                      "name": "gt",
                      "nodeType": "YulIdentifier",
                      "src": "7825:2:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "7825:25:18"
                  },
                  "nodeType": "YulIf",
                  "src": "7822:112:18"
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "name": "src",
                        "nodeType": "YulIdentifier",
                        "src": "7967:3:18"
                      },
                      {
                        "name": "dst",
                        "nodeType": "YulIdentifier",
                        "src": "7972:3:18"
                      },
                      {
                        "name": "length",
                        "nodeType": "YulIdentifier",
                        "src": "7977:6:18"
                      }
                    ],
                    "functionName": {
                      "name": "copy_calldata_to_memory",
                      "nodeType": "YulIdentifier",
                      "src": "7943:23:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "7943:41:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "7943:41:18"
                }
              ]
            },
            "name": "abi_decode_available_length_t_string_memory_ptr",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "src",
                "nodeType": "YulTypedName",
                "src": "7635:3:18",
                "type": ""
              },
              {
                "name": "length",
                "nodeType": "YulTypedName",
                "src": "7640:6:18",
                "type": ""
              },
              {
                "name": "end",
                "nodeType": "YulTypedName",
                "src": "7648:3:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "array",
                "nodeType": "YulTypedName",
                "src": "7656:5:18",
                "type": ""
              }
            ],
            "src": "7578:412:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "8072:278:18",
              "statements": [
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "8121:83:18",
                    "statements": [
                      {
                        "expression": {
                          "arguments": [],
                          "functionName": {
                            "name": "revert_error_1b9f4a0a5773e33b91aa01db23bf8c55fce1411167c872835e7fa00a4f17d46d",
                            "nodeType": "YulIdentifier",
                            "src": "8123:77:18"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "8123:79:18"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "8123:79:18"
                      }
                    ]
                  },
                  "condition": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "arguments": [
                              {
                                "name": "offset",
                                "nodeType": "YulIdentifier",
                                "src": "8100:6:18"
                              },
                              {
                                "kind": "number",
                                "nodeType": "YulLiteral",
                                "src": "8108:4:18",
                                "type": "",
                                "value": "0x1f"
                              }
                            ],
                            "functionName": {
                              "name": "add",
                              "nodeType": "YulIdentifier",
                              "src": "8096:3:18"
                            },
                            "nodeType": "YulFunctionCall",
                            "src": "8096:17:18"
                          },
                          {
                            "name": "end",
                            "nodeType": "YulIdentifier",
                            "src": "8115:3:18"
                          }
                        ],
                        "functionName": {
                          "name": "slt",
                          "nodeType": "YulIdentifier",
                          "src": "8092:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "8092:27:18"
                      }
                    ],
                    "functionName": {
                      "name": "iszero",
                      "nodeType": "YulIdentifier",
                      "src": "8085:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "8085:35:18"
                  },
                  "nodeType": "YulIf",
                  "src": "8082:122:18"
                },
                {
                  "nodeType": "YulVariableDeclaration",
                  "src": "8213:34:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "offset",
                        "nodeType": "YulIdentifier",
                        "src": "8240:6:18"
                      }
                    ],
                    "functionName": {
                      "name": "calldataload",
                      "nodeType": "YulIdentifier",
                      "src": "8227:12:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "8227:20:18"
                  },
                  "variables": [
                    {
                      "name": "length",
                      "nodeType": "YulTypedName",
                      "src": "8217:6:18",
                      "type": ""
                    }
                  ]
                },
                {
                  "nodeType": "YulAssignment",
                  "src": "8256:88:18",
                  "value": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "offset",
                            "nodeType": "YulIdentifier",
                            "src": "8317:6:18"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "8325:4:18",
                            "type": "",
                            "value": "0x20"
                          }
                        ],
                        "functionName": {
                          "name": "add",
                          "nodeType": "YulIdentifier",
                          "src": "8313:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "8313:17:18"
                      },
                      {
                        "name": "length",
                        "nodeType": "YulIdentifier",
                        "src": "8332:6:18"
                      },
                      {
                        "name": "end",
                        "nodeType": "YulIdentifier",
                        "src": "8340:3:18"
                      }
                    ],
                    "functionName": {
                      "name": "abi_decode_available_length_t_string_memory_ptr",
                      "nodeType": "YulIdentifier",
                      "src": "8265:47:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "8265:79:18"
                  },
                  "variableNames": [
                    {
                      "name": "array",
                      "nodeType": "YulIdentifier",
                      "src": "8256:5:18"
                    }
                  ]
                }
              ]
            },
            "name": "abi_decode_t_string_memory_ptr",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "offset",
                "nodeType": "YulTypedName",
                "src": "8050:6:18",
                "type": ""
              },
              {
                "name": "end",
                "nodeType": "YulTypedName",
                "src": "8058:3:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "array",
                "nodeType": "YulTypedName",
                "src": "8066:5:18",
                "type": ""
              }
            ],
            "src": "8010:340:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "8449:561:18",
              "statements": [
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "8495:83:18",
                    "statements": [
                      {
                        "expression": {
                          "arguments": [],
                          "functionName": {
                            "name": "revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b",
                            "nodeType": "YulIdentifier",
                            "src": "8497:77:18"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "8497:79:18"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "8497:79:18"
                      }
                    ]
                  },
                  "condition": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "dataEnd",
                            "nodeType": "YulIdentifier",
                            "src": "8470:7:18"
                          },
                          {
                            "name": "headStart",
                            "nodeType": "YulIdentifier",
                            "src": "8479:9:18"
                          }
                        ],
                        "functionName": {
                          "name": "sub",
                          "nodeType": "YulIdentifier",
                          "src": "8466:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "8466:23:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "8491:2:18",
                        "type": "",
                        "value": "64"
                      }
                    ],
                    "functionName": {
                      "name": "slt",
                      "nodeType": "YulIdentifier",
                      "src": "8462:3:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "8462:32:18"
                  },
                  "nodeType": "YulIf",
                  "src": "8459:119:18"
                },
                {
                  "nodeType": "YulBlock",
                  "src": "8588:117:18",
                  "statements": [
                    {
                      "nodeType": "YulVariableDeclaration",
                      "src": "8603:15:18",
                      "value": {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "8617:1:18",
                        "type": "",
                        "value": "0"
                      },
                      "variables": [
                        {
                          "name": "offset",
                          "nodeType": "YulTypedName",
                          "src": "8607:6:18",
                          "type": ""
                        }
                      ]
                    },
                    {
                      "nodeType": "YulAssignment",
                      "src": "8632:63:18",
                      "value": {
                        "arguments": [
                          {
                            "arguments": [
                              {
                                "name": "headStart",
                                "nodeType": "YulIdentifier",
                                "src": "8667:9:18"
                              },
                              {
                                "name": "offset",
                                "nodeType": "YulIdentifier",
                                "src": "8678:6:18"
                              }
                            ],
                            "functionName": {
                              "name": "add",
                              "nodeType": "YulIdentifier",
                              "src": "8663:3:18"
                            },
                            "nodeType": "YulFunctionCall",
                            "src": "8663:22:18"
                          },
                          {
                            "name": "dataEnd",
                            "nodeType": "YulIdentifier",
                            "src": "8687:7:18"
                          }
                        ],
                        "functionName": {
                          "name": "abi_decode_t_address",
                          "nodeType": "YulIdentifier",
                          "src": "8642:20:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "8642:53:18"
                      },
                      "variableNames": [
                        {
                          "name": "value0",
                          "nodeType": "YulIdentifier",
                          "src": "8632:6:18"
                        }
                      ]
                    }
                  ]
                },
                {
                  "nodeType": "YulBlock",
                  "src": "8715:288:18",
                  "statements": [
                    {
                      "nodeType": "YulVariableDeclaration",
                      "src": "8730:46:18",
                      "value": {
                        "arguments": [
                          {
                            "arguments": [
                              {
                                "name": "headStart",
                                "nodeType": "YulIdentifier",
                                "src": "8761:9:18"
                              },
                              {
                                "kind": "number",
                                "nodeType": "YulLiteral",
                                "src": "8772:2:18",
                                "type": "",
                                "value": "32"
                              }
                            ],
                            "functionName": {
                              "name": "add",
                              "nodeType": "YulIdentifier",
                              "src": "8757:3:18"
                            },
                            "nodeType": "YulFunctionCall",
                            "src": "8757:18:18"
                          }
                        ],
                        "functionName": {
                          "name": "calldataload",
                          "nodeType": "YulIdentifier",
                          "src": "8744:12:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "8744:32:18"
                      },
                      "variables": [
                        {
                          "name": "offset",
                          "nodeType": "YulTypedName",
                          "src": "8734:6:18",
                          "type": ""
                        }
                      ]
                    },
                    {
                      "body": {
                        "nodeType": "YulBlock",
                        "src": "8823:83:18",
                        "statements": [
                          {
                            "expression": {
                              "arguments": [],
                              "functionName": {
                                "name": "revert_error_c1322bf8034eace5e0b5c7295db60986aa89aae5e0ea0873e4689e076861a5db",
                                "nodeType": "YulIdentifier",
                                "src": "8825:77:18"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "8825:79:18"
                            },
                            "nodeType": "YulExpressionStatement",
                            "src": "8825:79:18"
                          }
                        ]
                      },
                      "condition": {
                        "arguments": [
                          {
                            "name": "offset",
                            "nodeType": "YulIdentifier",
                            "src": "8795:6:18"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "8803:18:18",
                            "type": "",
                            "value": "0xffffffffffffffff"
                          }
                        ],
                        "functionName": {
                          "name": "gt",
                          "nodeType": "YulIdentifier",
                          "src": "8792:2:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "8792:30:18"
                      },
                      "nodeType": "YulIf",
                      "src": "8789:117:18"
                    },
                    {
                      "nodeType": "YulAssignment",
                      "src": "8920:73:18",
                      "value": {
                        "arguments": [
                          {
                            "arguments": [
                              {
                                "name": "headStart",
                                "nodeType": "YulIdentifier",
                                "src": "8965:9:18"
                              },
                              {
                                "name": "offset",
                                "nodeType": "YulIdentifier",
                                "src": "8976:6:18"
                              }
                            ],
                            "functionName": {
                              "name": "add",
                              "nodeType": "YulIdentifier",
                              "src": "8961:3:18"
                            },
                            "nodeType": "YulFunctionCall",
                            "src": "8961:22:18"
                          },
                          {
                            "name": "dataEnd",
                            "nodeType": "YulIdentifier",
                            "src": "8985:7:18"
                          }
                        ],
                        "functionName": {
                          "name": "abi_decode_t_string_memory_ptr",
                          "nodeType": "YulIdentifier",
                          "src": "8930:30:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "8930:63:18"
                      },
                      "variableNames": [
                        {
                          "name": "value1",
                          "nodeType": "YulIdentifier",
                          "src": "8920:6:18"
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            "name": "abi_decode_tuple_t_addresst_string_memory_ptr",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "headStart",
                "nodeType": "YulTypedName",
                "src": "8411:9:18",
                "type": ""
              },
              {
                "name": "dataEnd",
                "nodeType": "YulTypedName",
                "src": "8422:7:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "value0",
                "nodeType": "YulTypedName",
                "src": "8434:6:18",
                "type": ""
              },
              {
                "name": "value1",
                "nodeType": "YulTypedName",
                "src": "8442:6:18",
                "type": ""
              }
            ],
            "src": "8356:654:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "9056:76:18",
              "statements": [
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "9110:16:18",
                    "statements": [
                      {
                        "expression": {
                          "arguments": [
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "9119:1:18",
                              "type": "",
                              "value": "0"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "9122:1:18",
                              "type": "",
                              "value": "0"
                            }
                          ],
                          "functionName": {
                            "name": "revert",
                            "nodeType": "YulIdentifier",
                            "src": "9112:6:18"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "9112:12:18"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "9112:12:18"
                      }
                    ]
                  },
                  "condition": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "value",
                            "nodeType": "YulIdentifier",
                            "src": "9079:5:18"
                          },
                          {
                            "arguments": [
                              {
                                "name": "value",
                                "nodeType": "YulIdentifier",
                                "src": "9101:5:18"
                              }
                            ],
                            "functionName": {
                              "name": "cleanup_t_bool",
                              "nodeType": "YulIdentifier",
                              "src": "9086:14:18"
                            },
                            "nodeType": "YulFunctionCall",
                            "src": "9086:21:18"
                          }
                        ],
                        "functionName": {
                          "name": "eq",
                          "nodeType": "YulIdentifier",
                          "src": "9076:2:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "9076:32:18"
                      }
                    ],
                    "functionName": {
                      "name": "iszero",
                      "nodeType": "YulIdentifier",
                      "src": "9069:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "9069:40:18"
                  },
                  "nodeType": "YulIf",
                  "src": "9066:60:18"
                }
              ]
            },
            "name": "validator_revert_t_bool",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "value",
                "nodeType": "YulTypedName",
                "src": "9049:5:18",
                "type": ""
              }
            ],
            "src": "9016:116:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "9187:84:18",
              "statements": [
                {
                  "nodeType": "YulAssignment",
                  "src": "9197:29:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "offset",
                        "nodeType": "YulIdentifier",
                        "src": "9219:6:18"
                      }
                    ],
                    "functionName": {
                      "name": "calldataload",
                      "nodeType": "YulIdentifier",
                      "src": "9206:12:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "9206:20:18"
                  },
                  "variableNames": [
                    {
                      "name": "value",
                      "nodeType": "YulIdentifier",
                      "src": "9197:5:18"
                    }
                  ]
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "name": "value",
                        "nodeType": "YulIdentifier",
                        "src": "9259:5:18"
                      }
                    ],
                    "functionName": {
                      "name": "validator_revert_t_bool",
                      "nodeType": "YulIdentifier",
                      "src": "9235:23:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "9235:30:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "9235:30:18"
                }
              ]
            },
            "name": "abi_decode_t_bool",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "offset",
                "nodeType": "YulTypedName",
                "src": "9165:6:18",
                "type": ""
              },
              {
                "name": "end",
                "nodeType": "YulTypedName",
                "src": "9173:3:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "value",
                "nodeType": "YulTypedName",
                "src": "9181:5:18",
                "type": ""
              }
            ],
            "src": "9138:133:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "9357:388:18",
              "statements": [
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "9403:83:18",
                    "statements": [
                      {
                        "expression": {
                          "arguments": [],
                          "functionName": {
                            "name": "revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b",
                            "nodeType": "YulIdentifier",
                            "src": "9405:77:18"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "9405:79:18"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "9405:79:18"
                      }
                    ]
                  },
                  "condition": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "dataEnd",
                            "nodeType": "YulIdentifier",
                            "src": "9378:7:18"
                          },
                          {
                            "name": "headStart",
                            "nodeType": "YulIdentifier",
                            "src": "9387:9:18"
                          }
                        ],
                        "functionName": {
                          "name": "sub",
                          "nodeType": "YulIdentifier",
                          "src": "9374:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "9374:23:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "9399:2:18",
                        "type": "",
                        "value": "64"
                      }
                    ],
                    "functionName": {
                      "name": "slt",
                      "nodeType": "YulIdentifier",
                      "src": "9370:3:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "9370:32:18"
                  },
                  "nodeType": "YulIf",
                  "src": "9367:119:18"
                },
                {
                  "nodeType": "YulBlock",
                  "src": "9496:117:18",
                  "statements": [
                    {
                      "nodeType": "YulVariableDeclaration",
                      "src": "9511:15:18",
                      "value": {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "9525:1:18",
                        "type": "",
                        "value": "0"
                      },
                      "variables": [
                        {
                          "name": "offset",
                          "nodeType": "YulTypedName",
                          "src": "9515:6:18",
                          "type": ""
                        }
                      ]
                    },
                    {
                      "nodeType": "YulAssignment",
                      "src": "9540:63:18",
                      "value": {
                        "arguments": [
                          {
                            "arguments": [
                              {
                                "name": "headStart",
                                "nodeType": "YulIdentifier",
                                "src": "9575:9:18"
                              },
                              {
                                "name": "offset",
                                "nodeType": "YulIdentifier",
                                "src": "9586:6:18"
                              }
                            ],
                            "functionName": {
                              "name": "add",
                              "nodeType": "YulIdentifier",
                              "src": "9571:3:18"
                            },
                            "nodeType": "YulFunctionCall",
                            "src": "9571:22:18"
                          },
                          {
                            "name": "dataEnd",
                            "nodeType": "YulIdentifier",
                            "src": "9595:7:18"
                          }
                        ],
                        "functionName": {
                          "name": "abi_decode_t_address",
                          "nodeType": "YulIdentifier",
                          "src": "9550:20:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "9550:53:18"
                      },
                      "variableNames": [
                        {
                          "name": "value0",
                          "nodeType": "YulIdentifier",
                          "src": "9540:6:18"
                        }
                      ]
                    }
                  ]
                },
                {
                  "nodeType": "YulBlock",
                  "src": "9623:115:18",
                  "statements": [
                    {
                      "nodeType": "YulVariableDeclaration",
                      "src": "9638:16:18",
                      "value": {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "9652:2:18",
                        "type": "",
                        "value": "32"
                      },
                      "variables": [
                        {
                          "name": "offset",
                          "nodeType": "YulTypedName",
                          "src": "9642:6:18",
                          "type": ""
                        }
                      ]
                    },
                    {
                      "nodeType": "YulAssignment",
                      "src": "9668:60:18",
                      "value": {
                        "arguments": [
                          {
                            "arguments": [
                              {
                                "name": "headStart",
                                "nodeType": "YulIdentifier",
                                "src": "9700:9:18"
                              },
                              {
                                "name": "offset",
                                "nodeType": "YulIdentifier",
                                "src": "9711:6:18"
                              }
                            ],
                            "functionName": {
                              "name": "add",
                              "nodeType": "YulIdentifier",
                              "src": "9696:3:18"
                            },
                            "nodeType": "YulFunctionCall",
                            "src": "9696:22:18"
                          },
                          {
                            "name": "dataEnd",
                            "nodeType": "YulIdentifier",
                            "src": "9720:7:18"
                          }
                        ],
                        "functionName": {
                          "name": "abi_decode_t_bool",
                          "nodeType": "YulIdentifier",
                          "src": "9678:17:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "9678:50:18"
                      },
                      "variableNames": [
                        {
                          "name": "value1",
                          "nodeType": "YulIdentifier",
                          "src": "9668:6:18"
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            "name": "abi_decode_tuple_t_addresst_bool",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "headStart",
                "nodeType": "YulTypedName",
                "src": "9319:9:18",
                "type": ""
              },
              {
                "name": "dataEnd",
                "nodeType": "YulTypedName",
                "src": "9330:7:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "value0",
                "nodeType": "YulTypedName",
                "src": "9342:6:18",
                "type": ""
              },
              {
                "name": "value1",
                "nodeType": "YulTypedName",
                "src": "9350:6:18",
                "type": ""
              }
            ],
            "src": "9277:468:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "9817:241:18",
              "statements": [
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "9922:22:18",
                    "statements": [
                      {
                        "expression": {
                          "arguments": [],
                          "functionName": {
                            "name": "panic_error_0x41",
                            "nodeType": "YulIdentifier",
                            "src": "9924:16:18"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "9924:18:18"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "9924:18:18"
                      }
                    ]
                  },
                  "condition": {
                    "arguments": [
                      {
                        "name": "length",
                        "nodeType": "YulIdentifier",
                        "src": "9894:6:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "9902:18:18",
                        "type": "",
                        "value": "0xffffffffffffffff"
                      }
                    ],
                    "functionName": {
                      "name": "gt",
                      "nodeType": "YulIdentifier",
                      "src": "9891:2:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "9891:30:18"
                  },
                  "nodeType": "YulIf",
                  "src": "9888:56:18"
                },
                {
                  "nodeType": "YulAssignment",
                  "src": "9954:37:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "length",
                        "nodeType": "YulIdentifier",
                        "src": "9984:6:18"
                      }
                    ],
                    "functionName": {
                      "name": "round_up_to_mul_of_32",
                      "nodeType": "YulIdentifier",
                      "src": "9962:21:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "9962:29:18"
                  },
                  "variableNames": [
                    {
                      "name": "size",
                      "nodeType": "YulIdentifier",
                      "src": "9954:4:18"
                    }
                  ]
                },
                {
                  "nodeType": "YulAssignment",
                  "src": "10028:23:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "size",
                        "nodeType": "YulIdentifier",
                        "src": "10040:4:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "10046:4:18",
                        "type": "",
                        "value": "0x20"
                      }
                    ],
                    "functionName": {
                      "name": "add",
                      "nodeType": "YulIdentifier",
                      "src": "10036:3:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "10036:15:18"
                  },
                  "variableNames": [
                    {
                      "name": "size",
                      "nodeType": "YulIdentifier",
                      "src": "10028:4:18"
                    }
                  ]
                }
              ]
            },
            "name": "array_allocation_size_t_bytes_memory_ptr",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "length",
                "nodeType": "YulTypedName",
                "src": "9801:6:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "size",
                "nodeType": "YulTypedName",
                "src": "9812:4:18",
                "type": ""
              }
            ],
            "src": "9751:307:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "10147:327:18",
              "statements": [
                {
                  "nodeType": "YulAssignment",
                  "src": "10157:74:18",
                  "value": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "length",
                            "nodeType": "YulIdentifier",
                            "src": "10223:6:18"
                          }
                        ],
                        "functionName": {
                          "name": "array_allocation_size_t_bytes_memory_ptr",
                          "nodeType": "YulIdentifier",
                          "src": "10182:40:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "10182:48:18"
                      }
                    ],
                    "functionName": {
                      "name": "allocate_memory",
                      "nodeType": "YulIdentifier",
                      "src": "10166:15:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "10166:65:18"
                  },
                  "variableNames": [
                    {
                      "name": "array",
                      "nodeType": "YulIdentifier",
                      "src": "10157:5:18"
                    }
                  ]
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "name": "array",
                        "nodeType": "YulIdentifier",
                        "src": "10247:5:18"
                      },
                      {
                        "name": "length",
                        "nodeType": "YulIdentifier",
                        "src": "10254:6:18"
                      }
                    ],
                    "functionName": {
                      "name": "mstore",
                      "nodeType": "YulIdentifier",
                      "src": "10240:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "10240:21:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "10240:21:18"
                },
                {
                  "nodeType": "YulVariableDeclaration",
                  "src": "10270:27:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "array",
                        "nodeType": "YulIdentifier",
                        "src": "10285:5:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "10292:4:18",
                        "type": "",
                        "value": "0x20"
                      }
                    ],
                    "functionName": {
                      "name": "add",
                      "nodeType": "YulIdentifier",
                      "src": "10281:3:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "10281:16:18"
                  },
                  "variables": [
                    {
                      "name": "dst",
                      "nodeType": "YulTypedName",
                      "src": "10274:3:18",
                      "type": ""
                    }
                  ]
                },
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "10335:83:18",
                    "statements": [
                      {
                        "expression": {
                          "arguments": [],
                          "functionName": {
                            "name": "revert_error_987264b3b1d58a9c7f8255e93e81c77d86d6299019c33110a076957a3e06e2ae",
                            "nodeType": "YulIdentifier",
                            "src": "10337:77:18"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "10337:79:18"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "10337:79:18"
                      }
                    ]
                  },
                  "condition": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "src",
                            "nodeType": "YulIdentifier",
                            "src": "10316:3:18"
                          },
                          {
                            "name": "length",
                            "nodeType": "YulIdentifier",
                            "src": "10321:6:18"
                          }
                        ],
                        "functionName": {
                          "name": "add",
                          "nodeType": "YulIdentifier",
                          "src": "10312:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "10312:16:18"
                      },
                      {
                        "name": "end",
                        "nodeType": "YulIdentifier",
                        "src": "10330:3:18"
                      }
                    ],
                    "functionName": {
                      "name": "gt",
                      "nodeType": "YulIdentifier",
                      "src": "10309:2:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "10309:25:18"
                  },
                  "nodeType": "YulIf",
                  "src": "10306:112:18"
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "name": "src",
                        "nodeType": "YulIdentifier",
                        "src": "10451:3:18"
                      },
                      {
                        "name": "dst",
                        "nodeType": "YulIdentifier",
                        "src": "10456:3:18"
                      },
                      {
                        "name": "length",
                        "nodeType": "YulIdentifier",
                        "src": "10461:6:18"
                      }
                    ],
                    "functionName": {
                      "name": "copy_calldata_to_memory",
                      "nodeType": "YulIdentifier",
                      "src": "10427:23:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "10427:41:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "10427:41:18"
                }
              ]
            },
            "name": "abi_decode_available_length_t_bytes_memory_ptr",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "src",
                "nodeType": "YulTypedName",
                "src": "10120:3:18",
                "type": ""
              },
              {
                "name": "length",
                "nodeType": "YulTypedName",
                "src": "10125:6:18",
                "type": ""
              },
              {
                "name": "end",
                "nodeType": "YulTypedName",
                "src": "10133:3:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "array",
                "nodeType": "YulTypedName",
                "src": "10141:5:18",
                "type": ""
              }
            ],
            "src": "10064:410:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "10554:277:18",
              "statements": [
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "10603:83:18",
                    "statements": [
                      {
                        "expression": {
                          "arguments": [],
                          "functionName": {
                            "name": "revert_error_1b9f4a0a5773e33b91aa01db23bf8c55fce1411167c872835e7fa00a4f17d46d",
                            "nodeType": "YulIdentifier",
                            "src": "10605:77:18"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "10605:79:18"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "10605:79:18"
                      }
                    ]
                  },
                  "condition": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "arguments": [
                              {
                                "name": "offset",
                                "nodeType": "YulIdentifier",
                                "src": "10582:6:18"
                              },
                              {
                                "kind": "number",
                                "nodeType": "YulLiteral",
                                "src": "10590:4:18",
                                "type": "",
                                "value": "0x1f"
                              }
                            ],
                            "functionName": {
                              "name": "add",
                              "nodeType": "YulIdentifier",
                              "src": "10578:3:18"
                            },
                            "nodeType": "YulFunctionCall",
                            "src": "10578:17:18"
                          },
                          {
                            "name": "end",
                            "nodeType": "YulIdentifier",
                            "src": "10597:3:18"
                          }
                        ],
                        "functionName": {
                          "name": "slt",
                          "nodeType": "YulIdentifier",
                          "src": "10574:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "10574:27:18"
                      }
                    ],
                    "functionName": {
                      "name": "iszero",
                      "nodeType": "YulIdentifier",
                      "src": "10567:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "10567:35:18"
                  },
                  "nodeType": "YulIf",
                  "src": "10564:122:18"
                },
                {
                  "nodeType": "YulVariableDeclaration",
                  "src": "10695:34:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "offset",
                        "nodeType": "YulIdentifier",
                        "src": "10722:6:18"
                      }
                    ],
                    "functionName": {
                      "name": "calldataload",
                      "nodeType": "YulIdentifier",
                      "src": "10709:12:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "10709:20:18"
                  },
                  "variables": [
                    {
                      "name": "length",
                      "nodeType": "YulTypedName",
                      "src": "10699:6:18",
                      "type": ""
                    }
                  ]
                },
                {
                  "nodeType": "YulAssignment",
                  "src": "10738:87:18",
                  "value": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "offset",
                            "nodeType": "YulIdentifier",
                            "src": "10798:6:18"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "10806:4:18",
                            "type": "",
                            "value": "0x20"
                          }
                        ],
                        "functionName": {
                          "name": "add",
                          "nodeType": "YulIdentifier",
                          "src": "10794:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "10794:17:18"
                      },
                      {
                        "name": "length",
                        "nodeType": "YulIdentifier",
                        "src": "10813:6:18"
                      },
                      {
                        "name": "end",
                        "nodeType": "YulIdentifier",
                        "src": "10821:3:18"
                      }
                    ],
                    "functionName": {
                      "name": "abi_decode_available_length_t_bytes_memory_ptr",
                      "nodeType": "YulIdentifier",
                      "src": "10747:46:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "10747:78:18"
                  },
                  "variableNames": [
                    {
                      "name": "array",
                      "nodeType": "YulIdentifier",
                      "src": "10738:5:18"
                    }
                  ]
                }
              ]
            },
            "name": "abi_decode_t_bytes_memory_ptr",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "offset",
                "nodeType": "YulTypedName",
                "src": "10532:6:18",
                "type": ""
              },
              {
                "name": "end",
                "nodeType": "YulTypedName",
                "src": "10540:3:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "array",
                "nodeType": "YulTypedName",
                "src": "10548:5:18",
                "type": ""
              }
            ],
            "src": "10493:338:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "10963:817:18",
              "statements": [
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "11010:83:18",
                    "statements": [
                      {
                        "expression": {
                          "arguments": [],
                          "functionName": {
                            "name": "revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b",
                            "nodeType": "YulIdentifier",
                            "src": "11012:77:18"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "11012:79:18"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "11012:79:18"
                      }
                    ]
                  },
                  "condition": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "dataEnd",
                            "nodeType": "YulIdentifier",
                            "src": "10984:7:18"
                          },
                          {
                            "name": "headStart",
                            "nodeType": "YulIdentifier",
                            "src": "10993:9:18"
                          }
                        ],
                        "functionName": {
                          "name": "sub",
                          "nodeType": "YulIdentifier",
                          "src": "10980:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "10980:23:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "11005:3:18",
                        "type": "",
                        "value": "128"
                      }
                    ],
                    "functionName": {
                      "name": "slt",
                      "nodeType": "YulIdentifier",
                      "src": "10976:3:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "10976:33:18"
                  },
                  "nodeType": "YulIf",
                  "src": "10973:120:18"
                },
                {
                  "nodeType": "YulBlock",
                  "src": "11103:117:18",
                  "statements": [
                    {
                      "nodeType": "YulVariableDeclaration",
                      "src": "11118:15:18",
                      "value": {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "11132:1:18",
                        "type": "",
                        "value": "0"
                      },
                      "variables": [
                        {
                          "name": "offset",
                          "nodeType": "YulTypedName",
                          "src": "11122:6:18",
                          "type": ""
                        }
                      ]
                    },
                    {
                      "nodeType": "YulAssignment",
                      "src": "11147:63:18",
                      "value": {
                        "arguments": [
                          {
                            "arguments": [
                              {
                                "name": "headStart",
                                "nodeType": "YulIdentifier",
                                "src": "11182:9:18"
                              },
                              {
                                "name": "offset",
                                "nodeType": "YulIdentifier",
                                "src": "11193:6:18"
                              }
                            ],
                            "functionName": {
                              "name": "add",
                              "nodeType": "YulIdentifier",
                              "src": "11178:3:18"
                            },
                            "nodeType": "YulFunctionCall",
                            "src": "11178:22:18"
                          },
                          {
                            "name": "dataEnd",
                            "nodeType": "YulIdentifier",
                            "src": "11202:7:18"
                          }
                        ],
                        "functionName": {
                          "name": "abi_decode_t_address",
                          "nodeType": "YulIdentifier",
                          "src": "11157:20:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "11157:53:18"
                      },
                      "variableNames": [
                        {
                          "name": "value0",
                          "nodeType": "YulIdentifier",
                          "src": "11147:6:18"
                        }
                      ]
                    }
                  ]
                },
                {
                  "nodeType": "YulBlock",
                  "src": "11230:118:18",
                  "statements": [
                    {
                      "nodeType": "YulVariableDeclaration",
                      "src": "11245:16:18",
                      "value": {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "11259:2:18",
                        "type": "",
                        "value": "32"
                      },
                      "variables": [
                        {
                          "name": "offset",
                          "nodeType": "YulTypedName",
                          "src": "11249:6:18",
                          "type": ""
                        }
                      ]
                    },
                    {
                      "nodeType": "YulAssignment",
                      "src": "11275:63:18",
                      "value": {
                        "arguments": [
                          {
                            "arguments": [
                              {
                                "name": "headStart",
                                "nodeType": "YulIdentifier",
                                "src": "11310:9:18"
                              },
                              {
                                "name": "offset",
                                "nodeType": "YulIdentifier",
                                "src": "11321:6:18"
                              }
                            ],
                            "functionName": {
                              "name": "add",
                              "nodeType": "YulIdentifier",
                              "src": "11306:3:18"
                            },
                            "nodeType": "YulFunctionCall",
                            "src": "11306:22:18"
                          },
                          {
                            "name": "dataEnd",
                            "nodeType": "YulIdentifier",
                            "src": "11330:7:18"
                          }
                        ],
                        "functionName": {
                          "name": "abi_decode_t_address",
                          "nodeType": "YulIdentifier",
                          "src": "11285:20:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "11285:53:18"
                      },
                      "variableNames": [
                        {
                          "name": "value1",
                          "nodeType": "YulIdentifier",
                          "src": "11275:6:18"
                        }
                      ]
                    }
                  ]
                },
                {
                  "nodeType": "YulBlock",
                  "src": "11358:118:18",
                  "statements": [
                    {
                      "nodeType": "YulVariableDeclaration",
                      "src": "11373:16:18",
                      "value": {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "11387:2:18",
                        "type": "",
                        "value": "64"
                      },
                      "variables": [
                        {
                          "name": "offset",
                          "nodeType": "YulTypedName",
                          "src": "11377:6:18",
                          "type": ""
                        }
                      ]
                    },
                    {
                      "nodeType": "YulAssignment",
                      "src": "11403:63:18",
                      "value": {
                        "arguments": [
                          {
                            "arguments": [
                              {
                                "name": "headStart",
                                "nodeType": "YulIdentifier",
                                "src": "11438:9:18"
                              },
                              {
                                "name": "offset",
                                "nodeType": "YulIdentifier",
                                "src": "11449:6:18"
                              }
                            ],
                            "functionName": {
                              "name": "add",
                              "nodeType": "YulIdentifier",
                              "src": "11434:3:18"
                            },
                            "nodeType": "YulFunctionCall",
                            "src": "11434:22:18"
                          },
                          {
                            "name": "dataEnd",
                            "nodeType": "YulIdentifier",
                            "src": "11458:7:18"
                          }
                        ],
                        "functionName": {
                          "name": "abi_decode_t_uint256",
                          "nodeType": "YulIdentifier",
                          "src": "11413:20:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "11413:53:18"
                      },
                      "variableNames": [
                        {
                          "name": "value2",
                          "nodeType": "YulIdentifier",
                          "src": "11403:6:18"
                        }
                      ]
                    }
                  ]
                },
                {
                  "nodeType": "YulBlock",
                  "src": "11486:287:18",
                  "statements": [
                    {
                      "nodeType": "YulVariableDeclaration",
                      "src": "11501:46:18",
                      "value": {
                        "arguments": [
                          {
                            "arguments": [
                              {
                                "name": "headStart",
                                "nodeType": "YulIdentifier",
                                "src": "11532:9:18"
                              },
                              {
                                "kind": "number",
                                "nodeType": "YulLiteral",
                                "src": "11543:2:18",
                                "type": "",
                                "value": "96"
                              }
                            ],
                            "functionName": {
                              "name": "add",
                              "nodeType": "YulIdentifier",
                              "src": "11528:3:18"
                            },
                            "nodeType": "YulFunctionCall",
                            "src": "11528:18:18"
                          }
                        ],
                        "functionName": {
                          "name": "calldataload",
                          "nodeType": "YulIdentifier",
                          "src": "11515:12:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "11515:32:18"
                      },
                      "variables": [
                        {
                          "name": "offset",
                          "nodeType": "YulTypedName",
                          "src": "11505:6:18",
                          "type": ""
                        }
                      ]
                    },
                    {
                      "body": {
                        "nodeType": "YulBlock",
                        "src": "11594:83:18",
                        "statements": [
                          {
                            "expression": {
                              "arguments": [],
                              "functionName": {
                                "name": "revert_error_c1322bf8034eace5e0b5c7295db60986aa89aae5e0ea0873e4689e076861a5db",
                                "nodeType": "YulIdentifier",
                                "src": "11596:77:18"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "11596:79:18"
                            },
                            "nodeType": "YulExpressionStatement",
                            "src": "11596:79:18"
                          }
                        ]
                      },
                      "condition": {
                        "arguments": [
                          {
                            "name": "offset",
                            "nodeType": "YulIdentifier",
                            "src": "11566:6:18"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "11574:18:18",
                            "type": "",
                            "value": "0xffffffffffffffff"
                          }
                        ],
                        "functionName": {
                          "name": "gt",
                          "nodeType": "YulIdentifier",
                          "src": "11563:2:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "11563:30:18"
                      },
                      "nodeType": "YulIf",
                      "src": "11560:117:18"
                    },
                    {
                      "nodeType": "YulAssignment",
                      "src": "11691:72:18",
                      "value": {
                        "arguments": [
                          {
                            "arguments": [
                              {
                                "name": "headStart",
                                "nodeType": "YulIdentifier",
                                "src": "11735:9:18"
                              },
                              {
                                "name": "offset",
                                "nodeType": "YulIdentifier",
                                "src": "11746:6:18"
                              }
                            ],
                            "functionName": {
                              "name": "add",
                              "nodeType": "YulIdentifier",
                              "src": "11731:3:18"
                            },
                            "nodeType": "YulFunctionCall",
                            "src": "11731:22:18"
                          },
                          {
                            "name": "dataEnd",
                            "nodeType": "YulIdentifier",
                            "src": "11755:7:18"
                          }
                        ],
                        "functionName": {
                          "name": "abi_decode_t_bytes_memory_ptr",
                          "nodeType": "YulIdentifier",
                          "src": "11701:29:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "11701:62:18"
                      },
                      "variableNames": [
                        {
                          "name": "value3",
                          "nodeType": "YulIdentifier",
                          "src": "11691:6:18"
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            "name": "abi_decode_tuple_t_addresst_addresst_uint256t_bytes_memory_ptr",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "headStart",
                "nodeType": "YulTypedName",
                "src": "10909:9:18",
                "type": ""
              },
              {
                "name": "dataEnd",
                "nodeType": "YulTypedName",
                "src": "10920:7:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "value0",
                "nodeType": "YulTypedName",
                "src": "10932:6:18",
                "type": ""
              },
              {
                "name": "value1",
                "nodeType": "YulTypedName",
                "src": "10940:6:18",
                "type": ""
              },
              {
                "name": "value2",
                "nodeType": "YulTypedName",
                "src": "10948:6:18",
                "type": ""
              },
              {
                "name": "value3",
                "nodeType": "YulTypedName",
                "src": "10956:6:18",
                "type": ""
              }
            ],
            "src": "10837:943:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "11869:391:18",
              "statements": [
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "11915:83:18",
                    "statements": [
                      {
                        "expression": {
                          "arguments": [],
                          "functionName": {
                            "name": "revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b",
                            "nodeType": "YulIdentifier",
                            "src": "11917:77:18"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "11917:79:18"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "11917:79:18"
                      }
                    ]
                  },
                  "condition": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "dataEnd",
                            "nodeType": "YulIdentifier",
                            "src": "11890:7:18"
                          },
                          {
                            "name": "headStart",
                            "nodeType": "YulIdentifier",
                            "src": "11899:9:18"
                          }
                        ],
                        "functionName": {
                          "name": "sub",
                          "nodeType": "YulIdentifier",
                          "src": "11886:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "11886:23:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "11911:2:18",
                        "type": "",
                        "value": "64"
                      }
                    ],
                    "functionName": {
                      "name": "slt",
                      "nodeType": "YulIdentifier",
                      "src": "11882:3:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "11882:32:18"
                  },
                  "nodeType": "YulIf",
                  "src": "11879:119:18"
                },
                {
                  "nodeType": "YulBlock",
                  "src": "12008:117:18",
                  "statements": [
                    {
                      "nodeType": "YulVariableDeclaration",
                      "src": "12023:15:18",
                      "value": {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "12037:1:18",
                        "type": "",
                        "value": "0"
                      },
                      "variables": [
                        {
                          "name": "offset",
                          "nodeType": "YulTypedName",
                          "src": "12027:6:18",
                          "type": ""
                        }
                      ]
                    },
                    {
                      "nodeType": "YulAssignment",
                      "src": "12052:63:18",
                      "value": {
                        "arguments": [
                          {
                            "arguments": [
                              {
                                "name": "headStart",
                                "nodeType": "YulIdentifier",
                                "src": "12087:9:18"
                              },
                              {
                                "name": "offset",
                                "nodeType": "YulIdentifier",
                                "src": "12098:6:18"
                              }
                            ],
                            "functionName": {
                              "name": "add",
                              "nodeType": "YulIdentifier",
                              "src": "12083:3:18"
                            },
                            "nodeType": "YulFunctionCall",
                            "src": "12083:22:18"
                          },
                          {
                            "name": "dataEnd",
                            "nodeType": "YulIdentifier",
                            "src": "12107:7:18"
                          }
                        ],
                        "functionName": {
                          "name": "abi_decode_t_address",
                          "nodeType": "YulIdentifier",
                          "src": "12062:20:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "12062:53:18"
                      },
                      "variableNames": [
                        {
                          "name": "value0",
                          "nodeType": "YulIdentifier",
                          "src": "12052:6:18"
                        }
                      ]
                    }
                  ]
                },
                {
                  "nodeType": "YulBlock",
                  "src": "12135:118:18",
                  "statements": [
                    {
                      "nodeType": "YulVariableDeclaration",
                      "src": "12150:16:18",
                      "value": {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "12164:2:18",
                        "type": "",
                        "value": "32"
                      },
                      "variables": [
                        {
                          "name": "offset",
                          "nodeType": "YulTypedName",
                          "src": "12154:6:18",
                          "type": ""
                        }
                      ]
                    },
                    {
                      "nodeType": "YulAssignment",
                      "src": "12180:63:18",
                      "value": {
                        "arguments": [
                          {
                            "arguments": [
                              {
                                "name": "headStart",
                                "nodeType": "YulIdentifier",
                                "src": "12215:9:18"
                              },
                              {
                                "name": "offset",
                                "nodeType": "YulIdentifier",
                                "src": "12226:6:18"
                              }
                            ],
                            "functionName": {
                              "name": "add",
                              "nodeType": "YulIdentifier",
                              "src": "12211:3:18"
                            },
                            "nodeType": "YulFunctionCall",
                            "src": "12211:22:18"
                          },
                          {
                            "name": "dataEnd",
                            "nodeType": "YulIdentifier",
                            "src": "12235:7:18"
                          }
                        ],
                        "functionName": {
                          "name": "abi_decode_t_address",
                          "nodeType": "YulIdentifier",
                          "src": "12190:20:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "12190:53:18"
                      },
                      "variableNames": [
                        {
                          "name": "value1",
                          "nodeType": "YulIdentifier",
                          "src": "12180:6:18"
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            "name": "abi_decode_tuple_t_addresst_address",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "headStart",
                "nodeType": "YulTypedName",
                "src": "11831:9:18",
                "type": ""
              },
              {
                "name": "dataEnd",
                "nodeType": "YulTypedName",
                "src": "11842:7:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "value0",
                "nodeType": "YulTypedName",
                "src": "11854:6:18",
                "type": ""
              },
              {
                "name": "value1",
                "nodeType": "YulTypedName",
                "src": "11862:6:18",
                "type": ""
              }
            ],
            "src": "11786:474:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "12294:152:18",
              "statements": [
                {
                  "expression": {
                    "arguments": [
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "12311:1:18",
                        "type": "",
                        "value": "0"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "12314:77:18",
                        "type": "",
                        "value": "35408467139433450592217433187231851964531694900788300625387963629091585785856"
                      }
                    ],
                    "functionName": {
                      "name": "mstore",
                      "nodeType": "YulIdentifier",
                      "src": "12304:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "12304:88:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "12304:88:18"
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "12408:1:18",
                        "type": "",
                        "value": "4"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "12411:4:18",
                        "type": "",
                        "value": "0x22"
                      }
                    ],
                    "functionName": {
                      "name": "mstore",
                      "nodeType": "YulIdentifier",
                      "src": "12401:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "12401:15:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "12401:15:18"
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "12432:1:18",
                        "type": "",
                        "value": "0"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "12435:4:18",
                        "type": "",
                        "value": "0x24"
                      }
                    ],
                    "functionName": {
                      "name": "revert",
                      "nodeType": "YulIdentifier",
                      "src": "12425:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "12425:15:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "12425:15:18"
                }
              ]
            },
            "name": "panic_error_0x22",
            "nodeType": "YulFunctionDefinition",
            "src": "12266:180:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "12503:269:18",
              "statements": [
                {
                  "nodeType": "YulAssignment",
                  "src": "12513:22:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "data",
                        "nodeType": "YulIdentifier",
                        "src": "12527:4:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "12533:1:18",
                        "type": "",
                        "value": "2"
                      }
                    ],
                    "functionName": {
                      "name": "div",
                      "nodeType": "YulIdentifier",
                      "src": "12523:3:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "12523:12:18"
                  },
                  "variableNames": [
                    {
                      "name": "length",
                      "nodeType": "YulIdentifier",
                      "src": "12513:6:18"
                    }
                  ]
                },
                {
                  "nodeType": "YulVariableDeclaration",
                  "src": "12544:38:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "data",
                        "nodeType": "YulIdentifier",
                        "src": "12574:4:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "12580:1:18",
                        "type": "",
                        "value": "1"
                      }
                    ],
                    "functionName": {
                      "name": "and",
                      "nodeType": "YulIdentifier",
                      "src": "12570:3:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "12570:12:18"
                  },
                  "variables": [
                    {
                      "name": "outOfPlaceEncoding",
                      "nodeType": "YulTypedName",
                      "src": "12548:18:18",
                      "type": ""
                    }
                  ]
                },
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "12621:51:18",
                    "statements": [
                      {
                        "nodeType": "YulAssignment",
                        "src": "12635:27:18",
                        "value": {
                          "arguments": [
                            {
                              "name": "length",
                              "nodeType": "YulIdentifier",
                              "src": "12649:6:18"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "12657:4:18",
                              "type": "",
                              "value": "0x7f"
                            }
                          ],
                          "functionName": {
                            "name": "and",
                            "nodeType": "YulIdentifier",
                            "src": "12645:3:18"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "12645:17:18"
                        },
                        "variableNames": [
                          {
                            "name": "length",
                            "nodeType": "YulIdentifier",
                            "src": "12635:6:18"
                          }
                        ]
                      }
                    ]
                  },
                  "condition": {
                    "arguments": [
                      {
                        "name": "outOfPlaceEncoding",
                        "nodeType": "YulIdentifier",
                        "src": "12601:18:18"
                      }
                    ],
                    "functionName": {
                      "name": "iszero",
                      "nodeType": "YulIdentifier",
                      "src": "12594:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "12594:26:18"
                  },
                  "nodeType": "YulIf",
                  "src": "12591:81:18"
                },
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "12724:42:18",
                    "statements": [
                      {
                        "expression": {
                          "arguments": [],
                          "functionName": {
                            "name": "panic_error_0x22",
                            "nodeType": "YulIdentifier",
                            "src": "12738:16:18"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "12738:18:18"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "12738:18:18"
                      }
                    ]
                  },
                  "condition": {
                    "arguments": [
                      {
                        "name": "outOfPlaceEncoding",
                        "nodeType": "YulIdentifier",
                        "src": "12688:18:18"
                      },
                      {
                        "arguments": [
                          {
                            "name": "length",
                            "nodeType": "YulIdentifier",
                            "src": "12711:6:18"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "12719:2:18",
                            "type": "",
                            "value": "32"
                          }
                        ],
                        "functionName": {
                          "name": "lt",
                          "nodeType": "YulIdentifier",
                          "src": "12708:2:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "12708:14:18"
                      }
                    ],
                    "functionName": {
                      "name": "eq",
                      "nodeType": "YulIdentifier",
                      "src": "12685:2:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "12685:38:18"
                  },
                  "nodeType": "YulIf",
                  "src": "12682:84:18"
                }
              ]
            },
            "name": "extract_byte_array_length",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "data",
                "nodeType": "YulTypedName",
                "src": "12487:4:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "length",
                "nodeType": "YulTypedName",
                "src": "12496:6:18",
                "type": ""
              }
            ],
            "src": "12452:320:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "12884:114:18",
              "statements": [
                {
                  "expression": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "memPtr",
                            "nodeType": "YulIdentifier",
                            "src": "12906:6:18"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "12914:1:18",
                            "type": "",
                            "value": "0"
                          }
                        ],
                        "functionName": {
                          "name": "add",
                          "nodeType": "YulIdentifier",
                          "src": "12902:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "12902:14:18"
                      },
                      {
                        "hexValue": "4552433732313a20617070726f76616c20746f2063757272656e74206f776e65",
                        "kind": "string",
                        "nodeType": "YulLiteral",
                        "src": "12918:34:18",
                        "type": "",
                        "value": "ERC721: approval to current owne"
                      }
                    ],
                    "functionName": {
                      "name": "mstore",
                      "nodeType": "YulIdentifier",
                      "src": "12895:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "12895:58:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "12895:58:18"
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "memPtr",
                            "nodeType": "YulIdentifier",
                            "src": "12974:6:18"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "12982:2:18",
                            "type": "",
                            "value": "32"
                          }
                        ],
                        "functionName": {
                          "name": "add",
                          "nodeType": "YulIdentifier",
                          "src": "12970:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "12970:15:18"
                      },
                      {
                        "hexValue": "72",
                        "kind": "string",
                        "nodeType": "YulLiteral",
                        "src": "12987:3:18",
                        "type": "",
                        "value": "r"
                      }
                    ],
                    "functionName": {
                      "name": "mstore",
                      "nodeType": "YulIdentifier",
                      "src": "12963:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "12963:28:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "12963:28:18"
                }
              ]
            },
            "name": "store_literal_in_memory_b51b4875eede07862961e8f9365c6749f5fe55c6ee5d7a9e42b6912ad0b15942",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "memPtr",
                "nodeType": "YulTypedName",
                "src": "12876:6:18",
                "type": ""
              }
            ],
            "src": "12778:220:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "13150:220:18",
              "statements": [
                {
                  "nodeType": "YulAssignment",
                  "src": "13160:74:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "pos",
                        "nodeType": "YulIdentifier",
                        "src": "13226:3:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "13231:2:18",
                        "type": "",
                        "value": "33"
                      }
                    ],
                    "functionName": {
                      "name": "array_storeLengthForEncoding_t_string_memory_ptr_fromStack",
                      "nodeType": "YulIdentifier",
                      "src": "13167:58:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "13167:67:18"
                  },
                  "variableNames": [
                    {
                      "name": "pos",
                      "nodeType": "YulIdentifier",
                      "src": "13160:3:18"
                    }
                  ]
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "name": "pos",
                        "nodeType": "YulIdentifier",
                        "src": "13332:3:18"
                      }
                    ],
                    "functionName": {
                      "name": "store_literal_in_memory_b51b4875eede07862961e8f9365c6749f5fe55c6ee5d7a9e42b6912ad0b15942",
                      "nodeType": "YulIdentifier",
                      "src": "13243:88:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "13243:93:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "13243:93:18"
                },
                {
                  "nodeType": "YulAssignment",
                  "src": "13345:19:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "pos",
                        "nodeType": "YulIdentifier",
                        "src": "13356:3:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "13361:2:18",
                        "type": "",
                        "value": "64"
                      }
                    ],
                    "functionName": {
                      "name": "add",
                      "nodeType": "YulIdentifier",
                      "src": "13352:3:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "13352:12:18"
                  },
                  "variableNames": [
                    {
                      "name": "end",
                      "nodeType": "YulIdentifier",
                      "src": "13345:3:18"
                    }
                  ]
                }
              ]
            },
            "name": "abi_encode_t_stringliteral_b51b4875eede07862961e8f9365c6749f5fe55c6ee5d7a9e42b6912ad0b15942_to_t_string_memory_ptr_fromStack",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "pos",
                "nodeType": "YulTypedName",
                "src": "13138:3:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "end",
                "nodeType": "YulTypedName",
                "src": "13146:3:18",
                "type": ""
              }
            ],
            "src": "13004:366:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "13547:248:18",
              "statements": [
                {
                  "nodeType": "YulAssignment",
                  "src": "13557:26:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "headStart",
                        "nodeType": "YulIdentifier",
                        "src": "13569:9:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "13580:2:18",
                        "type": "",
                        "value": "32"
                      }
                    ],
                    "functionName": {
                      "name": "add",
                      "nodeType": "YulIdentifier",
                      "src": "13565:3:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "13565:18:18"
                  },
                  "variableNames": [
                    {
                      "name": "tail",
                      "nodeType": "YulIdentifier",
                      "src": "13557:4:18"
                    }
                  ]
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "headStart",
                            "nodeType": "YulIdentifier",
                            "src": "13604:9:18"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "13615:1:18",
                            "type": "",
                            "value": "0"
                          }
                        ],
                        "functionName": {
                          "name": "add",
                          "nodeType": "YulIdentifier",
                          "src": "13600:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "13600:17:18"
                      },
                      {
                        "arguments": [
                          {
                            "name": "tail",
                            "nodeType": "YulIdentifier",
                            "src": "13623:4:18"
                          },
                          {
                            "name": "headStart",
                            "nodeType": "YulIdentifier",
                            "src": "13629:9:18"
                          }
                        ],
                        "functionName": {
                          "name": "sub",
                          "nodeType": "YulIdentifier",
                          "src": "13619:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "13619:20:18"
                      }
                    ],
                    "functionName": {
                      "name": "mstore",
                      "nodeType": "YulIdentifier",
                      "src": "13593:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "13593:47:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "13593:47:18"
                },
                {
                  "nodeType": "YulAssignment",
                  "src": "13649:139:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "tail",
                        "nodeType": "YulIdentifier",
                        "src": "13783:4:18"
                      }
                    ],
                    "functionName": {
                      "name": "abi_encode_t_stringliteral_b51b4875eede07862961e8f9365c6749f5fe55c6ee5d7a9e42b6912ad0b15942_to_t_string_memory_ptr_fromStack",
                      "nodeType": "YulIdentifier",
                      "src": "13657:124:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "13657:131:18"
                  },
                  "variableNames": [
                    {
                      "name": "tail",
                      "nodeType": "YulIdentifier",
                      "src": "13649:4:18"
                    }
                  ]
                }
              ]
            },
            "name": "abi_encode_tuple_t_stringliteral_b51b4875eede07862961e8f9365c6749f5fe55c6ee5d7a9e42b6912ad0b15942__to_t_string_memory_ptr__fromStack_reversed",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "headStart",
                "nodeType": "YulTypedName",
                "src": "13527:9:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "tail",
                "nodeType": "YulTypedName",
                "src": "13542:4:18",
                "type": ""
              }
            ],
            "src": "13376:419:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "13907:137:18",
              "statements": [
                {
                  "expression": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "memPtr",
                            "nodeType": "YulIdentifier",
                            "src": "13929:6:18"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "13937:1:18",
                            "type": "",
                            "value": "0"
                          }
                        ],
                        "functionName": {
                          "name": "add",
                          "nodeType": "YulIdentifier",
                          "src": "13925:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "13925:14:18"
                      },
                      {
                        "hexValue": "4552433732313a20617070726f76652063616c6c6572206973206e6f74206f77",
                        "kind": "string",
                        "nodeType": "YulLiteral",
                        "src": "13941:34:18",
                        "type": "",
                        "value": "ERC721: approve caller is not ow"
                      }
                    ],
                    "functionName": {
                      "name": "mstore",
                      "nodeType": "YulIdentifier",
                      "src": "13918:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "13918:58:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "13918:58:18"
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "memPtr",
                            "nodeType": "YulIdentifier",
                            "src": "13997:6:18"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "14005:2:18",
                            "type": "",
                            "value": "32"
                          }
                        ],
                        "functionName": {
                          "name": "add",
                          "nodeType": "YulIdentifier",
                          "src": "13993:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "13993:15:18"
                      },
                      {
                        "hexValue": "6e6572206e6f7220617070726f76656420666f7220616c6c",
                        "kind": "string",
                        "nodeType": "YulLiteral",
                        "src": "14010:26:18",
                        "type": "",
                        "value": "ner nor approved for all"
                      }
                    ],
                    "functionName": {
                      "name": "mstore",
                      "nodeType": "YulIdentifier",
                      "src": "13986:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "13986:51:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "13986:51:18"
                }
              ]
            },
            "name": "store_literal_in_memory_6d83cef3e0cb19b8320a9c5feb26b56bbb08f152a8e61b12eca3302d8d68b23d",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "memPtr",
                "nodeType": "YulTypedName",
                "src": "13899:6:18",
                "type": ""
              }
            ],
            "src": "13801:243:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "14196:220:18",
              "statements": [
                {
                  "nodeType": "YulAssignment",
                  "src": "14206:74:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "pos",
                        "nodeType": "YulIdentifier",
                        "src": "14272:3:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "14277:2:18",
                        "type": "",
                        "value": "56"
                      }
                    ],
                    "functionName": {
                      "name": "array_storeLengthForEncoding_t_string_memory_ptr_fromStack",
                      "nodeType": "YulIdentifier",
                      "src": "14213:58:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "14213:67:18"
                  },
                  "variableNames": [
                    {
                      "name": "pos",
                      "nodeType": "YulIdentifier",
                      "src": "14206:3:18"
                    }
                  ]
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "name": "pos",
                        "nodeType": "YulIdentifier",
                        "src": "14378:3:18"
                      }
                    ],
                    "functionName": {
                      "name": "store_literal_in_memory_6d83cef3e0cb19b8320a9c5feb26b56bbb08f152a8e61b12eca3302d8d68b23d",
                      "nodeType": "YulIdentifier",
                      "src": "14289:88:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "14289:93:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "14289:93:18"
                },
                {
                  "nodeType": "YulAssignment",
                  "src": "14391:19:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "pos",
                        "nodeType": "YulIdentifier",
                        "src": "14402:3:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "14407:2:18",
                        "type": "",
                        "value": "64"
                      }
                    ],
                    "functionName": {
                      "name": "add",
                      "nodeType": "YulIdentifier",
                      "src": "14398:3:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "14398:12:18"
                  },
                  "variableNames": [
                    {
                      "name": "end",
                      "nodeType": "YulIdentifier",
                      "src": "14391:3:18"
                    }
                  ]
                }
              ]
            },
            "name": "abi_encode_t_stringliteral_6d83cef3e0cb19b8320a9c5feb26b56bbb08f152a8e61b12eca3302d8d68b23d_to_t_string_memory_ptr_fromStack",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "pos",
                "nodeType": "YulTypedName",
                "src": "14184:3:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "end",
                "nodeType": "YulTypedName",
                "src": "14192:3:18",
                "type": ""
              }
            ],
            "src": "14050:366:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "14593:248:18",
              "statements": [
                {
                  "nodeType": "YulAssignment",
                  "src": "14603:26:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "headStart",
                        "nodeType": "YulIdentifier",
                        "src": "14615:9:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "14626:2:18",
                        "type": "",
                        "value": "32"
                      }
                    ],
                    "functionName": {
                      "name": "add",
                      "nodeType": "YulIdentifier",
                      "src": "14611:3:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "14611:18:18"
                  },
                  "variableNames": [
                    {
                      "name": "tail",
                      "nodeType": "YulIdentifier",
                      "src": "14603:4:18"
                    }
                  ]
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "headStart",
                            "nodeType": "YulIdentifier",
                            "src": "14650:9:18"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "14661:1:18",
                            "type": "",
                            "value": "0"
                          }
                        ],
                        "functionName": {
                          "name": "add",
                          "nodeType": "YulIdentifier",
                          "src": "14646:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "14646:17:18"
                      },
                      {
                        "arguments": [
                          {
                            "name": "tail",
                            "nodeType": "YulIdentifier",
                            "src": "14669:4:18"
                          },
                          {
                            "name": "headStart",
                            "nodeType": "YulIdentifier",
                            "src": "14675:9:18"
                          }
                        ],
                        "functionName": {
                          "name": "sub",
                          "nodeType": "YulIdentifier",
                          "src": "14665:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "14665:20:18"
                      }
                    ],
                    "functionName": {
                      "name": "mstore",
                      "nodeType": "YulIdentifier",
                      "src": "14639:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "14639:47:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "14639:47:18"
                },
                {
                  "nodeType": "YulAssignment",
                  "src": "14695:139:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "tail",
                        "nodeType": "YulIdentifier",
                        "src": "14829:4:18"
                      }
                    ],
                    "functionName": {
                      "name": "abi_encode_t_stringliteral_6d83cef3e0cb19b8320a9c5feb26b56bbb08f152a8e61b12eca3302d8d68b23d_to_t_string_memory_ptr_fromStack",
                      "nodeType": "YulIdentifier",
                      "src": "14703:124:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "14703:131:18"
                  },
                  "variableNames": [
                    {
                      "name": "tail",
                      "nodeType": "YulIdentifier",
                      "src": "14695:4:18"
                    }
                  ]
                }
              ]
            },
            "name": "abi_encode_tuple_t_stringliteral_6d83cef3e0cb19b8320a9c5feb26b56bbb08f152a8e61b12eca3302d8d68b23d__to_t_string_memory_ptr__fromStack_reversed",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "headStart",
                "nodeType": "YulTypedName",
                "src": "14573:9:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "tail",
                "nodeType": "YulTypedName",
                "src": "14588:4:18",
                "type": ""
              }
            ],
            "src": "14422:419:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "14953:130:18",
              "statements": [
                {
                  "expression": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "memPtr",
                            "nodeType": "YulIdentifier",
                            "src": "14975:6:18"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "14983:1:18",
                            "type": "",
                            "value": "0"
                          }
                        ],
                        "functionName": {
                          "name": "add",
                          "nodeType": "YulIdentifier",
                          "src": "14971:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "14971:14:18"
                      },
                      {
                        "hexValue": "4552433732313a207472616e736665722063616c6c6572206973206e6f74206f",
                        "kind": "string",
                        "nodeType": "YulLiteral",
                        "src": "14987:34:18",
                        "type": "",
                        "value": "ERC721: transfer caller is not o"
                      }
                    ],
                    "functionName": {
                      "name": "mstore",
                      "nodeType": "YulIdentifier",
                      "src": "14964:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "14964:58:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "14964:58:18"
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "memPtr",
                            "nodeType": "YulIdentifier",
                            "src": "15043:6:18"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "15051:2:18",
                            "type": "",
                            "value": "32"
                          }
                        ],
                        "functionName": {
                          "name": "add",
                          "nodeType": "YulIdentifier",
                          "src": "15039:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "15039:15:18"
                      },
                      {
                        "hexValue": "776e6572206e6f7220617070726f766564",
                        "kind": "string",
                        "nodeType": "YulLiteral",
                        "src": "15056:19:18",
                        "type": "",
                        "value": "wner nor approved"
                      }
                    ],
                    "functionName": {
                      "name": "mstore",
                      "nodeType": "YulIdentifier",
                      "src": "15032:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "15032:44:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "15032:44:18"
                }
              ]
            },
            "name": "store_literal_in_memory_c8682f3ad98807db59a6ec6bb812b72fed0a66e3150fa8239699ee83885247f2",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "memPtr",
                "nodeType": "YulTypedName",
                "src": "14945:6:18",
                "type": ""
              }
            ],
            "src": "14847:236:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "15235:220:18",
              "statements": [
                {
                  "nodeType": "YulAssignment",
                  "src": "15245:74:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "pos",
                        "nodeType": "YulIdentifier",
                        "src": "15311:3:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "15316:2:18",
                        "type": "",
                        "value": "49"
                      }
                    ],
                    "functionName": {
                      "name": "array_storeLengthForEncoding_t_string_memory_ptr_fromStack",
                      "nodeType": "YulIdentifier",
                      "src": "15252:58:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "15252:67:18"
                  },
                  "variableNames": [
                    {
                      "name": "pos",
                      "nodeType": "YulIdentifier",
                      "src": "15245:3:18"
                    }
                  ]
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "name": "pos",
                        "nodeType": "YulIdentifier",
                        "src": "15417:3:18"
                      }
                    ],
                    "functionName": {
                      "name": "store_literal_in_memory_c8682f3ad98807db59a6ec6bb812b72fed0a66e3150fa8239699ee83885247f2",
                      "nodeType": "YulIdentifier",
                      "src": "15328:88:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "15328:93:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "15328:93:18"
                },
                {
                  "nodeType": "YulAssignment",
                  "src": "15430:19:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "pos",
                        "nodeType": "YulIdentifier",
                        "src": "15441:3:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "15446:2:18",
                        "type": "",
                        "value": "64"
                      }
                    ],
                    "functionName": {
                      "name": "add",
                      "nodeType": "YulIdentifier",
                      "src": "15437:3:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "15437:12:18"
                  },
                  "variableNames": [
                    {
                      "name": "end",
                      "nodeType": "YulIdentifier",
                      "src": "15430:3:18"
                    }
                  ]
                }
              ]
            },
            "name": "abi_encode_t_stringliteral_c8682f3ad98807db59a6ec6bb812b72fed0a66e3150fa8239699ee83885247f2_to_t_string_memory_ptr_fromStack",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "pos",
                "nodeType": "YulTypedName",
                "src": "15223:3:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "end",
                "nodeType": "YulTypedName",
                "src": "15231:3:18",
                "type": ""
              }
            ],
            "src": "15089:366:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "15632:248:18",
              "statements": [
                {
                  "nodeType": "YulAssignment",
                  "src": "15642:26:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "headStart",
                        "nodeType": "YulIdentifier",
                        "src": "15654:9:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "15665:2:18",
                        "type": "",
                        "value": "32"
                      }
                    ],
                    "functionName": {
                      "name": "add",
                      "nodeType": "YulIdentifier",
                      "src": "15650:3:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "15650:18:18"
                  },
                  "variableNames": [
                    {
                      "name": "tail",
                      "nodeType": "YulIdentifier",
                      "src": "15642:4:18"
                    }
                  ]
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "headStart",
                            "nodeType": "YulIdentifier",
                            "src": "15689:9:18"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "15700:1:18",
                            "type": "",
                            "value": "0"
                          }
                        ],
                        "functionName": {
                          "name": "add",
                          "nodeType": "YulIdentifier",
                          "src": "15685:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "15685:17:18"
                      },
                      {
                        "arguments": [
                          {
                            "name": "tail",
                            "nodeType": "YulIdentifier",
                            "src": "15708:4:18"
                          },
                          {
                            "name": "headStart",
                            "nodeType": "YulIdentifier",
                            "src": "15714:9:18"
                          }
                        ],
                        "functionName": {
                          "name": "sub",
                          "nodeType": "YulIdentifier",
                          "src": "15704:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "15704:20:18"
                      }
                    ],
                    "functionName": {
                      "name": "mstore",
                      "nodeType": "YulIdentifier",
                      "src": "15678:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "15678:47:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "15678:47:18"
                },
                {
                  "nodeType": "YulAssignment",
                  "src": "15734:139:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "tail",
                        "nodeType": "YulIdentifier",
                        "src": "15868:4:18"
                      }
                    ],
                    "functionName": {
                      "name": "abi_encode_t_stringliteral_c8682f3ad98807db59a6ec6bb812b72fed0a66e3150fa8239699ee83885247f2_to_t_string_memory_ptr_fromStack",
                      "nodeType": "YulIdentifier",
                      "src": "15742:124:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "15742:131:18"
                  },
                  "variableNames": [
                    {
                      "name": "tail",
                      "nodeType": "YulIdentifier",
                      "src": "15734:4:18"
                    }
                  ]
                }
              ]
            },
            "name": "abi_encode_tuple_t_stringliteral_c8682f3ad98807db59a6ec6bb812b72fed0a66e3150fa8239699ee83885247f2__to_t_string_memory_ptr__fromStack_reversed",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "headStart",
                "nodeType": "YulTypedName",
                "src": "15612:9:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "tail",
                "nodeType": "YulTypedName",
                "src": "15627:4:18",
                "type": ""
              }
            ],
            "src": "15461:419:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "15992:122:18",
              "statements": [
                {
                  "expression": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "memPtr",
                            "nodeType": "YulIdentifier",
                            "src": "16014:6:18"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "16022:1:18",
                            "type": "",
                            "value": "0"
                          }
                        ],
                        "functionName": {
                          "name": "add",
                          "nodeType": "YulIdentifier",
                          "src": "16010:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "16010:14:18"
                      },
                      {
                        "hexValue": "4552433732313a206f776e657220717565727920666f72206e6f6e6578697374",
                        "kind": "string",
                        "nodeType": "YulLiteral",
                        "src": "16026:34:18",
                        "type": "",
                        "value": "ERC721: owner query for nonexist"
                      }
                    ],
                    "functionName": {
                      "name": "mstore",
                      "nodeType": "YulIdentifier",
                      "src": "16003:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "16003:58:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "16003:58:18"
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "memPtr",
                            "nodeType": "YulIdentifier",
                            "src": "16082:6:18"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "16090:2:18",
                            "type": "",
                            "value": "32"
                          }
                        ],
                        "functionName": {
                          "name": "add",
                          "nodeType": "YulIdentifier",
                          "src": "16078:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "16078:15:18"
                      },
                      {
                        "hexValue": "656e7420746f6b656e",
                        "kind": "string",
                        "nodeType": "YulLiteral",
                        "src": "16095:11:18",
                        "type": "",
                        "value": "ent token"
                      }
                    ],
                    "functionName": {
                      "name": "mstore",
                      "nodeType": "YulIdentifier",
                      "src": "16071:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "16071:36:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "16071:36:18"
                }
              ]
            },
            "name": "store_literal_in_memory_7481f3df2a424c0755a1ad2356614e9a5a358d461ea2eae1f89cb21cbad00397",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "memPtr",
                "nodeType": "YulTypedName",
                "src": "15984:6:18",
                "type": ""
              }
            ],
            "src": "15886:228:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "16266:220:18",
              "statements": [
                {
                  "nodeType": "YulAssignment",
                  "src": "16276:74:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "pos",
                        "nodeType": "YulIdentifier",
                        "src": "16342:3:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "16347:2:18",
                        "type": "",
                        "value": "41"
                      }
                    ],
                    "functionName": {
                      "name": "array_storeLengthForEncoding_t_string_memory_ptr_fromStack",
                      "nodeType": "YulIdentifier",
                      "src": "16283:58:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "16283:67:18"
                  },
                  "variableNames": [
                    {
                      "name": "pos",
                      "nodeType": "YulIdentifier",
                      "src": "16276:3:18"
                    }
                  ]
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "name": "pos",
                        "nodeType": "YulIdentifier",
                        "src": "16448:3:18"
                      }
                    ],
                    "functionName": {
                      "name": "store_literal_in_memory_7481f3df2a424c0755a1ad2356614e9a5a358d461ea2eae1f89cb21cbad00397",
                      "nodeType": "YulIdentifier",
                      "src": "16359:88:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "16359:93:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "16359:93:18"
                },
                {
                  "nodeType": "YulAssignment",
                  "src": "16461:19:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "pos",
                        "nodeType": "YulIdentifier",
                        "src": "16472:3:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "16477:2:18",
                        "type": "",
                        "value": "64"
                      }
                    ],
                    "functionName": {
                      "name": "add",
                      "nodeType": "YulIdentifier",
                      "src": "16468:3:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "16468:12:18"
                  },
                  "variableNames": [
                    {
                      "name": "end",
                      "nodeType": "YulIdentifier",
                      "src": "16461:3:18"
                    }
                  ]
                }
              ]
            },
            "name": "abi_encode_t_stringliteral_7481f3df2a424c0755a1ad2356614e9a5a358d461ea2eae1f89cb21cbad00397_to_t_string_memory_ptr_fromStack",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "pos",
                "nodeType": "YulTypedName",
                "src": "16254:3:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "end",
                "nodeType": "YulTypedName",
                "src": "16262:3:18",
                "type": ""
              }
            ],
            "src": "16120:366:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "16663:248:18",
              "statements": [
                {
                  "nodeType": "YulAssignment",
                  "src": "16673:26:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "headStart",
                        "nodeType": "YulIdentifier",
                        "src": "16685:9:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "16696:2:18",
                        "type": "",
                        "value": "32"
                      }
                    ],
                    "functionName": {
                      "name": "add",
                      "nodeType": "YulIdentifier",
                      "src": "16681:3:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "16681:18:18"
                  },
                  "variableNames": [
                    {
                      "name": "tail",
                      "nodeType": "YulIdentifier",
                      "src": "16673:4:18"
                    }
                  ]
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "headStart",
                            "nodeType": "YulIdentifier",
                            "src": "16720:9:18"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "16731:1:18",
                            "type": "",
                            "value": "0"
                          }
                        ],
                        "functionName": {
                          "name": "add",
                          "nodeType": "YulIdentifier",
                          "src": "16716:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "16716:17:18"
                      },
                      {
                        "arguments": [
                          {
                            "name": "tail",
                            "nodeType": "YulIdentifier",
                            "src": "16739:4:18"
                          },
                          {
                            "name": "headStart",
                            "nodeType": "YulIdentifier",
                            "src": "16745:9:18"
                          }
                        ],
                        "functionName": {
                          "name": "sub",
                          "nodeType": "YulIdentifier",
                          "src": "16735:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "16735:20:18"
                      }
                    ],
                    "functionName": {
                      "name": "mstore",
                      "nodeType": "YulIdentifier",
                      "src": "16709:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "16709:47:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "16709:47:18"
                },
                {
                  "nodeType": "YulAssignment",
                  "src": "16765:139:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "tail",
                        "nodeType": "YulIdentifier",
                        "src": "16899:4:18"
                      }
                    ],
                    "functionName": {
                      "name": "abi_encode_t_stringliteral_7481f3df2a424c0755a1ad2356614e9a5a358d461ea2eae1f89cb21cbad00397_to_t_string_memory_ptr_fromStack",
                      "nodeType": "YulIdentifier",
                      "src": "16773:124:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "16773:131:18"
                  },
                  "variableNames": [
                    {
                      "name": "tail",
                      "nodeType": "YulIdentifier",
                      "src": "16765:4:18"
                    }
                  ]
                }
              ]
            },
            "name": "abi_encode_tuple_t_stringliteral_7481f3df2a424c0755a1ad2356614e9a5a358d461ea2eae1f89cb21cbad00397__to_t_string_memory_ptr__fromStack_reversed",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "headStart",
                "nodeType": "YulTypedName",
                "src": "16643:9:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "tail",
                "nodeType": "YulTypedName",
                "src": "16658:4:18",
                "type": ""
              }
            ],
            "src": "16492:419:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "17023:123:18",
              "statements": [
                {
                  "expression": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "memPtr",
                            "nodeType": "YulIdentifier",
                            "src": "17045:6:18"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "17053:1:18",
                            "type": "",
                            "value": "0"
                          }
                        ],
                        "functionName": {
                          "name": "add",
                          "nodeType": "YulIdentifier",
                          "src": "17041:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "17041:14:18"
                      },
                      {
                        "hexValue": "4552433732313a2062616c616e636520717565727920666f7220746865207a65",
                        "kind": "string",
                        "nodeType": "YulLiteral",
                        "src": "17057:34:18",
                        "type": "",
                        "value": "ERC721: balance query for the ze"
                      }
                    ],
                    "functionName": {
                      "name": "mstore",
                      "nodeType": "YulIdentifier",
                      "src": "17034:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "17034:58:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "17034:58:18"
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "memPtr",
                            "nodeType": "YulIdentifier",
                            "src": "17113:6:18"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "17121:2:18",
                            "type": "",
                            "value": "32"
                          }
                        ],
                        "functionName": {
                          "name": "add",
                          "nodeType": "YulIdentifier",
                          "src": "17109:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "17109:15:18"
                      },
                      {
                        "hexValue": "726f2061646472657373",
                        "kind": "string",
                        "nodeType": "YulLiteral",
                        "src": "17126:12:18",
                        "type": "",
                        "value": "ro address"
                      }
                    ],
                    "functionName": {
                      "name": "mstore",
                      "nodeType": "YulIdentifier",
                      "src": "17102:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "17102:37:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "17102:37:18"
                }
              ]
            },
            "name": "store_literal_in_memory_7395d4d3901c50cdfcab223d072f9aa36241df5d883e62cbf147ee1b05a9e6ba",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "memPtr",
                "nodeType": "YulTypedName",
                "src": "17015:6:18",
                "type": ""
              }
            ],
            "src": "16917:229:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "17298:220:18",
              "statements": [
                {
                  "nodeType": "YulAssignment",
                  "src": "17308:74:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "pos",
                        "nodeType": "YulIdentifier",
                        "src": "17374:3:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "17379:2:18",
                        "type": "",
                        "value": "42"
                      }
                    ],
                    "functionName": {
                      "name": "array_storeLengthForEncoding_t_string_memory_ptr_fromStack",
                      "nodeType": "YulIdentifier",
                      "src": "17315:58:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "17315:67:18"
                  },
                  "variableNames": [
                    {
                      "name": "pos",
                      "nodeType": "YulIdentifier",
                      "src": "17308:3:18"
                    }
                  ]
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "name": "pos",
                        "nodeType": "YulIdentifier",
                        "src": "17480:3:18"
                      }
                    ],
                    "functionName": {
                      "name": "store_literal_in_memory_7395d4d3901c50cdfcab223d072f9aa36241df5d883e62cbf147ee1b05a9e6ba",
                      "nodeType": "YulIdentifier",
                      "src": "17391:88:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "17391:93:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "17391:93:18"
                },
                {
                  "nodeType": "YulAssignment",
                  "src": "17493:19:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "pos",
                        "nodeType": "YulIdentifier",
                        "src": "17504:3:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "17509:2:18",
                        "type": "",
                        "value": "64"
                      }
                    ],
                    "functionName": {
                      "name": "add",
                      "nodeType": "YulIdentifier",
                      "src": "17500:3:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "17500:12:18"
                  },
                  "variableNames": [
                    {
                      "name": "end",
                      "nodeType": "YulIdentifier",
                      "src": "17493:3:18"
                    }
                  ]
                }
              ]
            },
            "name": "abi_encode_t_stringliteral_7395d4d3901c50cdfcab223d072f9aa36241df5d883e62cbf147ee1b05a9e6ba_to_t_string_memory_ptr_fromStack",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "pos",
                "nodeType": "YulTypedName",
                "src": "17286:3:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "end",
                "nodeType": "YulTypedName",
                "src": "17294:3:18",
                "type": ""
              }
            ],
            "src": "17152:366:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "17695:248:18",
              "statements": [
                {
                  "nodeType": "YulAssignment",
                  "src": "17705:26:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "headStart",
                        "nodeType": "YulIdentifier",
                        "src": "17717:9:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "17728:2:18",
                        "type": "",
                        "value": "32"
                      }
                    ],
                    "functionName": {
                      "name": "add",
                      "nodeType": "YulIdentifier",
                      "src": "17713:3:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "17713:18:18"
                  },
                  "variableNames": [
                    {
                      "name": "tail",
                      "nodeType": "YulIdentifier",
                      "src": "17705:4:18"
                    }
                  ]
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "headStart",
                            "nodeType": "YulIdentifier",
                            "src": "17752:9:18"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "17763:1:18",
                            "type": "",
                            "value": "0"
                          }
                        ],
                        "functionName": {
                          "name": "add",
                          "nodeType": "YulIdentifier",
                          "src": "17748:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "17748:17:18"
                      },
                      {
                        "arguments": [
                          {
                            "name": "tail",
                            "nodeType": "YulIdentifier",
                            "src": "17771:4:18"
                          },
                          {
                            "name": "headStart",
                            "nodeType": "YulIdentifier",
                            "src": "17777:9:18"
                          }
                        ],
                        "functionName": {
                          "name": "sub",
                          "nodeType": "YulIdentifier",
                          "src": "17767:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "17767:20:18"
                      }
                    ],
                    "functionName": {
                      "name": "mstore",
                      "nodeType": "YulIdentifier",
                      "src": "17741:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "17741:47:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "17741:47:18"
                },
                {
                  "nodeType": "YulAssignment",
                  "src": "17797:139:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "tail",
                        "nodeType": "YulIdentifier",
                        "src": "17931:4:18"
                      }
                    ],
                    "functionName": {
                      "name": "abi_encode_t_stringliteral_7395d4d3901c50cdfcab223d072f9aa36241df5d883e62cbf147ee1b05a9e6ba_to_t_string_memory_ptr_fromStack",
                      "nodeType": "YulIdentifier",
                      "src": "17805:124:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "17805:131:18"
                  },
                  "variableNames": [
                    {
                      "name": "tail",
                      "nodeType": "YulIdentifier",
                      "src": "17797:4:18"
                    }
                  ]
                }
              ]
            },
            "name": "abi_encode_tuple_t_stringliteral_7395d4d3901c50cdfcab223d072f9aa36241df5d883e62cbf147ee1b05a9e6ba__to_t_string_memory_ptr__fromStack_reversed",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "headStart",
                "nodeType": "YulTypedName",
                "src": "17675:9:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "tail",
                "nodeType": "YulTypedName",
                "src": "17690:4:18",
                "type": ""
              }
            ],
            "src": "17524:419:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "17977:152:18",
              "statements": [
                {
                  "expression": {
                    "arguments": [
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "17994:1:18",
                        "type": "",
                        "value": "0"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "17997:77:18",
                        "type": "",
                        "value": "35408467139433450592217433187231851964531694900788300625387963629091585785856"
                      }
                    ],
                    "functionName": {
                      "name": "mstore",
                      "nodeType": "YulIdentifier",
                      "src": "17987:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "17987:88:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "17987:88:18"
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "18091:1:18",
                        "type": "",
                        "value": "4"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "18094:4:18",
                        "type": "",
                        "value": "0x11"
                      }
                    ],
                    "functionName": {
                      "name": "mstore",
                      "nodeType": "YulIdentifier",
                      "src": "18084:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "18084:15:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "18084:15:18"
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "18115:1:18",
                        "type": "",
                        "value": "0"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "18118:4:18",
                        "type": "",
                        "value": "0x24"
                      }
                    ],
                    "functionName": {
                      "name": "revert",
                      "nodeType": "YulIdentifier",
                      "src": "18108:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "18108:15:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "18108:15:18"
                }
              ]
            },
            "name": "panic_error_0x11",
            "nodeType": "YulFunctionDefinition",
            "src": "17949:180:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "18179:261:18",
              "statements": [
                {
                  "nodeType": "YulAssignment",
                  "src": "18189:25:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "x",
                        "nodeType": "YulIdentifier",
                        "src": "18212:1:18"
                      }
                    ],
                    "functionName": {
                      "name": "cleanup_t_uint256",
                      "nodeType": "YulIdentifier",
                      "src": "18194:17:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "18194:20:18"
                  },
                  "variableNames": [
                    {
                      "name": "x",
                      "nodeType": "YulIdentifier",
                      "src": "18189:1:18"
                    }
                  ]
                },
                {
                  "nodeType": "YulAssignment",
                  "src": "18223:25:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "y",
                        "nodeType": "YulIdentifier",
                        "src": "18246:1:18"
                      }
                    ],
                    "functionName": {
                      "name": "cleanup_t_uint256",
                      "nodeType": "YulIdentifier",
                      "src": "18228:17:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "18228:20:18"
                  },
                  "variableNames": [
                    {
                      "name": "y",
                      "nodeType": "YulIdentifier",
                      "src": "18223:1:18"
                    }
                  ]
                },
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "18386:22:18",
                    "statements": [
                      {
                        "expression": {
                          "arguments": [],
                          "functionName": {
                            "name": "panic_error_0x11",
                            "nodeType": "YulIdentifier",
                            "src": "18388:16:18"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "18388:18:18"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "18388:18:18"
                      }
                    ]
                  },
                  "condition": {
                    "arguments": [
                      {
                        "name": "x",
                        "nodeType": "YulIdentifier",
                        "src": "18307:1:18"
                      },
                      {
                        "arguments": [
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "18314:66:18",
                            "type": "",
                            "value": "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
                          },
                          {
                            "name": "y",
                            "nodeType": "YulIdentifier",
                            "src": "18382:1:18"
                          }
                        ],
                        "functionName": {
                          "name": "sub",
                          "nodeType": "YulIdentifier",
                          "src": "18310:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "18310:74:18"
                      }
                    ],
                    "functionName": {
                      "name": "gt",
                      "nodeType": "YulIdentifier",
                      "src": "18304:2:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "18304:81:18"
                  },
                  "nodeType": "YulIf",
                  "src": "18301:107:18"
                },
                {
                  "nodeType": "YulAssignment",
                  "src": "18418:16:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "x",
                        "nodeType": "YulIdentifier",
                        "src": "18429:1:18"
                      },
                      {
                        "name": "y",
                        "nodeType": "YulIdentifier",
                        "src": "18432:1:18"
                      }
                    ],
                    "functionName": {
                      "name": "add",
                      "nodeType": "YulIdentifier",
                      "src": "18425:3:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "18425:9:18"
                  },
                  "variableNames": [
                    {
                      "name": "sum",
                      "nodeType": "YulIdentifier",
                      "src": "18418:3:18"
                    }
                  ]
                }
              ]
            },
            "name": "checked_add_t_uint256",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "x",
                "nodeType": "YulTypedName",
                "src": "18166:1:18",
                "type": ""
              },
              {
                "name": "y",
                "nodeType": "YulTypedName",
                "src": "18169:1:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "sum",
                "nodeType": "YulTypedName",
                "src": "18175:3:18",
                "type": ""
              }
            ],
            "src": "18135:305:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "18552:69:18",
              "statements": [
                {
                  "expression": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "memPtr",
                            "nodeType": "YulIdentifier",
                            "src": "18574:6:18"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "18582:1:18",
                            "type": "",
                            "value": "0"
                          }
                        ],
                        "functionName": {
                          "name": "add",
                          "nodeType": "YulIdentifier",
                          "src": "18570:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "18570:14:18"
                      },
                      {
                        "hexValue": "4552433732313a20617070726f766520746f2063616c6c6572",
                        "kind": "string",
                        "nodeType": "YulLiteral",
                        "src": "18586:27:18",
                        "type": "",
                        "value": "ERC721: approve to caller"
                      }
                    ],
                    "functionName": {
                      "name": "mstore",
                      "nodeType": "YulIdentifier",
                      "src": "18563:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "18563:51:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "18563:51:18"
                }
              ]
            },
            "name": "store_literal_in_memory_45fe4329685be5ecd250fd0e6a25aea0ea4d0e30fb6a73c118b95749e6d70d05",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "memPtr",
                "nodeType": "YulTypedName",
                "src": "18544:6:18",
                "type": ""
              }
            ],
            "src": "18446:175:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "18773:220:18",
              "statements": [
                {
                  "nodeType": "YulAssignment",
                  "src": "18783:74:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "pos",
                        "nodeType": "YulIdentifier",
                        "src": "18849:3:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "18854:2:18",
                        "type": "",
                        "value": "25"
                      }
                    ],
                    "functionName": {
                      "name": "array_storeLengthForEncoding_t_string_memory_ptr_fromStack",
                      "nodeType": "YulIdentifier",
                      "src": "18790:58:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "18790:67:18"
                  },
                  "variableNames": [
                    {
                      "name": "pos",
                      "nodeType": "YulIdentifier",
                      "src": "18783:3:18"
                    }
                  ]
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "name": "pos",
                        "nodeType": "YulIdentifier",
                        "src": "18955:3:18"
                      }
                    ],
                    "functionName": {
                      "name": "store_literal_in_memory_45fe4329685be5ecd250fd0e6a25aea0ea4d0e30fb6a73c118b95749e6d70d05",
                      "nodeType": "YulIdentifier",
                      "src": "18866:88:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "18866:93:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "18866:93:18"
                },
                {
                  "nodeType": "YulAssignment",
                  "src": "18968:19:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "pos",
                        "nodeType": "YulIdentifier",
                        "src": "18979:3:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "18984:2:18",
                        "type": "",
                        "value": "32"
                      }
                    ],
                    "functionName": {
                      "name": "add",
                      "nodeType": "YulIdentifier",
                      "src": "18975:3:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "18975:12:18"
                  },
                  "variableNames": [
                    {
                      "name": "end",
                      "nodeType": "YulIdentifier",
                      "src": "18968:3:18"
                    }
                  ]
                }
              ]
            },
            "name": "abi_encode_t_stringliteral_45fe4329685be5ecd250fd0e6a25aea0ea4d0e30fb6a73c118b95749e6d70d05_to_t_string_memory_ptr_fromStack",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "pos",
                "nodeType": "YulTypedName",
                "src": "18761:3:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "end",
                "nodeType": "YulTypedName",
                "src": "18769:3:18",
                "type": ""
              }
            ],
            "src": "18627:366:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "19170:248:18",
              "statements": [
                {
                  "nodeType": "YulAssignment",
                  "src": "19180:26:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "headStart",
                        "nodeType": "YulIdentifier",
                        "src": "19192:9:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "19203:2:18",
                        "type": "",
                        "value": "32"
                      }
                    ],
                    "functionName": {
                      "name": "add",
                      "nodeType": "YulIdentifier",
                      "src": "19188:3:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "19188:18:18"
                  },
                  "variableNames": [
                    {
                      "name": "tail",
                      "nodeType": "YulIdentifier",
                      "src": "19180:4:18"
                    }
                  ]
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "headStart",
                            "nodeType": "YulIdentifier",
                            "src": "19227:9:18"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "19238:1:18",
                            "type": "",
                            "value": "0"
                          }
                        ],
                        "functionName": {
                          "name": "add",
                          "nodeType": "YulIdentifier",
                          "src": "19223:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "19223:17:18"
                      },
                      {
                        "arguments": [
                          {
                            "name": "tail",
                            "nodeType": "YulIdentifier",
                            "src": "19246:4:18"
                          },
                          {
                            "name": "headStart",
                            "nodeType": "YulIdentifier",
                            "src": "19252:9:18"
                          }
                        ],
                        "functionName": {
                          "name": "sub",
                          "nodeType": "YulIdentifier",
                          "src": "19242:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "19242:20:18"
                      }
                    ],
                    "functionName": {
                      "name": "mstore",
                      "nodeType": "YulIdentifier",
                      "src": "19216:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "19216:47:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "19216:47:18"
                },
                {
                  "nodeType": "YulAssignment",
                  "src": "19272:139:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "tail",
                        "nodeType": "YulIdentifier",
                        "src": "19406:4:18"
                      }
                    ],
                    "functionName": {
                      "name": "abi_encode_t_stringliteral_45fe4329685be5ecd250fd0e6a25aea0ea4d0e30fb6a73c118b95749e6d70d05_to_t_string_memory_ptr_fromStack",
                      "nodeType": "YulIdentifier",
                      "src": "19280:124:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "19280:131:18"
                  },
                  "variableNames": [
                    {
                      "name": "tail",
                      "nodeType": "YulIdentifier",
                      "src": "19272:4:18"
                    }
                  ]
                }
              ]
            },
            "name": "abi_encode_tuple_t_stringliteral_45fe4329685be5ecd250fd0e6a25aea0ea4d0e30fb6a73c118b95749e6d70d05__to_t_string_memory_ptr__fromStack_reversed",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "headStart",
                "nodeType": "YulTypedName",
                "src": "19150:9:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "tail",
                "nodeType": "YulTypedName",
                "src": "19165:4:18",
                "type": ""
              }
            ],
            "src": "18999:419:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "19530:131:18",
              "statements": [
                {
                  "expression": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "memPtr",
                            "nodeType": "YulIdentifier",
                            "src": "19552:6:18"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "19560:1:18",
                            "type": "",
                            "value": "0"
                          }
                        ],
                        "functionName": {
                          "name": "add",
                          "nodeType": "YulIdentifier",
                          "src": "19548:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "19548:14:18"
                      },
                      {
                        "hexValue": "4552433732313a207472616e7366657220746f206e6f6e204552433732315265",
                        "kind": "string",
                        "nodeType": "YulLiteral",
                        "src": "19564:34:18",
                        "type": "",
                        "value": "ERC721: transfer to non ERC721Re"
                      }
                    ],
                    "functionName": {
                      "name": "mstore",
                      "nodeType": "YulIdentifier",
                      "src": "19541:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "19541:58:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "19541:58:18"
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "memPtr",
                            "nodeType": "YulIdentifier",
                            "src": "19620:6:18"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "19628:2:18",
                            "type": "",
                            "value": "32"
                          }
                        ],
                        "functionName": {
                          "name": "add",
                          "nodeType": "YulIdentifier",
                          "src": "19616:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "19616:15:18"
                      },
                      {
                        "hexValue": "63656976657220696d706c656d656e746572",
                        "kind": "string",
                        "nodeType": "YulLiteral",
                        "src": "19633:20:18",
                        "type": "",
                        "value": "ceiver implementer"
                      }
                    ],
                    "functionName": {
                      "name": "mstore",
                      "nodeType": "YulIdentifier",
                      "src": "19609:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "19609:45:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "19609:45:18"
                }
              ]
            },
            "name": "store_literal_in_memory_1e766a06da43a53d0f4c380e06e5a342e14d5af1bf8501996c844905530ca84e",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "memPtr",
                "nodeType": "YulTypedName",
                "src": "19522:6:18",
                "type": ""
              }
            ],
            "src": "19424:237:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "19813:220:18",
              "statements": [
                {
                  "nodeType": "YulAssignment",
                  "src": "19823:74:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "pos",
                        "nodeType": "YulIdentifier",
                        "src": "19889:3:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "19894:2:18",
                        "type": "",
                        "value": "50"
                      }
                    ],
                    "functionName": {
                      "name": "array_storeLengthForEncoding_t_string_memory_ptr_fromStack",
                      "nodeType": "YulIdentifier",
                      "src": "19830:58:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "19830:67:18"
                  },
                  "variableNames": [
                    {
                      "name": "pos",
                      "nodeType": "YulIdentifier",
                      "src": "19823:3:18"
                    }
                  ]
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "name": "pos",
                        "nodeType": "YulIdentifier",
                        "src": "19995:3:18"
                      }
                    ],
                    "functionName": {
                      "name": "store_literal_in_memory_1e766a06da43a53d0f4c380e06e5a342e14d5af1bf8501996c844905530ca84e",
                      "nodeType": "YulIdentifier",
                      "src": "19906:88:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "19906:93:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "19906:93:18"
                },
                {
                  "nodeType": "YulAssignment",
                  "src": "20008:19:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "pos",
                        "nodeType": "YulIdentifier",
                        "src": "20019:3:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "20024:2:18",
                        "type": "",
                        "value": "64"
                      }
                    ],
                    "functionName": {
                      "name": "add",
                      "nodeType": "YulIdentifier",
                      "src": "20015:3:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "20015:12:18"
                  },
                  "variableNames": [
                    {
                      "name": "end",
                      "nodeType": "YulIdentifier",
                      "src": "20008:3:18"
                    }
                  ]
                }
              ]
            },
            "name": "abi_encode_t_stringliteral_1e766a06da43a53d0f4c380e06e5a342e14d5af1bf8501996c844905530ca84e_to_t_string_memory_ptr_fromStack",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "pos",
                "nodeType": "YulTypedName",
                "src": "19801:3:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "end",
                "nodeType": "YulTypedName",
                "src": "19809:3:18",
                "type": ""
              }
            ],
            "src": "19667:366:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "20210:248:18",
              "statements": [
                {
                  "nodeType": "YulAssignment",
                  "src": "20220:26:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "headStart",
                        "nodeType": "YulIdentifier",
                        "src": "20232:9:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "20243:2:18",
                        "type": "",
                        "value": "32"
                      }
                    ],
                    "functionName": {
                      "name": "add",
                      "nodeType": "YulIdentifier",
                      "src": "20228:3:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "20228:18:18"
                  },
                  "variableNames": [
                    {
                      "name": "tail",
                      "nodeType": "YulIdentifier",
                      "src": "20220:4:18"
                    }
                  ]
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "headStart",
                            "nodeType": "YulIdentifier",
                            "src": "20267:9:18"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "20278:1:18",
                            "type": "",
                            "value": "0"
                          }
                        ],
                        "functionName": {
                          "name": "add",
                          "nodeType": "YulIdentifier",
                          "src": "20263:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "20263:17:18"
                      },
                      {
                        "arguments": [
                          {
                            "name": "tail",
                            "nodeType": "YulIdentifier",
                            "src": "20286:4:18"
                          },
                          {
                            "name": "headStart",
                            "nodeType": "YulIdentifier",
                            "src": "20292:9:18"
                          }
                        ],
                        "functionName": {
                          "name": "sub",
                          "nodeType": "YulIdentifier",
                          "src": "20282:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "20282:20:18"
                      }
                    ],
                    "functionName": {
                      "name": "mstore",
                      "nodeType": "YulIdentifier",
                      "src": "20256:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "20256:47:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "20256:47:18"
                },
                {
                  "nodeType": "YulAssignment",
                  "src": "20312:139:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "tail",
                        "nodeType": "YulIdentifier",
                        "src": "20446:4:18"
                      }
                    ],
                    "functionName": {
                      "name": "abi_encode_t_stringliteral_1e766a06da43a53d0f4c380e06e5a342e14d5af1bf8501996c844905530ca84e_to_t_string_memory_ptr_fromStack",
                      "nodeType": "YulIdentifier",
                      "src": "20320:124:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "20320:131:18"
                  },
                  "variableNames": [
                    {
                      "name": "tail",
                      "nodeType": "YulIdentifier",
                      "src": "20312:4:18"
                    }
                  ]
                }
              ]
            },
            "name": "abi_encode_tuple_t_stringliteral_1e766a06da43a53d0f4c380e06e5a342e14d5af1bf8501996c844905530ca84e__to_t_string_memory_ptr__fromStack_reversed",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "headStart",
                "nodeType": "YulTypedName",
                "src": "20190:9:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "tail",
                "nodeType": "YulTypedName",
                "src": "20205:4:18",
                "type": ""
              }
            ],
            "src": "20039:419:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "20570:125:18",
              "statements": [
                {
                  "expression": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "memPtr",
                            "nodeType": "YulIdentifier",
                            "src": "20592:6:18"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "20600:1:18",
                            "type": "",
                            "value": "0"
                          }
                        ],
                        "functionName": {
                          "name": "add",
                          "nodeType": "YulIdentifier",
                          "src": "20588:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "20588:14:18"
                      },
                      {
                        "hexValue": "4552433732313a206f70657261746f7220717565727920666f72206e6f6e6578",
                        "kind": "string",
                        "nodeType": "YulLiteral",
                        "src": "20604:34:18",
                        "type": "",
                        "value": "ERC721: operator query for nonex"
                      }
                    ],
                    "functionName": {
                      "name": "mstore",
                      "nodeType": "YulIdentifier",
                      "src": "20581:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "20581:58:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "20581:58:18"
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "memPtr",
                            "nodeType": "YulIdentifier",
                            "src": "20660:6:18"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "20668:2:18",
                            "type": "",
                            "value": "32"
                          }
                        ],
                        "functionName": {
                          "name": "add",
                          "nodeType": "YulIdentifier",
                          "src": "20656:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "20656:15:18"
                      },
                      {
                        "hexValue": "697374656e7420746f6b656e",
                        "kind": "string",
                        "nodeType": "YulLiteral",
                        "src": "20673:14:18",
                        "type": "",
                        "value": "istent token"
                      }
                    ],
                    "functionName": {
                      "name": "mstore",
                      "nodeType": "YulIdentifier",
                      "src": "20649:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "20649:39:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "20649:39:18"
                }
              ]
            },
            "name": "store_literal_in_memory_5797d1ccb08b83980dd0c07ea40d8f6a64d35fff736a19bdd17522954cb0899c",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "memPtr",
                "nodeType": "YulTypedName",
                "src": "20562:6:18",
                "type": ""
              }
            ],
            "src": "20464:231:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "20847:220:18",
              "statements": [
                {
                  "nodeType": "YulAssignment",
                  "src": "20857:74:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "pos",
                        "nodeType": "YulIdentifier",
                        "src": "20923:3:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "20928:2:18",
                        "type": "",
                        "value": "44"
                      }
                    ],
                    "functionName": {
                      "name": "array_storeLengthForEncoding_t_string_memory_ptr_fromStack",
                      "nodeType": "YulIdentifier",
                      "src": "20864:58:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "20864:67:18"
                  },
                  "variableNames": [
                    {
                      "name": "pos",
                      "nodeType": "YulIdentifier",
                      "src": "20857:3:18"
                    }
                  ]
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "name": "pos",
                        "nodeType": "YulIdentifier",
                        "src": "21029:3:18"
                      }
                    ],
                    "functionName": {
                      "name": "store_literal_in_memory_5797d1ccb08b83980dd0c07ea40d8f6a64d35fff736a19bdd17522954cb0899c",
                      "nodeType": "YulIdentifier",
                      "src": "20940:88:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "20940:93:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "20940:93:18"
                },
                {
                  "nodeType": "YulAssignment",
                  "src": "21042:19:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "pos",
                        "nodeType": "YulIdentifier",
                        "src": "21053:3:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "21058:2:18",
                        "type": "",
                        "value": "64"
                      }
                    ],
                    "functionName": {
                      "name": "add",
                      "nodeType": "YulIdentifier",
                      "src": "21049:3:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "21049:12:18"
                  },
                  "variableNames": [
                    {
                      "name": "end",
                      "nodeType": "YulIdentifier",
                      "src": "21042:3:18"
                    }
                  ]
                }
              ]
            },
            "name": "abi_encode_t_stringliteral_5797d1ccb08b83980dd0c07ea40d8f6a64d35fff736a19bdd17522954cb0899c_to_t_string_memory_ptr_fromStack",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "pos",
                "nodeType": "YulTypedName",
                "src": "20835:3:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "end",
                "nodeType": "YulTypedName",
                "src": "20843:3:18",
                "type": ""
              }
            ],
            "src": "20701:366:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "21244:248:18",
              "statements": [
                {
                  "nodeType": "YulAssignment",
                  "src": "21254:26:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "headStart",
                        "nodeType": "YulIdentifier",
                        "src": "21266:9:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "21277:2:18",
                        "type": "",
                        "value": "32"
                      }
                    ],
                    "functionName": {
                      "name": "add",
                      "nodeType": "YulIdentifier",
                      "src": "21262:3:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "21262:18:18"
                  },
                  "variableNames": [
                    {
                      "name": "tail",
                      "nodeType": "YulIdentifier",
                      "src": "21254:4:18"
                    }
                  ]
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "headStart",
                            "nodeType": "YulIdentifier",
                            "src": "21301:9:18"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "21312:1:18",
                            "type": "",
                            "value": "0"
                          }
                        ],
                        "functionName": {
                          "name": "add",
                          "nodeType": "YulIdentifier",
                          "src": "21297:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "21297:17:18"
                      },
                      {
                        "arguments": [
                          {
                            "name": "tail",
                            "nodeType": "YulIdentifier",
                            "src": "21320:4:18"
                          },
                          {
                            "name": "headStart",
                            "nodeType": "YulIdentifier",
                            "src": "21326:9:18"
                          }
                        ],
                        "functionName": {
                          "name": "sub",
                          "nodeType": "YulIdentifier",
                          "src": "21316:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "21316:20:18"
                      }
                    ],
                    "functionName": {
                      "name": "mstore",
                      "nodeType": "YulIdentifier",
                      "src": "21290:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "21290:47:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "21290:47:18"
                },
                {
                  "nodeType": "YulAssignment",
                  "src": "21346:139:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "tail",
                        "nodeType": "YulIdentifier",
                        "src": "21480:4:18"
                      }
                    ],
                    "functionName": {
                      "name": "abi_encode_t_stringliteral_5797d1ccb08b83980dd0c07ea40d8f6a64d35fff736a19bdd17522954cb0899c_to_t_string_memory_ptr_fromStack",
                      "nodeType": "YulIdentifier",
                      "src": "21354:124:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "21354:131:18"
                  },
                  "variableNames": [
                    {
                      "name": "tail",
                      "nodeType": "YulIdentifier",
                      "src": "21346:4:18"
                    }
                  ]
                }
              ]
            },
            "name": "abi_encode_tuple_t_stringliteral_5797d1ccb08b83980dd0c07ea40d8f6a64d35fff736a19bdd17522954cb0899c__to_t_string_memory_ptr__fromStack_reversed",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "headStart",
                "nodeType": "YulTypedName",
                "src": "21224:9:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "tail",
                "nodeType": "YulTypedName",
                "src": "21239:4:18",
                "type": ""
              }
            ],
            "src": "21073:419:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "21604:118:18",
              "statements": [
                {
                  "expression": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "memPtr",
                            "nodeType": "YulIdentifier",
                            "src": "21626:6:18"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "21634:1:18",
                            "type": "",
                            "value": "0"
                          }
                        ],
                        "functionName": {
                          "name": "add",
                          "nodeType": "YulIdentifier",
                          "src": "21622:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "21622:14:18"
                      },
                      {
                        "hexValue": "4552433732313a207472616e736665722066726f6d20696e636f727265637420",
                        "kind": "string",
                        "nodeType": "YulLiteral",
                        "src": "21638:34:18",
                        "type": "",
                        "value": "ERC721: transfer from incorrect "
                      }
                    ],
                    "functionName": {
                      "name": "mstore",
                      "nodeType": "YulIdentifier",
                      "src": "21615:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "21615:58:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "21615:58:18"
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "memPtr",
                            "nodeType": "YulIdentifier",
                            "src": "21694:6:18"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "21702:2:18",
                            "type": "",
                            "value": "32"
                          }
                        ],
                        "functionName": {
                          "name": "add",
                          "nodeType": "YulIdentifier",
                          "src": "21690:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "21690:15:18"
                      },
                      {
                        "hexValue": "6f776e6572",
                        "kind": "string",
                        "nodeType": "YulLiteral",
                        "src": "21707:7:18",
                        "type": "",
                        "value": "owner"
                      }
                    ],
                    "functionName": {
                      "name": "mstore",
                      "nodeType": "YulIdentifier",
                      "src": "21683:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "21683:32:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "21683:32:18"
                }
              ]
            },
            "name": "store_literal_in_memory_277f8ee9d5b4fc3c4149386f24de0fc1bbc63a8210e2197bfd1c0376a2ac5f48",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "memPtr",
                "nodeType": "YulTypedName",
                "src": "21596:6:18",
                "type": ""
              }
            ],
            "src": "21498:224:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "21874:220:18",
              "statements": [
                {
                  "nodeType": "YulAssignment",
                  "src": "21884:74:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "pos",
                        "nodeType": "YulIdentifier",
                        "src": "21950:3:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "21955:2:18",
                        "type": "",
                        "value": "37"
                      }
                    ],
                    "functionName": {
                      "name": "array_storeLengthForEncoding_t_string_memory_ptr_fromStack",
                      "nodeType": "YulIdentifier",
                      "src": "21891:58:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "21891:67:18"
                  },
                  "variableNames": [
                    {
                      "name": "pos",
                      "nodeType": "YulIdentifier",
                      "src": "21884:3:18"
                    }
                  ]
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "name": "pos",
                        "nodeType": "YulIdentifier",
                        "src": "22056:3:18"
                      }
                    ],
                    "functionName": {
                      "name": "store_literal_in_memory_277f8ee9d5b4fc3c4149386f24de0fc1bbc63a8210e2197bfd1c0376a2ac5f48",
                      "nodeType": "YulIdentifier",
                      "src": "21967:88:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "21967:93:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "21967:93:18"
                },
                {
                  "nodeType": "YulAssignment",
                  "src": "22069:19:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "pos",
                        "nodeType": "YulIdentifier",
                        "src": "22080:3:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "22085:2:18",
                        "type": "",
                        "value": "64"
                      }
                    ],
                    "functionName": {
                      "name": "add",
                      "nodeType": "YulIdentifier",
                      "src": "22076:3:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "22076:12:18"
                  },
                  "variableNames": [
                    {
                      "name": "end",
                      "nodeType": "YulIdentifier",
                      "src": "22069:3:18"
                    }
                  ]
                }
              ]
            },
            "name": "abi_encode_t_stringliteral_277f8ee9d5b4fc3c4149386f24de0fc1bbc63a8210e2197bfd1c0376a2ac5f48_to_t_string_memory_ptr_fromStack",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "pos",
                "nodeType": "YulTypedName",
                "src": "21862:3:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "end",
                "nodeType": "YulTypedName",
                "src": "21870:3:18",
                "type": ""
              }
            ],
            "src": "21728:366:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "22271:248:18",
              "statements": [
                {
                  "nodeType": "YulAssignment",
                  "src": "22281:26:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "headStart",
                        "nodeType": "YulIdentifier",
                        "src": "22293:9:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "22304:2:18",
                        "type": "",
                        "value": "32"
                      }
                    ],
                    "functionName": {
                      "name": "add",
                      "nodeType": "YulIdentifier",
                      "src": "22289:3:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "22289:18:18"
                  },
                  "variableNames": [
                    {
                      "name": "tail",
                      "nodeType": "YulIdentifier",
                      "src": "22281:4:18"
                    }
                  ]
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "headStart",
                            "nodeType": "YulIdentifier",
                            "src": "22328:9:18"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "22339:1:18",
                            "type": "",
                            "value": "0"
                          }
                        ],
                        "functionName": {
                          "name": "add",
                          "nodeType": "YulIdentifier",
                          "src": "22324:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "22324:17:18"
                      },
                      {
                        "arguments": [
                          {
                            "name": "tail",
                            "nodeType": "YulIdentifier",
                            "src": "22347:4:18"
                          },
                          {
                            "name": "headStart",
                            "nodeType": "YulIdentifier",
                            "src": "22353:9:18"
                          }
                        ],
                        "functionName": {
                          "name": "sub",
                          "nodeType": "YulIdentifier",
                          "src": "22343:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "22343:20:18"
                      }
                    ],
                    "functionName": {
                      "name": "mstore",
                      "nodeType": "YulIdentifier",
                      "src": "22317:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "22317:47:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "22317:47:18"
                },
                {
                  "nodeType": "YulAssignment",
                  "src": "22373:139:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "tail",
                        "nodeType": "YulIdentifier",
                        "src": "22507:4:18"
                      }
                    ],
                    "functionName": {
                      "name": "abi_encode_t_stringliteral_277f8ee9d5b4fc3c4149386f24de0fc1bbc63a8210e2197bfd1c0376a2ac5f48_to_t_string_memory_ptr_fromStack",
                      "nodeType": "YulIdentifier",
                      "src": "22381:124:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "22381:131:18"
                  },
                  "variableNames": [
                    {
                      "name": "tail",
                      "nodeType": "YulIdentifier",
                      "src": "22373:4:18"
                    }
                  ]
                }
              ]
            },
            "name": "abi_encode_tuple_t_stringliteral_277f8ee9d5b4fc3c4149386f24de0fc1bbc63a8210e2197bfd1c0376a2ac5f48__to_t_string_memory_ptr__fromStack_reversed",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "headStart",
                "nodeType": "YulTypedName",
                "src": "22251:9:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "tail",
                "nodeType": "YulTypedName",
                "src": "22266:4:18",
                "type": ""
              }
            ],
            "src": "22100:419:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "22631:117:18",
              "statements": [
                {
                  "expression": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "memPtr",
                            "nodeType": "YulIdentifier",
                            "src": "22653:6:18"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "22661:1:18",
                            "type": "",
                            "value": "0"
                          }
                        ],
                        "functionName": {
                          "name": "add",
                          "nodeType": "YulIdentifier",
                          "src": "22649:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "22649:14:18"
                      },
                      {
                        "hexValue": "4552433732313a207472616e7366657220746f20746865207a65726f20616464",
                        "kind": "string",
                        "nodeType": "YulLiteral",
                        "src": "22665:34:18",
                        "type": "",
                        "value": "ERC721: transfer to the zero add"
                      }
                    ],
                    "functionName": {
                      "name": "mstore",
                      "nodeType": "YulIdentifier",
                      "src": "22642:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "22642:58:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "22642:58:18"
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "memPtr",
                            "nodeType": "YulIdentifier",
                            "src": "22721:6:18"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "22729:2:18",
                            "type": "",
                            "value": "32"
                          }
                        ],
                        "functionName": {
                          "name": "add",
                          "nodeType": "YulIdentifier",
                          "src": "22717:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "22717:15:18"
                      },
                      {
                        "hexValue": "72657373",
                        "kind": "string",
                        "nodeType": "YulLiteral",
                        "src": "22734:6:18",
                        "type": "",
                        "value": "ress"
                      }
                    ],
                    "functionName": {
                      "name": "mstore",
                      "nodeType": "YulIdentifier",
                      "src": "22710:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "22710:31:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "22710:31:18"
                }
              ]
            },
            "name": "store_literal_in_memory_455fea98ea03c32d7dd1a6f1426917d80529bf47b3ccbde74e7206e889e709f4",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "memPtr",
                "nodeType": "YulTypedName",
                "src": "22623:6:18",
                "type": ""
              }
            ],
            "src": "22525:223:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "22900:220:18",
              "statements": [
                {
                  "nodeType": "YulAssignment",
                  "src": "22910:74:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "pos",
                        "nodeType": "YulIdentifier",
                        "src": "22976:3:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "22981:2:18",
                        "type": "",
                        "value": "36"
                      }
                    ],
                    "functionName": {
                      "name": "array_storeLengthForEncoding_t_string_memory_ptr_fromStack",
                      "nodeType": "YulIdentifier",
                      "src": "22917:58:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "22917:67:18"
                  },
                  "variableNames": [
                    {
                      "name": "pos",
                      "nodeType": "YulIdentifier",
                      "src": "22910:3:18"
                    }
                  ]
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "name": "pos",
                        "nodeType": "YulIdentifier",
                        "src": "23082:3:18"
                      }
                    ],
                    "functionName": {
                      "name": "store_literal_in_memory_455fea98ea03c32d7dd1a6f1426917d80529bf47b3ccbde74e7206e889e709f4",
                      "nodeType": "YulIdentifier",
                      "src": "22993:88:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "22993:93:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "22993:93:18"
                },
                {
                  "nodeType": "YulAssignment",
                  "src": "23095:19:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "pos",
                        "nodeType": "YulIdentifier",
                        "src": "23106:3:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "23111:2:18",
                        "type": "",
                        "value": "64"
                      }
                    ],
                    "functionName": {
                      "name": "add",
                      "nodeType": "YulIdentifier",
                      "src": "23102:3:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "23102:12:18"
                  },
                  "variableNames": [
                    {
                      "name": "end",
                      "nodeType": "YulIdentifier",
                      "src": "23095:3:18"
                    }
                  ]
                }
              ]
            },
            "name": "abi_encode_t_stringliteral_455fea98ea03c32d7dd1a6f1426917d80529bf47b3ccbde74e7206e889e709f4_to_t_string_memory_ptr_fromStack",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "pos",
                "nodeType": "YulTypedName",
                "src": "22888:3:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "end",
                "nodeType": "YulTypedName",
                "src": "22896:3:18",
                "type": ""
              }
            ],
            "src": "22754:366:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "23297:248:18",
              "statements": [
                {
                  "nodeType": "YulAssignment",
                  "src": "23307:26:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "headStart",
                        "nodeType": "YulIdentifier",
                        "src": "23319:9:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "23330:2:18",
                        "type": "",
                        "value": "32"
                      }
                    ],
                    "functionName": {
                      "name": "add",
                      "nodeType": "YulIdentifier",
                      "src": "23315:3:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "23315:18:18"
                  },
                  "variableNames": [
                    {
                      "name": "tail",
                      "nodeType": "YulIdentifier",
                      "src": "23307:4:18"
                    }
                  ]
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "headStart",
                            "nodeType": "YulIdentifier",
                            "src": "23354:9:18"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "23365:1:18",
                            "type": "",
                            "value": "0"
                          }
                        ],
                        "functionName": {
                          "name": "add",
                          "nodeType": "YulIdentifier",
                          "src": "23350:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "23350:17:18"
                      },
                      {
                        "arguments": [
                          {
                            "name": "tail",
                            "nodeType": "YulIdentifier",
                            "src": "23373:4:18"
                          },
                          {
                            "name": "headStart",
                            "nodeType": "YulIdentifier",
                            "src": "23379:9:18"
                          }
                        ],
                        "functionName": {
                          "name": "sub",
                          "nodeType": "YulIdentifier",
                          "src": "23369:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "23369:20:18"
                      }
                    ],
                    "functionName": {
                      "name": "mstore",
                      "nodeType": "YulIdentifier",
                      "src": "23343:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "23343:47:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "23343:47:18"
                },
                {
                  "nodeType": "YulAssignment",
                  "src": "23399:139:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "tail",
                        "nodeType": "YulIdentifier",
                        "src": "23533:4:18"
                      }
                    ],
                    "functionName": {
                      "name": "abi_encode_t_stringliteral_455fea98ea03c32d7dd1a6f1426917d80529bf47b3ccbde74e7206e889e709f4_to_t_string_memory_ptr_fromStack",
                      "nodeType": "YulIdentifier",
                      "src": "23407:124:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "23407:131:18"
                  },
                  "variableNames": [
                    {
                      "name": "tail",
                      "nodeType": "YulIdentifier",
                      "src": "23399:4:18"
                    }
                  ]
                }
              ]
            },
            "name": "abi_encode_tuple_t_stringliteral_455fea98ea03c32d7dd1a6f1426917d80529bf47b3ccbde74e7206e889e709f4__to_t_string_memory_ptr__fromStack_reversed",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "headStart",
                "nodeType": "YulTypedName",
                "src": "23277:9:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "tail",
                "nodeType": "YulTypedName",
                "src": "23292:4:18",
                "type": ""
              }
            ],
            "src": "23126:419:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "23596:146:18",
              "statements": [
                {
                  "nodeType": "YulAssignment",
                  "src": "23606:25:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "x",
                        "nodeType": "YulIdentifier",
                        "src": "23629:1:18"
                      }
                    ],
                    "functionName": {
                      "name": "cleanup_t_uint256",
                      "nodeType": "YulIdentifier",
                      "src": "23611:17:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "23611:20:18"
                  },
                  "variableNames": [
                    {
                      "name": "x",
                      "nodeType": "YulIdentifier",
                      "src": "23606:1:18"
                    }
                  ]
                },
                {
                  "nodeType": "YulAssignment",
                  "src": "23640:25:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "y",
                        "nodeType": "YulIdentifier",
                        "src": "23663:1:18"
                      }
                    ],
                    "functionName": {
                      "name": "cleanup_t_uint256",
                      "nodeType": "YulIdentifier",
                      "src": "23645:17:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "23645:20:18"
                  },
                  "variableNames": [
                    {
                      "name": "y",
                      "nodeType": "YulIdentifier",
                      "src": "23640:1:18"
                    }
                  ]
                },
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "23687:22:18",
                    "statements": [
                      {
                        "expression": {
                          "arguments": [],
                          "functionName": {
                            "name": "panic_error_0x11",
                            "nodeType": "YulIdentifier",
                            "src": "23689:16:18"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "23689:18:18"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "23689:18:18"
                      }
                    ]
                  },
                  "condition": {
                    "arguments": [
                      {
                        "name": "x",
                        "nodeType": "YulIdentifier",
                        "src": "23681:1:18"
                      },
                      {
                        "name": "y",
                        "nodeType": "YulIdentifier",
                        "src": "23684:1:18"
                      }
                    ],
                    "functionName": {
                      "name": "lt",
                      "nodeType": "YulIdentifier",
                      "src": "23678:2:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "23678:8:18"
                  },
                  "nodeType": "YulIf",
                  "src": "23675:34:18"
                },
                {
                  "nodeType": "YulAssignment",
                  "src": "23719:17:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "x",
                        "nodeType": "YulIdentifier",
                        "src": "23731:1:18"
                      },
                      {
                        "name": "y",
                        "nodeType": "YulIdentifier",
                        "src": "23734:1:18"
                      }
                    ],
                    "functionName": {
                      "name": "sub",
                      "nodeType": "YulIdentifier",
                      "src": "23727:3:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "23727:9:18"
                  },
                  "variableNames": [
                    {
                      "name": "diff",
                      "nodeType": "YulIdentifier",
                      "src": "23719:4:18"
                    }
                  ]
                }
              ]
            },
            "name": "checked_sub_t_uint256",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "x",
                "nodeType": "YulTypedName",
                "src": "23582:1:18",
                "type": ""
              },
              {
                "name": "y",
                "nodeType": "YulTypedName",
                "src": "23585:1:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "diff",
                "nodeType": "YulTypedName",
                "src": "23591:4:18",
                "type": ""
              }
            ],
            "src": "23551:191:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "23854:76:18",
              "statements": [
                {
                  "expression": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "memPtr",
                            "nodeType": "YulIdentifier",
                            "src": "23876:6:18"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "23884:1:18",
                            "type": "",
                            "value": "0"
                          }
                        ],
                        "functionName": {
                          "name": "add",
                          "nodeType": "YulIdentifier",
                          "src": "23872:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "23872:14:18"
                      },
                      {
                        "hexValue": "4552433732313a206d696e7420746f20746865207a65726f2061646472657373",
                        "kind": "string",
                        "nodeType": "YulLiteral",
                        "src": "23888:34:18",
                        "type": "",
                        "value": "ERC721: mint to the zero address"
                      }
                    ],
                    "functionName": {
                      "name": "mstore",
                      "nodeType": "YulIdentifier",
                      "src": "23865:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "23865:58:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "23865:58:18"
                }
              ]
            },
            "name": "store_literal_in_memory_8a66f4bb6512ffbfcc3db9b42318eb65f26ac15163eaa9a1e5cfa7bee9d1c7c6",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "memPtr",
                "nodeType": "YulTypedName",
                "src": "23846:6:18",
                "type": ""
              }
            ],
            "src": "23748:182:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "24082:220:18",
              "statements": [
                {
                  "nodeType": "YulAssignment",
                  "src": "24092:74:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "pos",
                        "nodeType": "YulIdentifier",
                        "src": "24158:3:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "24163:2:18",
                        "type": "",
                        "value": "32"
                      }
                    ],
                    "functionName": {
                      "name": "array_storeLengthForEncoding_t_string_memory_ptr_fromStack",
                      "nodeType": "YulIdentifier",
                      "src": "24099:58:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "24099:67:18"
                  },
                  "variableNames": [
                    {
                      "name": "pos",
                      "nodeType": "YulIdentifier",
                      "src": "24092:3:18"
                    }
                  ]
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "name": "pos",
                        "nodeType": "YulIdentifier",
                        "src": "24264:3:18"
                      }
                    ],
                    "functionName": {
                      "name": "store_literal_in_memory_8a66f4bb6512ffbfcc3db9b42318eb65f26ac15163eaa9a1e5cfa7bee9d1c7c6",
                      "nodeType": "YulIdentifier",
                      "src": "24175:88:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "24175:93:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "24175:93:18"
                },
                {
                  "nodeType": "YulAssignment",
                  "src": "24277:19:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "pos",
                        "nodeType": "YulIdentifier",
                        "src": "24288:3:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "24293:2:18",
                        "type": "",
                        "value": "32"
                      }
                    ],
                    "functionName": {
                      "name": "add",
                      "nodeType": "YulIdentifier",
                      "src": "24284:3:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "24284:12:18"
                  },
                  "variableNames": [
                    {
                      "name": "end",
                      "nodeType": "YulIdentifier",
                      "src": "24277:3:18"
                    }
                  ]
                }
              ]
            },
            "name": "abi_encode_t_stringliteral_8a66f4bb6512ffbfcc3db9b42318eb65f26ac15163eaa9a1e5cfa7bee9d1c7c6_to_t_string_memory_ptr_fromStack",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "pos",
                "nodeType": "YulTypedName",
                "src": "24070:3:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "end",
                "nodeType": "YulTypedName",
                "src": "24078:3:18",
                "type": ""
              }
            ],
            "src": "23936:366:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "24479:248:18",
              "statements": [
                {
                  "nodeType": "YulAssignment",
                  "src": "24489:26:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "headStart",
                        "nodeType": "YulIdentifier",
                        "src": "24501:9:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "24512:2:18",
                        "type": "",
                        "value": "32"
                      }
                    ],
                    "functionName": {
                      "name": "add",
                      "nodeType": "YulIdentifier",
                      "src": "24497:3:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "24497:18:18"
                  },
                  "variableNames": [
                    {
                      "name": "tail",
                      "nodeType": "YulIdentifier",
                      "src": "24489:4:18"
                    }
                  ]
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "headStart",
                            "nodeType": "YulIdentifier",
                            "src": "24536:9:18"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "24547:1:18",
                            "type": "",
                            "value": "0"
                          }
                        ],
                        "functionName": {
                          "name": "add",
                          "nodeType": "YulIdentifier",
                          "src": "24532:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "24532:17:18"
                      },
                      {
                        "arguments": [
                          {
                            "name": "tail",
                            "nodeType": "YulIdentifier",
                            "src": "24555:4:18"
                          },
                          {
                            "name": "headStart",
                            "nodeType": "YulIdentifier",
                            "src": "24561:9:18"
                          }
                        ],
                        "functionName": {
                          "name": "sub",
                          "nodeType": "YulIdentifier",
                          "src": "24551:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "24551:20:18"
                      }
                    ],
                    "functionName": {
                      "name": "mstore",
                      "nodeType": "YulIdentifier",
                      "src": "24525:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "24525:47:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "24525:47:18"
                },
                {
                  "nodeType": "YulAssignment",
                  "src": "24581:139:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "tail",
                        "nodeType": "YulIdentifier",
                        "src": "24715:4:18"
                      }
                    ],
                    "functionName": {
                      "name": "abi_encode_t_stringliteral_8a66f4bb6512ffbfcc3db9b42318eb65f26ac15163eaa9a1e5cfa7bee9d1c7c6_to_t_string_memory_ptr_fromStack",
                      "nodeType": "YulIdentifier",
                      "src": "24589:124:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "24589:131:18"
                  },
                  "variableNames": [
                    {
                      "name": "tail",
                      "nodeType": "YulIdentifier",
                      "src": "24581:4:18"
                    }
                  ]
                }
              ]
            },
            "name": "abi_encode_tuple_t_stringliteral_8a66f4bb6512ffbfcc3db9b42318eb65f26ac15163eaa9a1e5cfa7bee9d1c7c6__to_t_string_memory_ptr__fromStack_reversed",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "headStart",
                "nodeType": "YulTypedName",
                "src": "24459:9:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "tail",
                "nodeType": "YulTypedName",
                "src": "24474:4:18",
                "type": ""
              }
            ],
            "src": "24308:419:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "24839:72:18",
              "statements": [
                {
                  "expression": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "memPtr",
                            "nodeType": "YulIdentifier",
                            "src": "24861:6:18"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "24869:1:18",
                            "type": "",
                            "value": "0"
                          }
                        ],
                        "functionName": {
                          "name": "add",
                          "nodeType": "YulIdentifier",
                          "src": "24857:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "24857:14:18"
                      },
                      {
                        "hexValue": "4552433732313a20746f6b656e20616c7265616479206d696e746564",
                        "kind": "string",
                        "nodeType": "YulLiteral",
                        "src": "24873:30:18",
                        "type": "",
                        "value": "ERC721: token already minted"
                      }
                    ],
                    "functionName": {
                      "name": "mstore",
                      "nodeType": "YulIdentifier",
                      "src": "24850:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "24850:54:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "24850:54:18"
                }
              ]
            },
            "name": "store_literal_in_memory_2a63ce106ef95058ed21fd07c42a10f11dc5c32ac13a4e847923f7759f635d57",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "memPtr",
                "nodeType": "YulTypedName",
                "src": "24831:6:18",
                "type": ""
              }
            ],
            "src": "24733:178:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "25063:220:18",
              "statements": [
                {
                  "nodeType": "YulAssignment",
                  "src": "25073:74:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "pos",
                        "nodeType": "YulIdentifier",
                        "src": "25139:3:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "25144:2:18",
                        "type": "",
                        "value": "28"
                      }
                    ],
                    "functionName": {
                      "name": "array_storeLengthForEncoding_t_string_memory_ptr_fromStack",
                      "nodeType": "YulIdentifier",
                      "src": "25080:58:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "25080:67:18"
                  },
                  "variableNames": [
                    {
                      "name": "pos",
                      "nodeType": "YulIdentifier",
                      "src": "25073:3:18"
                    }
                  ]
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "name": "pos",
                        "nodeType": "YulIdentifier",
                        "src": "25245:3:18"
                      }
                    ],
                    "functionName": {
                      "name": "store_literal_in_memory_2a63ce106ef95058ed21fd07c42a10f11dc5c32ac13a4e847923f7759f635d57",
                      "nodeType": "YulIdentifier",
                      "src": "25156:88:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "25156:93:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "25156:93:18"
                },
                {
                  "nodeType": "YulAssignment",
                  "src": "25258:19:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "pos",
                        "nodeType": "YulIdentifier",
                        "src": "25269:3:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "25274:2:18",
                        "type": "",
                        "value": "32"
                      }
                    ],
                    "functionName": {
                      "name": "add",
                      "nodeType": "YulIdentifier",
                      "src": "25265:3:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "25265:12:18"
                  },
                  "variableNames": [
                    {
                      "name": "end",
                      "nodeType": "YulIdentifier",
                      "src": "25258:3:18"
                    }
                  ]
                }
              ]
            },
            "name": "abi_encode_t_stringliteral_2a63ce106ef95058ed21fd07c42a10f11dc5c32ac13a4e847923f7759f635d57_to_t_string_memory_ptr_fromStack",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "pos",
                "nodeType": "YulTypedName",
                "src": "25051:3:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "end",
                "nodeType": "YulTypedName",
                "src": "25059:3:18",
                "type": ""
              }
            ],
            "src": "24917:366:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "25460:248:18",
              "statements": [
                {
                  "nodeType": "YulAssignment",
                  "src": "25470:26:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "headStart",
                        "nodeType": "YulIdentifier",
                        "src": "25482:9:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "25493:2:18",
                        "type": "",
                        "value": "32"
                      }
                    ],
                    "functionName": {
                      "name": "add",
                      "nodeType": "YulIdentifier",
                      "src": "25478:3:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "25478:18:18"
                  },
                  "variableNames": [
                    {
                      "name": "tail",
                      "nodeType": "YulIdentifier",
                      "src": "25470:4:18"
                    }
                  ]
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "headStart",
                            "nodeType": "YulIdentifier",
                            "src": "25517:9:18"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "25528:1:18",
                            "type": "",
                            "value": "0"
                          }
                        ],
                        "functionName": {
                          "name": "add",
                          "nodeType": "YulIdentifier",
                          "src": "25513:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "25513:17:18"
                      },
                      {
                        "arguments": [
                          {
                            "name": "tail",
                            "nodeType": "YulIdentifier",
                            "src": "25536:4:18"
                          },
                          {
                            "name": "headStart",
                            "nodeType": "YulIdentifier",
                            "src": "25542:9:18"
                          }
                        ],
                        "functionName": {
                          "name": "sub",
                          "nodeType": "YulIdentifier",
                          "src": "25532:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "25532:20:18"
                      }
                    ],
                    "functionName": {
                      "name": "mstore",
                      "nodeType": "YulIdentifier",
                      "src": "25506:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "25506:47:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "25506:47:18"
                },
                {
                  "nodeType": "YulAssignment",
                  "src": "25562:139:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "tail",
                        "nodeType": "YulIdentifier",
                        "src": "25696:4:18"
                      }
                    ],
                    "functionName": {
                      "name": "abi_encode_t_stringliteral_2a63ce106ef95058ed21fd07c42a10f11dc5c32ac13a4e847923f7759f635d57_to_t_string_memory_ptr_fromStack",
                      "nodeType": "YulIdentifier",
                      "src": "25570:124:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "25570:131:18"
                  },
                  "variableNames": [
                    {
                      "name": "tail",
                      "nodeType": "YulIdentifier",
                      "src": "25562:4:18"
                    }
                  ]
                }
              ]
            },
            "name": "abi_encode_tuple_t_stringliteral_2a63ce106ef95058ed21fd07c42a10f11dc5c32ac13a4e847923f7759f635d57__to_t_string_memory_ptr__fromStack_reversed",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "headStart",
                "nodeType": "YulTypedName",
                "src": "25440:9:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "tail",
                "nodeType": "YulTypedName",
                "src": "25455:4:18",
                "type": ""
              }
            ],
            "src": "25289:419:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "25772:40:18",
              "statements": [
                {
                  "nodeType": "YulAssignment",
                  "src": "25783:22:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "value",
                        "nodeType": "YulIdentifier",
                        "src": "25799:5:18"
                      }
                    ],
                    "functionName": {
                      "name": "mload",
                      "nodeType": "YulIdentifier",
                      "src": "25793:5:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "25793:12:18"
                  },
                  "variableNames": [
                    {
                      "name": "length",
                      "nodeType": "YulIdentifier",
                      "src": "25783:6:18"
                    }
                  ]
                }
              ]
            },
            "name": "array_length_t_bytes_memory_ptr",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "value",
                "nodeType": "YulTypedName",
                "src": "25755:5:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "length",
                "nodeType": "YulTypedName",
                "src": "25765:6:18",
                "type": ""
              }
            ],
            "src": "25714:98:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "25913:73:18",
              "statements": [
                {
                  "expression": {
                    "arguments": [
                      {
                        "name": "pos",
                        "nodeType": "YulIdentifier",
                        "src": "25930:3:18"
                      },
                      {
                        "name": "length",
                        "nodeType": "YulIdentifier",
                        "src": "25935:6:18"
                      }
                    ],
                    "functionName": {
                      "name": "mstore",
                      "nodeType": "YulIdentifier",
                      "src": "25923:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "25923:19:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "25923:19:18"
                },
                {
                  "nodeType": "YulAssignment",
                  "src": "25951:29:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "pos",
                        "nodeType": "YulIdentifier",
                        "src": "25970:3:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "25975:4:18",
                        "type": "",
                        "value": "0x20"
                      }
                    ],
                    "functionName": {
                      "name": "add",
                      "nodeType": "YulIdentifier",
                      "src": "25966:3:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "25966:14:18"
                  },
                  "variableNames": [
                    {
                      "name": "updated_pos",
                      "nodeType": "YulIdentifier",
                      "src": "25951:11:18"
                    }
                  ]
                }
              ]
            },
            "name": "array_storeLengthForEncoding_t_bytes_memory_ptr_fromStack",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "pos",
                "nodeType": "YulTypedName",
                "src": "25885:3:18",
                "type": ""
              },
              {
                "name": "length",
                "nodeType": "YulTypedName",
                "src": "25890:6:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "updated_pos",
                "nodeType": "YulTypedName",
                "src": "25901:11:18",
                "type": ""
              }
            ],
            "src": "25818:168:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "26082:270:18",
              "statements": [
                {
                  "nodeType": "YulVariableDeclaration",
                  "src": "26092:52:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "value",
                        "nodeType": "YulIdentifier",
                        "src": "26138:5:18"
                      }
                    ],
                    "functionName": {
                      "name": "array_length_t_bytes_memory_ptr",
                      "nodeType": "YulIdentifier",
                      "src": "26106:31:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "26106:38:18"
                  },
                  "variables": [
                    {
                      "name": "length",
                      "nodeType": "YulTypedName",
                      "src": "26096:6:18",
                      "type": ""
                    }
                  ]
                },
                {
                  "nodeType": "YulAssignment",
                  "src": "26153:77:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "pos",
                        "nodeType": "YulIdentifier",
                        "src": "26218:3:18"
                      },
                      {
                        "name": "length",
                        "nodeType": "YulIdentifier",
                        "src": "26223:6:18"
                      }
                    ],
                    "functionName": {
                      "name": "array_storeLengthForEncoding_t_bytes_memory_ptr_fromStack",
                      "nodeType": "YulIdentifier",
                      "src": "26160:57:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "26160:70:18"
                  },
                  "variableNames": [
                    {
                      "name": "pos",
                      "nodeType": "YulIdentifier",
                      "src": "26153:3:18"
                    }
                  ]
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "value",
                            "nodeType": "YulIdentifier",
                            "src": "26265:5:18"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "26272:4:18",
                            "type": "",
                            "value": "0x20"
                          }
                        ],
                        "functionName": {
                          "name": "add",
                          "nodeType": "YulIdentifier",
                          "src": "26261:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "26261:16:18"
                      },
                      {
                        "name": "pos",
                        "nodeType": "YulIdentifier",
                        "src": "26279:3:18"
                      },
                      {
                        "name": "length",
                        "nodeType": "YulIdentifier",
                        "src": "26284:6:18"
                      }
                    ],
                    "functionName": {
                      "name": "copy_memory_to_memory",
                      "nodeType": "YulIdentifier",
                      "src": "26239:21:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "26239:52:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "26239:52:18"
                },
                {
                  "nodeType": "YulAssignment",
                  "src": "26300:46:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "pos",
                        "nodeType": "YulIdentifier",
                        "src": "26311:3:18"
                      },
                      {
                        "arguments": [
                          {
                            "name": "length",
                            "nodeType": "YulIdentifier",
                            "src": "26338:6:18"
                          }
                        ],
                        "functionName": {
                          "name": "round_up_to_mul_of_32",
                          "nodeType": "YulIdentifier",
                          "src": "26316:21:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "26316:29:18"
                      }
                    ],
                    "functionName": {
                      "name": "add",
                      "nodeType": "YulIdentifier",
                      "src": "26307:3:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "26307:39:18"
                  },
                  "variableNames": [
                    {
                      "name": "end",
                      "nodeType": "YulIdentifier",
                      "src": "26300:3:18"
                    }
                  ]
                }
              ]
            },
            "name": "abi_encode_t_bytes_memory_ptr_to_t_bytes_memory_ptr_fromStack",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "value",
                "nodeType": "YulTypedName",
                "src": "26063:5:18",
                "type": ""
              },
              {
                "name": "pos",
                "nodeType": "YulTypedName",
                "src": "26070:3:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "end",
                "nodeType": "YulTypedName",
                "src": "26078:3:18",
                "type": ""
              }
            ],
            "src": "25992:360:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "26558:440:18",
              "statements": [
                {
                  "nodeType": "YulAssignment",
                  "src": "26568:27:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "headStart",
                        "nodeType": "YulIdentifier",
                        "src": "26580:9:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "26591:3:18",
                        "type": "",
                        "value": "128"
                      }
                    ],
                    "functionName": {
                      "name": "add",
                      "nodeType": "YulIdentifier",
                      "src": "26576:3:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "26576:19:18"
                  },
                  "variableNames": [
                    {
                      "name": "tail",
                      "nodeType": "YulIdentifier",
                      "src": "26568:4:18"
                    }
                  ]
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "name": "value0",
                        "nodeType": "YulIdentifier",
                        "src": "26649:6:18"
                      },
                      {
                        "arguments": [
                          {
                            "name": "headStart",
                            "nodeType": "YulIdentifier",
                            "src": "26662:9:18"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "26673:1:18",
                            "type": "",
                            "value": "0"
                          }
                        ],
                        "functionName": {
                          "name": "add",
                          "nodeType": "YulIdentifier",
                          "src": "26658:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "26658:17:18"
                      }
                    ],
                    "functionName": {
                      "name": "abi_encode_t_address_to_t_address_fromStack",
                      "nodeType": "YulIdentifier",
                      "src": "26605:43:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "26605:71:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "26605:71:18"
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "name": "value1",
                        "nodeType": "YulIdentifier",
                        "src": "26730:6:18"
                      },
                      {
                        "arguments": [
                          {
                            "name": "headStart",
                            "nodeType": "YulIdentifier",
                            "src": "26743:9:18"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "26754:2:18",
                            "type": "",
                            "value": "32"
                          }
                        ],
                        "functionName": {
                          "name": "add",
                          "nodeType": "YulIdentifier",
                          "src": "26739:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "26739:18:18"
                      }
                    ],
                    "functionName": {
                      "name": "abi_encode_t_address_to_t_address_fromStack",
                      "nodeType": "YulIdentifier",
                      "src": "26686:43:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "26686:72:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "26686:72:18"
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "name": "value2",
                        "nodeType": "YulIdentifier",
                        "src": "26812:6:18"
                      },
                      {
                        "arguments": [
                          {
                            "name": "headStart",
                            "nodeType": "YulIdentifier",
                            "src": "26825:9:18"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "26836:2:18",
                            "type": "",
                            "value": "64"
                          }
                        ],
                        "functionName": {
                          "name": "add",
                          "nodeType": "YulIdentifier",
                          "src": "26821:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "26821:18:18"
                      }
                    ],
                    "functionName": {
                      "name": "abi_encode_t_uint256_to_t_uint256_fromStack",
                      "nodeType": "YulIdentifier",
                      "src": "26768:43:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "26768:72:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "26768:72:18"
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "headStart",
                            "nodeType": "YulIdentifier",
                            "src": "26861:9:18"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "26872:2:18",
                            "type": "",
                            "value": "96"
                          }
                        ],
                        "functionName": {
                          "name": "add",
                          "nodeType": "YulIdentifier",
                          "src": "26857:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "26857:18:18"
                      },
                      {
                        "arguments": [
                          {
                            "name": "tail",
                            "nodeType": "YulIdentifier",
                            "src": "26881:4:18"
                          },
                          {
                            "name": "headStart",
                            "nodeType": "YulIdentifier",
                            "src": "26887:9:18"
                          }
                        ],
                        "functionName": {
                          "name": "sub",
                          "nodeType": "YulIdentifier",
                          "src": "26877:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "26877:20:18"
                      }
                    ],
                    "functionName": {
                      "name": "mstore",
                      "nodeType": "YulIdentifier",
                      "src": "26850:6:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "26850:48:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "26850:48:18"
                },
                {
                  "nodeType": "YulAssignment",
                  "src": "26907:84:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "value3",
                        "nodeType": "YulIdentifier",
                        "src": "26977:6:18"
                      },
                      {
                        "name": "tail",
                        "nodeType": "YulIdentifier",
                        "src": "26986:4:18"
                      }
                    ],
                    "functionName": {
                      "name": "abi_encode_t_bytes_memory_ptr_to_t_bytes_memory_ptr_fromStack",
                      "nodeType": "YulIdentifier",
                      "src": "26915:61:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "26915:76:18"
                  },
                  "variableNames": [
                    {
                      "name": "tail",
                      "nodeType": "YulIdentifier",
                      "src": "26907:4:18"
                    }
                  ]
                }
              ]
            },
            "name": "abi_encode_tuple_t_address_t_address_t_uint256_t_bytes_memory_ptr__to_t_address_t_address_t_uint256_t_bytes_memory_ptr__fromStack_reversed",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "headStart",
                "nodeType": "YulTypedName",
                "src": "26506:9:18",
                "type": ""
              },
              {
                "name": "value3",
                "nodeType": "YulTypedName",
                "src": "26518:6:18",
                "type": ""
              },
              {
                "name": "value2",
                "nodeType": "YulTypedName",
                "src": "26526:6:18",
                "type": ""
              },
              {
                "name": "value1",
                "nodeType": "YulTypedName",
                "src": "26534:6:18",
                "type": ""
              },
              {
                "name": "value0",
                "nodeType": "YulTypedName",
                "src": "26542:6:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "tail",
                "nodeType": "YulTypedName",
                "src": "26553:4:18",
                "type": ""
              }
            ],
            "src": "26358:640:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "27066:79:18",
              "statements": [
                {
                  "nodeType": "YulAssignment",
                  "src": "27076:22:18",
                  "value": {
                    "arguments": [
                      {
                        "name": "offset",
                        "nodeType": "YulIdentifier",
                        "src": "27091:6:18"
                      }
                    ],
                    "functionName": {
                      "name": "mload",
                      "nodeType": "YulIdentifier",
                      "src": "27085:5:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "27085:13:18"
                  },
                  "variableNames": [
                    {
                      "name": "value",
                      "nodeType": "YulIdentifier",
                      "src": "27076:5:18"
                    }
                  ]
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "name": "value",
                        "nodeType": "YulIdentifier",
                        "src": "27133:5:18"
                      }
                    ],
                    "functionName": {
                      "name": "validator_revert_t_bytes4",
                      "nodeType": "YulIdentifier",
                      "src": "27107:25:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "27107:32:18"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "27107:32:18"
                }
              ]
            },
            "name": "abi_decode_t_bytes4_fromMemory",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "offset",
                "nodeType": "YulTypedName",
                "src": "27044:6:18",
                "type": ""
              },
              {
                "name": "end",
                "nodeType": "YulTypedName",
                "src": "27052:3:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "value",
                "nodeType": "YulTypedName",
                "src": "27060:5:18",
                "type": ""
              }
            ],
            "src": "27004:141:18"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "27227:273:18",
              "statements": [
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "27273:83:18",
                    "statements": [
                      {
                        "expression": {
                          "arguments": [],
                          "functionName": {
                            "name": "revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b",
                            "nodeType": "YulIdentifier",
                            "src": "27275:77:18"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "27275:79:18"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "27275:79:18"
                      }
                    ]
                  },
                  "condition": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "dataEnd",
                            "nodeType": "YulIdentifier",
                            "src": "27248:7:18"
                          },
                          {
                            "name": "headStart",
                            "nodeType": "YulIdentifier",
                            "src": "27257:9:18"
                          }
                        ],
                        "functionName": {
                          "name": "sub",
                          "nodeType": "YulIdentifier",
                          "src": "27244:3:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "27244:23:18"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "27269:2:18",
                        "type": "",
                        "value": "32"
                      }
                    ],
                    "functionName": {
                      "name": "slt",
                      "nodeType": "YulIdentifier",
                      "src": "27240:3:18"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "27240:32:18"
                  },
                  "nodeType": "YulIf",
                  "src": "27237:119:18"
                },
                {
                  "nodeType": "YulBlock",
                  "src": "27366:127:18",
                  "statements": [
                    {
                      "nodeType": "YulVariableDeclaration",
                      "src": "27381:15:18",
                      "value": {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "27395:1:18",
                        "type": "",
                        "value": "0"
                      },
                      "variables": [
                        {
                          "name": "offset",
                          "nodeType": "YulTypedName",
                          "src": "27385:6:18",
                          "type": ""
                        }
                      ]
                    },
                    {
                      "nodeType": "YulAssignment",
                      "src": "27410:73:18",
                      "value": {
                        "arguments": [
                          {
                            "arguments": [
                              {
                                "name": "headStart",
                                "nodeType": "YulIdentifier",
                                "src": "27455:9:18"
                              },
                              {
                                "name": "offset",
                                "nodeType": "YulIdentifier",
                                "src": "27466:6:18"
                              }
                            ],
                            "functionName": {
                              "name": "add",
                              "nodeType": "YulIdentifier",
                              "src": "27451:3:18"
                            },
                            "nodeType": "YulFunctionCall",
                            "src": "27451:22:18"
                          },
                          {
                            "name": "dataEnd",
                            "nodeType": "YulIdentifier",
                            "src": "27475:7:18"
                          }
                        ],
                        "functionName": {
                          "name": "abi_decode_t_bytes4_fromMemory",
                          "nodeType": "YulIdentifier",
                          "src": "27420:30:18"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "27420:63:18"
                      },
                      "variableNames": [
                        {
                          "name": "value0",
                          "nodeType": "YulIdentifier",
                          "src": "27410:6:18"
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            "name": "abi_decode_tuple_t_bytes4_fromMemory",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "headStart",
                "nodeType": "YulTypedName",
                "src": "27197:9:18",
                "type": ""
              },
              {
                "name": "dataEnd",
                "nodeType": "YulTypedName",
                "src": "27208:7:18",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "value0",
                "nodeType": "YulTypedName",
                "src": "27220:6:18",
                "type": ""
              }
            ],
            "src": "27151:349:18"
          }
        ]
      },
      "contents": "{\n\n    function allocate_unbounded() -> memPtr {\n        memPtr := mload(64)\n    }\n\n    function revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b() {\n        revert(0, 0)\n    }\n\n    function revert_error_c1322bf8034eace5e0b5c7295db60986aa89aae5e0ea0873e4689e076861a5db() {\n        revert(0, 0)\n    }\n\n    function cleanup_t_bytes4(value) -> cleaned {\n        cleaned := and(value, 0xffffffff00000000000000000000000000000000000000000000000000000000)\n    }\n\n    function validator_revert_t_bytes4(value) {\n        if iszero(eq(value, cleanup_t_bytes4(value))) { revert(0, 0) }\n    }\n\n    function abi_decode_t_bytes4(offset, end) -> value {\n        value := calldataload(offset)\n        validator_revert_t_bytes4(value)\n    }\n\n    function abi_decode_tuple_t_bytes4(headStart, dataEnd) -> value0 {\n        if slt(sub(dataEnd, headStart), 32) { revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b() }\n\n        {\n\n            let offset := 0\n\n            value0 := abi_decode_t_bytes4(add(headStart, offset), dataEnd)\n        }\n\n    }\n\n    function cleanup_t_bool(value) -> cleaned {\n        cleaned := iszero(iszero(value))\n    }\n\n    function abi_encode_t_bool_to_t_bool_fromStack(value, pos) {\n        mstore(pos, cleanup_t_bool(value))\n    }\n\n    function abi_encode_tuple_t_bool__to_t_bool__fromStack_reversed(headStart , value0) -> tail {\n        tail := add(headStart, 32)\n\n        abi_encode_t_bool_to_t_bool_fromStack(value0,  add(headStart, 0))\n\n    }\n\n    function array_length_t_string_memory_ptr(value) -> length {\n\n        length := mload(value)\n\n    }\n\n    function array_storeLengthForEncoding_t_string_memory_ptr_fromStack(pos, length) -> updated_pos {\n        mstore(pos, length)\n        updated_pos := add(pos, 0x20)\n    }\n\n    function copy_memory_to_memory(src, dst, length) {\n        let i := 0\n        for { } lt(i, length) { i := add(i, 32) }\n        {\n            mstore(add(dst, i), mload(add(src, i)))\n        }\n        if gt(i, length)\n        {\n            // clear end\n            mstore(add(dst, length), 0)\n        }\n    }\n\n    function round_up_to_mul_of_32(value) -> result {\n        result := and(add(value, 31), not(31))\n    }\n\n    function abi_encode_t_string_memory_ptr_to_t_string_memory_ptr_fromStack(value, pos) -> end {\n        let length := array_length_t_string_memory_ptr(value)\n        pos := array_storeLengthForEncoding_t_string_memory_ptr_fromStack(pos, length)\n        copy_memory_to_memory(add(value, 0x20), pos, length)\n        end := add(pos, round_up_to_mul_of_32(length))\n    }\n\n    function abi_encode_tuple_t_string_memory_ptr__to_t_string_memory_ptr__fromStack_reversed(headStart , value0) -> tail {\n        tail := add(headStart, 32)\n\n        mstore(add(headStart, 0), sub(tail, headStart))\n        tail := abi_encode_t_string_memory_ptr_to_t_string_memory_ptr_fromStack(value0,  tail)\n\n    }\n\n    function cleanup_t_uint256(value) -> cleaned {\n        cleaned := value\n    }\n\n    function validator_revert_t_uint256(value) {\n        if iszero(eq(value, cleanup_t_uint256(value))) { revert(0, 0) }\n    }\n\n    function abi_decode_t_uint256(offset, end) -> value {\n        value := calldataload(offset)\n        validator_revert_t_uint256(value)\n    }\n\n    function abi_decode_tuple_t_uint256(headStart, dataEnd) -> value0 {\n        if slt(sub(dataEnd, headStart), 32) { revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b() }\n\n        {\n\n            let offset := 0\n\n            value0 := abi_decode_t_uint256(add(headStart, offset), dataEnd)\n        }\n\n    }\n\n    function cleanup_t_uint160(value) -> cleaned {\n        cleaned := and(value, 0xffffffffffffffffffffffffffffffffffffffff)\n    }\n\n    function cleanup_t_address(value) -> cleaned {\n        cleaned := cleanup_t_uint160(value)\n    }\n\n    function abi_encode_t_address_to_t_address_fromStack(value, pos) {\n        mstore(pos, cleanup_t_address(value))\n    }\n\n    function abi_encode_tuple_t_address__to_t_address__fromStack_reversed(headStart , value0) -> tail {\n        tail := add(headStart, 32)\n\n        abi_encode_t_address_to_t_address_fromStack(value0,  add(headStart, 0))\n\n    }\n\n    function validator_revert_t_address(value) {\n        if iszero(eq(value, cleanup_t_address(value))) { revert(0, 0) }\n    }\n\n    function abi_decode_t_address(offset, end) -> value {\n        value := calldataload(offset)\n        validator_revert_t_address(value)\n    }\n\n    function abi_decode_tuple_t_addresst_uint256(headStart, dataEnd) -> value0, value1 {\n        if slt(sub(dataEnd, headStart), 64) { revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b() }\n\n        {\n\n            let offset := 0\n\n            value0 := abi_decode_t_address(add(headStart, offset), dataEnd)\n        }\n\n        {\n\n            let offset := 32\n\n            value1 := abi_decode_t_uint256(add(headStart, offset), dataEnd)\n        }\n\n    }\n\n    function abi_decode_tuple_t_addresst_addresst_uint256(headStart, dataEnd) -> value0, value1, value2 {\n        if slt(sub(dataEnd, headStart), 96) { revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b() }\n\n        {\n\n            let offset := 0\n\n            value0 := abi_decode_t_address(add(headStart, offset), dataEnd)\n        }\n\n        {\n\n            let offset := 32\n\n            value1 := abi_decode_t_address(add(headStart, offset), dataEnd)\n        }\n\n        {\n\n            let offset := 64\n\n            value2 := abi_decode_t_uint256(add(headStart, offset), dataEnd)\n        }\n\n    }\n\n    function abi_decode_tuple_t_address(headStart, dataEnd) -> value0 {\n        if slt(sub(dataEnd, headStart), 32) { revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b() }\n\n        {\n\n            let offset := 0\n\n            value0 := abi_decode_t_address(add(headStart, offset), dataEnd)\n        }\n\n    }\n\n    function abi_encode_t_uint256_to_t_uint256_fromStack(value, pos) {\n        mstore(pos, cleanup_t_uint256(value))\n    }\n\n    function abi_encode_tuple_t_uint256__to_t_uint256__fromStack_reversed(headStart , value0) -> tail {\n        tail := add(headStart, 32)\n\n        abi_encode_t_uint256_to_t_uint256_fromStack(value0,  add(headStart, 0))\n\n    }\n\n    function revert_error_1b9f4a0a5773e33b91aa01db23bf8c55fce1411167c872835e7fa00a4f17d46d() {\n        revert(0, 0)\n    }\n\n    function revert_error_987264b3b1d58a9c7f8255e93e81c77d86d6299019c33110a076957a3e06e2ae() {\n        revert(0, 0)\n    }\n\n    function panic_error_0x41() {\n        mstore(0, 35408467139433450592217433187231851964531694900788300625387963629091585785856)\n        mstore(4, 0x41)\n        revert(0, 0x24)\n    }\n\n    function finalize_allocation(memPtr, size) {\n        let newFreePtr := add(memPtr, round_up_to_mul_of_32(size))\n        // protect against overflow\n        if or(gt(newFreePtr, 0xffffffffffffffff), lt(newFreePtr, memPtr)) { panic_error_0x41() }\n        mstore(64, newFreePtr)\n    }\n\n    function allocate_memory(size) -> memPtr {\n        memPtr := allocate_unbounded()\n        finalize_allocation(memPtr, size)\n    }\n\n    function array_allocation_size_t_string_memory_ptr(length) -> size {\n        // Make sure we can allocate memory without overflow\n        if gt(length, 0xffffffffffffffff) { panic_error_0x41() }\n\n        size := round_up_to_mul_of_32(length)\n\n        // add length slot\n        size := add(size, 0x20)\n\n    }\n\n    function copy_calldata_to_memory(src, dst, length) {\n        calldatacopy(dst, src, length)\n        // clear end\n        mstore(add(dst, length), 0)\n    }\n\n    function abi_decode_available_length_t_string_memory_ptr(src, length, end) -> array {\n        array := allocate_memory(array_allocation_size_t_string_memory_ptr(length))\n        mstore(array, length)\n        let dst := add(array, 0x20)\n        if gt(add(src, length), end) { revert_error_987264b3b1d58a9c7f8255e93e81c77d86d6299019c33110a076957a3e06e2ae() }\n        copy_calldata_to_memory(src, dst, length)\n    }\n\n    // string\n    function abi_decode_t_string_memory_ptr(offset, end) -> array {\n        if iszero(slt(add(offset, 0x1f), end)) { revert_error_1b9f4a0a5773e33b91aa01db23bf8c55fce1411167c872835e7fa00a4f17d46d() }\n        let length := calldataload(offset)\n        array := abi_decode_available_length_t_string_memory_ptr(add(offset, 0x20), length, end)\n    }\n\n    function abi_decode_tuple_t_addresst_string_memory_ptr(headStart, dataEnd) -> value0, value1 {\n        if slt(sub(dataEnd, headStart), 64) { revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b() }\n\n        {\n\n            let offset := 0\n\n            value0 := abi_decode_t_address(add(headStart, offset), dataEnd)\n        }\n\n        {\n\n            let offset := calldataload(add(headStart, 32))\n            if gt(offset, 0xffffffffffffffff) { revert_error_c1322bf8034eace5e0b5c7295db60986aa89aae5e0ea0873e4689e076861a5db() }\n\n            value1 := abi_decode_t_string_memory_ptr(add(headStart, offset), dataEnd)\n        }\n\n    }\n\n    function validator_revert_t_bool(value) {\n        if iszero(eq(value, cleanup_t_bool(value))) { revert(0, 0) }\n    }\n\n    function abi_decode_t_bool(offset, end) -> value {\n        value := calldataload(offset)\n        validator_revert_t_bool(value)\n    }\n\n    function abi_decode_tuple_t_addresst_bool(headStart, dataEnd) -> value0, value1 {\n        if slt(sub(dataEnd, headStart), 64) { revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b() }\n\n        {\n\n            let offset := 0\n\n            value0 := abi_decode_t_address(add(headStart, offset), dataEnd)\n        }\n\n        {\n\n            let offset := 32\n\n            value1 := abi_decode_t_bool(add(headStart, offset), dataEnd)\n        }\n\n    }\n\n    function array_allocation_size_t_bytes_memory_ptr(length) -> size {\n        // Make sure we can allocate memory without overflow\n        if gt(length, 0xffffffffffffffff) { panic_error_0x41() }\n\n        size := round_up_to_mul_of_32(length)\n\n        // add length slot\n        size := add(size, 0x20)\n\n    }\n\n    function abi_decode_available_length_t_bytes_memory_ptr(src, length, end) -> array {\n        array := allocate_memory(array_allocation_size_t_bytes_memory_ptr(length))\n        mstore(array, length)\n        let dst := add(array, 0x20)\n        if gt(add(src, length), end) { revert_error_987264b3b1d58a9c7f8255e93e81c77d86d6299019c33110a076957a3e06e2ae() }\n        copy_calldata_to_memory(src, dst, length)\n    }\n\n    // bytes\n    function abi_decode_t_bytes_memory_ptr(offset, end) -> array {\n        if iszero(slt(add(offset, 0x1f), end)) { revert_error_1b9f4a0a5773e33b91aa01db23bf8c55fce1411167c872835e7fa00a4f17d46d() }\n        let length := calldataload(offset)\n        array := abi_decode_available_length_t_bytes_memory_ptr(add(offset, 0x20), length, end)\n    }\n\n    function abi_decode_tuple_t_addresst_addresst_uint256t_bytes_memory_ptr(headStart, dataEnd) -> value0, value1, value2, value3 {\n        if slt(sub(dataEnd, headStart), 128) { revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b() }\n\n        {\n\n            let offset := 0\n\n            value0 := abi_decode_t_address(add(headStart, offset), dataEnd)\n        }\n\n        {\n\n            let offset := 32\n\n            value1 := abi_decode_t_address(add(headStart, offset), dataEnd)\n        }\n\n        {\n\n            let offset := 64\n\n            value2 := abi_decode_t_uint256(add(headStart, offset), dataEnd)\n        }\n\n        {\n\n            let offset := calldataload(add(headStart, 96))\n            if gt(offset, 0xffffffffffffffff) { revert_error_c1322bf8034eace5e0b5c7295db60986aa89aae5e0ea0873e4689e076861a5db() }\n\n            value3 := abi_decode_t_bytes_memory_ptr(add(headStart, offset), dataEnd)\n        }\n\n    }\n\n    function abi_decode_tuple_t_addresst_address(headStart, dataEnd) -> value0, value1 {\n        if slt(sub(dataEnd, headStart), 64) { revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b() }\n\n        {\n\n            let offset := 0\n\n            value0 := abi_decode_t_address(add(headStart, offset), dataEnd)\n        }\n\n        {\n\n            let offset := 32\n\n            value1 := abi_decode_t_address(add(headStart, offset), dataEnd)\n        }\n\n    }\n\n    function panic_error_0x22() {\n        mstore(0, 35408467139433450592217433187231851964531694900788300625387963629091585785856)\n        mstore(4, 0x22)\n        revert(0, 0x24)\n    }\n\n    function extract_byte_array_length(data) -> length {\n        length := div(data, 2)\n        let outOfPlaceEncoding := and(data, 1)\n        if iszero(outOfPlaceEncoding) {\n            length := and(length, 0x7f)\n        }\n\n        if eq(outOfPlaceEncoding, lt(length, 32)) {\n            panic_error_0x22()\n        }\n    }\n\n    function store_literal_in_memory_b51b4875eede07862961e8f9365c6749f5fe55c6ee5d7a9e42b6912ad0b15942(memPtr) {\n\n        mstore(add(memPtr, 0), \"ERC721: approval to current owne\")\n\n        mstore(add(memPtr, 32), \"r\")\n\n    }\n\n    function abi_encode_t_stringliteral_b51b4875eede07862961e8f9365c6749f5fe55c6ee5d7a9e42b6912ad0b15942_to_t_string_memory_ptr_fromStack(pos) -> end {\n        pos := array_storeLengthForEncoding_t_string_memory_ptr_fromStack(pos, 33)\n        store_literal_in_memory_b51b4875eede07862961e8f9365c6749f5fe55c6ee5d7a9e42b6912ad0b15942(pos)\n        end := add(pos, 64)\n    }\n\n    function abi_encode_tuple_t_stringliteral_b51b4875eede07862961e8f9365c6749f5fe55c6ee5d7a9e42b6912ad0b15942__to_t_string_memory_ptr__fromStack_reversed(headStart ) -> tail {\n        tail := add(headStart, 32)\n\n        mstore(add(headStart, 0), sub(tail, headStart))\n        tail := abi_encode_t_stringliteral_b51b4875eede07862961e8f9365c6749f5fe55c6ee5d7a9e42b6912ad0b15942_to_t_string_memory_ptr_fromStack( tail)\n\n    }\n\n    function store_literal_in_memory_6d83cef3e0cb19b8320a9c5feb26b56bbb08f152a8e61b12eca3302d8d68b23d(memPtr) {\n\n        mstore(add(memPtr, 0), \"ERC721: approve caller is not ow\")\n\n        mstore(add(memPtr, 32), \"ner nor approved for all\")\n\n    }\n\n    function abi_encode_t_stringliteral_6d83cef3e0cb19b8320a9c5feb26b56bbb08f152a8e61b12eca3302d8d68b23d_to_t_string_memory_ptr_fromStack(pos) -> end {\n        pos := array_storeLengthForEncoding_t_string_memory_ptr_fromStack(pos, 56)\n        store_literal_in_memory_6d83cef3e0cb19b8320a9c5feb26b56bbb08f152a8e61b12eca3302d8d68b23d(pos)\n        end := add(pos, 64)\n    }\n\n    function abi_encode_tuple_t_stringliteral_6d83cef3e0cb19b8320a9c5feb26b56bbb08f152a8e61b12eca3302d8d68b23d__to_t_string_memory_ptr__fromStack_reversed(headStart ) -> tail {\n        tail := add(headStart, 32)\n\n        mstore(add(headStart, 0), sub(tail, headStart))\n        tail := abi_encode_t_stringliteral_6d83cef3e0cb19b8320a9c5feb26b56bbb08f152a8e61b12eca3302d8d68b23d_to_t_string_memory_ptr_fromStack( tail)\n\n    }\n\n    function store_literal_in_memory_c8682f3ad98807db59a6ec6bb812b72fed0a66e3150fa8239699ee83885247f2(memPtr) {\n\n        mstore(add(memPtr, 0), \"ERC721: transfer caller is not o\")\n\n        mstore(add(memPtr, 32), \"wner nor approved\")\n\n    }\n\n    function abi_encode_t_stringliteral_c8682f3ad98807db59a6ec6bb812b72fed0a66e3150fa8239699ee83885247f2_to_t_string_memory_ptr_fromStack(pos) -> end {\n        pos := array_storeLengthForEncoding_t_string_memory_ptr_fromStack(pos, 49)\n        store_literal_in_memory_c8682f3ad98807db59a6ec6bb812b72fed0a66e3150fa8239699ee83885247f2(pos)\n        end := add(pos, 64)\n    }\n\n    function abi_encode_tuple_t_stringliteral_c8682f3ad98807db59a6ec6bb812b72fed0a66e3150fa8239699ee83885247f2__to_t_string_memory_ptr__fromStack_reversed(headStart ) -> tail {\n        tail := add(headStart, 32)\n\n        mstore(add(headStart, 0), sub(tail, headStart))\n        tail := abi_encode_t_stringliteral_c8682f3ad98807db59a6ec6bb812b72fed0a66e3150fa8239699ee83885247f2_to_t_string_memory_ptr_fromStack( tail)\n\n    }\n\n    function store_literal_in_memory_7481f3df2a424c0755a1ad2356614e9a5a358d461ea2eae1f89cb21cbad00397(memPtr) {\n\n        mstore(add(memPtr, 0), \"ERC721: owner query for nonexist\")\n\n        mstore(add(memPtr, 32), \"ent token\")\n\n    }\n\n    function abi_encode_t_stringliteral_7481f3df2a424c0755a1ad2356614e9a5a358d461ea2eae1f89cb21cbad00397_to_t_string_memory_ptr_fromStack(pos) -> end {\n        pos := array_storeLengthForEncoding_t_string_memory_ptr_fromStack(pos, 41)\n        store_literal_in_memory_7481f3df2a424c0755a1ad2356614e9a5a358d461ea2eae1f89cb21cbad00397(pos)\n        end := add(pos, 64)\n    }\n\n    function abi_encode_tuple_t_stringliteral_7481f3df2a424c0755a1ad2356614e9a5a358d461ea2eae1f89cb21cbad00397__to_t_string_memory_ptr__fromStack_reversed(headStart ) -> tail {\n        tail := add(headStart, 32)\n\n        mstore(add(headStart, 0), sub(tail, headStart))\n        tail := abi_encode_t_stringliteral_7481f3df2a424c0755a1ad2356614e9a5a358d461ea2eae1f89cb21cbad00397_to_t_string_memory_ptr_fromStack( tail)\n\n    }\n\n    function store_literal_in_memory_7395d4d3901c50cdfcab223d072f9aa36241df5d883e62cbf147ee1b05a9e6ba(memPtr) {\n\n        mstore(add(memPtr, 0), \"ERC721: balance query for the ze\")\n\n        mstore(add(memPtr, 32), \"ro address\")\n\n    }\n\n    function abi_encode_t_stringliteral_7395d4d3901c50cdfcab223d072f9aa36241df5d883e62cbf147ee1b05a9e6ba_to_t_string_memory_ptr_fromStack(pos) -> end {\n        pos := array_storeLengthForEncoding_t_string_memory_ptr_fromStack(pos, 42)\n        store_literal_in_memory_7395d4d3901c50cdfcab223d072f9aa36241df5d883e62cbf147ee1b05a9e6ba(pos)\n        end := add(pos, 64)\n    }\n\n    function abi_encode_tuple_t_stringliteral_7395d4d3901c50cdfcab223d072f9aa36241df5d883e62cbf147ee1b05a9e6ba__to_t_string_memory_ptr__fromStack_reversed(headStart ) -> tail {\n        tail := add(headStart, 32)\n\n        mstore(add(headStart, 0), sub(tail, headStart))\n        tail := abi_encode_t_stringliteral_7395d4d3901c50cdfcab223d072f9aa36241df5d883e62cbf147ee1b05a9e6ba_to_t_string_memory_ptr_fromStack( tail)\n\n    }\n\n    function panic_error_0x11() {\n        mstore(0, 35408467139433450592217433187231851964531694900788300625387963629091585785856)\n        mstore(4, 0x11)\n        revert(0, 0x24)\n    }\n\n    function checked_add_t_uint256(x, y) -> sum {\n        x := cleanup_t_uint256(x)\n        y := cleanup_t_uint256(y)\n\n        // overflow, if x > (maxValue - y)\n        if gt(x, sub(0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff, y)) { panic_error_0x11() }\n\n        sum := add(x, y)\n    }\n\n    function store_literal_in_memory_45fe4329685be5ecd250fd0e6a25aea0ea4d0e30fb6a73c118b95749e6d70d05(memPtr) {\n\n        mstore(add(memPtr, 0), \"ERC721: approve to caller\")\n\n    }\n\n    function abi_encode_t_stringliteral_45fe4329685be5ecd250fd0e6a25aea0ea4d0e30fb6a73c118b95749e6d70d05_to_t_string_memory_ptr_fromStack(pos) -> end {\n        pos := array_storeLengthForEncoding_t_string_memory_ptr_fromStack(pos, 25)\n        store_literal_in_memory_45fe4329685be5ecd250fd0e6a25aea0ea4d0e30fb6a73c118b95749e6d70d05(pos)\n        end := add(pos, 32)\n    }\n\n    function abi_encode_tuple_t_stringliteral_45fe4329685be5ecd250fd0e6a25aea0ea4d0e30fb6a73c118b95749e6d70d05__to_t_string_memory_ptr__fromStack_reversed(headStart ) -> tail {\n        tail := add(headStart, 32)\n\n        mstore(add(headStart, 0), sub(tail, headStart))\n        tail := abi_encode_t_stringliteral_45fe4329685be5ecd250fd0e6a25aea0ea4d0e30fb6a73c118b95749e6d70d05_to_t_string_memory_ptr_fromStack( tail)\n\n    }\n\n    function store_literal_in_memory_1e766a06da43a53d0f4c380e06e5a342e14d5af1bf8501996c844905530ca84e(memPtr) {\n\n        mstore(add(memPtr, 0), \"ERC721: transfer to non ERC721Re\")\n\n        mstore(add(memPtr, 32), \"ceiver implementer\")\n\n    }\n\n    function abi_encode_t_stringliteral_1e766a06da43a53d0f4c380e06e5a342e14d5af1bf8501996c844905530ca84e_to_t_string_memory_ptr_fromStack(pos) -> end {\n        pos := array_storeLengthForEncoding_t_string_memory_ptr_fromStack(pos, 50)\n        store_literal_in_memory_1e766a06da43a53d0f4c380e06e5a342e14d5af1bf8501996c844905530ca84e(pos)\n        end := add(pos, 64)\n    }\n\n    function abi_encode_tuple_t_stringliteral_1e766a06da43a53d0f4c380e06e5a342e14d5af1bf8501996c844905530ca84e__to_t_string_memory_ptr__fromStack_reversed(headStart ) -> tail {\n        tail := add(headStart, 32)\n\n        mstore(add(headStart, 0), sub(tail, headStart))\n        tail := abi_encode_t_stringliteral_1e766a06da43a53d0f4c380e06e5a342e14d5af1bf8501996c844905530ca84e_to_t_string_memory_ptr_fromStack( tail)\n\n    }\n\n    function store_literal_in_memory_5797d1ccb08b83980dd0c07ea40d8f6a64d35fff736a19bdd17522954cb0899c(memPtr) {\n\n        mstore(add(memPtr, 0), \"ERC721: operator query for nonex\")\n\n        mstore(add(memPtr, 32), \"istent token\")\n\n    }\n\n    function abi_encode_t_stringliteral_5797d1ccb08b83980dd0c07ea40d8f6a64d35fff736a19bdd17522954cb0899c_to_t_string_memory_ptr_fromStack(pos) -> end {\n        pos := array_storeLengthForEncoding_t_string_memory_ptr_fromStack(pos, 44)\n        store_literal_in_memory_5797d1ccb08b83980dd0c07ea40d8f6a64d35fff736a19bdd17522954cb0899c(pos)\n        end := add(pos, 64)\n    }\n\n    function abi_encode_tuple_t_stringliteral_5797d1ccb08b83980dd0c07ea40d8f6a64d35fff736a19bdd17522954cb0899c__to_t_string_memory_ptr__fromStack_reversed(headStart ) -> tail {\n        tail := add(headStart, 32)\n\n        mstore(add(headStart, 0), sub(tail, headStart))\n        tail := abi_encode_t_stringliteral_5797d1ccb08b83980dd0c07ea40d8f6a64d35fff736a19bdd17522954cb0899c_to_t_string_memory_ptr_fromStack( tail)\n\n    }\n\n    function store_literal_in_memory_277f8ee9d5b4fc3c4149386f24de0fc1bbc63a8210e2197bfd1c0376a2ac5f48(memPtr) {\n\n        mstore(add(memPtr, 0), \"ERC721: transfer from incorrect \")\n\n        mstore(add(memPtr, 32), \"owner\")\n\n    }\n\n    function abi_encode_t_stringliteral_277f8ee9d5b4fc3c4149386f24de0fc1bbc63a8210e2197bfd1c0376a2ac5f48_to_t_string_memory_ptr_fromStack(pos) -> end {\n        pos := array_storeLengthForEncoding_t_string_memory_ptr_fromStack(pos, 37)\n        store_literal_in_memory_277f8ee9d5b4fc3c4149386f24de0fc1bbc63a8210e2197bfd1c0376a2ac5f48(pos)\n        end := add(pos, 64)\n    }\n\n    function abi_encode_tuple_t_stringliteral_277f8ee9d5b4fc3c4149386f24de0fc1bbc63a8210e2197bfd1c0376a2ac5f48__to_t_string_memory_ptr__fromStack_reversed(headStart ) -> tail {\n        tail := add(headStart, 32)\n\n        mstore(add(headStart, 0), sub(tail, headStart))\n        tail := abi_encode_t_stringliteral_277f8ee9d5b4fc3c4149386f24de0fc1bbc63a8210e2197bfd1c0376a2ac5f48_to_t_string_memory_ptr_fromStack( tail)\n\n    }\n\n    function store_literal_in_memory_455fea98ea03c32d7dd1a6f1426917d80529bf47b3ccbde74e7206e889e709f4(memPtr) {\n\n        mstore(add(memPtr, 0), \"ERC721: transfer to the zero add\")\n\n        mstore(add(memPtr, 32), \"ress\")\n\n    }\n\n    function abi_encode_t_stringliteral_455fea98ea03c32d7dd1a6f1426917d80529bf47b3ccbde74e7206e889e709f4_to_t_string_memory_ptr_fromStack(pos) -> end {\n        pos := array_storeLengthForEncoding_t_string_memory_ptr_fromStack(pos, 36)\n        store_literal_in_memory_455fea98ea03c32d7dd1a6f1426917d80529bf47b3ccbde74e7206e889e709f4(pos)\n        end := add(pos, 64)\n    }\n\n    function abi_encode_tuple_t_stringliteral_455fea98ea03c32d7dd1a6f1426917d80529bf47b3ccbde74e7206e889e709f4__to_t_string_memory_ptr__fromStack_reversed(headStart ) -> tail {\n        tail := add(headStart, 32)\n\n        mstore(add(headStart, 0), sub(tail, headStart))\n        tail := abi_encode_t_stringliteral_455fea98ea03c32d7dd1a6f1426917d80529bf47b3ccbde74e7206e889e709f4_to_t_string_memory_ptr_fromStack( tail)\n\n    }\n\n    function checked_sub_t_uint256(x, y) -> diff {\n        x := cleanup_t_uint256(x)\n        y := cleanup_t_uint256(y)\n\n        if lt(x, y) { panic_error_0x11() }\n\n        diff := sub(x, y)\n    }\n\n    function store_literal_in_memory_8a66f4bb6512ffbfcc3db9b42318eb65f26ac15163eaa9a1e5cfa7bee9d1c7c6(memPtr) {\n\n        mstore(add(memPtr, 0), \"ERC721: mint to the zero address\")\n\n    }\n\n    function abi_encode_t_stringliteral_8a66f4bb6512ffbfcc3db9b42318eb65f26ac15163eaa9a1e5cfa7bee9d1c7c6_to_t_string_memory_ptr_fromStack(pos) -> end {\n        pos := array_storeLengthForEncoding_t_string_memory_ptr_fromStack(pos, 32)\n        store_literal_in_memory_8a66f4bb6512ffbfcc3db9b42318eb65f26ac15163eaa9a1e5cfa7bee9d1c7c6(pos)\n        end := add(pos, 32)\n    }\n\n    function abi_encode_tuple_t_stringliteral_8a66f4bb6512ffbfcc3db9b42318eb65f26ac15163eaa9a1e5cfa7bee9d1c7c6__to_t_string_memory_ptr__fromStack_reversed(headStart ) -> tail {\n        tail := add(headStart, 32)\n\n        mstore(add(headStart, 0), sub(tail, headStart))\n        tail := abi_encode_t_stringliteral_8a66f4bb6512ffbfcc3db9b42318eb65f26ac15163eaa9a1e5cfa7bee9d1c7c6_to_t_string_memory_ptr_fromStack( tail)\n\n    }\n\n    function store_literal_in_memory_2a63ce106ef95058ed21fd07c42a10f11dc5c32ac13a4e847923f7759f635d57(memPtr) {\n\n        mstore(add(memPtr, 0), \"ERC721: token already minted\")\n\n    }\n\n    function abi_encode_t_stringliteral_2a63ce106ef95058ed21fd07c42a10f11dc5c32ac13a4e847923f7759f635d57_to_t_string_memory_ptr_fromStack(pos) -> end {\n        pos := array_storeLengthForEncoding_t_string_memory_ptr_fromStack(pos, 28)\n        store_literal_in_memory_2a63ce106ef95058ed21fd07c42a10f11dc5c32ac13a4e847923f7759f635d57(pos)\n        end := add(pos, 32)\n    }\n\n    function abi_encode_tuple_t_stringliteral_2a63ce106ef95058ed21fd07c42a10f11dc5c32ac13a4e847923f7759f635d57__to_t_string_memory_ptr__fromStack_reversed(headStart ) -> tail {\n        tail := add(headStart, 32)\n\n        mstore(add(headStart, 0), sub(tail, headStart))\n        tail := abi_encode_t_stringliteral_2a63ce106ef95058ed21fd07c42a10f11dc5c32ac13a4e847923f7759f635d57_to_t_string_memory_ptr_fromStack( tail)\n\n    }\n\n    function array_length_t_bytes_memory_ptr(value) -> length {\n\n        length := mload(value)\n\n    }\n\n    function array_storeLengthForEncoding_t_bytes_memory_ptr_fromStack(pos, length) -> updated_pos {\n        mstore(pos, length)\n        updated_pos := add(pos, 0x20)\n    }\n\n    function abi_encode_t_bytes_memory_ptr_to_t_bytes_memory_ptr_fromStack(value, pos) -> end {\n        let length := array_length_t_bytes_memory_ptr(value)\n        pos := array_storeLengthForEncoding_t_bytes_memory_ptr_fromStack(pos, length)\n        copy_memory_to_memory(add(value, 0x20), pos, length)\n        end := add(pos, round_up_to_mul_of_32(length))\n    }\n\n    function abi_encode_tuple_t_address_t_address_t_uint256_t_bytes_memory_ptr__to_t_address_t_address_t_uint256_t_bytes_memory_ptr__fromStack_reversed(headStart , value3, value2, value1, value0) -> tail {\n        tail := add(headStart, 128)\n\n        abi_encode_t_address_to_t_address_fromStack(value0,  add(headStart, 0))\n\n        abi_encode_t_address_to_t_address_fromStack(value1,  add(headStart, 32))\n\n        abi_encode_t_uint256_to_t_uint256_fromStack(value2,  add(headStart, 64))\n\n        mstore(add(headStart, 96), sub(tail, headStart))\n        tail := abi_encode_t_bytes_memory_ptr_to_t_bytes_memory_ptr_fromStack(value3,  tail)\n\n    }\n\n    function abi_decode_t_bytes4_fromMemory(offset, end) -> value {\n        value := mload(offset)\n        validator_revert_t_bytes4(value)\n    }\n\n    function abi_decode_tuple_t_bytes4_fromMemory(headStart, dataEnd) -> value0 {\n        if slt(sub(dataEnd, headStart), 32) { revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b() }\n\n        {\n\n            let offset := 0\n\n            value0 := abi_decode_t_bytes4_fromMemory(add(headStart, offset), dataEnd)\n        }\n\n    }\n\n}\n",
      "id": 18,
      "language": "Yul",
      "name": "#utility.yul"
    }
  ],
  "sourceMap": "242:820:2:-:0;;;362:67;;;;;;;;;;1360:115:8;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1434:5;1426;:13;;;;;;;;;;;;:::i;:::-;;1460:7;1450;:17;;;;;;;;;;;;:::i;:::-;;1360:115;;242:820:2;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;:::o;7:180:18:-;55:77;52:1;45:88;152:4;149:1;142:15;176:4;173:1;166:15;193:320;237:6;274:1;268:4;264:12;254:22;;321:1;315:4;311:12;342:18;332:81;;398:4;390:6;386:17;376:27;;332:81;460:2;452:6;449:14;429:18;426:38;423:84;;;479:18;;:::i;:::-;423:84;244:269;193:320;;;:::o;242:820:2:-;;;;;;;",
  "deployedSourceMap": "242:820:2:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1547:321:8;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;2553:100;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;3930:152;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;3409:455;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;5663:374;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;6108:202;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;2219:267;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;1932:225;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;2722:104;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;437:84:2;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;686:373;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;4154:306:8;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;6381:391;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;529:149:2;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;4531:179:8;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;1547:321;1649:4;1717:25;1702:40;;;:11;:40;;;;:105;;;;1774:33;1759:48;;;:11;:48;;;;1702:105;:158;;;;1824:36;1848:11;1824:23;:36::i;:::-;1702:158;1682:178;;1547:321;;;:::o;2553:100::-;2607:13;2640:5;2633:12;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2553:100;:::o;3930:152::-;4006:7;4050:15;:24;4066:7;4050:24;;;;;;;;;;;;;;;;;;;;;4043:31;;3930:152;;;:::o;3409:455::-;3507:13;3523:16;3531:7;3523;:16::i;:::-;3507:32;;3564:5;3558:11;;:2;:11;;;;3550:57;;;;;;;;;;;;:::i;:::-;;;;;;;;;3642:5;3628:19;;:10;:19;;;:58;;;;3651:35;3668:5;3675:10;3651:16;:35::i;:::-;3628:58;3620:150;;;;;;;;;;;;:::i;:::-;;;;;;;;;3810:2;3783:15;:24;3799:7;3783:24;;;;;;;;;;;;:29;;;;;;;;;;;;;;;;;;3848:7;3844:2;3828:28;;3837:5;3828:28;;;;;;;;;;;;3479:385;3409:455;;:::o;5663:374::-;5828:16;5836:7;5828;:16::i;:::-;5820:24;;:4;:24;;;5812:33;;;;;;5877:1;5863:16;;:2;:16;;;;5855:25;;;;;;5898:39;5917:10;5929:7;5898:18;:39::i;:::-;5890:101;;;;;;;;;;;;:::i;:::-;;;;;;;;;6001:28;6011:4;6017:2;6021:7;6001:9;:28::i;:::-;5663:374;;;:::o;6108:202::-;6263:39;6280:4;6286:2;6290:7;6263:39;;;;;;;;;;;;:16;:39::i;:::-;6108:202;;;:::o;2219:267::-;2291:7;2328:13;2344:7;:16;2352:7;2344:16;;;;;;;;;;;;;;;;;;;;;2328:32;;2396:1;2379:19;;:5;:19;;;;2371:73;;;;;;;;;;;;:::i;:::-;;;;;;;;;2462:7;:16;2470:7;2462:16;;;;;;;;;;;;;;;;;;;;;2455:23;;;2219:267;;;:::o;1932:225::-;2004:7;2066:1;2049:19;;:5;:19;;;;2041:74;;;;;;;;;;;;:::i;:::-;;;;;;;;;2133:9;:16;2143:5;2133:16;;;;;;;;;;;;;;;;2126:23;;1932:225;;;:::o;2722:104::-;2778:13;2811:7;2804:14;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2722:104;:::o;437:84:2:-;477:7;504:9;;497:16;;437:84;:::o;686:373::-;755:7;928:15;956:1;946:9;:7;:9::i;:::-;:11;;;;:::i;:::-;928:29;;968:17;974:2;977:7;968:5;:17::i;:::-;1017:9;996;:18;1006:7;996:18;;;;;;;;;;;:30;;;;;;;;;;;;:::i;:::-;;1044:7;1037:14;;;686:373;;;;:::o;4154:306:8:-;4286:10;4274:22;;:8;:22;;;;4266:60;;;;;;;;;;;;:::i;:::-;;;;;;;;;4382:8;4339:18;:30;4358:10;4339:30;;;;;;;;;;;;;;;:40;4370:8;4339:40;;;;;;;;;;;;;;;;:51;;;;;;;;;;;;;;;;;;4433:8;4406:46;;4421:10;4406:46;;;4443:8;4406:46;;;;;;:::i;:::-;;;;;;;;4154:306;;:::o;6381:391::-;6571:48;6594:4;6600:2;6604:7;6613:5;6571:22;:48::i;:::-;6563:111;;;;;;;;;;;;:::i;:::-;;;;;;;;;6684:31;6697:4;6703:2;6707:7;6684:12;:31::i;:::-;6725:39;6739:4;6745:2;6749:7;6758:5;6725:13;:39::i;:::-;6381:391;;;;:::o;529:149:2:-;602:13;652:9;:18;662:7;652:18;;;;;;;;;;;645:25;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;529:149;;;:::o;4531:179:8:-;4628:4;4667:18;:25;4686:5;4667:25;;;;;;;;;;;;;;;:35;4693:8;4667:35;;;;;;;;;;;;;;;;;;;;;;;;;4660:42;;4531:179;;;;:::o;854:157:15:-;939:4;978:25;963:40;;;:11;:40;;;;956:47;;854:157;;;:::o;5263:333:8:-;5348:4;5373:16;5381:7;5373;:16::i;:::-;5365:73;;;;;;;;;;;;:::i;:::-;;;;;;;;;5449:13;5465:16;5473:7;5465;:16::i;:::-;5449:32;;5511:5;5500:16;;:7;:16;;;:51;;;;5544:7;5520:31;;:20;5532:7;5520:11;:20::i;:::-;:31;;;5500:51;:87;;;;5555:32;5572:5;5579:7;5555:16;:32::i;:::-;5500:87;5492:96;;;5263:333;;;;:::o;8997:625::-;9156:4;9129:31;;:23;9144:7;9129:14;:23::i;:::-;:31;;;9121:81;;;;;;;;;;;;:::i;:::-;;;;;;;;;9235:1;9221:16;;:2;:16;;;;9213:65;;;;;;;;;;;;:::i;:::-;;;;;;;;;9291:39;9312:4;9318:2;9322:7;9291:20;:39::i;:::-;9395:29;9412:1;9416:7;9395:8;:29::i;:::-;9456:1;9437:9;:15;9447:4;9437:15;;;;;;;;;;;;;;;;:20;;;;;;;:::i;:::-;;;;;;;;9485:1;9468:9;:13;9478:2;9468:13;;;;;;;;;;;;;;;;:18;;;;;;;:::i;:::-;;;;;;;;9516:2;9497:7;:16;9505:7;9497:16;;;;;;;;;;;;:21;;;;;;;;;;;;;;;;;;9555:7;9551:2;9536:27;;9545:4;9536:27;;;;;;;;;;;;9576:38;9596:4;9602:2;9606:7;9576:19;:38::i;:::-;8997:625;;;:::o;7431:452::-;7542:1;7528:16;;:2;:16;;;;7520:61;;;;;;;;;;;;:::i;:::-;;;;;;;;;7601:16;7609:7;7601;:16::i;:::-;7600:17;7592:58;;;;;;;;;;;;:::i;:::-;;;;;;;;;7663:45;7692:1;7696:2;7700:7;7663:20;:45::i;:::-;7738:2;7719:7;:16;7727:7;7719:16;;;;;;;;;;;;:21;;;;;;;;;;;;;;;;;;7768:1;7751:9;:13;7761:2;7751:13;;;;;;;;;;;;;;;;:18;;;;;;;:::i;:::-;;;;;;;;7812:7;7808:2;7787:33;;7804:1;7787:33;;;;;;;;;;;;7831:44;7859:1;7863:2;7867:7;7831:19;:44::i;:::-;7431:452;;:::o;4718:378::-;4840:4;4867:15;:2;:13;;;:15::i;:::-;4866:16;:36;;;;;4900:1;4886:16;;:2;:16;;;;4866:36;4862:80;;;4926:4;4919:11;;;;4862:80;4956:13;4988:2;4972:36;;;5009:10;5021:4;5027:7;5036:5;4972:70;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;4956:86;;688:10;5071:16;;5061:26;;;:6;:26;;;;5053:35;;;4718:378;;;;;;;:::o;6780:315::-;6937:28;6947:4;6953:2;6957:7;6937:9;:28::i;:::-;6984:48;7007:4;7013:2;7017:7;7026:5;6984:22;:48::i;:::-;6976:111;;;;;;;;;;;;:::i;:::-;;;;;;;;;6780:315;;;;:::o;5104:151::-;5161:4;5178:13;5194:7;:16;5202:7;5194:16;;;;;;;;;;;;;;;;;;;;;5178:32;;5245:1;5228:19;;:5;:19;;;;5221:26;;;5104:151;;;:::o;8863:126::-;;;;:::o;8548:174::-;8650:2;8623:15;:24;8639:7;8623:24;;;;;;;;;;;;:29;;;;;;;;;;;;;;;;;;8706:7;8702:2;8668:46;;8677:23;8692:7;8677:14;:23::i;:::-;8668:46;;;;;;;;;;;;8548:174;;:::o;8730:125::-;;;;:::o;797:387:12:-;857:4;1065:12;1132:7;1120:20;1112:28;;1175:1;1168:4;:8;1161:15;;;797:387;;;:::o;-1:-1:-1:-;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;:::o;7:75:18:-;40:6;73:2;67:9;57:19;;7:75;:::o;88:117::-;197:1;194;187:12;211:117;320:1;317;310:12;334:149;370:7;410:66;403:5;399:78;388:89;;334:149;;;:::o;489:120::-;561:23;578:5;561:23;:::i;:::-;554:5;551:34;541:62;;599:1;596;589:12;541:62;489:120;:::o;615:137::-;660:5;698:6;685:20;676:29;;714:32;740:5;714:32;:::i;:::-;615:137;;;;:::o;758:327::-;816:6;865:2;853:9;844:7;840:23;836:32;833:119;;;871:79;;:::i;:::-;833:119;991:1;1016:52;1060:7;1051:6;1040:9;1036:22;1016:52;:::i;:::-;1006:62;;962:116;758:327;;;;:::o;1091:90::-;1125:7;1168:5;1161:13;1154:21;1143:32;;1091:90;;;:::o;1187:109::-;1268:21;1283:5;1268:21;:::i;:::-;1263:3;1256:34;1187:109;;:::o;1302:210::-;1389:4;1427:2;1416:9;1412:18;1404:26;;1440:65;1502:1;1491:9;1487:17;1478:6;1440:65;:::i;:::-;1302:210;;;;:::o;1518:99::-;1570:6;1604:5;1598:12;1588:22;;1518:99;;;:::o;1623:169::-;1707:11;1741:6;1736:3;1729:19;1781:4;1776:3;1772:14;1757:29;;1623:169;;;;:::o;1798:307::-;1866:1;1876:113;1890:6;1887:1;1884:13;1876:113;;;1975:1;1970:3;1966:11;1960:18;1956:1;1951:3;1947:11;1940:39;1912:2;1909:1;1905:10;1900:15;;1876:113;;;2007:6;2004:1;2001:13;1998:101;;;2087:1;2078:6;2073:3;2069:16;2062:27;1998:101;1847:258;1798:307;;;:::o;2111:102::-;2152:6;2203:2;2199:7;2194:2;2187:5;2183:14;2179:28;2169:38;;2111:102;;;:::o;2219:364::-;2307:3;2335:39;2368:5;2335:39;:::i;:::-;2390:71;2454:6;2449:3;2390:71;:::i;:::-;2383:78;;2470:52;2515:6;2510:3;2503:4;2496:5;2492:16;2470:52;:::i;:::-;2547:29;2569:6;2547:29;:::i;:::-;2542:3;2538:39;2531:46;;2311:272;2219:364;;;;:::o;2589:313::-;2702:4;2740:2;2729:9;2725:18;2717:26;;2789:9;2783:4;2779:20;2775:1;2764:9;2760:17;2753:47;2817:78;2890:4;2881:6;2817:78;:::i;:::-;2809:86;;2589:313;;;;:::o;2908:77::-;2945:7;2974:5;2963:16;;2908:77;;;:::o;2991:122::-;3064:24;3082:5;3064:24;:::i;:::-;3057:5;3054:35;3044:63;;3103:1;3100;3093:12;3044:63;2991:122;:::o;3119:139::-;3165:5;3203:6;3190:20;3181:29;;3219:33;3246:5;3219:33;:::i;:::-;3119:139;;;;:::o;3264:329::-;3323:6;3372:2;3360:9;3351:7;3347:23;3343:32;3340:119;;;3378:79;;:::i;:::-;3340:119;3498:1;3523:53;3568:7;3559:6;3548:9;3544:22;3523:53;:::i;:::-;3513:63;;3469:117;3264:329;;;;:::o;3599:126::-;3636:7;3676:42;3669:5;3665:54;3654:65;;3599:126;;;:::o;3731:96::-;3768:7;3797:24;3815:5;3797:24;:::i;:::-;3786:35;;3731:96;;;:::o;3833:118::-;3920:24;3938:5;3920:24;:::i;:::-;3915:3;3908:37;3833:118;;:::o;3957:222::-;4050:4;4088:2;4077:9;4073:18;4065:26;;4101:71;4169:1;4158:9;4154:17;4145:6;4101:71;:::i;:::-;3957:222;;;;:::o;4185:122::-;4258:24;4276:5;4258:24;:::i;:::-;4251:5;4248:35;4238:63;;4297:1;4294;4287:12;4238:63;4185:122;:::o;4313:139::-;4359:5;4397:6;4384:20;4375:29;;4413:33;4440:5;4413:33;:::i;:::-;4313:139;;;;:::o;4458:474::-;4526:6;4534;4583:2;4571:9;4562:7;4558:23;4554:32;4551:119;;;4589:79;;:::i;:::-;4551:119;4709:1;4734:53;4779:7;4770:6;4759:9;4755:22;4734:53;:::i;:::-;4724:63;;4680:117;4836:2;4862:53;4907:7;4898:6;4887:9;4883:22;4862:53;:::i;:::-;4852:63;;4807:118;4458:474;;;;;:::o;4938:619::-;5015:6;5023;5031;5080:2;5068:9;5059:7;5055:23;5051:32;5048:119;;;5086:79;;:::i;:::-;5048:119;5206:1;5231:53;5276:7;5267:6;5256:9;5252:22;5231:53;:::i;:::-;5221:63;;5177:117;5333:2;5359:53;5404:7;5395:6;5384:9;5380:22;5359:53;:::i;:::-;5349:63;;5304:118;5461:2;5487:53;5532:7;5523:6;5512:9;5508:22;5487:53;:::i;:::-;5477:63;;5432:118;4938:619;;;;;:::o;5563:329::-;5622:6;5671:2;5659:9;5650:7;5646:23;5642:32;5639:119;;;5677:79;;:::i;:::-;5639:119;5797:1;5822:53;5867:7;5858:6;5847:9;5843:22;5822:53;:::i;:::-;5812:63;;5768:117;5563:329;;;;:::o;5898:118::-;5985:24;6003:5;5985:24;:::i;:::-;5980:3;5973:37;5898:118;;:::o;6022:222::-;6115:4;6153:2;6142:9;6138:18;6130:26;;6166:71;6234:1;6223:9;6219:17;6210:6;6166:71;:::i;:::-;6022:222;;;;:::o;6250:117::-;6359:1;6356;6349:12;6373:117;6482:1;6479;6472:12;6496:180;6544:77;6541:1;6534:88;6641:4;6638:1;6631:15;6665:4;6662:1;6655:15;6682:281;6765:27;6787:4;6765:27;:::i;:::-;6757:6;6753:40;6895:6;6883:10;6880:22;6859:18;6847:10;6844:34;6841:62;6838:88;;;6906:18;;:::i;:::-;6838:88;6946:10;6942:2;6935:22;6725:238;6682:281;;:::o;6969:129::-;7003:6;7030:20;;:::i;:::-;7020:30;;7059:33;7087:4;7079:6;7059:33;:::i;:::-;6969:129;;;:::o;7104:308::-;7166:4;7256:18;7248:6;7245:30;7242:56;;;7278:18;;:::i;:::-;7242:56;7316:29;7338:6;7316:29;:::i;:::-;7308:37;;7400:4;7394;7390:15;7382:23;;7104:308;;;:::o;7418:154::-;7502:6;7497:3;7492;7479:30;7564:1;7555:6;7550:3;7546:16;7539:27;7418:154;;;:::o;7578:412::-;7656:5;7681:66;7697:49;7739:6;7697:49;:::i;:::-;7681:66;:::i;:::-;7672:75;;7770:6;7763:5;7756:21;7808:4;7801:5;7797:16;7846:3;7837:6;7832:3;7828:16;7825:25;7822:112;;;7853:79;;:::i;:::-;7822:112;7943:41;7977:6;7972:3;7967;7943:41;:::i;:::-;7662:328;7578:412;;;;;:::o;8010:340::-;8066:5;8115:3;8108:4;8100:6;8096:17;8092:27;8082:122;;8123:79;;:::i;:::-;8082:122;8240:6;8227:20;8265:79;8340:3;8332:6;8325:4;8317:6;8313:17;8265:79;:::i;:::-;8256:88;;8072:278;8010:340;;;;:::o;8356:654::-;8434:6;8442;8491:2;8479:9;8470:7;8466:23;8462:32;8459:119;;;8497:79;;:::i;:::-;8459:119;8617:1;8642:53;8687:7;8678:6;8667:9;8663:22;8642:53;:::i;:::-;8632:63;;8588:117;8772:2;8761:9;8757:18;8744:32;8803:18;8795:6;8792:30;8789:117;;;8825:79;;:::i;:::-;8789:117;8930:63;8985:7;8976:6;8965:9;8961:22;8930:63;:::i;:::-;8920:73;;8715:288;8356:654;;;;;:::o;9016:116::-;9086:21;9101:5;9086:21;:::i;:::-;9079:5;9076:32;9066:60;;9122:1;9119;9112:12;9066:60;9016:116;:::o;9138:133::-;9181:5;9219:6;9206:20;9197:29;;9235:30;9259:5;9235:30;:::i;:::-;9138:133;;;;:::o;9277:468::-;9342:6;9350;9399:2;9387:9;9378:7;9374:23;9370:32;9367:119;;;9405:79;;:::i;:::-;9367:119;9525:1;9550:53;9595:7;9586:6;9575:9;9571:22;9550:53;:::i;:::-;9540:63;;9496:117;9652:2;9678:50;9720:7;9711:6;9700:9;9696:22;9678:50;:::i;:::-;9668:60;;9623:115;9277:468;;;;;:::o;9751:307::-;9812:4;9902:18;9894:6;9891:30;9888:56;;;9924:18;;:::i;:::-;9888:56;9962:29;9984:6;9962:29;:::i;:::-;9954:37;;10046:4;10040;10036:15;10028:23;;9751:307;;;:::o;10064:410::-;10141:5;10166:65;10182:48;10223:6;10182:48;:::i;:::-;10166:65;:::i;:::-;10157:74;;10254:6;10247:5;10240:21;10292:4;10285:5;10281:16;10330:3;10321:6;10316:3;10312:16;10309:25;10306:112;;;10337:79;;:::i;:::-;10306:112;10427:41;10461:6;10456:3;10451;10427:41;:::i;:::-;10147:327;10064:410;;;;;:::o;10493:338::-;10548:5;10597:3;10590:4;10582:6;10578:17;10574:27;10564:122;;10605:79;;:::i;:::-;10564:122;10722:6;10709:20;10747:78;10821:3;10813:6;10806:4;10798:6;10794:17;10747:78;:::i;:::-;10738:87;;10554:277;10493:338;;;;:::o;10837:943::-;10932:6;10940;10948;10956;11005:3;10993:9;10984:7;10980:23;10976:33;10973:120;;;11012:79;;:::i;:::-;10973:120;11132:1;11157:53;11202:7;11193:6;11182:9;11178:22;11157:53;:::i;:::-;11147:63;;11103:117;11259:2;11285:53;11330:7;11321:6;11310:9;11306:22;11285:53;:::i;:::-;11275:63;;11230:118;11387:2;11413:53;11458:7;11449:6;11438:9;11434:22;11413:53;:::i;:::-;11403:63;;11358:118;11543:2;11532:9;11528:18;11515:32;11574:18;11566:6;11563:30;11560:117;;;11596:79;;:::i;:::-;11560:117;11701:62;11755:7;11746:6;11735:9;11731:22;11701:62;:::i;:::-;11691:72;;11486:287;10837:943;;;;;;;:::o;11786:474::-;11854:6;11862;11911:2;11899:9;11890:7;11886:23;11882:32;11879:119;;;11917:79;;:::i;:::-;11879:119;12037:1;12062:53;12107:7;12098:6;12087:9;12083:22;12062:53;:::i;:::-;12052:63;;12008:117;12164:2;12190:53;12235:7;12226:6;12215:9;12211:22;12190:53;:::i;:::-;12180:63;;12135:118;11786:474;;;;;:::o;12266:180::-;12314:77;12311:1;12304:88;12411:4;12408:1;12401:15;12435:4;12432:1;12425:15;12452:320;12496:6;12533:1;12527:4;12523:12;12513:22;;12580:1;12574:4;12570:12;12601:18;12591:81;;12657:4;12649:6;12645:17;12635:27;;12591:81;12719:2;12711:6;12708:14;12688:18;12685:38;12682:84;;;12738:18;;:::i;:::-;12682:84;12503:269;12452:320;;;:::o;12778:220::-;12918:34;12914:1;12906:6;12902:14;12895:58;12987:3;12982:2;12974:6;12970:15;12963:28;12778:220;:::o;13004:366::-;13146:3;13167:67;13231:2;13226:3;13167:67;:::i;:::-;13160:74;;13243:93;13332:3;13243:93;:::i;:::-;13361:2;13356:3;13352:12;13345:19;;13004:366;;;:::o;13376:419::-;13542:4;13580:2;13569:9;13565:18;13557:26;;13629:9;13623:4;13619:20;13615:1;13604:9;13600:17;13593:47;13657:131;13783:4;13657:131;:::i;:::-;13649:139;;13376:419;;;:::o;13801:243::-;13941:34;13937:1;13929:6;13925:14;13918:58;14010:26;14005:2;13997:6;13993:15;13986:51;13801:243;:::o;14050:366::-;14192:3;14213:67;14277:2;14272:3;14213:67;:::i;:::-;14206:74;;14289:93;14378:3;14289:93;:::i;:::-;14407:2;14402:3;14398:12;14391:19;;14050:366;;;:::o;14422:419::-;14588:4;14626:2;14615:9;14611:18;14603:26;;14675:9;14669:4;14665:20;14661:1;14650:9;14646:17;14639:47;14703:131;14829:4;14703:131;:::i;:::-;14695:139;;14422:419;;;:::o;14847:236::-;14987:34;14983:1;14975:6;14971:14;14964:58;15056:19;15051:2;15043:6;15039:15;15032:44;14847:236;:::o;15089:366::-;15231:3;15252:67;15316:2;15311:3;15252:67;:::i;:::-;15245:74;;15328:93;15417:3;15328:93;:::i;:::-;15446:2;15441:3;15437:12;15430:19;;15089:366;;;:::o;15461:419::-;15627:4;15665:2;15654:9;15650:18;15642:26;;15714:9;15708:4;15704:20;15700:1;15689:9;15685:17;15678:47;15742:131;15868:4;15742:131;:::i;:::-;15734:139;;15461:419;;;:::o;15886:228::-;16026:34;16022:1;16014:6;16010:14;16003:58;16095:11;16090:2;16082:6;16078:15;16071:36;15886:228;:::o;16120:366::-;16262:3;16283:67;16347:2;16342:3;16283:67;:::i;:::-;16276:74;;16359:93;16448:3;16359:93;:::i;:::-;16477:2;16472:3;16468:12;16461:19;;16120:366;;;:::o;16492:419::-;16658:4;16696:2;16685:9;16681:18;16673:26;;16745:9;16739:4;16735:20;16731:1;16720:9;16716:17;16709:47;16773:131;16899:4;16773:131;:::i;:::-;16765:139;;16492:419;;;:::o;16917:229::-;17057:34;17053:1;17045:6;17041:14;17034:58;17126:12;17121:2;17113:6;17109:15;17102:37;16917:229;:::o;17152:366::-;17294:3;17315:67;17379:2;17374:3;17315:67;:::i;:::-;17308:74;;17391:93;17480:3;17391:93;:::i;:::-;17509:2;17504:3;17500:12;17493:19;;17152:366;;;:::o;17524:419::-;17690:4;17728:2;17717:9;17713:18;17705:26;;17777:9;17771:4;17767:20;17763:1;17752:9;17748:17;17741:47;17805:131;17931:4;17805:131;:::i;:::-;17797:139;;17524:419;;;:::o;17949:180::-;17997:77;17994:1;17987:88;18094:4;18091:1;18084:15;18118:4;18115:1;18108:15;18135:305;18175:3;18194:20;18212:1;18194:20;:::i;:::-;18189:25;;18228:20;18246:1;18228:20;:::i;:::-;18223:25;;18382:1;18314:66;18310:74;18307:1;18304:81;18301:107;;;18388:18;;:::i;:::-;18301:107;18432:1;18429;18425:9;18418:16;;18135:305;;;;:::o;18446:175::-;18586:27;18582:1;18574:6;18570:14;18563:51;18446:175;:::o;18627:366::-;18769:3;18790:67;18854:2;18849:3;18790:67;:::i;:::-;18783:74;;18866:93;18955:3;18866:93;:::i;:::-;18984:2;18979:3;18975:12;18968:19;;18627:366;;;:::o;18999:419::-;19165:4;19203:2;19192:9;19188:18;19180:26;;19252:9;19246:4;19242:20;19238:1;19227:9;19223:17;19216:47;19280:131;19406:4;19280:131;:::i;:::-;19272:139;;18999:419;;;:::o;19424:237::-;19564:34;19560:1;19552:6;19548:14;19541:58;19633:20;19628:2;19620:6;19616:15;19609:45;19424:237;:::o;19667:366::-;19809:3;19830:67;19894:2;19889:3;19830:67;:::i;:::-;19823:74;;19906:93;19995:3;19906:93;:::i;:::-;20024:2;20019:3;20015:12;20008:19;;19667:366;;;:::o;20039:419::-;20205:4;20243:2;20232:9;20228:18;20220:26;;20292:9;20286:4;20282:20;20278:1;20267:9;20263:17;20256:47;20320:131;20446:4;20320:131;:::i;:::-;20312:139;;20039:419;;;:::o;20464:231::-;20604:34;20600:1;20592:6;20588:14;20581:58;20673:14;20668:2;20660:6;20656:15;20649:39;20464:231;:::o;20701:366::-;20843:3;20864:67;20928:2;20923:3;20864:67;:::i;:::-;20857:74;;20940:93;21029:3;20940:93;:::i;:::-;21058:2;21053:3;21049:12;21042:19;;20701:366;;;:::o;21073:419::-;21239:4;21277:2;21266:9;21262:18;21254:26;;21326:9;21320:4;21316:20;21312:1;21301:9;21297:17;21290:47;21354:131;21480:4;21354:131;:::i;:::-;21346:139;;21073:419;;;:::o;21498:224::-;21638:34;21634:1;21626:6;21622:14;21615:58;21707:7;21702:2;21694:6;21690:15;21683:32;21498:224;:::o;21728:366::-;21870:3;21891:67;21955:2;21950:3;21891:67;:::i;:::-;21884:74;;21967:93;22056:3;21967:93;:::i;:::-;22085:2;22080:3;22076:12;22069:19;;21728:366;;;:::o;22100:419::-;22266:4;22304:2;22293:9;22289:18;22281:26;;22353:9;22347:4;22343:20;22339:1;22328:9;22324:17;22317:47;22381:131;22507:4;22381:131;:::i;:::-;22373:139;;22100:419;;;:::o;22525:223::-;22665:34;22661:1;22653:6;22649:14;22642:58;22734:6;22729:2;22721:6;22717:15;22710:31;22525:223;:::o;22754:366::-;22896:3;22917:67;22981:2;22976:3;22917:67;:::i;:::-;22910:74;;22993:93;23082:3;22993:93;:::i;:::-;23111:2;23106:3;23102:12;23095:19;;22754:366;;;:::o;23126:419::-;23292:4;23330:2;23319:9;23315:18;23307:26;;23379:9;23373:4;23369:20;23365:1;23354:9;23350:17;23343:47;23407:131;23533:4;23407:131;:::i;:::-;23399:139;;23126:419;;;:::o;23551:191::-;23591:4;23611:20;23629:1;23611:20;:::i;:::-;23606:25;;23645:20;23663:1;23645:20;:::i;:::-;23640:25;;23684:1;23681;23678:8;23675:34;;;23689:18;;:::i;:::-;23675:34;23734:1;23731;23727:9;23719:17;;23551:191;;;;:::o;23748:182::-;23888:34;23884:1;23876:6;23872:14;23865:58;23748:182;:::o;23936:366::-;24078:3;24099:67;24163:2;24158:3;24099:67;:::i;:::-;24092:74;;24175:93;24264:3;24175:93;:::i;:::-;24293:2;24288:3;24284:12;24277:19;;23936:366;;;:::o;24308:419::-;24474:4;24512:2;24501:9;24497:18;24489:26;;24561:9;24555:4;24551:20;24547:1;24536:9;24532:17;24525:47;24589:131;24715:4;24589:131;:::i;:::-;24581:139;;24308:419;;;:::o;24733:178::-;24873:30;24869:1;24861:6;24857:14;24850:54;24733:178;:::o;24917:366::-;25059:3;25080:67;25144:2;25139:3;25080:67;:::i;:::-;25073:74;;25156:93;25245:3;25156:93;:::i;:::-;25274:2;25269:3;25265:12;25258:19;;24917:366;;;:::o;25289:419::-;25455:4;25493:2;25482:9;25478:18;25470:26;;25542:9;25536:4;25532:20;25528:1;25517:9;25513:17;25506:47;25570:131;25696:4;25570:131;:::i;:::-;25562:139;;25289:419;;;:::o;25714:98::-;25765:6;25799:5;25793:12;25783:22;;25714:98;;;:::o;25818:168::-;25901:11;25935:6;25930:3;25923:19;25975:4;25970:3;25966:14;25951:29;;25818:168;;;;:::o;25992:360::-;26078:3;26106:38;26138:5;26106:38;:::i;:::-;26160:70;26223:6;26218:3;26160:70;:::i;:::-;26153:77;;26239:52;26284:6;26279:3;26272:4;26265:5;26261:16;26239:52;:::i;:::-;26316:29;26338:6;26316:29;:::i;:::-;26311:3;26307:39;26300:46;;26082:270;25992:360;;;;:::o;26358:640::-;26553:4;26591:3;26580:9;26576:19;26568:27;;26605:71;26673:1;26662:9;26658:17;26649:6;26605:71;:::i;:::-;26686:72;26754:2;26743:9;26739:18;26730:6;26686:72;:::i;:::-;26768;26836:2;26825:9;26821:18;26812:6;26768:72;:::i;:::-;26887:9;26881:4;26877:20;26872:2;26861:9;26857:18;26850:48;26915:76;26986:4;26977:6;26915:76;:::i;:::-;26907:84;;26358:640;;;;;;;:::o;27004:141::-;27060:5;27091:6;27085:13;27076:22;;27107:32;27133:5;27107:32;:::i;:::-;27004:141;;;;:::o;27151:349::-;27220:6;27269:2;27257:9;27248:7;27244:23;27240:32;27237:119;;;27275:79;;:::i;:::-;27237:119;27395:1;27420:63;27475:7;27466:6;27455:9;27451:22;27420:63;:::i;:::-;27410:73;;27366:127;27151:349;;;;:::o",
  "source": "// SPDX-License-Identifier: MIT\r\npragma solidity ^0.8.4;\r\n\r\nimport \"./token/ERC721/ERC721.sol\";\r\n/**\r\n * PJT Ⅰ - 과제 2) NFT Creator 구현\r\n * 상태 변수나 함수의 시그니처는 구현에 따라 변경할 수 있습니다.\r\n */\r\ncontract SsafyNFT is ERC721{\r\n\r\n    uint256 private _tokenIds; \r\n    mapping(uint256 => string) tokenURIs;\r\n    \r\n\r\n    constructor() ERC721(\"_name\",\"_symbol\"){\r\n        // TODO   \r\n    }\r\n\r\n    function current() public view returns (uint256) {\r\n        return _tokenIds;\r\n    }\r\n\r\n    function tokenURI(uint256 tokenId) public virtual override view returns (string memory) {\r\n        // TODO\r\n        return tokenURIs[tokenId];\r\n    }\r\n\r\n    function create(address to, string memory _tokenURI) public returns (uint256) {\r\n        // TODO\r\n        // tokenuri = _tokenURI;\r\n        // uint256 new_ids = current();\r\n        // _mint(to,new_ids);\r\n        // return new_ids;\r\n\r\n        uint256 new_ids = current()+1;\r\n        _mint(to,new_ids);\r\n        tokenURIs[new_ids] = _tokenURI;\r\n        return new_ids;\r\n    }\r\n}",
  "sourcePath": "C:\\Users\\ssafy\\nft-sub2\\S06P22A107\\smart-contracts\\contracts\\SsafyNFT.sol",
  "ast": {
    "absolutePath": "project:/contracts/SsafyNFT.sol",
    "exportedSymbols": {
      "Address": [
        2533
      ],
      "Context": [
        2555
      ],
      "ERC165": [
        2782
      ],
      "ERC721": [
        2075
      ],
      "IERC165": [
        2794
      ],
      "IERC721": [
        2191
      ],
      "IERC721Metadata": [
        2236
      ],
      "IERC721Receiver": [
        2209
      ],
      "SsafyNFT": [
        442
      ],
      "Strings": [
        2758
      ]
    },
    "id": 443,
    "license": "MIT",
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 372,
        "literals": [
          "solidity",
          "^",
          "0.8",
          ".4"
        ],
        "nodeType": "PragmaDirective",
        "src": "33:23:2"
      },
      {
        "absolutePath": "project:/contracts/token/ERC721/ERC721.sol",
        "file": "./token/ERC721/ERC721.sol",
        "id": 373,
        "nameLocation": "-1:-1:-1",
        "nodeType": "ImportDirective",
        "scope": 443,
        "sourceUnit": 2076,
        "src": "60:35:2",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "abstract": false,
        "baseContracts": [
          {
            "baseName": {
              "id": 375,
              "name": "ERC721",
              "nodeType": "IdentifierPath",
              "referencedDeclaration": 2075,
              "src": "263:6:2"
            },
            "id": 376,
            "nodeType": "InheritanceSpecifier",
            "src": "263:6:2"
          }
        ],
        "canonicalName": "SsafyNFT",
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": {
          "id": 374,
          "nodeType": "StructuredDocumentation",
          "src": "97:143:2",
          "text": " PJT Ⅰ - 과제 2) NFT Creator 구현\n 상태 변수나 함수의 시그니처는 구현에 따라 변경할 수 있습니다."
        },
        "fullyImplemented": true,
        "id": 442,
        "linearizedBaseContracts": [
          442,
          2075,
          2236,
          2191,
          2782,
          2794,
          2555
        ],
        "name": "SsafyNFT",
        "nameLocation": "251:8:2",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": false,
            "id": 378,
            "mutability": "mutable",
            "name": "_tokenIds",
            "nameLocation": "294:9:2",
            "nodeType": "VariableDeclaration",
            "scope": 442,
            "src": "278:25:2",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_uint256",
              "typeString": "uint256"
            },
            "typeName": {
              "id": 377,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "278:7:2",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            },
            "visibility": "private"
          },
          {
            "constant": false,
            "id": 382,
            "mutability": "mutable",
            "name": "tokenURIs",
            "nameLocation": "338:9:2",
            "nodeType": "VariableDeclaration",
            "scope": 442,
            "src": "311:36:2",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_mapping$_t_uint256_$_t_string_storage_$",
              "typeString": "mapping(uint256 => string)"
            },
            "typeName": {
              "id": 381,
              "keyType": {
                "id": 379,
                "name": "uint256",
                "nodeType": "ElementaryTypeName",
                "src": "319:7:2",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                }
              },
              "nodeType": "Mapping",
              "src": "311:26:2",
              "typeDescriptions": {
                "typeIdentifier": "t_mapping$_t_uint256_$_t_string_storage_$",
                "typeString": "mapping(uint256 => string)"
              },
              "valueType": {
                "id": 380,
                "name": "string",
                "nodeType": "ElementaryTypeName",
                "src": "330:6:2",
                "typeDescriptions": {
                  "typeIdentifier": "t_string_storage_ptr",
                  "typeString": "string"
                }
              }
            },
            "visibility": "internal"
          },
          {
            "body": {
              "id": 389,
              "nodeType": "Block",
              "src": "401:28:2",
              "statements": []
            },
            "id": 390,
            "implemented": true,
            "kind": "constructor",
            "modifiers": [
              {
                "arguments": [
                  {
                    "hexValue": "5f6e616d65",
                    "id": 385,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": true,
                    "kind": "string",
                    "lValueRequested": false,
                    "nodeType": "Literal",
                    "src": "383:7:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_stringliteral_c7a858959e825b7a94eb8d55c738f59c7bf4685267af5064bed5fd9c6bbc26de",
                      "typeString": "literal_string \"_name\""
                    },
                    "value": "_name"
                  },
                  {
                    "hexValue": "5f73796d626f6c",
                    "id": 386,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": true,
                    "kind": "string",
                    "lValueRequested": false,
                    "nodeType": "Literal",
                    "src": "391:9:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_stringliteral_a632ee97ac3c9a49ad6aa5cea79c5f9de58bee0c617a17a4a39b222e53e87a22",
                      "typeString": "literal_string \"_symbol\""
                    },
                    "value": "_symbol"
                  }
                ],
                "id": 387,
                "kind": "baseConstructorSpecifier",
                "modifierName": {
                  "id": 384,
                  "name": "ERC721",
                  "nodeType": "IdentifierPath",
                  "referencedDeclaration": 2075,
                  "src": "376:6:2"
                },
                "nodeType": "ModifierInvocation",
                "src": "376:25:2"
              }
            ],
            "name": "",
            "nameLocation": "-1:-1:-1",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 383,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "373:2:2"
            },
            "returnParameters": {
              "id": 388,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "401:0:2"
            },
            "scope": 442,
            "src": "362:67:2",
            "stateMutability": "nonpayable",
            "virtual": false,
            "visibility": "public"
          },
          {
            "body": {
              "id": 397,
              "nodeType": "Block",
              "src": "486:35:2",
              "statements": [
                {
                  "expression": {
                    "id": 395,
                    "name": "_tokenIds",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 378,
                    "src": "504:9:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 394,
                  "id": 396,
                  "nodeType": "Return",
                  "src": "497:16:2"
                }
              ]
            },
            "functionSelector": "9fa6a6e3",
            "id": 398,
            "implemented": true,
            "kind": "function",
            "modifiers": [],
            "name": "current",
            "nameLocation": "446:7:2",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 391,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "453:2:2"
            },
            "returnParameters": {
              "id": 394,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 393,
                  "mutability": "mutable",
                  "name": "",
                  "nameLocation": "-1:-1:-1",
                  "nodeType": "VariableDeclaration",
                  "scope": 398,
                  "src": "477:7:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 392,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "477:7:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "visibility": "internal"
                }
              ],
              "src": "476:9:2"
            },
            "scope": 442,
            "src": "437:84:2",
            "stateMutability": "view",
            "virtual": false,
            "visibility": "public"
          },
          {
            "baseFunctions": [
              1474
            ],
            "body": {
              "id": 410,
              "nodeType": "Block",
              "src": "617:61:2",
              "statements": [
                {
                  "expression": {
                    "baseExpression": {
                      "id": 406,
                      "name": "tokenURIs",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 382,
                      "src": "652:9:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_uint256_$_t_string_storage_$",
                        "typeString": "mapping(uint256 => string storage ref)"
                      }
                    },
                    "id": 408,
                    "indexExpression": {
                      "id": 407,
                      "name": "tokenId",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 400,
                      "src": "662:7:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "IndexAccess",
                    "src": "652:18:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage",
                      "typeString": "string storage ref"
                    }
                  },
                  "functionReturnParameters": 405,
                  "id": 409,
                  "nodeType": "Return",
                  "src": "645:25:2"
                }
              ]
            },
            "functionSelector": "c87b56dd",
            "id": 411,
            "implemented": true,
            "kind": "function",
            "modifiers": [],
            "name": "tokenURI",
            "nameLocation": "538:8:2",
            "nodeType": "FunctionDefinition",
            "overrides": {
              "id": 402,
              "nodeType": "OverrideSpecifier",
              "overrides": [],
              "src": "579:8:2"
            },
            "parameters": {
              "id": 401,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 400,
                  "mutability": "mutable",
                  "name": "tokenId",
                  "nameLocation": "555:7:2",
                  "nodeType": "VariableDeclaration",
                  "scope": 411,
                  "src": "547:15:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 399,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "547:7:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "visibility": "internal"
                }
              ],
              "src": "546:17:2"
            },
            "returnParameters": {
              "id": 405,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 404,
                  "mutability": "mutable",
                  "name": "",
                  "nameLocation": "-1:-1:-1",
                  "nodeType": "VariableDeclaration",
                  "scope": 411,
                  "src": "602:13:2",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 403,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "602:6:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "visibility": "internal"
                }
              ],
              "src": "601:15:2"
            },
            "scope": 442,
            "src": "529:149:2",
            "stateMutability": "view",
            "virtual": true,
            "visibility": "public"
          },
          {
            "body": {
              "id": 440,
              "nodeType": "Block",
              "src": "764:295:2",
              "statements": [
                {
                  "assignments": [
                    421
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 421,
                      "mutability": "mutable",
                      "name": "new_ids",
                      "nameLocation": "936:7:2",
                      "nodeType": "VariableDeclaration",
                      "scope": 440,
                      "src": "928:15:2",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 420,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "928:7:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "visibility": "internal"
                    }
                  ],
                  "id": 426,
                  "initialValue": {
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 425,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "arguments": [],
                      "expression": {
                        "argumentTypes": [],
                        "id": 422,
                        "name": "current",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 398,
                        "src": "946:7:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_view$__$returns$_t_uint256_$",
                          "typeString": "function () view returns (uint256)"
                        }
                      },
                      "id": 423,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "946:9:2",
                      "tryCall": false,
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "+",
                    "rightExpression": {
                      "hexValue": "31",
                      "id": 424,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "956:1:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_1_by_1",
                        "typeString": "int_const 1"
                      },
                      "value": "1"
                    },
                    "src": "946:11:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "928:29:2"
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "id": 428,
                        "name": "to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 413,
                        "src": "974:2:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "id": 429,
                        "name": "new_ids",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 421,
                        "src": "977:7:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "id": 427,
                      "name": "_mint",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1898,
                      "src": "968:5:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,uint256)"
                      }
                    },
                    "id": 430,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "968:17:2",
                    "tryCall": false,
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 431,
                  "nodeType": "ExpressionStatement",
                  "src": "968:17:2"
                },
                {
                  "expression": {
                    "id": 436,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "baseExpression": {
                        "id": 432,
                        "name": "tokenURIs",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 382,
                        "src": "996:9:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_uint256_$_t_string_storage_$",
                          "typeString": "mapping(uint256 => string storage ref)"
                        }
                      },
                      "id": 434,
                      "indexExpression": {
                        "id": 433,
                        "name": "new_ids",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 421,
                        "src": "1006:7:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "nodeType": "IndexAccess",
                      "src": "996:18:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_string_storage",
                        "typeString": "string storage ref"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "id": 435,
                      "name": "_tokenURI",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 415,
                      "src": "1017:9:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_string_memory_ptr",
                        "typeString": "string memory"
                      }
                    },
                    "src": "996:30:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage",
                      "typeString": "string storage ref"
                    }
                  },
                  "id": 437,
                  "nodeType": "ExpressionStatement",
                  "src": "996:30:2"
                },
                {
                  "expression": {
                    "id": 438,
                    "name": "new_ids",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 421,
                    "src": "1044:7:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 419,
                  "id": 439,
                  "nodeType": "Return",
                  "src": "1037:14:2"
                }
              ]
            },
            "functionSelector": "a15ab08d",
            "id": 441,
            "implemented": true,
            "kind": "function",
            "modifiers": [],
            "name": "create",
            "nameLocation": "695:6:2",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 416,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 413,
                  "mutability": "mutable",
                  "name": "to",
                  "nameLocation": "710:2:2",
                  "nodeType": "VariableDeclaration",
                  "scope": 441,
                  "src": "702:10:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 412,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "702:7:2",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 415,
                  "mutability": "mutable",
                  "name": "_tokenURI",
                  "nameLocation": "728:9:2",
                  "nodeType": "VariableDeclaration",
                  "scope": 441,
                  "src": "714:23:2",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 414,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "714:6:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "visibility": "internal"
                }
              ],
              "src": "701:37:2"
            },
            "returnParameters": {
              "id": 419,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 418,
                  "mutability": "mutable",
                  "name": "",
                  "nameLocation": "-1:-1:-1",
                  "nodeType": "VariableDeclaration",
                  "scope": 441,
                  "src": "755:7:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 417,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "755:7:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "visibility": "internal"
                }
              ],
              "src": "754:9:2"
            },
            "scope": 442,
            "src": "686:373:2",
            "stateMutability": "nonpayable",
            "virtual": false,
            "visibility": "public"
          }
        ],
        "scope": 443,
        "src": "242:820:2",
        "usedErrors": []
      }
    ],
    "src": "33:1029:2"
  },
  "legacyAST": {
    "absolutePath": "project:/contracts/SsafyNFT.sol",
    "exportedSymbols": {
      "Address": [
        2533
      ],
      "Context": [
        2555
      ],
      "ERC165": [
        2782
      ],
      "ERC721": [
        2075
      ],
      "IERC165": [
        2794
      ],
      "IERC721": [
        2191
      ],
      "IERC721Metadata": [
        2236
      ],
      "IERC721Receiver": [
        2209
      ],
      "SsafyNFT": [
        442
      ],
      "Strings": [
        2758
      ]
    },
    "id": 443,
    "license": "MIT",
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 372,
        "literals": [
          "solidity",
          "^",
          "0.8",
          ".4"
        ],
        "nodeType": "PragmaDirective",
        "src": "33:23:2"
      },
      {
        "absolutePath": "project:/contracts/token/ERC721/ERC721.sol",
        "file": "./token/ERC721/ERC721.sol",
        "id": 373,
        "nameLocation": "-1:-1:-1",
        "nodeType": "ImportDirective",
        "scope": 443,
        "sourceUnit": 2076,
        "src": "60:35:2",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "abstract": false,
        "baseContracts": [
          {
            "baseName": {
              "id": 375,
              "name": "ERC721",
              "nodeType": "IdentifierPath",
              "referencedDeclaration": 2075,
              "src": "263:6:2"
            },
            "id": 376,
            "nodeType": "InheritanceSpecifier",
            "src": "263:6:2"
          }
        ],
        "canonicalName": "SsafyNFT",
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": {
          "id": 374,
          "nodeType": "StructuredDocumentation",
          "src": "97:143:2",
          "text": " PJT Ⅰ - 과제 2) NFT Creator 구현\n 상태 변수나 함수의 시그니처는 구현에 따라 변경할 수 있습니다."
        },
        "fullyImplemented": true,
        "id": 442,
        "linearizedBaseContracts": [
          442,
          2075,
          2236,
          2191,
          2782,
          2794,
          2555
        ],
        "name": "SsafyNFT",
        "nameLocation": "251:8:2",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": false,
            "id": 378,
            "mutability": "mutable",
            "name": "_tokenIds",
            "nameLocation": "294:9:2",
            "nodeType": "VariableDeclaration",
            "scope": 442,
            "src": "278:25:2",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_uint256",
              "typeString": "uint256"
            },
            "typeName": {
              "id": 377,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "278:7:2",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            },
            "visibility": "private"
          },
          {
            "constant": false,
            "id": 382,
            "mutability": "mutable",
            "name": "tokenURIs",
            "nameLocation": "338:9:2",
            "nodeType": "VariableDeclaration",
            "scope": 442,
            "src": "311:36:2",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_mapping$_t_uint256_$_t_string_storage_$",
              "typeString": "mapping(uint256 => string)"
            },
            "typeName": {
              "id": 381,
              "keyType": {
                "id": 379,
                "name": "uint256",
                "nodeType": "ElementaryTypeName",
                "src": "319:7:2",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                }
              },
              "nodeType": "Mapping",
              "src": "311:26:2",
              "typeDescriptions": {
                "typeIdentifier": "t_mapping$_t_uint256_$_t_string_storage_$",
                "typeString": "mapping(uint256 => string)"
              },
              "valueType": {
                "id": 380,
                "name": "string",
                "nodeType": "ElementaryTypeName",
                "src": "330:6:2",
                "typeDescriptions": {
                  "typeIdentifier": "t_string_storage_ptr",
                  "typeString": "string"
                }
              }
            },
            "visibility": "internal"
          },
          {
            "body": {
              "id": 389,
              "nodeType": "Block",
              "src": "401:28:2",
              "statements": []
            },
            "id": 390,
            "implemented": true,
            "kind": "constructor",
            "modifiers": [
              {
                "arguments": [
                  {
                    "hexValue": "5f6e616d65",
                    "id": 385,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": true,
                    "kind": "string",
                    "lValueRequested": false,
                    "nodeType": "Literal",
                    "src": "383:7:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_stringliteral_c7a858959e825b7a94eb8d55c738f59c7bf4685267af5064bed5fd9c6bbc26de",
                      "typeString": "literal_string \"_name\""
                    },
                    "value": "_name"
                  },
                  {
                    "hexValue": "5f73796d626f6c",
                    "id": 386,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": true,
                    "kind": "string",
                    "lValueRequested": false,
                    "nodeType": "Literal",
                    "src": "391:9:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_stringliteral_a632ee97ac3c9a49ad6aa5cea79c5f9de58bee0c617a17a4a39b222e53e87a22",
                      "typeString": "literal_string \"_symbol\""
                    },
                    "value": "_symbol"
                  }
                ],
                "id": 387,
                "kind": "baseConstructorSpecifier",
                "modifierName": {
                  "id": 384,
                  "name": "ERC721",
                  "nodeType": "IdentifierPath",
                  "referencedDeclaration": 2075,
                  "src": "376:6:2"
                },
                "nodeType": "ModifierInvocation",
                "src": "376:25:2"
              }
            ],
            "name": "",
            "nameLocation": "-1:-1:-1",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 383,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "373:2:2"
            },
            "returnParameters": {
              "id": 388,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "401:0:2"
            },
            "scope": 442,
            "src": "362:67:2",
            "stateMutability": "nonpayable",
            "virtual": false,
            "visibility": "public"
          },
          {
            "body": {
              "id": 397,
              "nodeType": "Block",
              "src": "486:35:2",
              "statements": [
                {
                  "expression": {
                    "id": 395,
                    "name": "_tokenIds",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 378,
                    "src": "504:9:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 394,
                  "id": 396,
                  "nodeType": "Return",
                  "src": "497:16:2"
                }
              ]
            },
            "functionSelector": "9fa6a6e3",
            "id": 398,
            "implemented": true,
            "kind": "function",
            "modifiers": [],
            "name": "current",
            "nameLocation": "446:7:2",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 391,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "453:2:2"
            },
            "returnParameters": {
              "id": 394,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 393,
                  "mutability": "mutable",
                  "name": "",
                  "nameLocation": "-1:-1:-1",
                  "nodeType": "VariableDeclaration",
                  "scope": 398,
                  "src": "477:7:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 392,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "477:7:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "visibility": "internal"
                }
              ],
              "src": "476:9:2"
            },
            "scope": 442,
            "src": "437:84:2",
            "stateMutability": "view",
            "virtual": false,
            "visibility": "public"
          },
          {
            "baseFunctions": [
              1474
            ],
            "body": {
              "id": 410,
              "nodeType": "Block",
              "src": "617:61:2",
              "statements": [
                {
                  "expression": {
                    "baseExpression": {
                      "id": 406,
                      "name": "tokenURIs",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 382,
                      "src": "652:9:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_uint256_$_t_string_storage_$",
                        "typeString": "mapping(uint256 => string storage ref)"
                      }
                    },
                    "id": 408,
                    "indexExpression": {
                      "id": 407,
                      "name": "tokenId",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 400,
                      "src": "662:7:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "IndexAccess",
                    "src": "652:18:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage",
                      "typeString": "string storage ref"
                    }
                  },
                  "functionReturnParameters": 405,
                  "id": 409,
                  "nodeType": "Return",
                  "src": "645:25:2"
                }
              ]
            },
            "functionSelector": "c87b56dd",
            "id": 411,
            "implemented": true,
            "kind": "function",
            "modifiers": [],
            "name": "tokenURI",
            "nameLocation": "538:8:2",
            "nodeType": "FunctionDefinition",
            "overrides": {
              "id": 402,
              "nodeType": "OverrideSpecifier",
              "overrides": [],
              "src": "579:8:2"
            },
            "parameters": {
              "id": 401,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 400,
                  "mutability": "mutable",
                  "name": "tokenId",
                  "nameLocation": "555:7:2",
                  "nodeType": "VariableDeclaration",
                  "scope": 411,
                  "src": "547:15:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 399,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "547:7:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "visibility": "internal"
                }
              ],
              "src": "546:17:2"
            },
            "returnParameters": {
              "id": 405,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 404,
                  "mutability": "mutable",
                  "name": "",
                  "nameLocation": "-1:-1:-1",
                  "nodeType": "VariableDeclaration",
                  "scope": 411,
                  "src": "602:13:2",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 403,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "602:6:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "visibility": "internal"
                }
              ],
              "src": "601:15:2"
            },
            "scope": 442,
            "src": "529:149:2",
            "stateMutability": "view",
            "virtual": true,
            "visibility": "public"
          },
          {
            "body": {
              "id": 440,
              "nodeType": "Block",
              "src": "764:295:2",
              "statements": [
                {
                  "assignments": [
                    421
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 421,
                      "mutability": "mutable",
                      "name": "new_ids",
                      "nameLocation": "936:7:2",
                      "nodeType": "VariableDeclaration",
                      "scope": 440,
                      "src": "928:15:2",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 420,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "928:7:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "visibility": "internal"
                    }
                  ],
                  "id": 426,
                  "initialValue": {
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 425,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "arguments": [],
                      "expression": {
                        "argumentTypes": [],
                        "id": 422,
                        "name": "current",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 398,
                        "src": "946:7:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_view$__$returns$_t_uint256_$",
                          "typeString": "function () view returns (uint256)"
                        }
                      },
                      "id": 423,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "946:9:2",
                      "tryCall": false,
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "+",
                    "rightExpression": {
                      "hexValue": "31",
                      "id": 424,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "956:1:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_1_by_1",
                        "typeString": "int_const 1"
                      },
                      "value": "1"
                    },
                    "src": "946:11:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "928:29:2"
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "id": 428,
                        "name": "to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 413,
                        "src": "974:2:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "id": 429,
                        "name": "new_ids",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 421,
                        "src": "977:7:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "id": 427,
                      "name": "_mint",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1898,
                      "src": "968:5:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,uint256)"
                      }
                    },
                    "id": 430,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "968:17:2",
                    "tryCall": false,
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 431,
                  "nodeType": "ExpressionStatement",
                  "src": "968:17:2"
                },
                {
                  "expression": {
                    "id": 436,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "baseExpression": {
                        "id": 432,
                        "name": "tokenURIs",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 382,
                        "src": "996:9:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_uint256_$_t_string_storage_$",
                          "typeString": "mapping(uint256 => string storage ref)"
                        }
                      },
                      "id": 434,
                      "indexExpression": {
                        "id": 433,
                        "name": "new_ids",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 421,
                        "src": "1006:7:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "nodeType": "IndexAccess",
                      "src": "996:18:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_string_storage",
                        "typeString": "string storage ref"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "id": 435,
                      "name": "_tokenURI",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 415,
                      "src": "1017:9:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_string_memory_ptr",
                        "typeString": "string memory"
                      }
                    },
                    "src": "996:30:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage",
                      "typeString": "string storage ref"
                    }
                  },
                  "id": 437,
                  "nodeType": "ExpressionStatement",
                  "src": "996:30:2"
                },
                {
                  "expression": {
                    "id": 438,
                    "name": "new_ids",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 421,
                    "src": "1044:7:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 419,
                  "id": 439,
                  "nodeType": "Return",
                  "src": "1037:14:2"
                }
              ]
            },
            "functionSelector": "a15ab08d",
            "id": 441,
            "implemented": true,
            "kind": "function",
            "modifiers": [],
            "name": "create",
            "nameLocation": "695:6:2",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 416,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 413,
                  "mutability": "mutable",
                  "name": "to",
                  "nameLocation": "710:2:2",
                  "nodeType": "VariableDeclaration",
                  "scope": 441,
                  "src": "702:10:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 412,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "702:7:2",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 415,
                  "mutability": "mutable",
                  "name": "_tokenURI",
                  "nameLocation": "728:9:2",
                  "nodeType": "VariableDeclaration",
                  "scope": 441,
                  "src": "714:23:2",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 414,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "714:6:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "visibility": "internal"
                }
              ],
              "src": "701:37:2"
            },
            "returnParameters": {
              "id": 419,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 418,
                  "mutability": "mutable",
                  "name": "",
                  "nameLocation": "-1:-1:-1",
                  "nodeType": "VariableDeclaration",
                  "scope": 441,
                  "src": "755:7:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 417,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "755:7:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "visibility": "internal"
                }
              ],
              "src": "754:9:2"
            },
            "scope": 442,
            "src": "686:373:2",
            "stateMutability": "nonpayable",
            "virtual": false,
            "visibility": "public"
          }
        ],
        "scope": 443,
        "src": "242:820:2",
        "usedErrors": []
      }
    ],
    "src": "33:1029:2"
  },
  "compiler": {
    "name": "solc",
    "version": "0.8.10+commit.fc410830.Emscripten.clang"
  },
  "networks": {
    "5777": {
      "events": {},
      "links": {},
      "address": "0x7d544ddD5CA5D6f9E613eD3AB22f7683Bd726A81",
      "transactionHash": "0xf7143df571746a626bb4724920bf7a9f2b4b85d1cd10eb12b9869329d6b64ebb"
    },
    "1647187587722": {
      "events": {},
      "links": {},
      "address": "0x242e17d26eF84eBa4B8e234baCC59716f65FaA95",
      "transactionHash": "0x44c9e89767ee07d3d1124d0b99a72972645e42d3ffe14bcc2b990cde3a7a84e3"
    },
    "1647229661601": {
      "events": {},
      "links": {},
      "address": "0x39468EbFbFa615958807a79013A3ce2dEafd5073",
      "transactionHash": "0x7ff6c24e5c4684a821bd685bf944fcc592d82a83764b2eb22a9a77326307aad7"
    },
    "202112031219": {
      "events": {},
      "links": {},
      "address": "0xe9acb6E7f54Dc08906e48a0005b98c5F05dD5861",
      "transactionHash": "0xc87049b23cb55d08ce7f9ee3c02fdf299a037155067b4644819cd130a8c58a69"
    }
  },
  "schemaVersion": "3.4.5",
  "updatedAt": "2022-03-25T02:43:17.100Z",
  "networkType": "ethereum",
  "devdoc": {
    "kind": "dev",
    "methods": {
      "approve(address,uint256)": {
        "details": "See {IERC721-approve}."
      },
      "balanceOf(address)": {
        "details": "See {IERC721-balanceOf}."
      },
      "getApproved(uint256)": {
        "details": "See {IERC721-getApproved}."
      },
      "isApprovedForAll(address,address)": {
        "details": "See {IERC721-isApprovedForAll}."
      },
      "name()": {
        "details": "See {IERC721Metadata-name}."
      },
      "ownerOf(uint256)": {
        "details": "See {IERC721-ownerOf}."
      },
      "safeTransferFrom(address,address,uint256)": {
        "details": "See {IERC721-safeTransferFrom}."
      },
      "safeTransferFrom(address,address,uint256,bytes)": {
        "details": "See {IERC721-safeTransferFrom}."
      },
      "setApprovalForAll(address,bool)": {
        "details": "See {IERC721-setApprovalForAll}."
      },
      "supportsInterface(bytes4)": {
        "details": "See {IERC165-supportsInterface}."
      },
      "symbol()": {
        "details": "See {IERC721Metadata-symbol}."
      },
      "tokenURI(uint256)": {
        "details": "See {IERC721Metadata-tokenURI}."
      },
      "transferFrom(address,address,uint256)": {
        "details": "See {IERC721-transferFrom}."
      }
    },
    "version": 1
  },
  "userdoc": {
    "kind": "user",
    "methods": {},
    "notice": "PJT Ⅰ - 과제 2) NFT Creator 구현 상태 변수나 함수의 시그니처는 구현에 따라 변경할 수 있습니다.",
    "version": 1
  }
};

//const contractInstance = new web3.eth.Contract(contractABI, contractAddr);

// 3. 실행할 메소드 정보
// const contractMethod = contractInstance.methods.create('0x316Cccdc7D62Ca20cC45496c83F12A4a9EC27a21',"토큰URI");//('닉네임', '설명', '토큰URI', Date.now())
// const contractEncodedMethod = contractMethod.encodeABI();

export default async function sendTransaction(fromAddr, privKey, toAddr, data) {
    try {
        const gasEstimate = await contractMethod.estimateGas({ from: fromAddr });
        const walletAccount = web3.eth.accounts.privateKeyToAccount(privKey);

        const contractInstance = new web3.eth.Contract(contractABI, toAddr);
        const contractMethod = contractInstance.methods.create(fromAddr,"토큰URI");
        const contractEncodedMethod = contractMethod.encodeABI();

        const rawTx = {
            from: fromAddr,
            to: toAddr,
            gas: gasEstimate,
            data: contractEncodedMethod,
        };
    
        walletAccount.signTransaction(rawTx).then((signedTx) => {
            if (signedTx == null) throw new Error("TransactionSignFailedException");

            let tran = web3.eth.sendSignedTransaction(signedTx.rawTransaction);
            tran.on('transactionHash', (txhash) => { 
                console.log("Tx Hash: " + txhash)
                tran.off('transactionHash');
            });
            // tran.on('receipt', (receipt) => console.log("Receipt: " + receipt));
            tran.on('confirmation', async (confirmationNumber, receipt) => {
                try {
                    // 3회 이상 컨펌시 더이상 Confirmation 이벤트 추적 안함
                    if (confirmationNumber > 2) {
                        tran.off('confirmation');
                        throw new Error("ConfirmCompletedException");
                    }

                    console.log("Confirm #" + confirmationNumber);
                    // console.log("Confirm Receipt: " + receipt);

                    const Name = await contractInstance.methods.Nickname(fromAddr).call();
                    const TokenURI = await contractInstance.methods.ImageURI(fromAddr).call();

                    console.log(Name, TokenURI);
                } catch (err) {
                    if (err instanceof TypeError) console.error('예외: 타입 에러', err);
                    if (err instanceof Error) {
                        if (err.message == "ConfirmCompletedException") console.error('예외: 컨펌 완료');
                        else console.error('예외: 알 수 없는 에러', err);
                    }
                }
            });
            tran.on('error', (error, receipt) => {
                if (receipt) throw new Error("OutOfGasException") 
                else new Error("UnknownErrorException");
            }); 
        })
        .catch(err => { throw err; } );
    } catch (err) {
        if (err instanceof Error) {
            if (err.message == "TransactionSignFailedException") console.error('예외: 트랜잭션 서명 실패', err);
            if (err.message == "OutOfGasException") console.error('예외: 가스 부족', err);
            if (err.message == "UnknownErrorException") console.error('예외: 알 수 없는 에러', err);
            else console.error('예외: 알 수 없는 에러', err);
        }
    }
};