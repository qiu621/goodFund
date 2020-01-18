/* eslint-disable */
import web3 from './web3';

const address = '0x23d3e8f52d3fc285689ecbba2f01caecf8f12332'; // Your deployed contract's address goes here
// Example:
// const address = '0x09r80cnasjfaks93m9v2';

const abi = [
	
        {
            "constant": true,
            "inputs": [],
            "name": "returnAllProjects",
            "outputs": [
                {
                    "internalType": "contract Project[]",
                    "name": "",
                    "type": "address[]"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "string",
                    "name": "title",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "description",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "numberOfDays",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "goal",
                    "type": "uint256"
                }
            ],
            "name": "startProject",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "contractAddress",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "address payable",
                    "name": "projectStarter",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "projectTitle",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "projectDesc",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "deadline",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "goalAmount",
                    "type": "uint256"
                }
            ],
            "name": "ProjectStarted",
            "type": "event"
        }
    
]; // Your ABI goes here (Crowdfunding contract)
// Example:
// const abi = [
//     {
//         "anonymous": false,
//         "inputs": [
//             {
//                 "indexed": false,
//                 "name": "contractAddress",
//                 "type": "address"
//             }
//         ],
//         "name": "ProjectStarted",
//         "type": "event"
//     }
// ];

const instance = new web3.eth.Contract(abi, address);

export default instance;
