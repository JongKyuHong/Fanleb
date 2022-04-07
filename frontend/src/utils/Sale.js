import Web3 from 'web3';
import AddressStore from '../common/AddressStore';
import ABI from '../common/ABI';

/**
 * 개인키로부터 주소를 추출합니다.
 * @param {*} privKey 개인키
 * @returns 주소
 */


const token_abi  = ABI.CONTRACT_ABI.TOKEN_ABI;
const token_addr = AddressStore.CONTRACT_ADDR.SsafyToken[0];

const sf_abi = ABI.CONTRACT_ABI.SALE_FACTORY_ABI;
const sf_addr = AddressStore.CONTRACT_ADDR.SaleFactory[0];

const nft_abi = ABI.CONTRACT_ABI.NFT_ABI;
const nft_addr = AddressStore.CONTRACT_ADDR.SsafyNFT[0];

const cuaddr = AddressStore.CONTRACT_ADDR.CurrencyAddress[0];

const sale_abi = ABI.CONTRACT_ABI.SALE_ABI;
const erc = ABI.CONTRACT_ABI.ERC_ABI;
// _to, itemId, purchasePrice, currencyAddress, nftAddress

export default async function Trade(walletaddress, sale_addr, purchasePrice, token_id) {
  console.log(sale_addr,'addr')
  console.log(purchasePrice,'purchasePrice')
  console.log(walletaddress,'wallet')
  const web3 = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_ETHEREUM_RPC_URL));
  let tokenContract = new web3.eth.Contract(erc, cuaddr);

  const transactionParameters2 = {
    to: cuaddr,
    from: walletaddress,
    data: tokenContract.methods.approve(sale_addr, purchasePrice).encodeABI() //purchasePrice
  };
  
  try {
    const txHash3333 = await window.ethereum
        .request({
            method: 'eth_sendTransaction',
            params: [transactionParameters2],
        });                
    console.log("transaction: " + txHash3333)
    
    let nftContract = new web3.eth.Contract(nft_abi, nft_addr);
      const transactionParameters1 = {
        to: nft_addr,
        from: walletaddress, // walletaddress
        data: nftContract.methods.approve(walletaddress, token_id).encodeABI() // sale_addr
      }
      try {
        const txHash1 = await window.ethereum
            .request({
                method: 'eth_sendTransaction',
                params: [transactionParameters1],
            });                
        console.log("transaction1: " + txHash1)
        let SaleContract = new web3.eth.Contract(sale_abi, sale_addr);

        const transactionParameters = {
          to: sale_addr,
          from: walletaddress,
          data: SaleContract.methods.purchase().encodeABI()
        };
    
        try {
          const txHash = await window.ethereum
              .request({
                  method: 'eth_sendTransaction',
                  params: [transactionParameters],
              });                
          console.log("transaction: " + txHash)
          //window.contract.methods.purchase(walletaddress).call();
          } catch (error) {
            console.error(error)
          }
        } catch (error) {
          console.error(error)
        }
    } catch (error) {
      console.log(error.message)
  }
}
