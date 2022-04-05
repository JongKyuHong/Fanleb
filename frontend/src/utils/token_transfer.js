import Web3 from 'web3';
import AddressStore from '../common/AddressStore';
import ABI from '../common/ABI';
import { create } from 'ipfs-http-client';

 // 사피 네트워크에 배포한 계약 정보
const abi_erc = ABI.CONTRACT_ABI.ERC_ABI; // contract ABI
const CurrencyAddress = AddressStore.CONTRACT_ADDR.CurrencyAddress[0]; // contractAddr: 컨트랙트 주소
/**
 * 개인키로부터 주소를 추출합니다. 
 * @param {*} privKey 개인키
 * @returns 주소
 */
export default async function token_transfer(_user_address) {
    console.log('그냥 들어왔나해서')
    const web3 = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_ETHEREUM_RPC_URL));
    const admin_addr = '0x297830ffF99C4E6482de435E1333fb10711E84F3'; 
    const admin_privkey = '0x5abef7b3575712ba0d8d20f72ae26a8cdae54d7a551c30561624c4a011f38eac';
    // const admin_Account = web3.eth.accounts.privateKeyToAccount(admin_privkey)
    const admin_walletAccount = web3.eth.accounts.privateKeyToAccount(admin_privkey);

    const tokenContractInstance = await new web3.eth.Contract(abi_erc, CurrencyAddress);
    const tokenContractMethod = tokenContractInstance.methods._transfer(admin_addr, _user_address,100) // forceToTransfer
    const tokenContractEncodedMethod = tokenContractMethod.encodeABI();

    (async () => {
        try {
            const _gasEstimate = await contractMethod.estimateGas({ from: admin_addr });
            const _rawTx = {
                from: admin_addr,
                to: CurrencyAddress,
                gas: _gasEstimate,
                data: tokenContractEncodedMethod,
            };
            admin_walletAccount.signTransaction(_rawTx).then((signedTx) => {
                if (signedTx == null) throw new Error("TransactionSignFailedException");

                let tran = web3.eth.sendSignedTransaction(signedTx.rawTransaction);
                tran.on('transactionHash', (txhash) => { 
                    console.log("Tx Hash: " + txhash)
                    tran.off('transactionHash');
                });
                // tran.on('receipt', (receipt) => console.log("Receipt: " + receipt));
                tran.on('confirmation', async (confirmationNumber, receipt) => {
                    try {
                        // 3회 이상 컨펌시 더이상 Confirmation 이벤트 추적 안함
                        if (confirmationNumber > 2) {
                            tran.off('confirmation');
                            throw new Error("ConfirmCompletedException");
                        }

                        console.log("Confirm #" + confirmationNumber);
                        // console.log("Confirm Receipt: " + receipt);

                        const _result = await contractInstance.methods.forceToTransfer(admin_addr,_user_address,100).call();
                        console.log(_result);
                    } catch (err) {
                        if (err instanceof TypeError) console.error('예외: 타입 에러', err);
                        if (err instanceof Error) {
                            if (err.message == "ConfirmCompletedException") console.error('예외: 컨펌 완료');
                            else console.error('예외: 알 수 없는 에러', err);
                        }
                    }
                });
                tran.on('error', (error, receipt) => {
                    if (receipt) throw new Error("OutOfGasException") 
                    else new Error("UnknownErrorException");
                }); 
            })
            .catch(err => { throw err; } );
        } catch (err) {
            if (err instanceof Error) {
                if (err.message == "TransactionSignFailedException") console.error('예외: 트랜잭션 서명 실패', err);
                if (err.message == "OutOfGasException") console.error('예외: 가스 부족', err);
                if (err.message == "UnknownErrorException") console.error('예외: 알 수 없는 에러', err);
                else console.error('예외: 알 수 없는 에러', err);
            }
        }
})();


  const tp = {
    to : CurrencyAddress,
    from : admin_addr,
    data : window.contract.methods.forceToTransfer(admin_addr, _user_address, 100).encodeABI()
  }

  //sign transaction via Metamask
  try {
    const _txHash = await window.ethereum
        .request({
            method: 'eth_sendTransaction',
            params: [tp],
        });                
    console.log("transaction: " + _txHash)
    const _res = await window.contract.methods.forceToTransfer(admin_addr, _user_address, 100).call();
    console.log('결과', _res)
  } catch (error) {
    console.error(error)
  }

}
