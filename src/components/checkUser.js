import { ethers } from "ethers";
import WhitelistContract from "../artifacts/contracts/Whitelist.sol/Whitelist.json";
import { whitelistAddress } from "../config";

const provider = new ethers.providers.Web3Provider(window.ethereum);

export const checkUser = (_address) => {
    const contract = new ethers.Contract(
        whitelistAddress,
        WhitelistContract.abi,
        provider
    );

    let result = contract.verifyUser(_address);
    return result;
};
