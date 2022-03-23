/**
 *  PJT Ⅲ - Req.1-SC3) 시나리오 테스트
 */
const SsafyToken = artifacts.require("SsafyToken");
const SsafyNFT = artifacts.require("SsafyNFT");
const SaleFactory = artifacts.require("SaleFactory");
const Sale = artifacts.require("Sale");
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
        const seller = accounts[0];
        const purchaser = accounts[1];
        return SsafyToken.deployed("ssafytoken","ssf","10000")
            .then(instance =>{
                instance.mint(mintAmount) // 테스트위한 임의의 erc20 토큰 생성 후 10,000토큰 발행
                instance.forceToTransfer(seller,purchaser,1000) // 구매자 주소로 1,000토큰 부여
        })
    });
    it("Purchase2", async() =>{
        
        return SsafyNFT.deployed()
            .then(instance =>{
                id = instance.create(seller,uri)
            })
    });
    it("Purchase3", async() =>{
        return SaleFactory.deployed()
            .then(instance=>{
                instance.creaetSale(id, 100,0x6C927304104cdaa5a8b3691E0ADE8a3ded41a333,0x077A32620d00a1257E82D542969567Ac6e13f7cB)
                instance.purchase()
            })
    });

        // SsafyNFT.contract(instance=>{
        //     const id = instance.create(seller, uri);  // 마감일 빼고서 작업하자
        //     SaleFactory.contract(instance2=>{
        //         instance2.createSale(id,100,0,1);
        //     })
        //     Sale.contract(instance3=>{
        //         instance3.purchase();
        //     })
        // })
        // const tokeninstance = await SsafyToken.deployed("ssafytoken","ssf","10000");
        // tokeninstance.mint(mintAmount);
        // tokeninstance.forceToTransfer(seller,purchaser,1000);
        
        // const tokennftinstance = await SsafyNFT.deployed();
        // const id = tokennftinstance.create(seller, uri);
        // const date = new Date();
        // const time = new Date(date.getTime());
        // const time2 = new Date(date.getTime()+10*1000);

        // const saleinstance = await SaleFactory.deployed();
        // const add = saleinstance.createSale(id, 100, time, time2,0,1);
        // assert.equal(purchaser, await getNftOwner(), "Not Owned By Purchaser");
        // assert.equal(1000, await getBalance(bidder), "Refund Failed");
        // assert.equal(900, await getBalance(purchaser), "Transfer Failed");
        //ssafyTokenContract = new SsafyToken("ssafytoken","ssf","10000");
        //ssafyTokenContract.mint(mintAmount); 
        //ssafyTokenContract.forceToTransfer(seller,purchaser,1000);
        // const id = SsafyNFT.create(seller,uri);// 판매자 nft생성(즉시 구매가 100, 판매시작 지금, 판매종료 10초뒤)
        // const date = new Date();
        // const time = new Date(date.getTime());
        // const time2 = new Date(date.getTime()+10*1000);
        
        // SaleFactory.createSale(id, 100, time, time2,0x6C927304104cdaa5a8b3691E0ADE8a3ded41a333,0x077A32620d00a1257E82D542969567Ac6e13f7cB);
        // // nft address 는 0x077A32620d00a1257E82D542969567Ac6e13f7cB SsafyNFT배포후 contract address 를 따왔음
        // currency address는 싸피지갑에서 주는 erc20토큰 주소

        // 구매자 100토큰 purchase()호출

        // 충족하는지 확인
        // 최종 NFT소유자가 구매자이다
        // 구매자의 잔액이 900과 같다.

        // TODO
        // 다음을 테스트를 통과해야합니다.
        // assert.equal(purchaser, await getNftOwner(), "Not Owned By Purchaser");
        // assert.equal(1000, await getBalance(bidder), "Refund Failed");
        // assert.equal(900, await getBalance(purchaser), "Transfer Failed");
        // SsafyToken.deployed("ssafytoken","ssf","10000")
        //     .then(instance =>{
        //         instance.mint(mintAmount) // 테스트위한 임의의 erc20 토큰 생성 후 10,000토큰 발행
        //         instance.forceToTransfer(seller,purchaser,1000) // 구매자 주소로 1,000토큰 부여
        //     })
        // SsafyNFT.deployed()
        //     .then(instance =>{
        //         id = instance.create(seller,uri)
        //         date = new Date()
        //         time = new Date(date.getTime())
        //         time2 = new Date(date.getTime()+10*1000)
        //     })
        // SaleFactory.deployed()
        //     .then(instance=>{
        //         instance.creaetSale(id, 100, time, time2,0x6C927304104cdaa5a8b3691E0ADE8a3ded41a333,0x077A32620d00a1257E82D542969567Ac6e13f7cB)
        //         instance.purchase()
        //     })
        it("Bid and Cancel", async () => {
            const seller = accounts[0];
            const bidder = accounts[1];
    
    
            // TODO
            // 다음을 테스트를 통과해야합니다.
            // assert.equal(seller, await getNftOwner(), "Cancellation Failed");
            // assert.equal(1000, await getBalance(bidder), "Refund Failed");
        });
    });
