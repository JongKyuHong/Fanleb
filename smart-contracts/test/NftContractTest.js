/**
 * PJT Ⅰ - 과제 3 테스트 코드 작성
 * @dev NFT mint, transfer, and compare URI 
 */
 const NftCreator = artifacts.require("SsafyNFT");

 contract("NftCreator", (accounts) => {
     const owner = accounts[0];
     const sender = accounts[1];
     it("NFT mint, transfer, and compare URI", async () => {
         // TODO
         // 다음이 반드시 테스트되어야 합니다.
         // assert.equal(sender, owner, "NFT Mint Failed");
         // assert.equal(receiver, owner, "NFT Transfer Failed.");
         // assert.equal(tokenURI, tokenURIFetched, "Wrong Token Id or URI.")
         return NftCreator.deployed()
             .then(instance =>{
                 instance.create(owner, "") // api로 tokenuri받아서 여기다가 넣으면 될듯!
                 instance.transferFrom(owner, sender, instance.current())
             })
     });
 });