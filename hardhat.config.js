const { ethers } = require("ethers");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-solhint");
require("@nomiclabs/hardhat-waffle");
require("solidity-coverage");
require("hardhat-gas-reporter");
require("hardhat-abi-exporter");
require("hardhat-contract-sizer");
require("@nomiclabs/hardhat-ethers");
require("hardhat-tracer");
require("@openzeppelin/hardhat-upgrades");
require("@primitivefi/hardhat-dodoc");
require("dotenv").config();

const ACC_PRIVATE_KEY = process.env.ACC_PRIVATE_KEY;
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY || "";

module.exports = {
  defaultNetwork: "hardhat",
  solidity: {
    compilers: [
      {
        version: "0.8.17",
        settings: {
          optimizer: {
            enabled: true,
            runs: 999999, // max runs for etherscan
          },
        },
      },
    ],
  },
  networks: {
    hardhat: {
      blockGasLimit: 12450000 * 100,
    },
    localhost: {
      gasMultiplier: 1.2,
    },
    polygon_mainnet: {
      url: `https://rpc-mainnet.maticvigil.com/`,
      accounts: [ACC_PRIVATE_KEY],
    },
    polygon_testnet: {
      url: `https://matic-mumbai.chainstacklabs.com`,
      accounts: [ACC_PRIVATE_KEY],
    },
  },
  mocha: {
    timeout: 20000000,
  },
  abiExporter: {
    path: "./build/abis",
    runOnCompile: true,
    clear: true,
    spacing: 2,
    pretty: true,
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: true,
    strict: true,
    runOnCompile: false,
  },
  dodoc: {
    include: [],
    runOnCompile: false,
    freshOutput: true,
    outputDir: "./docs/contracts",
  },
  paths: {
    sources: "./contracts/",
    tests: "./tests/"
  },
  // For default hardhat verification
  etherscan: {
    apiKey: {
      polygon: POLYGONSCAN_API_KEY,
      polygonMumbai: POLYGONSCAN_API_KEY,
    },
  },
};
