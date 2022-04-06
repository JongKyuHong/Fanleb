import Web3 from 'web3';
import AddressStore from '../common/AddressStore';
import ABI from '../common/ABI';
import { create } from 'ipfs-http-client';

 // 사피 네트워크에 배포한 계약 정보
const abi_erc = ABI.CONTRACT_ABI.ERC_ABI; // contract ABI
const CurrencyAddress = AddressStore.CONTRACT_ADDR.CurrencyAddress[0]; // contractAddr: 컨트랙트 주소
const admin_adr = AddressStore.CONTRACT_ADDR.Admin[0];

// const admin_addr = '0x297830ffF99C4E6482de435E1333fb10711E84F3'; 
// const admin_privkey = '0x5abef7b3575712ba0d8d20f72ae26a8cdae54d7a551c30561624c4a011f38eac';

/**
 * 개인키로부터 주소를 추출합니다. 
 * @param {*} privKey 개인키
 * @returns 주소
 */
export default async function token_transfer(_user_address) {
    const web3 = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_ETHEREUM_RPC_URL));
    window.contract = await new web3.eth.Contract(abi_erc, CurrencyAddress);
    console.log(CurrencyAddress,'cu')
    console.log(admin_adr,'admin')
    console.log(_user_address,'user')
    const parameter1 = {
        to : CurrencyAddress,
        from : admin_adr,
        data : window.contract.methods.transfer(_user_address, 100).encodeABI()
    }

    try{
        const txhash1 = await window.ethereum
        .request({
            method: 'eth_sendTransaction',
            params: [parameter1],
        });                
        console.log("transaction: " + txhash1)
        const res1 = await window.contract.methods.transfer(_user_address, 100).call();
    } catch (error) {
        console.error(error)
    }

}
