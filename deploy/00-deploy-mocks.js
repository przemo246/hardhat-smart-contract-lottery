const { network } = require("hardhat")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")

// 0.25 LINK premium cost
const BASE_FEE = ethers.utils.parseEther("0.25")
const GAS_PRICE_LINK = 1e9

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const args = [BASE_FEE, GAS_PRICE_LINK]

    if (developmentChains.includes(network.name)) {
        log("Local network detected! Deploying mocks...")
        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            log: true,
            args,
        })
        log("Mocks deployed")
        log("-----------------------")
    }
}

module.exports.tags = ["all", "mocks"]
