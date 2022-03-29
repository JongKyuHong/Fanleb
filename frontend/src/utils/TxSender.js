// import Web3 from 'web3';
// import Tx from 'ethereumjs-tx';

// // Web3
// const web3 = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_ETHEREUM_RPC_URL));

// /**
//  * 트랜잭션 전송을 위한 공통 로직을 아래에 구현합니다. 
//  * 전달받은 개인키로 서명한 트랜잭션을 전송합니다. 
//  * @param {*} fromAddr 보내는 주소
//  * @param {*} privKey 보내는 주소의 개인키
//  * @param {*} toAddr 받는 주소
//  * @param {*} data 입력 데이터
//  * @returns 트랜잭션의 결과 
//  */
// export default async function sendTransaction(fromAddr, privKey, toAddr, data) {
//   try {
//     // TODO
//   } catch (e) {
//     console.log(e);
//   }
// }
const Web3 = require("web3");
const fs = require("fs");

// 네트워크 기본 설정
const ssafyProvider = new Web3.providers.HttpProvider("http://20.196.209.2.:8545");
// const localProvider = new Web3.providers.HttpProvider("http://localhost:7545");
const web3 = new Web3(ssafyProvider);

// Contract sendTransaction 시 입력해야 할 것
// 1. 사피 지갑 정보 (walletAddress, privateKey)
// 2. 사피 네트워크에 배포한 계약 정보 (contractAddr, contractABI)
// 3. 실행할 메소드 정보 (contractMethod)
//

// 1. 사피 지갑 정보`
// const walletAddress = "[사피 지갑주소: 0x1234...]";
// const privateKey = '[사피 지갑개인키: 0x1234...]';

//const walletAddress = "0x316Cccdc7D62Ca20cC45496c83F12A4a9EC27a21";
//const privateKey = '68bb22025e0b6c6a14fa1d71c2aa1c53834d248cbfddcbba0183bd641ce36036';

//const walletAccount = web3.eth.accounts.privateKeyToAccount(privateKey);

// 2. 사피 네트워크에 배포한 계약 정보
// const contractAddr = "[배포한 계약 주소: 0x1234...]";
// const { abi: contractABI } = JSON.parse(fs.readFileSync('./build/contracts/[Truffle compile한 결과물].json'));

// const contractAddr = "0x7d544ddD5CA5D6f9E613eD3AB22f7683Bd726A81";

// const { abi: contractABI } = JSON.parse(fs.readFileSync('./build/contracts/SsafyNFT.json'));
const { abi: contractABI } = {}

//const contractInstance = new web3.eth.Contract(contractABI, contractAddr);

// 3. 실행할 메소드 정보
// const contractMethod = contractInstance.methods.create('0x316Cccdc7D62Ca20cC45496c83F12A4a9EC27a21',"토큰URI");//('닉네임', '설명', '토큰URI', Date.now())
// const contractEncodedMethod = contractMethod.encodeABI();

export default async function sendTransaction(fromAddr, privKey, toAddr, data) {
    try {
        const gasEstimate = await contractMethod.estimateGas({ from: fromAddr });
        const walletAccount = web3.eth.accounts.privateKeyToAccount(privKey);

        const contractInstance = new web3.eth.Contract(contractABI, toAddr);
        const contractMethod = contractInstance.methods.create(fromAddr,"토큰URI");
        const contractEncodedMethod = contractMethod.encodeABI();

        const rawTx = {
            from: fromAddr,
            to: toAddr,
            gas: gasEstimate,
            data: contractEncodedMethod,
        };
    
        walletAccount.signTransaction(rawTx).then((signedTx) => {
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

                    const Name = await contractInstance.methods.Nickname(fromAddr).call();
                    const TokenURI = await contractInstance.methods.ImageURI(fromAddr).call();

                    console.log(Name, TokenURI);
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
};