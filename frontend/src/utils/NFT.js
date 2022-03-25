import Web3 from 'web3';
import AddressStore from '../common/AddressStore';
import ABI from '../common/ABI';
/**
 * 개인키로부터 주소를 추출합니다. 
 * @param {*} privKey 개인키
 * @returns 주소
 */
export default function NftRegistration(to, tokenURI) {
  const web3 = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_ETHEREUM_RPC_URL));
  const nftContract = web3.eth.Contract(ABI.CONTRACT_ABI.NFT_ABI, AddressStore.CONTRACT_ADDR.SsafyNFT);
  const token_id = nftContract.create(to, tokenURI);
  return token_id;
}
