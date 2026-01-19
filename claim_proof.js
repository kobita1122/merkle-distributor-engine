const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');
const treeData = require('./merkle_tree_data.json');
const ethers = require('ethers');

// Helper function for Frontend to call
function getProof(index, address, amount) {
    const leaf = ethers.utils.solidityKeccak256(
        ["uint256", "address", "uint256"], 
        [index, address, amount]
    );

    const tree = new MerkleTree(treeData.leaves, keccak256, { sort: true });
    const proof = tree.getHexProof(leaf);
    
    return proof;
}

// Test for User 0
const proof = getProof(0, "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B", "100000000000000000000");
console.log("Proof for User 0:", proof);
