const { ethers } = require("hardhat");
const { expect } = require("chai");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { parseEther, parseUnits } = ethers.utils;

describe("WIRY Token", function () {
    async function deploys() {
        [ownerAcc, clientAcc1, clientAcc2, clientAcc3] =
            await ethers.getSigners();
        let tokenFactory = await ethers.getContractFactory("Wiry");
        let token = await tokenFactory.deploy();
        await token.deployed();
        await token.mint(ownerAcc.address, parseEther("1000000"));

        return { token };
    }

    describe("Deployment", async function () {
        it("OK: Have correct name, symbol, decimals", async function () {
            let { token } = await loadFixture(deploys);

            expect(await token.name()).to.equal("WIRY");
            expect(await token.symbol()).to.equal("WIRY");
            expect(await token.decimals()).to.equal(18);
        });
    });

});
