import { web3 } from "../configs/configweb3";
import { abi as abierc20 } from "../contracts/abi-erc20";
import { abi as abistake } from "../contracts/abi-staker";
import { abi as abiadmin } from "../contracts/abi-admin";
import { abi as abiticketnft } from "../contracts/abi-ticketnft";
<<<<<<< HEAD
import { abi as abiticketminter } from "../contracts/abi-erc1155_ticket_minter";
=======
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
import { abi as abipay } from "../contracts/abipay";
import { abi as abidelinquent } from "../contracts/abi-delinquents";
import { abi as abierc1155 } from "../contracts/abi-erc1155";
import { abi as abierc1155sales } from "../contracts/abi-erc1155Sale";
<<<<<<< HEAD
=======
import { abi as abi17 } from "../contracts/abi-kip17";
import { abi as abi17_sale } from "../contracts/abi-kip17_sales";
import { abi as abi17_stake } from "../contracts/abi-kip17_stake";
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027

// import { abi_putons ale } from '../contracts/abi/abi_puton sale'
import { LOGGER } from "./common";
import sha256 from "js-sha256";
// import { getweirep } from '../utils/eth'
<<<<<<< HEAD
// import { DebugMode } from '../configs/configs'
=======
// import { DebugMode } from "../configs/configs";
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
const jcontracts = {};
const MAP_STR_ABI = {
  ERC20: abierc20,
  STAKE: abistake,
  ADMIN: abiadmin,
  TICKETNFT: abiticketnft,
<<<<<<< HEAD
  ERC1155_TICKET_MINTER: abiticketminter,
=======
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
  PAY: abipay,
  DELINQUENT: abidelinquent,
  ERC1155Sale: abierc1155sales,
  ERC1155: abierc1155,
<<<<<<< HEAD
};
const getabistr_forfunction = (jargs) => {
=======
  KIP17: abi17,
  KIP17Sale: abi17_sale,
  KIP17Stake: abi17_stake,
};
const getabistr_forfunction = (jargs) => {
  console.log("jargs", jargs);
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
  let { contractaddress, abikind, methodname, aargs } = jargs;
  let contract;
  contractaddress = contractaddress.toLowerCase();
  let sig = sha256(contractaddress + methodname);
<<<<<<< HEAD
=======
  console.log("sig", sig);
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
  if (jcontracts[sig]) {
    contract = jcontracts[sig];
  } else {
    contract = new web3.eth.Contract(MAP_STR_ABI[abikind], contractaddress);
    jcontracts[sig] = contract;
  }
<<<<<<< HEAD
=======

>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
  return contract.methods[methodname](...aargs).encodeABI();
};
// contract.methods.incomingQueue(0).ca ll(); –
const query_noarg = (jargs) => {
  let { contractaddress, abikind, methodname } = jargs;
  let contract;
  contractaddress = contractaddress.toLowerCase();
  let sig = sha256(contractaddress + methodname);
  if (jcontracts[sig]) {
    contract = jcontracts[sig];
  } else {
    contract = new web3.eth.Contract(MAP_STR_ABI[abikind], contractaddress);
    jcontracts[sig] = contract;
  }
  return new Promise((resolve, reject) => {
    contract.methods[methodname]()
      .call((err, resp) => {
        LOGGER("", err, resp);
        if (err) {
          resolve(null);
          return;
        }
        resolve(resp);
      })
      .catch((err) => {
        resolve(null);
      });
  });
};
const query_with_arg = (jargs) => {
  // {contractaddress , methodname , aargs }=jargs
  let { contractaddress, abikind, methodname, aargs } = jargs;
<<<<<<< HEAD
  console.log(contractaddress);
=======
  console.log("jargs", jargs);

>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
  let contract;
  contractaddress = contractaddress.toLowerCase();
  let sig = sha256(contractaddress + methodname);
  if (jcontracts[sig]) {
    contract = jcontracts[sig];
  } else {
    contract = new web3.eth.Contract(MAP_STR_ABI[abikind], contractaddress);
    jcontracts[sig] = contract;
  }
  return new Promise((resolve, reject) => {
    contract.methods[methodname](...aargs)
      .call((err, resp) => {
        LOGGER("", err, resp);
        if (err) {
          resolve(null);
          return;
        }
        resolve(resp);
      })
      .catch((err) => {
        resolve(null);
      });
  });
};
/** const query_admin_fee =jargs=>{	let {contractaddress , actiontype }=jargs; let contract; contractaddress=contractaddress.toLowerCase()
	if(jcontracts[contractaddress ]){ contract=jcontracts[contractaddress] }
	else {        contract=new web3.eth.Contract( abi_admin , contractaddress);    jcontracts[contractaddress ]=contract }
	return new Promise((resolve,reject)=>{
		contract.methods.query_admin_fee(actiontype).call((err,resp)=>{LOGGER('' , err,resp)
			if(err){resolve(null);return}
			resolve(resp)
		}).catch(err=>{resolve(null)})
	})
} */
const query_eth_balance = (useraddress) => {
  return new Promise((resolve, reject) => {
    web3.eth
      .getBalance(useraddress)
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        resolve(null);
      });
  });
};
export {
  getabistr_forfunction,
  query_noarg,
  query_with_arg,
  //	, query_admin_fee
  query_eth_balance,
};
/** const approve=async jargs=>{let {contractaddress , spenderaddress,amount }=jargs; let contract; contractaddress=contractaddress.toLowerCase()
  if(jcontracts[contractaddress ]){ contract=jcontracts[contractaddress] }
  else {        contract=new web3.eth.Contract( abierc20 , contractaddress);    jcontracts[contractaddress ]=contract }
  return new Promise((resolve,reject)=>{  if(contract){} else {resolve(null) ; return false }
    contract.methods.approve(spenderaddress ,getweirep(amount) ).call((err,resp)=>{DebugMode && LOGGER('ttEyiAnksK',err,resp)
      resolve( resp )
    }).catch(err=>{DebugMode && LOGGER('KRiD5tsqkD',err);resolve(null)} )
  })
}
*/
