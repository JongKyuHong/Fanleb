/**
 *  PJT Ⅲ - Req.1-SC3) 시나리오 테스트
 */
const SsafyToken = artifacts.require("SsafyToken");
const SsafyNFT = artifacts.require("SsafyNFT");
const SaleFactory = artifacts.require("SaleFactory");
const Sale = artifacts.require("Sale");
const fs = require("fs");
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
let ssafyTokenContract, salesFactoryContract, nftContract, salesContract;
let itemId = 0;
const { abi: sale_abi } = JSON.parse(fs.readFileSync('./build/contracts/Sale.json'));
const { abi: salefactory_abi } = JSON.parse(fs.readFileSync('./build/contracts/SaleFactory.json'));
const { abi: nft_abi } = JSON.parse(fs.readFileSync('./build/contracts/SsafyNFT.json'));
const { abi: token_abi } = JSON.parse(fs.readFileSync('./build/contracts/SsafyToken.json'));

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

    it("Purchase1", async () => {
        const admin = accounts[0];
        const seller = accounts[1];
        const purchaser = accounts[2];

        const ssafyTokenContract = await SsafyToken.deployed("ssafytoken","ssf",10000);
        const tokenContract = new web3.eth.Contract(token_abi, ssafyTokenContract.address);
        const senda = await tokenContract.methods.mint(mintAmount).send({from:admin});
        tokenContract.methods.forceToTransfer(admin,seller,1000).send({from:admin});
        tokenContract.methods.forceToTransfer(admin,purchaser,1000).send({from:admin});

        const nft = await SsafyNFT.deployed();
        const nftContract = new web3.eth.Contract(nft_abi, nft.address);
        const tokenId = await nftContract.methods.create(seller, uri).send({from:seller ,gas:3000000});

        const sf = await SaleFactory.deployed();
        const sfContract = new web3.eth.Contract(salefactory_abi,sf.address);

        const saleaddr = await sfContract.methods.createSale(seller, tokenId.events.Transfer.returnValues.tokenId, 100, ssafyTokenContract.address, nft.address).send({from: seller, gas:3000000});
        const saleContract = new web3.eth.Contract(sale_abi, saleaddr.events.NewSale.returnValues._saleContract);
        const ff = await saleContract.methods.purchase(purchaser).send({from: admin, gas: 3000000});
        
        assert.equal(balance5 == 8000,"no 8000");
        assert.equal(balance6 == 1100,"no 1100");
        assert.equal(balance7 == 900,"no 900");
    });
});
        
    
