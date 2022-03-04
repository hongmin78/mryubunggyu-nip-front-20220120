
import { net } from './net'

const addresses ={
	'ETH_TESTNET' : {
		 	contract_USDT : '0x34da0872bb4b215345f6e47ed6514d8c4cd5f8e0'
//	 , contract_stake : '0xa30fec0c860659639247b66ebbe3b2ccc9145e4c' // ver0223 // 0x87ac1e8378cdb6ad11e85ea9565b385b03970279'
	 , contract_stake : '0x32e105f2e0e6a0f25cfd0033c4475ed7e6e3cf8e'
	 , contract_admin : '0x005b38d678753f211abae8dbb38c45a9d159ecee' // 0xd24ff65996e94d79d3cd8a22e8f95c42fbec0e0f'
	 , 
	} , 'BSC_MAINNET' : {
			contract_USDT :		'0x55d398326f99059fF775485246999027B3197955' // owner : 0x83f714ad20e34748516e8367faf143abde6c3783
		, contract_stake :	'0x53caf649502a39c1a6d360d77e12676425f74860'
		, contract_admin :	'0x59e84ece084a0e2cabc1e344320b71d8be117ea9'
		, 
	}
}
export {
	addresses 
}
