const abi= [
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "__feecollector",
						"type": "address"
					}
				],
				"stateMutability": "nonpayable",
				"type": "constructor"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": false,
						"internalType": "address",
						"name": "_pay_token",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "uint256",
						"name": "_amountdue",
						"type": "uint256"
					},
					{
						"indexed": false,
						"internalType": "address",
						"name": "_seller",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "string",
						"name": "_itemid",
						"type": "string"
					}
				],
				"name": "Pay",
				"type": "event"
			},
			{
				"inputs": [],
				"name": "_feecollector",
				"outputs": [
					{
						"internalType": "address",
						"name": "",
						"type": "address"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [],
				"name": "_owner",
				"outputs": [
					{
						"internalType": "address",
						"name": "",
						"type": "address"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "_pay_token",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "_amountdue",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "_seller",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "_itemid",
						"type": "string"
					}
				],
				"name": "pay",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "_address",
						"type": "address"
					}
				],
				"name": "set_feecollector",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			}
		]
export { abi }
