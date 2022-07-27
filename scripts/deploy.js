const hre = require("hardhat");

async function main() {
    const Whitelist = await hre.ethers.getContractFactory("Whitelist");
    const whitelist = await Whitelist.deploy();

    await whitelist.deployed();

    console.log("Whitelist deploy to:", whitelist.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
