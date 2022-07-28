export const abi = [
  {
    constant: true,
    inputs: [],
    name: "_target_kip17_contract_def",
    outputs: [
      {
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_target_kip17_contract",
        type: "address",
      },
      {
        name: "_author_royalty_rate",
        type: "uint256",
      },
      {
        name: "_author",
        type: "address",
      },
      {
        name: "_itemid",
        type: "string",
      },
      {
        name: "_paymeansaddress",
        type: "address",
      },
      {
        name: "_amounttopay",
        type: "uint256",
      },
      {
        name: "_seller",
        type: "address",
      },
      {
        name: "_referer",
        type: "address",
      },
      {
        name: "_referer_fee_rate",
        type: "uint256",
      },
      {
        name: "_author_royalty",
        type: "uint256",
      },
    ],
    name: "match_single_simple_legacy",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "hash",
        type: "bytes32",
      },
    ],
    name: "prefixed",
    outputs: [
      {
        name: "",
        type: "bytes32",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_tokenid",
        type: "uint256",
      },
      {
        name: "_price",
        type: "uint256",
      },
      {
        name: "_paymeansaddress",
        type: "address",
      },
      {
        name: "_seller",
        type: "address",
      },
    ],
    name: "msgHash",
    outputs: [
      {
        name: "",
        type: "bytes32",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "_version",
    outputs: [
      {
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "_user_proxy_registry",
    outputs: [
      {
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "operator",
        type: "address",
      },
      {
        name: "from",
        type: "address",
      },
      {
        name: "tokenId",
        type: "uint256",
      },
      {
        name: "data",
        type: "bytes",
      },
    ],
    name: "onKIP17Received",
    outputs: [
      {
        name: "",
        type: "bytes4",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "message",
        type: "bytes32",
      },
      {
        name: "_sig",
        type: "bytes",
      },
    ],
    name: "recoverSigner",
    outputs: [
      {
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_sig",
        type: "bytes",
      },
    ],
    name: "splitSignature",
    outputs: [
      {
        name: "",
        type: "uint8",
      },
      {
        name: "",
        type: "bytes32",
      },
      {
        name: "",
        type: "bytes32",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "_owner",
    outputs: [
      {
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_address",
        type: "address",
      },
    ],
    name: "only_owner_or_admin",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "_admincontract",
    outputs: [
      {
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "_payroll",
    outputs: [
      {
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        name: "__admincontract",
        type: "address",
      },
      {
        name: "__version",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
];
