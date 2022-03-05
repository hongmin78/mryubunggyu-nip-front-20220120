
const abi =[
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "_stakeplans",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "_stake_token",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "_reward_token",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "_reward_rate_numerator",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "_reward_rate_denominator",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "_min_amount_to_stake",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "_min_claimable_amount_threshold",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "_active",
						"type": "bool"
					}
				],
				"internalType": "struct Stakeplan.Stakeplan",
				"name": "stakeplan_",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
export {
	abi
}
