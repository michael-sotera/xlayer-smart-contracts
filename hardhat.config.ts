import { HardhatUserConfig, vars } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
import "@okxweb3/hardhat-explorer-verify"; // Import the plugin

const ACCOUNT_PRIVATE_KEY = vars.get("ACCOUNT_PRIVATE_KEY");
const MAINNET_ACCOUNT_PRIVATE_KEY = vars.get("MAINNET_ACCOUNT_PRIVATE_KEY");

const OKLINK_API_KEY = vars.get("OKLINK_API_KEY");

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.24",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
          evmVersion: "london",
        },
      },
      {
        version: "0.8.20",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
          evmVersion: "paris",
        },
      },
    ],
  },
  networks: {
    xlayerTestnet: {
      url: "https://testrpc.xlayer.tech",
      accounts: [`0x${ACCOUNT_PRIVATE_KEY}`],
    },
    xlayerMainnet: {
      url: "https://rpc.xlayer.tech/",
      accounts: [
        `0x${MAINNET_ACCOUNT_PRIVATE_KEY}`,
      ],
    },
  },
  etherscan: {
    apiKey: {},
  },
  okxweb3explorer: {
    apiKey: OKLINK_API_KEY,
  },
};

export default config;
