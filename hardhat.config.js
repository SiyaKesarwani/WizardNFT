require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
};

// Go to https://www.alchemyapi.io, sign up, create
// a new App in its dashboard, and replace "KEY" with its key
const ALCHEMY_API_KEY = process.env.API_KEY;
// Replace this private key with your Polygon Mumbai account private key
const PVT_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: "0.8.9",
  networks: {
    mumbai: {
      url: ALCHEMY_API_KEY,
      accounts: [PVT_KEY]
    }
  },
  etherscan:{
    apiKey:{
      polygonMumbai : process.env.TESTNET_API_KEY
  }
  }
};
