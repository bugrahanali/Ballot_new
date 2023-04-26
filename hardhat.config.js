require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-deploy");
require("dotenv").config();

const { PRIVATE_KEY } = process.env;

module.exports = {
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    fuji: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      chainId: 43113,
      gasPrice: 225000000000, // You can set any gas price you want here
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },

  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    owner: {
      default: 0,
    },
  },
  paths: {
    deploy: "deploy",
    deployments: "deployments",
    imports: "imports",
    tests: "test",
  },
};
