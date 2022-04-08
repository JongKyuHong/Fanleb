import Web3 from 'web3';
import AddressStore from '../common/AddressStore';
import ABI from '../common/ABI';
import { create } from 'ipfs-http-client';
import axios from 'axios';
import { closeLoadingSpinner } from '../redux/modalSlice';
 // 사피 네트워크에 배포한 계약 정보
const subscriptionAbi = ABI.CONTRACT_ABI.SUBSCRIPTION_ABI // contract ABI
const subscriptionContractAddr = AddressStore.CONTRACT_ADDR.SubscriptionNFT[0]; // contractAddr: 컨트랙트 주소
const salefactoryAbi = ABI.CONTRACT_ABI.SALE_FACTORY_ABI // contract ABI
const saleAbi = ABI.CONTRACT_ABI.SALE_ABI // contract ABI
const salefactoryContractAddr = AddressStore.CONTRACT_ADDR.SaleFactory[0]; // contractAddr: 컨트랙트 주소
const tokenAbi = ABI.CONTRACT_ABI.TOKEN_ABI // contract ABI
const tokenContractAddr = AddressStore.CONTRACT_ADDR.CurrencyAddress[0]; // contractAddr: 컨트랙트 주소
const nftContractAddr = AddressStore.CONTRACT_ADDR.SsafyNFT[0]; // contractAddr: 컨트랙트 주소
/**
 * 개인키로부터 주소를 추출합니다. 
 * @param {*} privKey 개인키
 * @returns 주소
 */
// export default async function CreateSubscriptionNFT(to, img_url) {
//   const web3 = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_ETHEREUM_RPC_URL));

//     // Contract sendTransaction 시 입력해야 할 것
//   // 1. 사피 지갑 정보 (walletAddress, privKey)
//   // 2. 사피 네트워크에 배포한 계약 정보 (contractAddr, contractABI)
//   // 3. 실행할 메소드 정보 (contractMethod)

//   // 1. 사피 지갑 정보
//   const walletAddress = to; // 지갑 주소 (0x...)
//   const walletAccount = web3.eth.accounts.privateKeyToAccount(privKey); // 지갑 계정 (주소, 비공개키, 공개키, 사인, 사인트랜잭션 함수 들어있음)

//   // 2. 사피 네트워크에 배포한 계약 정보
//   const abi = ABI.CONTRACT_ABI.NFT_ABI
//   const contractAddr = AddressStore.CONTRACT_ADDR.SsafyNFT[0]; // contractAddr: 컨트랙트 주소
//   const nftContract = new web3.eth.Contract(abi, contractAddr);

//   // 3. 실행할 메소드 정보(블록체인의 데이터를 변경할 때)
//   const contractMethod = nftContract.methods.create(to, img_url);
//   const contractEncodedMethod = contractMethod.encodeABI();    
  
//   const gasEstimate = await contractMethod.estimateGas({ from: walletAddress });
  
//   const rawTx = {
//     from: walletAddress,
//     to: contractAddr,
//     gas: gasEstimate,
//     data: contractEncodedMethod,
//   };

//   const signedTx = await walletAccount.signTransaction(rawTx);
//   web3.eth.sendSignedTransaction(signedTx.rawTransaction);
//   token_id = await nftContract.methods.create(to, metaDataPath).call();


//   // 3-1. 단순히 블록체인의 데이터를 조회할 때
//   const balance = await nftContract.methods.balanceOf(to).call();
//   console.log('My balance:', balance) // balance: 해당 지갑이 소유하고 있는 NFT 작품 개수(토큰 개수)

//   return token_id;
// }

// 서버에 등록된 데이터를 블록체인에 등록하는 함수

export async function CreateSubscriptionNFT(myAddr, image, amount) {
  const web3 = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_ETHEREUM_RPC_URL));
  // console.log(myAddr, image, amount)
  let imgUrl;
  const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })
  try {
    const res = await ipfs.add(image)
    imgUrl = `https://ipfs.infura.io/ipfs/${res.path}`
  } catch (err) {
    console.log(err)
  }
  const metaData = {
    author: myAddr,
    imgUrl: imgUrl,
  }
  // tokenId: ""
  console.log('메타데이터', metaData)
  const result = await ipfs.add(JSON.stringify(metaData))
  const metaJson = `https://ipfs.infura.io/ipfs/${result.path}`
  // console.log('메타데이터 경로:', metaJson)
  //load smart contract
  let subscriptionContract = new web3.eth.Contract(subscriptionAbi, subscriptionContractAddr);//loadContract();
  
  // //set up your Ethereum transaction
  // const transactionParameters = {
  //     to: contractAddr, // Required except during contract publications.
  //     from: myAddr, // must match user's active address.
  //     data: window.contract.methods.batchMint(myAddr, amount).encodeABI(), //make call to NFT smart contract 
  // };
  //set up your Ethereum transaction
  const transactionParameters = {
    to: subscriptionContractAddr, // Required except during contract publications.
    from: myAddr, // must match user's active address.
    data: subscriptionContract.methods.batchMint(myAddr, amount, metaJson).encodeABI(), //make call to NFT smart contract   
  };
  //sign transaction via Metamask
  try {
    // console.log('트랜잭션 시도')
    const txHash = await window.ethereum
        .request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
        });                
    console.log("transaction: " + txHash)
      
    // const mintRes = await window.contract.methods.batchMint(myAddr, amount, metaJson).call();
    // const balRes = await window.contract.methods.balanceOf(myAddr).call();
    // console.log('결과', mintRes, balRes)
    return mintRes;
    
  } catch (error) {
      return {
          success: false,
          status: "😥 Something went wrong: " + error.message
      }
  }

}

export async function getMySubscriptionNFT(myAddr) {
  const web3 = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_ETHEREUM_RPC_URL));
  let token_id
  // const walletAddress = userAddr;
  //load smart contract
  window.contract = new web3.eth.Contract(subscriptionAbi, subscriptionContractAddr);//loadContract();
  const myBalance = await window.contract.methods.balanceOf(myAddr).call();
  const myNFTList = [];
  let tokenId;
  let tokenMetadataURI;
  for (let i = 0; i < myBalance; i++) {    
    tokenId = await contract.methods.tokenOfOwnerByIndex(myAddr, i).call()    
    tokenMetadataURI = await contract.methods.tokenURI(tokenId).call()
    // console.log(tokenId, tokenMetadataURI)
    myNFTList.push(tokenMetadataURI)

  }  
  // console.log('보유 중인 NFT 개수:', myBalance);
  return myNFTList
};

// 썸네일 창에서 해당 유저가 현재 팔고 있는 구독권 개수 불러오기 
export async function getSubscriptionInfo(userAddr, myAddr) {
  const web3 = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_ETHEREUM_RPC_URL));
  let token_id
  // const walletAddress = userAddr;
  //load smart contract

  if (!userAddr.startsWith('0x') || (!myAddr.startsWith('0x'))) {
    // console.log(userAddr, myAddr)
    return { 'count': Math.floor(Math.random() * 100), 'status': true }
  }
  
  let subscriptionContract = new web3.eth.Contract(subscriptionAbi, subscriptionContractAddr);//loadContract();
  // 로그인한 내가 썸네일 창의 유저의 구독권을 보유하고 있는지 확인
  const myBalance = await subscriptionContract.methods.balanceOf(myAddr).call();
  let isSubscribed = false
  let url,tokenId
  for (let i = 0; i < myBalance; i++) {
    tokenId = await subscriptionContract.methods.tokenOfOwnerByIndex(myAddr, i).call();
    url = await subscriptionContract.methods.tokenURI(tokenId).call();    
    const { data } = await axios(url);    
    if (data.author === userAddr) {
      isSubscribed = true
      break
    } 
  }

  // 구매할 수 있는 구독권 개수 세기
  const userBalance = await subscriptionContract.methods.balanceOf(userAddr).call();
  let availableCount = 0;

  for (let i = 0; i < userBalance; i++) {
    tokenId = await subscriptionContract.methods.tokenOfOwnerByIndex(userAddr, i).call();
    url = await subscriptionContract.methods.tokenURI(tokenId).call();
    const { data } = await axios(url);
    
    if (data.author === userAddr) {
      availableCount++;      
    } 
  }
  

  

  // let j = 0;
  // if (userAddr !== myAddr) {
  //   const myBalance = await subscriptionContract.methods.balanceOf(myAddr).call();
  //   for (let i = 0; i < myBalance; i++) {
  //     const myTokenId = await subscriptionContract.methods.tokenOfOwnerByIndex(myAddr, i).call();
  //     // const ownerAddr = await subscriptionContract.methods.ownerOf(myTokenId).call();
    
  //     while (true) {
  //       try {
  //         targetTokenId = await subscriptionContract.methods.originalAuthorAddrs(userAddr, j).call();
  //         if (targetTokenId === undefined || targetTokenId === null) break;
  //         if (targetTokenId === myTokenId) {
  //           isSubscrption = true
  //           break;
  //         }
  //         j++;
  //       } catch (err) {
  //         break;
  //       }
  //     }
  //     // let tokenMetadataURI = await contract.methods.tokenURI(tokenId).call()
  //     // tokenIndex.push(tokenId)
  //   }
  // } else {
  //   isSubscrption = true;
  // }

  // console.log('구독권 보유여부 확인 완료')
  // const userBalance = await subscriptionContract.methods.balanceOf(userAddr).call();  
  // const tokenIndex = [];
  // let currentSubscriptions = 0;
  // // console.log(userBalance)
  // for (let i = 0; i < userBalance; i++) {
  //   const userTokenId = await subscriptionContract.methods.tokenOfOwnerByIndex(userAddr, i).call()
  //   // console.log(i, userTokenId)
  //   j = 0
  //   while (true) {
  //     try {
  //       targetTokenId = await subscriptionContract.methods.originalAuthorAddrs(userAddr, j).call();        
  //     } catch (err) {
  //       break;
  //     }
  //     // console.log('타겟 토큰 아이디', j, targetTokenId)
  //     if (targetTokenId === undefined || targetTokenId === null) break;
  //     if (targetTokenId === userTokenId) {
  //       currentSubscriptions++;
  //       break;
  //     }
  //     j++;
  //   }
    
  //   // const ownerAddr = await subscriptionContract.methods.ownerOf(userTokenId).call();
  //   // if (ownerAddr === userAddr) {
  //   //   currentSubscriptions++;
  //   // }    
  //   // tokenIndex[i] = userTokenId;
  //   // let tokenMetadataURI = await contract.methods.tokenURI(tokenId).call()
  //   // tokenIndex.push(tokenId)
  // }
  // console.log('해당 user가 보유 중인 구독권 수:', userBalance);
  // console.log('토큰 인덱스: ', tokenIndex, '구독할 수 있는 구독권 수: ', currentSubscriptions)
  // console.log('결과', currentSubscriptions, isSubscrption)
  console.log(availableCount, isSubscribed)
  return { 'count': availableCount, 'status': isSubscribed }
}

// 구독권 구매하기 
// userAddr: 내가 구독하려는 상대방 지갑 주소 
// myAddr: 지갑 연동되어있는 내 지갑 주소
export async function SubscribeUser(userAddr, myAddr, setSubscriptionsCnt) {
  // console.log(process.env.REACT_APP_ETHEREUM_RPC_URL)
  const web3 = new Web3(new Web3.providers.WebsocketProvider('ws://20.196.209.2:6174'));  
  if (!userAddr.startsWith('0x') || !myAddr.startsWith('0x')) {
    alert('구독할 수 없는 계정입니다.')
    return
  }
  // 구매할 구독권의 tokenId 선정
  //load smart contract  
  let subscriptionContract = new web3.eth.Contract(subscriptionAbi, subscriptionContractAddr);//loadContract();
  const userBalance = await subscriptionContract.methods.balanceOf(userAddr).call();
  const tokenList = [];
  let tokenId, url, targetId;
  for (let i = 0; i < userBalance; i++) {
    tokenId = await subscriptionContract.methods.tokenOfOwnerByIndex(userAddr, i).call();
    url = await subscriptionContract.methods.tokenURI(tokenId).call();
    const { data } = await axios(url);    
    if (data.author === userAddr) {      
      targetId = tokenId;
      tokenList.push(tokenId)
      break
    }
    // let tokenMetadataURI = await contract.methods.tokenURI(tokenId).call()
    // tokenIndex.push(tokenId)
  }
  if (tokenList.length === 0) {
    alert('구매할 수 있는 구독권이 없습니다.');
    return // 종료
  }
  // console.log('구매 가능한 구독권 tokenID 리스트:', tokenList) // 구독권은 다 같으니까 항상 0번 인덱스의 구독권을 구매하기로.

  ///////////////////////////////////////////////////////////////////////////
  // 거래 시작
  let salefactoryContract = new web3.eth.Contract(salefactoryAbi, salefactoryContractAddr);//loadContract();
  
  // set up your Ethereum transaction
  // console.log(userAddr, tokenIndex[0], 1, tokenContractAddr, subscriptionContractAddr)
  // 구독권 가격은 일단 항상 1SSF로, 여력 되면 추후에 수정
  const transactionParameters = {
    to: salefactoryContractAddr, // Required except during contract publications.
    from: myAddr, // must match user's active address.
    data: salefactoryContract.methods.createSale(userAddr, tokenList[0], 1, tokenContractAddr, subscriptionContractAddr).encodeABI(), //make call to NFT smart contract
  };
  //sign transaction via Metamask
  try {
    // console.log('트랜잭션 시도')
    const txHash = await window.ethereum
        .request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
        });                
    console.log("transaction: " + txHash)
  
  } catch (error) {
      return {
          success: false,
          status: "😥 Something went wrong: " + error.message
      }
  }
  
  // // 사용할 Sale 컨트랙트 주소 가져오기
  let saleContractAddr
  // let saleContractAddr = await salefactoryContract.events.NewSale().arguments[0].topics[0];
  salefactoryContract.events.NewSale({})
    .on('data', (event) => {
      // console.log('사용할 Sale 컨트랙트 주소: ', event.returnValues[0])
      saleContractAddr = event.returnValues[0]
      console.log('sale contract', saleContractAddr, event)

      // console.log('사용할 Sale Contract 주소:', saleContractAddr)
      // console.log('모든 세일 컨트랙트 주소', sales)
      // 이 트랜잭션은 실패할 것으로 예상됩니다. => 승인(approve)해주었는지? or 돈이 충분히 있는지?
      let tokenContract = new web3.eth.Contract(tokenAbi, tokenContractAddr);//loadContract();
      
      async function sendTransaction () {
        // 해당 Sale 컨트랙트에 10000 SSF 권한 부여
        const transactionParameters2 = {
          to: tokenContractAddr, // Required except during contract publications.
          from: myAddr, // must match user's active address.
          data: tokenContract.methods.approve(saleContractAddr, 1).encodeABI(), //make call to NFT smart contract
        };
        //sign transaction via Metamask
        try {
          // console.log('Token 컨트랙트의 approve 트랜잭션 시도')
          const txHash = await window.ethereum
              .request({
                  method: 'eth_sendTransaction',
                  params: [transactionParameters2],
              });                
          // console.log("Token 컨트랙트의 approve transaction: " + txHash)
          // 최후의 거래 트랜잭션  
          let saleContract = new web3.eth.Contract(saleAbi, saleContractAddr);//loadContract();
          const transactionParameters3 = {
            to: saleContractAddr, // Required except during contract publications.
            from: myAddr, // must match user's active address.
            data: saleContract.methods.purchase().encodeABI(), //make call to NFT smart contract
          };
          //sign transaction via Metamask
          try {
            // console.log('sale 컨트랙트의 purchase 트랜잭션 시도')
            const txHash = await window.ethereum
                .request({
                    method: 'eth_sendTransaction',
                    params: [transactionParameters3],
                });                
            console.log("sale 컨트랙트의 purchase transaction: " + txHash)    
            setSubscriptionsCnt(prev => prev - 1)
            alert('구독이 성공적으로 이루어졌습니다.')
          } catch (error) {
              return {
                  success: false,
                  status: "😥 Something went wrong: " + error.message
              }
          }          
        
        } catch (error) {
            return {
                success: false,
                status: "😥 Something went wrong: " + error.message
            }
        }          
      }
      sendTransaction()
    })  
};

// // 내가 보유 중인 구독권 개수(내 구독권 + 타인의 구독권 합해서)
// export async function getMySubscriptionBalance(userAddr) {
//   const web3 = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_ETHEREUM_RPC_URL));
//   let token_id
//   // const walletAddress = userAddr;
//   //load smart contract
//   window.contract = new web3.eth.Contract(subscriptionAbi, subscriptionContractAddr);//loadContract();
//   const myBalance = await window.contract.methods.balanceOf(userAddr).call();
//   return myBalance
// };


// export async function getSsafyToken(myAddr) {
//   const web3 = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_ETHEREUM_RPC_URL));
//   let token_id
//   // const walletAddress = userAddr;
//   //load smart contract
//   let tokenContract = new web3.eth.Contract(tokenAbi, tokenContractAddr);//loadContract();
  
//   const transactionParameters3 = {
//     to: tokenContract, // Required except during contract publications.
//     from: myAddr, // must match user's active address.
//     data: tokenContract.methods.mint(100000).encodeABI(), //make call to NFT smart contract
//   };
//   //sign transaction via Metamask
//   try {
//     console.log('token 컨트랙트의 mint 트랜잭션 시도')
//     const txHash = await window.ethereum
//         .request({
//             method: 'eth_sendTransaction',
//             params: [transactionParameters3],
//         });
//     console.log("token 컨트랙트의 mint transaction: " + txHash)
  
//   } catch (error) {
//       return {
//           success: false,
//           status: "😥 Something went wrong: " + error.message
//       }
//   }
  
// };

export async function SubscribeMember(userAddr, myAddr, setSubscriptionsCnt) {
  // console.log(process.env.REACT_APP_ETHEREUM_RPC_URL)
  const web3 = new Web3(new Web3.providers.WebsocketProvider('ws://20.196.209.2:6174'));  
  
  // 구매할 구독권의 tokenId 선정
  //load smart contract  
  console.log(subscriptionAbi, subscriptionContractAddr)
  let subscriptionContract = new web3.eth.Contract(subscriptionAbi, subscriptionContractAddr);//loadContract();
  const myBalance = await subscriptionContract.methods.balanceOf(userAddr).call();
  const tokenList = [];
  let url
  console.log('구독')
  for (let i = 0; i < myBalance; i++) {
    const tokenId = await subscriptionContract.methods.tokenOfOwnerByIndex(userAddr, i).call();
    url = await subscriptionContract.methods.tokenURI(tokenId).call();
    const { data } = await axios(url);    
    if (data.author === userAddr) {
      tokenList.push(tokenId);
      break
    }
  }
  if (tokenList.length === 0) {
    alert('구매할 수 있는 구독권이 없습니다.');
    return // 종료
  }  
  console.log('구매 가능한 구독권 tokenID 리스트:', tokenList) // 구독권은 다 같으니까 항상 0번 인덱스의 구독권을 구매하기로.
  console.log('박찬호 주소:', userAddr, '내 주소:', myAddr, '이전할 토큰ID: ', Number(tokenList[0]))
          const transactionParameters3 = {
            to: subscriptionContractAddr, // Required except during contract publications.
            from: myAddr, // must match user's active address.
            data: subscriptionContract.methods.transferFrom(userAddr, myAddr, Number(tokenList[0])).encodeABI(), //make call to NFT smart contract
          };
          //sign transaction via Metamask
          try {
            // console.log('sale 컨트랙트의 purchase 트랜잭션 시도')
            const txHash = await window.ethereum
                .request({
                    method: 'eth_sendTransaction',
                    params: [transactionParameters3],
                });                
            console.log("구독권 전송(transferFrom) transaction: " + txHash)    
            setSubscriptionsCnt(prev => prev - 1)
            alert('성공적으로 구독되었습니다.')
          } catch (error) {
              return {
                  success: false,
                  status: "😥 Something went wrong: " + error.message
              }
          }
}