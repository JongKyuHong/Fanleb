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

const Token_abi = ABI.CONTRACT_ABI.TOKEN_ABI;
const currency_addr = AddressStore.CONTRACT_ADDR.CurrencyAddress[0];

export async function Create_Sale(_to, itemId, purchasePrice) {
  //const web3 = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_ETHEREUM_RPC_URL));
  const web3 = new Web3(new Web3.providers.WebsocketProvider('ws://20.196.209.2:6174'));
  let salefactoryContract = new web3.eth.Contract(sf_abi, sf_addr);
  const transactionParameters11 = {
    to : sf_addr,
    from : _to,
    data :  salefactoryContract.methods.createSale(_to, itemId, purchasePrice, currency_addr, nft_addr).encodeABI()
  };
  
  try{
    const txHash = await window.ethereum
      .request({
        method : 'eth_sendTransaction',
        params : [transactionParameters11],
      });
      console.log("transaction: " + txHash)
      let saleContractAddr
      salefactoryContract.events.NewSale({})
        .on('data', (event) => {
          saleContractAddr = event.returnValues[0]
          var data = {
            "token_id" : itemId,
            "seller_address" : _to,
            "sales_contract_address" : saleContractAddr,
            "cash_contract_address" : currency_addr,
            "price" : purchasePrice
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
        })
    return saleContractAddr
  } catch (error){
    console.error(error)
  }
  
}


