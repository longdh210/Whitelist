require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 1337,
        },
        rinkeby: {
            url: "https://eth-rinkeby.alchemyapi.io/v2/kAPtSA_EMLRedffB6D1Ehre3rQQ2pmn2",
            accounts: [privateKey],
        },
    },
    solidity: "0.8.9",
};
