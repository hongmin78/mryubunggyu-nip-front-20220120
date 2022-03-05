
const Web3=require('web3')
const getweirep=val=> Web3.utils.toWei(val)
const getethrep=(val , precision )=>{
	let num = Web3.utils.fromWei( val )
	if ( precision){
		return (+num).toFixed( precision )
	} else {
		return num
	}
}
export {
	getweirep
	, getethrep
}
