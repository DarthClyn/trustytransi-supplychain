import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import tracking from "./Tracking.json";

const ContractAddress = "0x015bd24e317BcdAdD41cD1Fc5CC9E8FCa9c15e9D";
const ContractABI = tracking.abi;

// Function to fetch the contract instance
const fetchContract = (provider) => {
  return new ethers.Contract(ContractAddress, ContractABI, provider);
};

export const TrackingContext = React.createContext();

export const TrackingProvider = ({ children }) => {
  const DappName = "Product tracking Dapp";
  const [currentUser, setCurrentUser] = useState(""); // Current Ethereum account

  // Function to create a new shipment
  const createShipment = async (items) => {
    try {
      const { receiver, pickupTime, distance, price } = items;

      // Connect to MetaMask and get signer
      const provider = await getEthereumProvider();
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      // Convert pickupTime to timestamp
      const pickupTimestamp = new Date(pickupTime).getTime();

      // Call createShipment function on the smart contract
      const createItem = await contract.createShipment(
        receiver,
        pickupTimestamp,
        distance,
        ethers.utils.parseUnits(price, 18), // Convert price to wei
        { value: ethers.utils.parseUnits(price, 18) } // Send transaction with value
      );

      await createItem.wait(); // Wait for transaction to be mined
      console.log("Shipment created:", createItem);
    } catch (error) {
      console.error("Error creating shipment:", error);
    }
  };

  // Function to fetch all shipments
  const getAllShipment = async () => {
    try {
      const provider = await getEthereumProvider();
      const contract = fetchContract(provider);
      const shipments = await contract.getAllTransactions();

      const allShipments = shipments.map((shipment) => ({
        sender: shipment.sender,
        receiver: shipment.receiver,
        price: ethers.utils.formatEther(shipment.price.toString()),
        pickupTime: shipment.pickupTime.toNumber(),
        deliveryTime: shipment.deliveryTime.toNumber(),
        isPaid: shipment.isPaid,
        status: shipment.status,
        distance: shipment.distance.toNumber(),
      }));

      return allShipments;
    } catch (error) {
      console.error("Error fetching all shipments:", error);
    }
  };

  // Function to get number of shipments for current user
  const getShipmentsCount = async () => {
    try {
      const provider = await getEthereumProvider();
      const contract = fetchContract(provider);
      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      const shipmentsCount = await contract.getShipmentsCounts(accounts[0]);
      
      return shipmentsCount.toNumber();
    } catch (error) {
      console.error("Error fetching shipments count:", error);
    }
  };

  // Function to complete a shipment
  const completeShipment = async (completeShip) => {
    try {
      const { receiver, index } = completeShip;
      const provider = await getEthereumProvider();
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      const shipment = await contract.completeShipment(
        accounts[0],
        receiver,
        index * 1
      );

      await shipment.wait(); // Wait for transaction to be mined
      console.log("Shipment completed:", shipment);
    } catch (error) {
      console.error("Error completing shipment:", error);
    }
  };

  // Function to get details of a single shipment
  const getShipment = async (index) => {
    try {
      const provider = await getEthereumProvider();
      const contract = fetchContract(provider);
      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      const shipment = await contract.getShipment(accounts[0], index * 1);

      const SingleShipment = {
        sender: shipment[0],
        receiver: shipment[1],
        pickupTime: shipment[2].toNumber(),
        deliveryTime: shipment[3].toNumber(),
        distance: shipment[4].toNumber(),
        price: ethers.utils.formatEther(shipment[5].toString()),
        status: shipment[6],
        isPaid: shipment[7],
      };

      return SingleShipment;
    } catch (error) {
      console.error("Error fetching shipment details:", error);
    }
  };

  // Function to start a shipment
  const startShipment = async (getProduct) => {
    try {
      const { receiver, index } = getProduct;
      const provider = await getEthereumProvider();
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      const shipment = await contract.startShipment(
        accounts[0],
        receiver,
        index * 1
      );

      await shipment.wait(); // Wait for transaction to be mined
      console.log("Shipment started:", shipment);
    } catch (error) {
      console.error("Error starting shipment:", error);
    }
  };

  // Function to check if MetaMask wallet is connected
  const checkIfWalletConnected = async () => {
    try {
      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setCurrentUser(accounts[0]); // Set current user account
      } else {
        setCurrentUser(""); // No accounts connected
      }
    } catch (error) {
      console.error("Error checking wallet connection:", error);
    }
  };

  // Function to connect MetaMask wallet
  const connectWallet = async () => {
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setCurrentUser(accounts[0]); // Set current user account
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  // Function to get Ethereum provider
  const getEthereumProvider = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    return new ethers.providers.Web3Provider(connection);
  };

  // Check wallet connection on component mount
  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  // Context provider value
  const contextValue = {
    connectWallet,
    createShipment,
    getAllShipment,
    completeShipment,
    getShipment,
    startShipment,
    getShipmentsCount,
    DappName,
    currentUser,
  };

  return (
    <TrackingContext.Provider value={contextValue}>
      {children}
    </TrackingContext.Provider>
  );
};
