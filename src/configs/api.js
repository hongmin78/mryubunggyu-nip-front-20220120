// const URL='http://nip s1.net:348 15'
// const URL='http://3.35. 117.87:34 815'
import { net } from "./net";

let URL;
const url = {
<<<<<<< HEAD
  ETH_TESTNET: "https://nftinfinity.world:34925",
  BSC_MAINNET: "https://nftinfinity.world:34825",
=======
  // ETH_TESTNET: "https://nftinfinity.world:34935",
  // BSC_MAINNET: "https://nftinfinity.world:34835",
  ETH_TESTNET: "https://nftinfinity.world:37593",
  BSC_MAINNET: "https://nftinfinity.world:37593",
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
};

URL = url[net];

const API = {
  API_MAX: URL + `/queries/max`, // /:tablename/:fieldname
  API_TXS: URL + "/transactions", // /:txhash
<<<<<<< HEAD
=======
  API_UPDATE_ORDERS: URL + "/orders/update_orders", // /:txhash
  API_UPDATE_KING_KONG_STAKE: URL + "/orders/update_kingkong_stake", // /:txhash
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
  API_TICKERS: URL + "/tickers",
  API_USERINFO: `${URL}/users/info`,
  API_TOGGLE_FAVORITE: URL + "/favorites/toggle",
  API_LOGIN: URL + "/users/login",
  API_EMAIL_REQUEST: URL + "/signup/email/request",
  API_SIGNUP: URL + "/signup/signup",
  API_QUERY_REFERER: URL + "/queries/singlerow", // /:tablename/:fieldname/:fieldval
  API_QUERY_USERADDRESS: URL + "/queries/singlerow",
  API_QUERY_SINGLEROW: URL + "/queries/singlerow",
  API_PREMIUMITEMS: URL + "/queries/rows",
  API_COMMONITEMS: URL + "/queries/rows",
  API_ITEMDETAIL: URL + "/items/item", // /:itemid
  API_EMAIL_VERIFY: `${URL}/signup/email/auth`,
  API_RECEIVABLES: `${URL}/queries/receivables/username`,
  API_DELINQUENCY: `${URL}/queries/rows/delinquencies/username`,
  API_ITEMBALANCES: `${URL}/queries/itembalances/username`,
<<<<<<< HEAD
=======
  API_QUERY_ORDERS: `${URL}/queries/orders/username`,
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
  API_GETUSER: `${URL}/user/info`,
  API_GETTIME: `${URL}/queries/singlerow/settings/key_/BALLOT_NEXT_ROUND_START`,
  API_TYPESTR: `${URL}/queries/itembalances`,
  API_LOGSTAKES: `${URL}/queries/singlerow/logstakes/username`,
<<<<<<< HEAD
  API_REFERER: `${URL}/queries/rows/refererfeepayments/referercode`,
  API_KEY_TIME_STAMP: `${URL}/queries/singlerow/settings/key_/FRONT_END_LATEST_VER_TIMESTAMP`,
  API_GET_TICK_INFO: `${URL}/queries/singlerow/transactions/username`,
  API_GET_EMAILAUTH: `${URL}/queries/singlerow/emailverifycode/emailaddress`,
  API_GET_CIRCULATIONS: `${URL}/queries/rows/items/active/1/0/32/id/ASC`,
  API_GET_CIRCULATIONS_ITEM: `${URL}/queries/circulations`,
  API_PUT_USERS: `${URL}/users`,
  API_GET_OFFERS: `${URL}/queries/itembalances/itemid`,
  API_GET_TRANSACTIONS: `${URL}/queries/transactionstotrack/itemid`,
  API_GET_ITEMS_DETAIL: `${URL}/items/item`,
  API_QUERY_STRING: (_value) => `${URL}/queries/singlerow/settings/key_/${_value}`,
  API_POST_SALE: `${URL}/orders`,
  API_ALL_ITEMS_MARKET: URL + "/queries/orders",
  API_BANNERS: `${URL}/queries/rows/banners/isinuse/1/0/500/id/ASC`,
=======
  API_SINGLE_ORDER: `${URL}/queries/singlerow/orders/uuid`,
  API_SINGLE_REFFERER: `${URL}/queries/singlerow/users/myreferercode`,
  API_REFERER: `${URL}/queries/rows/refererfeepayments/referercode`,
  API_KEY_TIME_STAMP: `${URL}/queries/singlerow/settings/key_/FRONT_END_LATEST_VER_TIMESTAMP`,
  API_GET_TICK_INFO: `${URL}/queries/singlerow/logstakes/username`,
  API_GET_EMAILAUTH: `${URL}/queries/singlerow/emailverifycode/emailaddress`,
  API_GET_CIRCULATIONS: `${URL}/queries/rows/items/active/1/0/32/id/ASC`,
  API_GET_KING_KONG_ITEM: `${URL}/queries/rows/items/username`,
  API_GET_CIRCULATIONS_ITEM: `${URL}/queries/circulations`,
  API_PUT_USERS: `${URL}/users`,
  API_GET_OFFERS: `${URL}/queries/itembalances/itemid`,
  API_GET_MARKET_OFFERS: `${URL}/queries/logorders/uuid`,
  API_GET_TRANSACTIONS: `${URL}/queries/transactionstotrack/itemid`,
  API_GET_TRANSACTIONS_TICKET: `${URL}/queries/logorders/tokenid`,
  API_GET_TRANSACTIONS_KING_KONG: `${URL}/queries/logorders/itemid`,
  API_GET_ITEMS_DETAIL: `${URL}/items/item`,
  API_QUERY_STRING: (_value) =>
    `${URL}/queries/singlerow/settings/key_/${_value}`,
  API_POST_SALE: `${URL}/orders`,
  API_ALL_ITEMS_MARKET: URL + "/queries/orders",
  API_BANNERS: `${URL}/queries/rows/banners/isinuse/1/0/500/id/ASC`,
  API_CADDR: `${URL}/queries/contractaddresses?nettype=${net}`,
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
};

export { API };
