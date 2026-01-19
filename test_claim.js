const { ethers } = require('hardhat');
const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');
const tokens = require('./airdrop_list.json');

async function test() {
    // Simulate finding a proof and claiming
    const user = tokens[0];
    
    // In a real test, we would load the deployed contract here
    // const contract = await ethers.getContractAt("MerkleClaim", "0x...");
    
    console.log(`Testing claim for: ${user.address}`);
    console.log(`Amount: ${user.amount}`);
    
    // Verify proof structure locally before sending tx
    const leaf = ethers.utils.solidityKeccak256(
        ["uint256", "address", "uint256"], 
        [user.index, user.address, user.amount]
    );
    
    console.log(`Leaf Hash: ${leaf}`);
    console.log("Ready to send transaction...");
}

test();
