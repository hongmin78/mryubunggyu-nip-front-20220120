
const abi =[
	{
		name : 'stake'
		, inputs : [
				{ type : 'address' , name : '_stake_token' } // <= usdt
			, { type : 'uint256' , name : '_amounttostake' }   // <= 100_000000_000000_000000
			, { type : 'address' , name : '_to' }  // 		 
		]
		, outputs : [ ]
	}
]
export {
	abi
}
