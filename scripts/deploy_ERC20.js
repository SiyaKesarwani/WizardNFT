// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
 
  const MyERC20 = await hre.ethers.getContractFactory("WizardToken");
  const ERC20 = await MyERC20.deploy();

  console.log("MyERC20 contract is deployed to:", ERC20.address);

  const ERC721 = await hre.ethers.getContractFactory("WizardNFT");
  const erc721 = await ERC721.deploy();

  console.log("ERC721 contract is deployed to:", erc721.address);

  await erc721.setWizardToken(ERC20.address);
  const add = await erc721.wizardToken();
  console.log(add);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
