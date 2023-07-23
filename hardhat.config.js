/**
* @type import('hardhat/config').HardhatUserConfig
*/

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

module.exports = {
   solidity: "0.8.19",
   defaultNetwork: "hardhat",
   networks: {
      hardhat: {},
      mumbai : {
         url : process.env.RPC_URL,
         chainId : 80001,
         accounts : [process.env.PVT_KEY]
       }
   },
}