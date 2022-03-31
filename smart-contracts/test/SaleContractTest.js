

/**
 *  PJT Ⅲ - Req.1-SC3) 시나리오 테스트
 */
const SsafyToken = artifacts.require("SsafyToken");
const SsafyNFT = artifacts.require("SsafyNFT");
const SaleFactory = artifacts.require("SaleFactory");
const Sale = artifacts.require("Sale");
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
let ssafyTokenContract, salesFactoryContract, nftContract, salesContract;
let itemId = 0;

contract("Sale Contract Testing", (accounts) => {
    
    const mintAmount = 10000;
    const uri = "testURI";

    async function print(title) {
        const seller = accounts[0];
        const bidder1 = accounts[1];
        const bidder2 = accounts[2];
        console.log(`\n--------------------  ${title} --------------------`);
        console.log(`Seller: ${seller} ${await getBalance(seller)}`);
        console.log(`Bidder1: ${bidder1} ${await getBalance(bidder1)}`);
        console.log(`Bidder2: ${bidder2} ${await getBalance(bidder2)}\n`);
    }

    // it("Bid and confirm", async () => {
    //     const seller = accounts[0];
    //     const bidder1 = accounts[1];
    //     const bidder2 = accounts[2]; // purchaser

    //     // TODO
    //     // 다음을 테스트를 통과해야합니다.
    //     // assert.equal(bidder2, await getNftOwner(), "Confirm Failed");
    //     // assert.equal(1000, await getBalance(bidder1), "Refund Failed");
    // });

    // it("Bid and Purchase", async () => {
    //     const seller = accounts[0];
    //     const bidder = accounts[1];
    //     const purchaser = accounts[2];

    //     // TODO
    //     // 다음을 테스트를 통과해야합니다.
    //     // assert.equal(purchaser, await getNftOwner(), "Not Owned By Purchaser");
    //     // assert.equal(1000, await getBalance(bidder), "Refund Failed");
    //     // assert.equal(900, await getBalance(purchaser), "Transfer Failed");
    // });

    it("Purchase1", async () => {
        const admin = accounts[0];
        const seller = accounts[1];
        const purchaser = accounts[2];

        const token = await SsafyToken.deployed("ssafytoken","ssf",10000);

        token.mint(mintAmount);
        token.forceToTransfer(admin,purchaser,1000);

        const nft = await SsafyNFT.deployed();
        const id = nft.create(seller,uri);

        const sf = await SaleFactory.deployed();
        const addr = sf.createSale(seller, itemId, 100, token.address, sf.address);

        // const saleCon = await Sale.deployed(admin,seller,itemId,100,token.address,sf.address);
        // saleCon.purchase(purchaser)

        const sale_con = new web3.eth.Contract([
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "_admin",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "_seller",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "_tokenId",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "_purchasePrice",
                  "type": "uint256"
                },
                {
                  "internalType": "address",
                  "name": "_currencyAddress",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "_nftAddress",
                  "type": "address"
                }
              ],
              "stateMutability": "nonpayable",
              "type": "constructor"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": false,
                  "internalType": "address",
                  "name": "bidder",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "amount",
                  "type": "uint256"
                }
              ],
              "name": "HighestBidIncereased",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": false,
                  "internalType": "address",
                  "name": "winner",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "amount",
                  "type": "uint256"
                }
              ],
              "name": "SaleEnded",
              "type": "event"
            },
            {
              "inputs": [],
              "name": "buyer",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "currencyAddress",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "ended",
              "outputs": [
                {
                  "internalType": "bool",
                  "name": "",
                  "type": "bool"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "erc20Contract",
              "outputs": [
                {
                  "internalType": "contract IERC20",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "erc721Constract",
              "outputs": [
                {
                  "internalType": "contract IERC721",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "highestBid",
              "outputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "highestBidder",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "nftAddress",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "purchasePrice",
              "outputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "seller",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "tokenId",
              "outputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "bid_amount",
                  "type": "uint256"
                }
              ],
              "name": "bid",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "_buyer",
                  "type": "address"
                }
              ],
              "name": "purchase",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "confirmItem",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "cancelSales",
              "outputs": [],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "getAddress",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "getSeller",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "gettokenId",
              "outputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "getSaleInfo",
              "outputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                },
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            }
          ],addr);
        sale_con.methods.purchase(purchaser);


        admin_balance = await web3.eth.getBalance(admin);
        seller_balance = await web3.eth.getBalance(seller);
        purchaser_balance = await web3.eth.getBalance(purchaser);

        console.log(admin_balance,'admin');
        console.log(seller_balance,"seller");
        console.log(purchaser_balance,"purchaser_balance");

        // var sale_con = new web3.eth.Contract([
        //     {
        //       "inputs": [
        //         {
        //           "internalType": "address",
        //           "name": "_admin",
        //           "type": "address"
        //         },
        //         {
        //           "internalType": "address",
        //           "name": "_seller",
        //           "type": "address"
        //         },
        //         {
        //           "internalType": "uint256",
        //           "name": "_tokenId",
        //           "type": "uint256"
        //         },
        //         {
        //           "internalType": "uint256",
        //           "name": "_purchasePrice",
        //           "type": "uint256"
        //         },
        //         {
        //           "internalType": "address",
        //           "name": "_currencyAddress",
        //           "type": "address"
        //         },
        //         {
        //           "internalType": "address",
        //           "name": "_nftAddress",
        //           "type": "address"
        //         }
        //       ],
        //       "stateMutability": "nonpayable",
        //       "type": "constructor"
        //     },
        //     {
        //       "anonymous": false,
        //       "inputs": [
        //         {
        //           "indexed": false,
        //           "internalType": "address",
        //           "name": "bidder",
        //           "type": "address"
        //         },
        //         {
        //           "indexed": false,
        //           "internalType": "uint256",
        //           "name": "amount",
        //           "type": "uint256"
        //         }
        //       ],
        //       "name": "HighestBidIncereased",
        //       "type": "event"
        //     },
        //     {
        //       "anonymous": false,
        //       "inputs": [
        //         {
        //           "indexed": false,
        //           "internalType": "address",
        //           "name": "winner",
        //           "type": "address"
        //         },
        //         {
        //           "indexed": false,
        //           "internalType": "uint256",
        //           "name": "amount",
        //           "type": "uint256"
        //         }
        //       ],
        //       "name": "SaleEnded",
        //       "type": "event"
        //     },
        //     {
        //       "inputs": [],
        //       "name": "buyer",
        //       "outputs": [
        //         {
        //           "internalType": "address",
        //           "name": "",
        //           "type": "address"
        //         }
        //       ],
        //       "stateMutability": "view",
        //       "type": "function"
        //     },
        //     {
        //       "inputs": [],
        //       "name": "currencyAddress",
        //       "outputs": [
        //         {
        //           "internalType": "address",
        //           "name": "",
        //           "type": "address"
        //         }
        //       ],
        //       "stateMutability": "view",
        //       "type": "function"
        //     },
        //     {
        //       "inputs": [],
        //       "name": "ended",
        //       "outputs": [
        //         {
        //           "internalType": "bool",
        //           "name": "",
        //           "type": "bool"
        //         }
        //       ],
        //       "stateMutability": "view",
        //       "type": "function"
        //     },
        //     {
        //       "inputs": [],
        //       "name": "erc20Contract",
        //       "outputs": [
        //         {
        //           "internalType": "contract IERC20",
        //           "name": "",
        //           "type": "address"
        //         }
        //       ],
        //       "stateMutability": "view",
        //       "type": "function"
        //     },
        //     {
        //       "inputs": [],
        //       "name": "erc721Constract",
        //       "outputs": [
        //         {
        //           "internalType": "contract IERC721",
        //           "name": "",
        //           "type": "address"
        //         }
        //       ],
        //       "stateMutability": "view",
        //       "type": "function"
        //     },
        //     {
        //       "inputs": [],
        //       "name": "highestBid",
        //       "outputs": [
        //         {
        //           "internalType": "uint256",
        //           "name": "",
        //           "type": "uint256"
        //         }
        //       ],
        //       "stateMutability": "view",
        //       "type": "function"
        //     },
        //     {
        //       "inputs": [],
        //       "name": "highestBidder",
        //       "outputs": [
        //         {
        //           "internalType": "address",
        //           "name": "",
        //           "type": "address"
        //         }
        //       ],
        //       "stateMutability": "view",
        //       "type": "function"
        //     },
        //     {
        //       "inputs": [],
        //       "name": "nftAddress",
        //       "outputs": [
        //         {
        //           "internalType": "address",
        //           "name": "",
        //           "type": "address"
        //         }
        //       ],
        //       "stateMutability": "view",
        //       "type": "function"
        //     },
        //     {
        //       "inputs": [],
        //       "name": "purchasePrice",
        //       "outputs": [
        //         {
        //           "internalType": "uint256",
        //           "name": "",
        //           "type": "uint256"
        //         }
        //       ],
        //       "stateMutability": "view",
        //       "type": "function"
        //     },
        //     {
        //       "inputs": [],
        //       "name": "seller",
        //       "outputs": [
        //         {
        //           "internalType": "address",
        //           "name": "",
        //           "type": "address"
        //         }
        //       ],
        //       "stateMutability": "view",
        //       "type": "function"
        //     },
        //     {
        //       "inputs": [],
        //       "name": "tokenId",
        //       "outputs": [
        //         {
        //           "internalType": "uint256",
        //           "name": "",
        //           "type": "uint256"
        //         }
        //       ],
        //       "stateMutability": "view",
        //       "type": "function"
        //     },
        //     {
        //       "inputs": [
        //         {
        //           "internalType": "uint256",
        //           "name": "bid_amount",
        //           "type": "uint256"
        //         }
        //       ],
        //       "name": "bid",
        //       "outputs": [],
        //       "stateMutability": "nonpayable",
        //       "type": "function"
        //     },
        //     {
        //       "inputs": [],
        //       "name": "purchase",
        //       "outputs": [],
        //       "stateMutability": "nonpayable",
        //       "type": "function"
        //     },
        //     {
        //       "inputs": [],
        //       "name": "confirmItem",
        //       "outputs": [],
        //       "stateMutability": "nonpayable",
        //       "type": "function"
        //     },
        //     {
        //       "inputs": [],
        //       "name": "cancelSales",
        //       "outputs": [],
        //       "stateMutability": "view",
        //       "type": "function"
        //     },
        //     {
        //       "inputs": [],
        //       "name": "getSaleInfo",
        //       "outputs": [
        //         {
        //           "internalType": "uint256",
        //           "name": "",
        //           "type": "uint256"
        //         },
        //         {
        //           "internalType": "uint256",
        //           "name": "",
        //           "type": "uint256"
        //         },
        //         {
        //           "internalType": "address",
        //           "name": "",
        //           "type": "address"
        //         },
        //         {
        //           "internalType": "uint256",
        //           "name": "",
        //           "type": "uint256"
        //         },
        //         {
        //           "internalType": "address",
        //           "name": "",
        //           "type": "address"
        //         },
        //         {
        //           "internalType": "address",
        //           "name": "",
        //           "type": "address"
        //         }
        //       ],
        //       "stateMutability": "view",
        //       "type": "function"
        //     },
        //     {
        //       "inputs": [],
        //       "name": "getHighestBid",
        //       "outputs": [
        //         {
        //           "internalType": "uint256",
        //           "name": "",
        //           "type": "uint256"
        //         }
        //       ],
        //       "stateMutability": "view",
        //       "type": "function"
        //     }
        // ],addr);

        

        // assert.equal(8900, seller_balance, "가능?");
        // assert.equal(900, purchaser_balance, "갔음?");
        // return SsafyToken.deployed("ssafytoken","ssf",10000)
        //     .then(instance =>{
        //         instance.mint(mintAmount) // 테스트위한 임의의 erc20 토큰 생성 후 10,000토큰 발행
        //         instance.forceToTransfer(seller,purchaser,1000) // 구매자 주소로 1,000토큰 부여
        // })
    });

    // it("Purchase2", async() =>{
    //     const seller = accounts[0];
    //     const purchaser = accounts[1];
        
    //     return SsafyNFT.deployed()
    //         .then(instance =>{
    //             id = instance.create(seller,uri)
    //         })
    // });

    // it("Purchase3", async() =>{
    //     const seller = accounts[0];
    //     const purchaser = accounts[1];
    //     return SaleFactory.deployed()
    //         .then(instance=>{
    //             const addr = instance.createSale(id, 100, "0x29546cf5F9bE6C50De2af841050B42a259605506", "0xF09FA70fF48466cF7BCd9AAA159491e8F52F89d1") //0x6C927304104cdaa5a8b3691E0ADE8a3ded41a333 0x077A32620d00a1257E82D542969567Ac6e13f7cB
                
    //         })
    // });
    // it("Purchase4", async() =>{
    //     return Sale.deployed()
    //         .then(instance=>{
    //             instance.purchase()
    //         })
    // });
    // assert.equal(purchaser, await getNftOwner())
    // assert.equal(900, await getBalance(purchaser))
    // it("Bid and Cancel", async () => {
    //     const seller = accounts[0];
    //     const bidder = accounts[1];
    //     // TODO
    //     // 다음을 테스트를 통과해야합니다.
    //     // assert.equal(seller, await getNftOwner(), "Cancellation Failed");
    //     // assert.equal(1000, await getBalance(bidder), "Refund Failed");
    // });
});     // nft address 는 0x077A32620d00a1257E82D542969567Ac6e13f7cB SsafyNFT배포후 contract address 를 따왔음
        // currency address는 싸피지갑에서 주는 erc20토큰 주소
        
    
