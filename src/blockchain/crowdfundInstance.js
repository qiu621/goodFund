/* eslint-disable */
import web3 from './web3';

const address = '0x23d3e8f52d3fc285689ecbba2f01caecf8f12332'; // Your deployed contract's address goes here
// Example:
// const address = '0x09r80cnasjfaks93m9v2';

const abi = 
[
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
				"name": "daysTillDdl",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "project_goal",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "m1",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "m2",
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
				"name": "project_deadline",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "project_m1",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "project_m2",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "goalAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "project_creator_name",
				"type": "string"
			}
		],
		"name": "ProjectStarted",
		"type": "event"
	}
];

const instance = new web3.eth.Contract(abi, address);

export default instance;
