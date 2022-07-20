const { expect } = require("chai");
const { ethers } = require("hardhat");

let contract1;
let contract2;

describe("MyERC20.sol", () => {
    let contractFactory;
    let initialSupply;
    let owner;
    let to;
    let ownerAddress;
    let toAddress;

    beforeEach(async () => {
        const [owner, to] = await ethers.getSigners();
        contractFactory = await ethers.getContractFactory("WizardToken", {
            "from": owner});
        initialSupply = ethers.utils.parseEther("1000");
        contract1 = await contractFactory.deploy();
        ownerAddress = await owner.getAddress();
        toAddress = await to.getAddress();
    });

    describe("Correct setup", () => {
        it("should be named 'Wizard Token'", async () => {
            const name = await contract1.name();
            expect(name).to.equal("Wizard Token");
        });
        it("should have symbol 'WTKN'", async () => {
            const symbol = await contract1.symbol();
            expect(symbol).to.equal("WTKN");
        });
        it("should have correct supply", async () => {
            const supply = await contract1.totalSupply();
            expect(supply).to.equal(initialSupply);
        });
    });
});

describe("ERC721.sol", () => {
    let contractFactory;
    let wizardToken_; 
    let owner;
    let to;
    let ownerAddress;
    let toAddress;

    beforeEach(async () => {
        const [owner, to] = await ethers.getSigners();
        contractFactory = await ethers.getContractFactory("WizardNFT", {
            "from": owner});
        contract2 = await contractFactory.deploy();
        ownerAddress = await owner.getAddress();
        toAddress = await to.getAddress();
    });

    describe("Correct setup", () => {
        it("should be named 'Wizard NFT'", async () => {
            const name = await contract2.name();
            expect(name).to.equal("Wizard NFT");
        });
        it("should have symbol 'WNFT'", async () => {
            const symbol = await contract2.symbol();
            expect(symbol).to.equal("WNFT");
        });
        it("setWizardToken should only be called by the owner", async () => {
            await contract2.setWizardToken(contract1.address);
            expect(await contract2.owner()).to.equal(ownerAddress);
        });
        it("should have correct WizardToken contract address", async () => {
            await contract2.setWizardToken(contract1.address);
            wizardToken_ = await contract2.wizardToken();
            expect(wizardToken_).to.equal(contract1.address);
        });
    });
});