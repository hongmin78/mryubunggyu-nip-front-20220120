const Web3 = require("web3");
const infuraurlmain = "https://bsc-dataseed1.defibit.io"; // 'https://mainnet.infura.io/v3/cd35bc8ac4c14bc5b464e267e88ee9d0'
// const infuraurlropsten= XXX 'https://data-seed-prebsc-2-s2.binance.org:8545/' // 'https://ropsten.infura.io/v3/cd35bc8ac4c14bc5b464e267e88ee9d0'
//	const infuraurlropsten= 'https://data-seed-prebsc-1-s3.binance.org:8545/'
//		const infuraurlropsten= 'https://data-seed-prebsc-2-s3.binance.org:8545/'
// const infuraurlropsten='https://ropsten.infura.io/v3/cd35bc8ac4c14bc5b464e267e88ee9d0'  ???
// const infuraurlropsten='https://ropsten.infura.io/v3/5799d55e1e66488786f26d987bfcfd05'
const infuraurlropsten = "https://bsc-dataseed3.binance.org";

const NETCLASS = "mainnet"; // require('fs').readFileSync('NETTYPE.cfg').toString().replace(/ /g,'');console.log(NETCLASS)
const jnetkind = { mainnet: "mainnet", testnet: "ropsten" };
const jnettype = { mainnet: "mainnet", testnet: "testnet" };
const jinfuraurl = { mainnet: infuraurlmain, testnet: infuraurlropsten };
const infuraurl = jinfuraurl[NETCLASS]; //
const netkind = jnetkind[NETCLASS];
const nettype = "BSC_MAINNET"; // BSC-MAINNET' //  jnettype[NETCLASS] // 'testnet' //  'ropsten'
const NETTYPE = "BSC_MAINNET";
const BASE_CURRENCY = "BNB";
const STAKE_CURRENCY = "USDT";
// const infuraurl=infuraurlmain // infuraurlropsten //
let web3 = new Web3(new Web3.providers.HttpProvider(infuraurl));

module.exports = { web3, netkind, nettype, NETTYPE, BASE_CURRENCY, STAKE_CURRENCY }; // ,createaccount,aapikeys,getapikey
/** https://bsc-dataseed.binance.org/
https://bsc-dataseed1.defibit.io/
https://bsc-dataseed1.ninicoin.io/
Backups

https://bsc-dataseed2.defibit.io/
https://bsc-dataseed3.defibit.io/
https://bsc-dataseed4.defibit.io/
https://bsc-dataseed2.ninicoin.io/
https://bsc-dataseed3.ninicoin.io/
https://bsc-dataseed4.ninicoin.io/
https://bsc-dataseed1.binance.org/
https://bsc-dataseed2.binance.org/
https://bsc-dataseed3.binance.org/
https://bsc-dataseed4.binance.org/
*/
