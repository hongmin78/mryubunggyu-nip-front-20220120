
const Web3=require('web3')
const infuraurlmain=   '' // 'https://mainnet.infura.io/v3/cd35bc8ac4c14bc5b464e267e88ee9d0'
// const infuraurlropsten= XXX 'https://data-seed-prebsc-2-s2.binance.org:8545/' // 'https://ropsten.infura.io/v3/cd35bc8ac4c14bc5b464e267e88ee9d0'
//	const infuraurlropsten= 'https://data-seed-prebsc-1-s3.binance.org:8545/'
//		const infuraurlropsten= 'https://data-seed-prebsc-2-s3.binance.org:8545/'
// const infuraurlropsten='https://ropsten.infura.io/v3/cd35bc8ac4c14bc5b464e267e88ee9d0'  ???
// const infuraurlropsten='https://ropsten.infura.io/v3/5799d55e1e66488786f26d987bfcfd05'

const { net }=require('./net')
let jconfigweb3
switch (net) {
	case 'ETH_TESTNET' :
		jconfigweb3 = require('./configweb3-ropsten')
	break
	case 'BSC_MAINNET' : 
		jconfigweb3 = require('./configweb3-bscmainnet')
	break
}
let { web3 
	, netkind 
	, nettype
	, NETTYPE
	, BASE_CURRENCY
	, STAKE_CURRENCY
} = jconfigweb3
/**  const NETCLASS='testnet' // require('fs').readFileSync('NETTYPE.cfg').toString().replace(/ /g,'');console.log(NETCLASS)
const jnetkind={mainnet:'mainnet',testnet:'ropsten'}
const jnettype={mainnet:'mainnet',testnet:'testnet'}
const jinfuraurl={mainnet:infuraurlmain,testnet:infuraurlropsten}
const infuraurl=jinfuraurl[NETCLASS]  //
const netkind=jnetkind[NETCLASS]
const nettype='ETH-TESTNET' //  jnettype[NETCLASS] // 'testnet' //  'ropsten'
const NETTYPE='ETH-TESTNET'
const BASE_CURRENCY='ETH'
const STAKE_CURRENCY='USDT'
// const infuraurl=infuraurlmain // infuraurlropsten // 
let web3 = new Web3(new Web3.providers.HttpProvider(infuraurl))
*/

module.exports={ 
		web3 
	, netkind 
	, nettype
	, NETTYPE
 , BASE_CURRENCY
 , STAKE_CURRENCY
} // ,createaccount,aapikeys,getapikey

