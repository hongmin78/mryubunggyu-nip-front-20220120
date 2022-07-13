import { net } from "./net";

const jaddresses = {
  ETH_TESTNET: {
    contract_USDT: "0x34da0872bb4b215345f6e47ed6514d8c4cd5f8e0",
    //	 , contract_stake : '0xa30fec0c860659639247b66ebbe3b2ccc9145e4c' // ver0223 // 0x87ac1e8378cdb6ad11e85ea9565b385b03970279'
    contract_stake: "0xc964f791b8e92336abfb3fde5fd4738700110379",
    contract_admin: "0x005b38d678753f211abae8dbb38c45a9d159ecee", // 0xd24ff65996e94d79d3cd8a22e8f95c42fbec0e0f'
    // contract_pay_for_assigned_item: "0xaf9764ef97102951f9339d515e4c41099e8fc992",
    // contract_pay_for_assigned_item: "0x70D2764D702d90c1E068a5DB6006410dDa1A1D32", // 2022.05.08 3:57pm release latest
    contract_pay_for_assigned_item: "0x7A01f4dC3A77d66B74A499c19535A8A8338C1D21", // 2022.05.020 12:19am release latest
    // payment_for_delinquency: "0x2cdb6d037cc0a9e5480f9071b4a00f20055057a7",
    payment_for_delinquency: "0x3a21780372d2bf9be278906295984a9799bea2a8",
    contract_ticketnft: "0x60123597c04bB08655e027B3398D0BD336ad68C6",
    contract_erc1155_sales: "0x701B224c3E0CBF57d16C857D588A38F30FF3E82a", // 2022.06.05 11:20pm latest release
    contract_erc1155: "0xE437A4F3E2b69331CEd5B816682f2653530000DC", // 2022.06.05 latest release
    // ticket sales contracts
    contract_erc1155_ticket_sales_minter: "0x14B60B05973781ca781491b56c292d75d1e6bB71", // 2022.07.13 release
    contract_erc1155_ticket_sales: "0x792b9E8c8F3748B734ae5CDa9Bd87fa5A02596AE",
  },
  BSC_MAINNET: {
    contract_USDT: "0x55d398326f99059fF775485246999027B3197955", // owner : 0x83f714ad20e34748516e8367faf143abde6c3783
    contract_stake: "0x53caf649502a39c1a6d360d77e12676425f74860",
    contract_admin: "0x59e84ece084a0e2cabc1e344320b71d8be117ea9",
    contract_ticketnft: "0x6208803CC8FAfdeCEA589666c96d40836daccB46",
    // contract_pay_for_assigned_item: "0xda90f3b82c531f32af791fa3a3e7a67b36aa0844",
    // contract_pay_for_assigned_item:
    //   "0x966C6627Ae93F01C4CE4bed607348690645F251D", //release 0520
    contract_pay_for_assigned_item: "0x6fb460F0B9CEDad97Fa396228DEf6ade84201517", //release 0621
    payment_for_delinquency: "0xc7b12c6b2c0214ed60cfc1e2f3efdd6d83b58f29",
  },
};
let addresses = jaddresses[net];
export { addresses };
