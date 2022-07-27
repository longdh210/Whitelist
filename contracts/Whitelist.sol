// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

contract Whitelist {
    address owner;
    mapping(address => bool) whitelistedAddresses;

    event AddedToWhitelist(address indexed user);
    event RemovedFromWhitelist(address indexed user);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    modifier onlyWhitelist(address _address) {
        require(whitelistedAddresses[_address], "You are not in whitelist");
        _;
    }

    function addUser(address _address) public onlyOwner {
        whitelistedAddresses[_address] = true;
        emit AddedToWhitelist(_address);
    }

    function removeUser(address _address) public onlyOwner {
        whitelistedAddresses[_address] = false;
        emit RemovedFromWhitelist(_address);
    }

    function verifyUser(address _address) public view returns (bool) {
        bool userIsWhitelisted = whitelistedAddresses[_address];
        return userIsWhitelisted;
    }

    function claim(address _address)
        public
        view
        onlyWhitelist(_address)
        returns (string memory)
    {
        return "Whitelisted call";
    }
}
