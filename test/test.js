const { expect } = require("chai");
const { ethers } = require("hardhat");

const BigNumber = ethers.BigNumber

describe.only("Test Contract test", function () {
    before("Deploy contracts", async function () {
        const [owner, user1, user2] = await ethers.getSigners()

        this.owner = owner
        this.alice = user1
        this.bob = user2

        const TestContract = await ethers.getContractFactory("TestContract")
        this.testContract = await TestContract.deploy()
        await this.testContract.deployed()

        console.log(`Test contract deployed to: ${this.testContract.address}`)
    })

    describe("check test function", function () {
        it("check with uint128 under range", async function () {
            await this.testContract.connect(this.alice).test(100)

            const userAmt = await this.testContract.userAmt()
            const totalAmt = await this.testContract.totalAmt()

            expect(userAmt).to.be.eq(400)
            expect(totalAmt).to.be.eq(900)

            const userInfo = await this.testContract.userInfo(this.alice.address)
            expect(userInfo.userVal).to.be.eq(2)
            expect(userInfo.userDiff).to.be.eq(98)
            expect(userInfo.userIntDiff).to.be.eq(98)
        })

        it("check with max uint128", async function () {
            const paramVal = BigNumber.from(BigInt(2 ** 128)).sub(BigNumber.from(1))
            // const paramVal = BigNumber.from(BigInt(2 ** 128))
            console.log(paramVal, "paramValparamValparamVal")
            await this.testContract.connect(this.alice).test(paramVal)

            const userAmt = await this.testContract.userAmt()
            const totalAmt = await this.testContract.totalAmt()

            expect(userAmt).to.be.eq(400)
            expect(totalAmt).to.be.eq(900)
        })
    })
})