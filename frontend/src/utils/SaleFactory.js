import Web3 from 'web3';
import AddressStore from '../common/AddressStore';
import ABI from '../common/ABI';

/**
 * 개인키로부터 주소를 추출합니다.
 * @param {*} privKey 개인키
 * @returns 주소
 */

const sf_abi = ABI.CONTRACT_ABI.SALE_FACTORY_ABI;
const sf_addr = AddressStore.CONTRACT_ADDR.SaleFactory[0];

const nft_abi = ABI.CONTRACT_ABI.NFT_ABI;
const nft_addr = AddressStore.CONTRACT_ADDR.SsafyNFT[0];

export async function Create_Sale(_to, itemId, purchasePrice, currencyAddress, nftAddress) {
  const web3 = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_ETHEREUM_RPC_URL));

  window.contract = new web3.eth.Contract(sf_abi, sf_addr);

  const transactionParameters = {
    to : sf_addr,
    from : _to,
    'data' : window.contract.methods.createSale(_to, itemId, purchasePrice, currencyAddress, nftAddress).encodeABI()
  };

  try{
    const txHash = await window.ethereum
      .request({
        method : 'eth_sendTransaction',
        params : [transactionParameters],
      });
    console.log("transaction: " + txHash)
    sale_addr = await window.contract.methods.createSale(_to, itemId, purchasePrice, currencyAddress, nftAddress).call();
    //return sale_addr
  } catch (error){
    console.error(error)
  }

  window.contract = new web3.eth.Contract(nft_abi, nft_addr);

  const tranParameters = {
    from : _to,
    to : nft_addr,
    'data' : window.contract.methods.transferFrom(_to, sale_addr, itemId).encodeABI()
  };

  try{
    const txHash2 = await window.ethereum
      .request({
        method : 'eth_sendTransaction',
        params : [tranParameters],
      });
      console.log("transaction: " + txHash2)
    const a = await window.contract.methods.transferFrom(_to, sale_addr, itemId).call();
  } catch (error){
    console.error(error)
  }
  
  return sale_addr
}


export default function SALE_Registration_API(itemId, walletAddress, Sale_ContractAddr, currencyAddress){
  var axios = require('axios');
  var data = {
    "token_id" : itemId,
    "seller_address" : walletAddress,
    "sales_contract_address" : Sale_ContractAddr,
    "cash_contract_address" : currencyAddress,
  };

  var config = {
    method: 'post',
    url: 'http://j6a107.p.ssafy.io/api/sales',
    headers: { },
    data : data
  };

  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
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

