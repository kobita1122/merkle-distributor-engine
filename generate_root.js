const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');
const tokens = require('./airdrop_list.json');
const ethers = require('ethers');
const fs = require('fs');

function main() {
    console.log("Generating Merkle Tree...");

    // Map list to leaves: keccak256(index, address, amount)
    const leaves = tokens.map(x => 
        ethers.utils.solidityKeccak256(
            ["uint256", "address", "uint256"], 
            [x.index, x.address, x.amount]
        )
    );

    const tree = new MerkleTree(leaves, keccak256, { sort: true });
    const root = tree.getHexRoot();

    console.log(`Merkle Root: ${root}`);
    
    // Save the tree for the frontend
    fs.writeFileSync('merkle_tree_data.json', JSON.stringify({
        root: root,
        leaves: leaves
    }, null, 2));
}

main();
