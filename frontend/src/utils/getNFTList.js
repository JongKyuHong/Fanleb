import Web3 from 'web3';
import AddressStore from '../common/AddressStore';
import ABI from '../common/ABI';
import axios from 'axios';


/**
 * 개인키로부터 주소를 추출합니다. 
 * @param {*} privKey 개인키
 * @returns 주소
 */
export default async function getNFTList(idx) {
  const web3 = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_ETHEREUM_RPC_URL));

  // Contract sendTransaction 시 입력해야 할 것
  // 1. 사피 지갑 정보 (walletAddress, privateKey)
  // 2. 사피 네트워크에 배포한 계약 정보 (contractAddr, contractABI)
  // 3. 실행할 메소드 정보 (contractMethod)
  //

  // 1. 사피 지갑 정보
  // const walletAddress = "[사피 지갑주소: 0x1234...]"; 
  // const privateKey = '[사피 지갑개인키: 0x1234...]';
  // const walletAddress = to;
  // const privateKey = privKey;

  // const walletAccount = web3.eth.accounts.privateKeyToAccount(privKey);

  // 2. 사피 네트워크에 배포한 계약 정보
  // const contractAddr = "[배포한 계약 주소: 0x1234...]";
  // const { abi: contractABI } = JSON.parse(fs.readFileSync('./build/contracts/[Truffle compile한 결과물].json'));
  const contractAddr = AddressStore.CONTRACT_ADDR.SsafyNFT[0];
  const nftContract = new web3.eth.Contract(ABI.CONTRACT_ABI.NFT_ABI, AddressStore.CONTRACT_ADDR.SsafyNFT[0]);

  // 3. 실행할 메소드 정보
  // const contractMethod = nftContract.methods.create(to, 'asdasd');  
  let tokenCounts = await nftContract.methods.totalSupply().call();
  tokenCounts = Number(tokenCounts);
  const resultList = [];
  while (tokenCounts > 0) {
    const res = await nftContract.methods.tokenURI(tokenCounts).call();
    const { data } = await axios(res);
    const resultItem = {
      id: tokenCounts,
      image: data.imageUrl,
      hash: data.imageUrl,
      price: "fake price",
      title: data.title
    };    
    resultList.push(resultItem);    
    tokenCounts -= 1
  } 


  // const contractEncodedMethod = contractMethod.encodeABI();

    
  // const gasEstimate = await contractMethod.estimateGas({ from: walletAddress });

  // const rawTx = {
  //     from: walletAddress,
  //     to: contractAddr,
  //     gas: gasEstimate,
  //     data: contractEncodedMethod,
  // };
  // // console.log(rawTx)
  //   const signedTx = await walletAccount.signTransaction(rawTx);
  //   web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  //   token_id = await nftContract.methods.create(to, tokenURI).call();
  //   console.log(token_id)
  // console.log('ipfs start')
  // const { path } = await ipfs.add(bufferData);
  // data.imageUrl += path;
  // const metaData = JSON.stringify(data);
  // const result = await ipfs.add(metaData);
  // const metaDataPath = 'https://ipfs.infura.io/ipfs/' + result.path;
  // console.log(metaDataPath)
  // const addr = await nftContract.methods.balanceOf(to).call();
  // console.log('My balance:', addr)

  // // console.log(token_id)
  return resultList;
}