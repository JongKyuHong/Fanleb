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

  console.log(itemId,'itemId')
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
          console.log("hi")
          saleContractAddr = event.returnValues[0]
        
          let nftContract = new web3.eth.Contract(nft_abi, nft_addr);
          var data = {
            "token_id" : itemId,
            "seller_address" : _to,
            "sales_contract_address" : saleContractAddr,
            "cash_contract_address" : currency_addr,
            "price" : purchasePrice
          };
        
          var config = {
            method: 'post',
            url: 'http://j6a107.p.ssafy.io/api/sales', // 
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
          //async function s(){
            // const tranParameters2 = {
            //   to : nft_addr,
            //   from : _to,
            //   data : nftContract.methods.setApprovalForAll(saleContractAddr, true).encodeABI()
            // }
            
            // try{
            //   const txHash3 = await window.ethereum
            //     .request({
            //       method : 'eth_sendTransaction',
            //       params : [tranParameters2],
            //     });

                  // const transParameter222 = {
                  //   to : nft_addr,
                  //   from : _to,
                  //   data : nftContract.methods.approve(nft_addr, itemId).encodeABI()
                  // }
                  // try{
                  //   const txHash333 = await window.ethereum
                  //     .request({
                  //       method : 'eth_sendTransaction',
                  //       params : [transParameter222],
                  //     });
                  //     console.log("transaction3: " + txHash333)
                
                  //   const transParameter22 = {
                  //     to : nft_addr,
                  //     from : _to,
                  //     data : nftContract.methods.transferFrom(_to, saleContractAddr, itemId).encodeABI()
                  //   }
                    
                  //   try{
                  //     const txHash33 = await window.ethereum
                  //       .request({
                  //         method : 'eth_sendTransaction',
                  //         params : [transParameter22],
                  //       });
                  //       console.log("transaction3: " + txHash33)
                  //   } catch (error){
                  //     console.error(error)
                  //   }
                  // //SALE_Registration_API(itemId, _to, saleContractAddr, purchasePrice)
                  // const ownera = await nftContract.methods.ownerOf(itemId).call();
                  // console.log(ownera, 'owner')
                  // var data = {
                  //   "token_id" : itemId,
                  //   "seller_address" : _to,
                  //   "sales_contract_address" : saleContractAddr,
                  //   "cash_contract_address" : currency_addr,
                  //   "price" : purchasePrice
                  // };
                
                  // var config = {
                  //   method: 'post',
                  //   url: 'http://j6a107.p.ssafy.io/api/sales', // 
                  //   headers: { },
                  //   data : data
                  // };
                
                  // axios(config)
                  // .then(function (response) {
                  //   console.log(JSON.stringify(response.data));
                  // })
                  // .catch(function (error) {
                  //   console.log(error);
                  // });
            // } catch (error){
            //   console.error(error)
            // }

          // } catch (error){
          //   console.error(error)
          // }
          // }
          // s()
        })
  } catch (error){
    console.error(error)
  }
}


