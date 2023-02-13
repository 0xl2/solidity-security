const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Rewards Contract test", function () {
    before("Deploy contracts", async function () {
        const RewardsETH = await ethers.getContractFactory("RewardsETH")
        this.rewardsETH = await RewardsETH.deploy(
            ethers.constants.AddressZero,
            ethers.constants.AddressZero
        )
        await this.rewardsETH.deployed()

        console.log(`RewardETH contract deployed to: ${this.rewardsETH.address}`)
    })

    describe("test deposit", function () {
        it("test", async function () {
            console.log('here')
        })
    })

    describe("test withdraw", function () {
        
    })
})