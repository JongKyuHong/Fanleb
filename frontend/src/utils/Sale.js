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
// _to, itemId, purchasePrice, currencyAddress, nftAddress

export default async function Trade(walletaddress, addr, seller_addr, purchasePrice, token_id) {
  const web3 = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_ETHEREUM_RPC_URL));

  window.contract = await new web3.eth.Contract(token_abi, cuaddr);

  const transactionParameters2 = {
    to: cuaddr,
    from: walletaddress,
    'data': window.contract.methods.approve(walletaddress, purchasePrice).encodeABI()
  };
  
  try {
    const txHash2 = await window.ethereum
        .request({
            method: 'eth_sendTransaction',
            params: [transactionParameters2],
        });                
    console.log("transaction: " + txHash2)
    await window.contract.methods.approve(walletaddress, purchasePrice).call();
    
  } catch (error) {
      console.error(error)
  }

  window.contract = await new web3.eth.Contract(nft_abi, nft_addr);

  const transactionParameters1 = {
    to: nft_addr,
    from: walletaddress,
    'data': window.contract.methods.approve(walletaddress, token_id).encodeABI()
  }

  try {
    const txHash1 = await window.ethereum
        .request({
            method: 'eth_sendTransaction',
            params: [transactionParameters1],
        });                
    console.log("transaction1: " + txHash1)
    await window.contract.methods.approve(walletaddress, token_id).call();
  } catch (error) {
      console.error(error)
  }

  window.contract = await new web3.eth.Contract(sale_abi, addr);
  const transactionParameters = {
    to: addr,
    from: walletaddress,
    'data': window.contract.methods.purchase(walletaddress).encodeABI()
  };

  try {
    const txHash = await window.ethereum
        .request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
        });                
    console.log("transaction: " + txHash)
    await window.contract.methods.purchase(walletaddress).call();
  } catch (error) {
    console.error(error)
  }
}
