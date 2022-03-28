import Web3 from 'web3';
import AddressStore from '../common/AddressStore';
import ABI from '../common/ABI';
/**
 * 개인키로부터 주소를 추출합니다. 
 * @param {*} privKey 개인키
 * @returns 주소
 */
export default function Create_Sale(itemId, purchasePrice, currencyAddress, nftAddress) {
  const web3 = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_ETHEREUM_RPC_URL));
  const SaleFactory_Contract = web3.eth.Contract(ABI.CONTRACT_ABI.SALE_FACTORY_ABI, AddressStore.CONTRACT_ADDR.SaleFactory);
  const addr = SaleFactory_Contract.createSale(itemId, purchasePrice, currencyAddress, nftAddress);
  return addr;
}
