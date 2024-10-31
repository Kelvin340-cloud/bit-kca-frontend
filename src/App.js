import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import Web3 from "web3";

const ADDRESS = "0xF34AB8990b587b13c36BB7864F94bc26f60C1860"; // Ensure this address is correct
const ABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "startingPoint",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_startingMessage",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "decreasingNumber",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getNumber",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "increaseNumber",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "message",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "newMessage",
				"type": "string"
			}
		],
		"name": "setMessage",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

function App() {
    const [number, setNumber] = useState('505'); // Change initial value as needed
    const [currentMessage, setCurrentMessage] = useState('BIT STUDENTS KCA');
    const [newMessage, setNewMessage] = useState("");

    // Initialize the web3 object
    const web3 = new Web3(window.ethereum);

    // Initialize the contract with ABI and ADDRESS
    const myContract = new web3.eth.Contract(ABI, ADDRESS);

    // Reading function: Number
    async function getNumber() {
        try {
            const result = await myContract.methods.getNumber().call();
            console.log("Retrieved number:", result); // Log the result
            setNumber(result.toString());
        } catch (error) {
            console.error("Error fetching number:", error);
        }
    }

    // Message
    async function getMessage() {
        try {
            const message = await myContract.methods.message().call();
            setCurrentMessage(message);
        } catch (error) {
            console.error("Error fetching message:", error);
        }
    }

    // Increasing the number
    async function increaseNumber() {
        try {
            const accountsConnected = await web3.eth.requestAccounts();
            await myContract.methods.increaseNumber().send({ from: accountsConnected[0] });
            getNumber();
        } catch (error) {
            console.error("Error increasing number:", error);
        }
    }

    // Decreasing the number
    async function decreaseNumber() {
        try {
            const accountsPresent = await web3.eth.requestAccounts();
            await myContract.methods.decreasingNumber().send({ from: accountsPresent[0] });
            getNumber();
        } catch (error) {
            console.error("Error decreasing number:", error);
        }
    }

    // Update message function
    async function updateMessage() {
        try {
            const accounts = await web3.eth.requestAccounts();
            await myContract.methods.setMessage(newMessage).send({ from: accounts[0] });
            getMessage(); // Optionally refresh the message after updating
            setNewMessage(""); // Clear the input after updating
        } catch (error) {
            console.error("Error updating message:", error);
        }
    }
    
    // message
    async function updateMessage() {
      const connectedAccounts = await web3.eth.requestAccounts();

      const Transaction  =  await myContract.methods.setMessage(newMessage).send({from: connectedAccounts[0] });
    }
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <button onClick={getNumber}>Get Number</button>
                <br />
                <button onClick={increaseNumber}>Increase Number</button>
                <br />
                <button onClick={decreaseNumber}>Decrease Number</button>
                <p>Number: {number}</p>
                <button onClick={getMessage}>Get Message</button>
                <p>Message: {currentMessage}</p>
                <input 
                    type='text'
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)} // Capture input value
                    placeholder="Enter new message"
                />
                <br />
                <button onClick={updateMessage}>Update Message</button>
            </header>
        </div>
    );
}

export default App;
