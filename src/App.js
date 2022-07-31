import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import Countdown from "react-countdown";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import WhitelistContract from "./artifacts/contracts/Whitelist.sol/Whitelist.json";
import NFTContract from "./artifacts/contracts/NFT.sol/NFT.json";
import { whitelistAddress, NFTAddress } from "./config";
import { checkUser } from "./components/checkUser";
import Web3 from "web3";

const web3 = new Web3();
const toBN = web3.utils.toBN;

function App() {
    const [inputAddress, setInputAddress] = useState("");
    const [currentAddress, setCurrentAddress] = useState(null);
    const [countdown, setCountdown] = useState(5000000);
    const [isTimeUp, setIsTimeUp] = useState(false);
    const [isWhitelisted, setIsWhitelisted] = useState(false);

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum
                .request({ method: "eth_requestAccounts" })
                .then((res) => setCurrentAddress(res[0]));
        }
    }, []);

    window.ethereum.on("accountsChanged", async function (accounts) {
        setCurrentAddress(accounts[0]);
        setIsWhitelisted(await checkUser(accounts[0]));
    });

    // function getBytes32Array(string) {
    //     var splittedString = string.match(/.{1,64}/g);

    //     for (var i = 0; i < splittedString.length; i++) {
    //         splittedString[i] = "0x" + splittedString[i];
    //     }

    //     return splittedString;
    // }

    function getArray(items) {
        return items.map((item) => "0x" + toBN(item).shln(96).toString(16));
    }

    const handleEndClick = async () => {
        setCountdown(0);
        setIsTimeUp(true);
        setIsWhitelisted(await checkUser(currentAddress));
    };

    const handleMintClick = async () => {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        let valuePass = ethers.utils.parseUnits("0.1", "ether");
        valuePass = valuePass.toString();

        // const byteArr = new ethers.utils.keccak256(currentAddress);
        // console.log(byteArr);
        // const byteArr = web3.utils.asciiToHex(currentAddress);
        // console.log(byteArr);
        const array = getArray([currentAddress]);

        let contract = new ethers.Contract(NFTAddress, NFTContract.abi, signer);
        let transaction = await contract.mint(1, array, { value: valuePass });
        await transaction.wait();

        alert("Mint successfully");
    };

    const handleWhitelistClick = async () => {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        let contract = new ethers.Contract(
            whitelistAddress,
            WhitelistContract.abi,
            signer
        );
        let transaction = await contract.addUser(inputAddress);
        await transaction.wait();

        alert("Add address successfully");
    };

    return (
        <div className='App'>
            <div className='content'>
                <label>Time remaining to whitelisting: </label>
                <Countdown
                    date={Date.now() + countdown}
                    onComplete={() => console.log("run")}
                ></Countdown>
                <br></br>
                <button
                    style={{
                        height: "40px",
                        width: "100px",
                        background: "#4DC1BF",
                        borderRadius: "10px",
                        marginTop: "10px",
                    }}
                    onClick={handleEndClick}
                >
                    End whitelisting
                </button>
                <br></br>
                <input
                    placeholder='Address to whitelist'
                    style={{
                        height: "50px",
                        width: "200px",
                        marginTop: "10px",
                        marginBottom: "10px",
                    }}
                    onChange={(e) => setInputAddress(e.target.value)}
                ></input>
                <br></br>
                <button
                    style={{
                        height: "30px",
                        width: "100px",
                        background: "#4DC1BF",
                        borderRadius: "10px",
                        marginBottom: "30px",
                    }}
                    onClick={handleWhitelistClick}
                    disabled={isTimeUp}
                >
                    Add
                </button>
                <br></br>
                {!isWhitelisted && isTimeUp ? (
                    <label>You are not in whitelist. Can not mint</label>
                ) : (
                    <></>
                )}
                <br></br>
                <button
                    style={{
                        height: "30px",
                        width: "200px",
                        background: "#4DC1BF",
                        borderRadius: "10px",
                    }}
                    disabled={!isWhitelisted}
                    onClick={handleMintClick}
                >
                    Mint NFT
                </button>
            </div>
        </div>
    );
}

export default App;
