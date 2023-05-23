require("@nomiclabs/hardhat-etherscan");
require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-truffle5");
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ENDPOINT_URL = process.env.ENDPOINT_URL;

module.exports = {
  solidity: "0.8.15",
 
  networks: {
    hardhat: {
      forking: {
        url:ENDPOINT_URL,
        blockNumber: 17228670
      }
    }
  },
};