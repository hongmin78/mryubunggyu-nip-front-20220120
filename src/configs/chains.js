const { net } = require("./net");
const { web3 } = require("./configweb3");

let chainId = {
  BSC_MAINNET: 56,
  ETH_TESTNET: 3,
};

let networks = {
  BSC_MAINNET: {
    chainName: "Smart Chain",
    chainId: web3.utils.toHex(chainId[net]),
    nativeCurrency: {
      name: "BNB",
      decimals: 18,
      symbol: "BNB",
    },
    rpcUrls: ["https://bsc-dataseed.binance.org/"],
    blockExplorerUrls: ["https://bscscan.com"],
  },
  ETH_TESTNET: {
    chainName: "Ropsten Test Network",
    chainId: web3.utils.toHex(chainId[net]),
    nativeCurrency: {
      name: "RopstenETH",
      decimals: 18,
      symbol: "RopstenETH",
    },
    rpcUrls: ["https://ropsten.infura.io/v3/"],
    blockExplorerUrls: ["https://ropsten.etherscan.io"],
  },
};

chainId = chainId[net];
networks = networks[net];

module.exports = { chainId, networks };