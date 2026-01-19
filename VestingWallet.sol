// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract VestingWallet {
    address public beneficiary;
    uint256 public start;
    uint256 public duration;
    
    IERC20 public token;
    uint256 public released;

    constructor(address _beneficiary, uint256 _start, uint256 _duration, address _token) {
        beneficiary = _beneficiary;
        start = _start;
        duration = _duration;
        token = IERC20(_token);
    }

    function release() external {
        uint256 vested = vestedAmount();
        uint256 payment = vested - released;
        
        require(payment > 0, "No tokens due");
        
        released += payment;
        token.transfer(beneficiary, payment);
    }

    function vestedAmount() public view returns (uint256) {
        uint256 totalBalance = token.balanceOf(address(this)) + released;
        
        if (block.timestamp < start) {
            return 0;
        } else if (block.timestamp >= start + duration) {
            return totalBalance;
        } else {
            return (totalBalance * (block.timestamp - start)) / duration;
        }
    }
}
