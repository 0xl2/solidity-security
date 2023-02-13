//SPDX-License-Identifier: MIT 
pragma solidity ^0.8.7; 

contract TestContract {
    uint public userAmt = type(uint128).max;

    uint public totalAmt = 1000;

    mapping(address => UserInfo) public userInfo;

    struct UserInfo {
        uint128 userVal;
        uint128 userDiff;
        uint userIntDiff;
    }

    uint128 public constant buyback = 2;

    function test(uint128 amount) external {
        require(amount <= userAmt, "invalid amount");

        unchecked {
            userAmt -= amount;
            totalAmt = totalAmt - amount;
        }

        uint128 val = (amount * buyback) / 100; 

        UserInfo storage userItem = userInfo[msg.sender];        
        userItem.userVal = val;
        userItem.userDiff = amount - val;
        userItem.userIntDiff = uint(amount - val);
    }
}