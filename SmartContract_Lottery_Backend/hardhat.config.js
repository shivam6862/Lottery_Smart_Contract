require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")
require("solidity-coverage")
require("hardhat-gas-reporter")
require("hardhat-contract-sizer")
require("dotenv").config()

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

// const MAINNET_RPC_URL =
//     process.env.MAINNET_RPC_URL ||
//     process.env.ALCHEMY_MAINNET_RPC_URL ||
//     "https://eth-mainnet.alchemyapi.io/v2/your-api-key"
// const SEPOLIA_RPC_URL =
//     process.env.SEPOLIA_RPC_URL || "https://eth-sepolia.g.alchemy.com/v2/YOUR-API-KEY"
// const POLYGON_MAINNET_RPC_URL =
//     process.env.POLYGON_MAINNET_RPC_URL || "https://polygon-mainnet.alchemyapi.io/v2/your-api-key"
// const PRIVATE_KEY = process.env.PRIVATE_KEY || "0x"
// // optional
// const MNEMONIC = process.env.MNEMONIC || "your mnemonic"

// // Your API key for Etherscan, obtain one at https://etherscan.io/
// const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "Your etherscan API key"
// const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY || "Your polygonscan API key"
const REPORT_GAS = process.env.REPORT_GAS || false

module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            // forking: {
            //   url: MAINNET_RPC_URL
            // }
            chainId: 31337,
        },
        localhost: {
            chainId: 31337,
        },
        // sepolia: {
        //     url: SEPOLIA_RPC_URL,
        //     accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
        //     //   accounts: {
        //     //     mnemonic: MNEMONIC,
        //     //   },
        //     saveDeployments: true,
        //     chainId: 11155111,
        // },
        // mainnet: {
        //     url: MAINNET_RPC_URL,
        //     accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
        //     //   accounts: {
        //     //     mnemonic: MNEMONIC,
        //     //   },
        //     saveDeployments: true,
        //     chainId: 1,
        // },
        // polygon: {
        //     url: POLYGON_MAINNET_RPC_URL,
        //     accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
        //     saveDeployments: true,
        //     chainId: 137,
        // },
    },
    // etherscan: {
    //     apiKey: {
    //         sepolia: ETHERSCAN_API_KEY,
    //         polygon: POLYGONSCAN_API_KEY,
    //     },
    //     customChains: [
    //         {
    //             network: "goerli",
    //             chainId: 5,
    //             urls: {
    //                 apiURL: "https://api-goerli.etherscan.io/api",
    //                 browserURL: "https://goerli.etherscan.io",
    //             },
    //         },
    //     ],
    // },
    gasReporter: {
        enabled: REPORT_GAS,
        currency: "USD",
        outputFile: "gas-report.txt",
        noColors: true,
        // coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    },
    // contractSizer: {
    //     runOnCompile: false,
    //     only: ["Raffle"],
    // },
    namedAccounts: {
        deployer: {
            default: 0,
            1: 0,
        },
        player: {
            default: 1,
        },
    },
    solidity: {
        compilers: [
            {
                version: "0.8.7",
            },
            {
                version: "0.4.24",
            },
        ],
    },
    mocha: {
        timeout: 500000,
    },
}

// contract folder
// npx hardhat compile

// hardhat.config.js
//helper-hardhat-config.js
// deploy folder
// utils folder
// npx hardhat deploy

// test folder
// npx hardhat test
// npx hardhat test --grep " "it" words"
// npx hardhat coverage

// DEPLOY
//
//
// 16 : 20 :00

// link through frontend from deploy folder
// npx hardhat node

// npx hardhat run scripts/mockOffchain.js --network localhost
