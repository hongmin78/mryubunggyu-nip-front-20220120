// import NodeWalletConnect from "@walletconnect/node";

const LOGGER = console.log;
let { ethereum } = window;
const DebugMode = 1;
/**  const walletConnector = new NodeWalletConnect (
	{
		bridge: "https://bridge.walletconnect.org", // Required
	},
	{
		clientMeta: {
			description: "WalletConnect NodeJS Client",
			url: "https://nodejs.org/en/",
			icons: ["https://nodejs.org/static/images/logo.svg"],
			name: "WalletConnect",
		},
	}
)*/
const requesttransaction = async (jreqdata) => {
  let { from, to, data, value } = jreqdata;
  let { ethereum } = window;
<<<<<<< HEAD
/**  const walletConnector = new NodeWalletConnect(
=======
  /**  const walletConnector = new NodeWalletConnect(
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
    {
      bridge: "https://bridge.walletconnect.org", // Required
    },
    {
      clientMeta: {
        description: "WalletConnect NodeJS Client",
        url: "https://nodejs.org/en/",
        icons: ["https://nodejs.org/static/images/logo.svg"],
        name: "WalletConnect",
      },
    }
  );
*/
  const txparams = {
    to: to,
    from: from,
    value: value, // '0x00'
    data: data,
<<<<<<< HEAD
  };

/**   if ( walletConnector.connected ) {
=======
    gas: "300000",
  };

  /**   if ( walletConnector.connected ) {
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
    await walletConnector
      .sendTransaction(txparams)
      .then((result) => {
        // Returns transaction id (hash)
        console.log(result);
      })
      .catch((error) => {
        // Error returned when rejected
        console.error(error);
      });
    console.log("d");
  } else { */
<<<<<<< HEAD
    let resp;
    try {
      resp = await ethereum.request({
        method: "eth_sendTransaction",
        params: [txparams],
      });
      DebugMode && LOGGER("1F9jVI8LrL", resp);
      return resp;
    } catch (err) {
      DebugMode && LOGGER("kkm1TWXecH", err);
      return null;
    }
//  }
=======
  let resp;
  try {
    resp = await ethereum.request({
      method: "eth_sendTransaction",
      params: [txparams],
    });
    DebugMode && LOGGER("1F9jVI8LrL", resp);
    return resp;
  } catch (err) {
    DebugMode && LOGGER("kkm1TWXecH", err);
    return null;
  }
  //  }
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
};
export { requesttransaction };
