const { ethers } = require("hardhat");
const { expect } = require("chai");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { parseEther, parseUnits } = ethers.utils;
const zeroAddress = ethers.constants.AddressZero;

describe("WIRY token", function () {
    async function deploys() {
        [ownerAcc, clientAcc1, clientAcc2, clientAcc3] =
            await ethers.getSigners();
        let wiryFactory = await ethers.getContractFactory("Wiry");
        let wiry = await wiryFactory.deploy();
        await wiry.deployed();
        await wiry.mint(ownerAcc.address, parseEther("1000000"));

        return { wiry };
    }

    describe("Deployment", async function () {
        it("OK: Have correct name, symbol, decimals", async function () {
            let { wiry } = await loadFixture(deploys);

            expect(await wiry.name()).to.equal("Wiry");
            expect(await wiry.symbol()).to.equal("WIRY");
            expect(await wiry.decimals()).to.equal(2);
            expect(await wiry.INITIAL_SUPPLY()).to.equal(100_000);
        });
    });

    describe("Pause", () => {
        it("Should pause contract's functions", async () => {
            let { wiry } = await loadFixture(deploys);
            let mintAmount = parseEther("1");
            // At first, admin should be able to mint tokens
            await wiry.mint(clientAcc1.address, mintAmount);

            await wiry.pause();

            // Now admin should not be able to mint tokens
            await expect(
                wiry.mint(clientAcc1.address, mintAmount)
            ).to.be.revertedWith("Pausable: paused");
        });

        it("Should unpause contract's functions", async () => {
            let { wiry } = await loadFixture(deploys);
            let mintAmount = parseEther("1");

            // Pause all functions right away
            await wiry.pause();

            await expect(
                wiry.mint(clientAcc1.address, mintAmount)
            ).to.be.revertedWith("Pausable: paused");

            // Unpause all functions
            await wiry.unpause();

            await wiry.mint(clientAcc1.address, mintAmount);
        });

        it("Should fail to pause or unpause functions if caller is not admin", async () => {
            let { wiry } = await loadFixture(deploys);
            let mintAmount = parseEther("1");

            await expect(wiry.connect(clientAcc1).pause()).to.be.revertedWith(
                "Ownable: caller is not the owner"
            );

            await expect(wiry.connect(clientAcc1).unpause()).to.be.revertedWith(
                "Ownable: caller is not the owner"
            );
        });
    });

    describe("Mint", () => {
        it("Should mint tokens to users", async () => {
            let { wiry } = await loadFixture(deploys);
            let mintAmount = parseEther("1");

            let clientStartBalance = await wiry.balanceOf(clientAcc1.address);

            await wiry.mint(clientAcc1.address, mintAmount);

            let clientEndBalance = await wiry.balanceOf(clientAcc1.address);

            expect(clientEndBalance.sub(clientStartBalance)).to.equal(
                mintAmount
            );
        });

        it("Should fail to mint tokens if caller is not the owner", async () => {
            let { wiry } = await loadFixture(deploys);
            let mintAmount = parseEther("1");

            await expect(
                wiry.connect(clientAcc1).mint(clientAcc2.address, mintAmount)
            ).to.be.revertedWith("Ownable: caller is not the owner");
        });
    });

    describe("Burn", () => {
        it("Should burn tokens from users", async () => {
            let { wiry } = await loadFixture(deploys);
            let mintAmount = parseEther("1");
            let burnAmount = mintAmount.div(2);

            await wiry.mint(clientAcc1.address, mintAmount);

            let clientStartBalance = await wiry.balanceOf(clientAcc1.address);

            await wiry.burnFrom(clientAcc1.address, burnAmount);

            let clientEndBalance = await wiry.balanceOf(clientAcc1.address);

            expect(clientStartBalance.sub(clientEndBalance)).to.equal(
                mintAmount.sub(burnAmount)
            );
        });

        it("Should fail to burn tokens if caller is not the owner", async () => {
            let { wiry } = await loadFixture(deploys);
            let mintAmount = parseEther("1");
            let burnAmount = mintAmount.div(2);

            await expect(
                wiry
                    .connect(clientAcc1)
                    .burnFrom(clientAcc1.address, burnAmount)
            ).to.be.revertedWith("Ownable: caller is not the owner");
        });
    });

    describe("Blacklist", () => {
        describe("Add to balcklist", () => {
            it("Should add users to the blacklist", async () => {
                let { wiry } = await loadFixture(deploys);

                expect(await wiry.blackListed(clientAcc1.address)).to.equal(
                    false
                );

                await wiry.addToBlackList(clientAcc1.address);

                expect(await wiry.blackListed(clientAcc1.address)).to.equal(
                    true
                );
            });

            it("Should fail to add users to the blacklist if caller is not the admin", async () => {
                let { wiry } = await loadFixture(deploys);

                await expect(
                    wiry.connect(clientAcc1).addToBlackList(clientAcc1.address)
                ).to.be.revertedWith("Ownable: caller is not the owner");
            });

            it("Should fail to add zero address to the blacklist", async () => {
                let { wiry } = await loadFixture(deploys);

                await expect(
                    wiry.addToBlackList(zeroAddress)
                ).to.be.revertedWith("Wiry: Zero address!");
            });

            it("Should fail to add user to the blacklist twice", async () => {
                let { wiry } = await loadFixture(deploys);

                await wiry.addToBlackList(clientAcc1.address);

                await expect(
                    wiry.addToBlackList(clientAcc1.address)
                ).to.be.revertedWith("Wiry: Already blacklisted!");
            });
        });

        describe("Remove from blacklist", () => {
            it("Should remove users from the blacklist", async () => {
                let { wiry } = await loadFixture(deploys);

                await wiry.addToBlackList(clientAcc1.address);

                expect(await wiry.blackListed(clientAcc1.address)).to.equal(
                    true
                );

                await wiry.removeFromBlackList(clientAcc1.address);

                expect(await wiry.blackListed(clientAcc1.address)).to.equal(
                    false
                );
            });

            it("Should fail to remove users from the blacklist if caller is not the owner", async () => {
                let { wiry } = await loadFixture(deploys);

                await expect(
                    wiry
                        .connect(clientAcc1)
                        .removeFromBlackList(clientAcc1.address)
                ).to.be.revertedWith("Ownable: caller is not the owner");
            });

            it("Should fail to remove zero address from the blacklist", async () => {
                let { wiry } = await loadFixture(deploys);

                await expect(
                    wiry.removeFromBlackList(zeroAddress)
                ).to.be.revertedWith("Wiry: Zero address!");
            });

            it("Should fail to remove non-blacklisted user from the blacklist", async () => {
                let { wiry } = await loadFixture(deploys);

                await expect(
                    wiry.removeFromBlackList(clientAcc1.address)
                ).to.be.revertedWith("Wiry: Not blacklisted!");
            });
        });

        describe("Forbid token transfers", () => {
            it("Should forbid receiving tokens for blacklisted users", async () => {
                let { wiry } = await loadFixture(deploys);
                let mintAmount = 100_000;
                let transferAmount = 50_000;

                await wiry.addToBlackList(clientAcc1.address);

                await expect(
                    wiry.transfer(clientAcc1.address, transferAmount)
                ).to.be.revertedWith("Wiry: Receiver is blacklisted!");
            });

            it("Should forbid sending tokens for blacklisted users", async () => {
                let { wiry } = await loadFixture(deploys);
                let mintAmount = 100_000;
                let transferAmount = 50_000;

                // Send some preminted tokens to client
                await wiry.transfer(clientAcc1.address, mintAmount);

                await wiry.addToBlackList(clientAcc1.address);

                await expect(
                    wiry
                        .connect(clientAcc1)
                        .transfer(clientAcc2.address, transferAmount)
                ).to.be.revertedWith("Wiry: Sender is blacklisted!");
            });
        });
    });
});
