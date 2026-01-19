const { ethers } = require("hardhat");
const treeData = require('./merkle_tree_data.json');

async function main() {
    const TokenAddress = "0xYourTokenAddressHere"; 
    const MerkleRoot = treeData.root;

    console.log(`Deploying Distributor with Root: ${MerkleRoot}`);

    const MerkleClaim = await ethers.getContractFactory("MerkleClaim");
    const claimContract = await MerkleClaim.deploy(TokenAddress, MerkleRoot);

    await claimContract.deployed();

    console.log(`Distributor Deployed to: ${claimContract.address}`);
    console.log("Don't forget to transfer tokens to this contract!");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
