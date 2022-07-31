const privateKey = require("./key.json");
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
    paths: {
        artifacts: "./src/artifacts",
    },
    networks: {
        hardhat: {
            chainId: 1337,
        },
        rinkeby: {
            url: "https://eth-rinkeby.alchemyapi.io/v2/kAPtSA_EMLRedffB6D1Ehre3rQQ2pmn2",
            accounts: [privateKey.PRIVATE_KEY],
        },
    },
    solidity: "0.8.9",
};
