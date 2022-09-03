export const abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "__admincontract",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
<<<<<<< HEAD
=======
    name: "_admin_fee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
    name: "_admincontract",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
<<<<<<< HEAD
=======
    name: "_feecollector_for_sales",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
    name: "_flowsel",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_is_function_mint_and_match_single_simple_legacy",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
<<<<<<< HEAD
=======
    inputs: [],
    name: "_referer_feerate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "get_admin_fee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
    inputs: [
      {
        internalType: "address",
        name: "_target_erc1155_contract",
        type: "address",
      },
      {
        internalType: "string",
        name: "_itemid",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_amounttomint",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_decimals",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_author_royalty",
        type: "uint256",
      },
      {
        internalType: "address",
<<<<<<< HEAD
        name: "_author",
=======
        name: "_referer",
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amounttobuy",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amounttopay",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_paymeansaddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_seller",
        type: "address",
      },
    ],
    name: "mint_and_match_single_simple_legacy",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "_target_erc1155_contract",
            type: "address",
          },
          {
            internalType: "string",
            name: "_itemid",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "_amounttomint",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_decimals",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_author_royalty",
            type: "uint256",
          },
          {
            internalType: "address",
<<<<<<< HEAD
            name: "_author",
=======
            name: "_seller",
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
            type: "address",
          },
        ],
        internalType: "struct ERC1155Sales.Mint_info",
        name: "mint_info",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "_amounttobuy",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_amounttopay",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "_paymeansaddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "_seller",
            type: "address",
          },
        ],
        internalType: "struct ERC1155Sales.Sale_info",
        name: "sale_info",
        type: "tuple",
      },
    ],
    name: "mint_and_match_single_simple_with_signature",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "onERC1155BatchReceived",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "onERC1155Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
<<<<<<< HEAD
=======
        internalType: "uint256",
        name: "__referer_fee",
        type: "uint256",
      },
    ],
    name: "set__referer_feerate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "__admin_fee",
        type: "uint256",
      },
    ],
    name: "set_admin_fee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "set_admincontract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
<<<<<<< HEAD
=======
        internalType: "address",
        name: "__feecollector_for_sales",
        type: "address",
      },
    ],
    name: "set_feecollector_for_sales",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
        internalType: "uint256",
        name: "__flowsel",
        type: "uint256",
      },
    ],
    name: "set_flowsel",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "_status",
        type: "bool",
      },
    ],
    name: "set_function_mint_and_match_single_simple_legacy",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
