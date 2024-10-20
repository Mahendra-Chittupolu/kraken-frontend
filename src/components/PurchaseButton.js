// src/components/PurchaseButton.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { ethers } from "ethers";
import { toast } from "react-toastify";

const PurchaseButton = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [provider, setProvider] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Connect to MetaMask
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const ethProvider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(ethProvider);
        // Request account access
        const accounts = await ethProvider.send("eth_requestAccounts", []);
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          toast.success("Wallet connected successfully!");
        }
      } catch (error) {
        console.error("Error connecting wallet:", error);
        toast.error("Failed to connect wallet.");
      }
    } else {
      toast.error("Please install MetaMask!");
    }
  };

  useEffect(() => {
    // Prompt user to connect wallet on component mount
    connectWallet();
    // Optionally, listen for account changes
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          toast.info("Wallet account changed.");
        } else {
          setWalletAddress("");
          toast.warn("Wallet disconnected.");
        }
      });
    }
    // Cleanup on unmount
    return () => {
      if (window.ethereum && window.ethereum.removeListener) {
        window.ethereum.removeListener("accountsChanged", () => {});
      }
    };
  }, []);

  const handlePurchase = async () => {
    if (!walletAddress) {
      toast.warn("Please connect your wallet first.");
      return;
    }

    setIsProcessing(true);

    try {
      // Send POST request to backend
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/simulate-purchase`,
        {
          address: walletAddress,
        }
      );

      const { ethBought, newMockBalance, sepoliaETHBalance } = response.data;
      console.log(response.data);
      alert(newMockBalance);
      // Show success notification
      toast.success(
        `Successfully bought ${ethBought}.\nNew MockETH Balance: ${newMockBalance}\nSepolia ETH Balance: ${sepoliaETHBalance}`
      );
    } catch (error) {
      console.error("Error during purchase:", error);
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(`Purchase failed: ${error.response.data.error}`);
      } else {
        toast.error("An error occurred during the purchase.");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFetchBalance = async () => {
    if (!walletAddress) {
      toast.warn("Please connect your wallet first.");
      return;
    }

    try {
      // Send POST request to backend to get Sepolia ETH balance
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/get-sepolia-balance`,
        {
          address: walletAddress,
        }
      );

      const { sepoliaETHBalance } = response.data;

      // Show balance notification
      toast.info(`Your Sepolia ETH Balance: ${sepoliaETHBalance}`);
    } catch (error) {
      console.error("Error fetching Sepolia ETH balance:", error);
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(`Failed to fetch balance: ${error.response.data.error}`);
      } else {
        toast.error("An error occurred while fetching the balance.");
      }
    }
  };

  return (
    <div style={styles.container}>
      <h3>Wallet Information</h3>
      {walletAddress ? (
        <p>Connected Wallet: {walletAddress}</p>
      ) : (
        <button onClick={connectWallet} style={styles.button}>
          Connect Wallet
        </button>
      )}
      <div style={styles.buttonContainer}>
        <button
          onClick={handlePurchase}
          style={styles.purchaseButton}
          disabled={!walletAddress || isProcessing}
        >
          {isProcessing ? "Processing..." : "Buy Fake ETH"}
        </button>
        <button
          onClick={handleFetchBalance}
          style={styles.balanceButton}
          disabled={!walletAddress}
        >
          Check Sepolia ETH Balance
        </button>
      </div>
    </div>
  );
};

// Simple styling
const styles = {
  container: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    margin: "20px auto",
    maxWidth: "500px",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "20px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
  },
  purchaseButton: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
  },
  balanceButton: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#2196F3",
    color: "white",
    border: "none",
    borderRadius: "5px",
  },
};

export default PurchaseButton;
