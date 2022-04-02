import Web3 from 'web3';
import AddressStore from '../common/AddressStore';
import ABI from '../common/ABI';
import { create } from 'ipfs-http-client';


/**
 * 개인키로부터 주소를 추출합니다. 
 * @param {*} privKey 개인키
 * @returns 주소
 */
export default async function NftRegistration(to, privKey, img_url) {
  const web3 = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_ETHEREUM_RPC_URL));

    // Contract sendTransaction 시 입력해야 할 것
  // 1. 사피 지갑 정보 (walletAddress, privKey)
  // 2. 사피 네트워크에 배포한 계약 정보 (contractAddr, contractABI)
  // 3. 실행할 메소드 정보 (contractMethod)

  // 1. 사피 지갑 정보
  const walletAddress = to; // 지갑 주소 (0x...)
  const walletAccount = web3.eth.accounts.privateKeyToAccount(privKey); // 지갑 계정 (주소, 비공개키, 공개키, 사인, 사인트랜잭션 함수 들어있음)

  // 2. 사피 네트워크에 배포한 계약 정보
  const abi = ABI.CONTRACT_ABI.NFT_ABI
  const contractAddr = AddressStore.CONTRACT_ADDR.SsafyNFT[0]; // contractAddr: 컨트랙트 주소
  const nftContract = new web3.eth.Contract(abi, contractAddr);

  // 3. 실행할 메소드 정보(블록체인의 데이터를 변경할 때)
  const contractMethod = nftContract.methods.create(to, img_url);
  const contractEncodedMethod = contractMethod.encodeABI();    
  
  const gasEstimate = await contractMethod.estimateGas({ from: walletAddress });
  
  const rawTx = {
    from: walletAddress,
    to: contractAddr,
    gas: gasEstimate,
    data: contractEncodedMethod,
  };

  const signedTx = await walletAccount.signTransaction(rawTx);
  web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  token_id = await nftContract.methods.create(to, metaDataPath).call();


  // 3-1. 단순히 블록체인의 데이터를 조회할 때
  const balance = await nftContract.methods.balanceOf(to).call();
  console.log('My balance:', balance) // balance: 해당 지갑이 소유하고 있는 NFT 작품 개수(토큰 개수)

  return token_id;
}
