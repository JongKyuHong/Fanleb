import Web3 from 'web3';
import AddressStore from '../common/AddressStore';
import ABI from '../common/ABI';
import axios from 'axios';


/**
 * 개인키로부터 주소를 추출합니다.
 * @param {*} privKey 개인키
 * @returns 주소
 */



const sf_abi = ABI.CONTRACT_ABI.SALE_FACTORY_ABI;
const sf_addr = AddressStore.CONTRACT_ADDR.SaleFactory[0];

const nft_abi = ABI.CONTRACT_ABI.NFT_ABI;
const nft_addr = AddressStore.CONTRACT_ADDR.SsafyNFT[0];

const cu_addr = AddressStore.CONTRACT_ADDR.CurrencyAddress[0];

export async function Create_Sale(_to, itemId, purchasePrice) {
  const web3 = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_ETHEREUM_RPC_URL));

  window.contract = new web3.eth.Contract(sf_abi, sf_addr);
  const windowmethod = window.contract.methods.createSale(_to, itemId, purchasePrice, cu_addr, nft_addr).encodeABI()
  const transactionParameters11 = {
    to : sf_addr,
    from : _to,
    data :  windowmethod,// currency
  };

  try{
    const txHash = await window.ethereum
      .request({
        method : 'eth_sendTransaction',
        params : [transactionParameters11],
      });
    console.log("transaction: " + txHash)
    const sale_addr = await window.contract.methods.createSale(_to, itemId, purchasePrice, cu_addr, nft_addr).call(); // currency
    console.log(sale_addr, '여기까지는 됨')
    appr(_to, itemId, sale_addr)
  
  } catch (error){
    console.error(error)
  }
}

export async function appr(_to, itemId, s_addr) {
  const web3 = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_ETHEREUM_RPC_URL));
  window.contract = new web3.eth.Contract(nft_abi, nft_addr);
  const windowmethod2 = window.contract.methods.approve(s_addr, itemId).encodeABI()

  const tranParameters2 = {
    from : _to,
    to : nft_addr,
    data : windowmethod2,
  }

  try{
    const txHash3 = await window.ethereum
      .request({
        method : 'eth_sendTransaction',
        params : [tranParameters2],
      });
      console.log('여기 까지도6')
      console.log("transaction3: " + txHash3)
    console.log('여기는 되네')
    const a = window.contract.methods.approve(s_addr, itemId).call()
    trans(_to,itemId, s_addr)
  } catch (error){
    console.error(error)
  }
}

export async function trans(_to, itemId, s_addr) {
  const web3 = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_ETHEREUM_RPC_URL));
  window.contract = new web3.eth.Contract(nft_abi, nft_addr);
  const windowmethod3 = window.contract.methods.transferFrom(_to, s_addr, itemId).encodeABI()


  console.log(_to,'to')
  console.log(itemId,'item')
  console.log(s_addr,'s_addr')

  const tranParameters = {
    from : _to,
    to : nft_addr,
    data : windowmethod3,
  };
  
  try{
    const txHash2 = await window.ethereum
      .request({
        method : 'eth_sendTransaction',
        params : [tranParameters],
      });
      console.log("transaction2: " + txHash2)
    console.log('여기는 되네')
    const a = await window.contract.methods.transferFrom(_to, s_addr, itemId).call()
    console.log(sale_addr)
  } catch (error){
    console.error(error)
  }
}


export default function SALE_Registration_API(itemId, walletAddress, Sale_ContractAddr, currencyAddress){
  
  
  var data = {
    "token_id" : itemId,
    "seller_address" : walletAddress,
    "sales_contract_address" : Sale_ContractAddr,
    "cash_contract_address" : cu_addr,
  };

  var config = {
    method: 'post',
    url: 'api/sales', // http://j6a107.p.ssafy.io/
    headers: { },
    data : data
  };

  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
    return true;
  })
  .catch(function (error) {
    console.log(error);
    return false;
  });
  // const nftMethod2 = NFT_Contract.methods.approve(to, Sale_ContractAddr, itemId);
  // const nftEncodedMethod2 = nftMethod.encodeABI();


  // const gasEstimate2 = await nftEncodedMethod2.estimateGas({ from: walletAddress });
  
  // const rawTx3 = {
  //   from: walletAddress,
  //   to: Sale_ContractAddr,
  //   gas: gasEstimate2,
  //   data: nftEncodedMethod,
  // };

  // const signedTx3= await walletAccount.signTransaction(rawTx2);
  // web3.eth.sendSignedTransaction(signedTx2.rawTransaction);
}

