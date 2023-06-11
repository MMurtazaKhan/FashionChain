import React, { useState } from "react";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import FashionChain from "../contracts/FashionChain.json";

const HomeScreen = () => {
  const [walletAddress, setWalletAddress] = useState("");

  const hello = async () => {
    console.log("helloi");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      FashionChain.address,
      FashionChain.abi,
      signer
    );

    const tx = await contract.transfer(
      "0xC671bfA8f33d3D8AB7252E598b936F06A8d74415",
      10
    );
    const receipt = await tx.wait();
    if (receipt.status === 1) {
      toast.success("Token awarded");
    } else {
      toast.error("Transaction Failed");
    }
  };

  const handleClick = async () => {
    if (typeof window.ethereum === "undefined") {
      toast.error("Metamask is not installed!!!");
    } else {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log("Connected account:", accounts[0]);
        setWalletAddress(accounts[0]);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      {walletAddress ? (
        <div>Your Address {walletAddress}</div>
      ) : (
        <Button
          variant="primary"
          style={{ display: "block", marginBottom: "10px" }}
          onClick={handleClick}
        >
          Connect Wallet
        </Button>
      )}
      <button onClick={hello}>Send</button>
    </>
  );
};

export default HomeScreen;
