import { net } from "./net";

const jaddresses = {
  ETH_TESTNET: {
    contract_USDT: "0x34da0872bb4b215345f6e47ed6514d8c4cd5f8e0",
    //	 , contract_stake : '0xa30fec0c860659639247b66ebbe3b2ccc9145e4c' // ver0223 // 0x87ac1e8378cdb6ad11e85ea9565b385b03970279'
    contract_stake: "0x32e105f2e0e6a0f25cfd0033c4475ed7e6e3cf8e",
    contract_admin: "0x005b38d678753f211abae8dbb38c45a9d159ecee", // 0xd24ff65996e94d79d3cd8a22e8f95c42fbec0e0f'
    contract_pay_for_assigned_item:
      "0xaf9764ef97102951f9339d515e4c41099e8fc992",
    payment_for_delinquency: "0x2cdb6d037cc0a9e5480f9071b4a00f20055057a7",
  },
  BSC_MAINNET: {
    contract_USDT: "0x55d398326f99059fF775485246999027B3197955", // owner : 0x83f714ad20e34748516e8367faf143abde6c3783
    contract_stake: "0x53caf649502a39c1a6d360d77e12676425f74860",
    contract_admin: "0x59e84ece084a0e2cabc1e344320b71d8be117ea9",
    contract_ticketnft: "0x6208803CC8FAfdeCEA589666c96d40836daccB46",
  },
};
let addresses = jaddresses[net];
export { addresses };
