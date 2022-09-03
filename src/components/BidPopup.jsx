import styled from "styled-components";
import I_x from "../img/icon/I_x.svg";
<<<<<<< HEAD
// import { useState } from "react";
import { Fragment, useEffect, useRef, useState } from "react";
import E_detailItem from "../img/market/E_detailItem.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  LOGGER,
  getmyaddress,
  onclickcopy,
  PARSER,
  conv_jdata_arrkeyvalue,
} from "../util/common";
import { API } from "../configs/api";
import SetErrorBar from "../util/SetErrorBar";
import { messages } from "../configs/messages";
import { net } from "../configs/net";
import { getabistr_forfunction, query_with_arg } from "../util/contract-calls";
import E_staking from "../img/common/E_staking.png";
import { addresses } from "../configs/addresses";
import { getethrep, getweirep } from "../util/eth";
import { requesttransaction } from "../services/metamask";
import awaitTransactionMined from "await-transaction-mined";
import { web3 } from "../configs/configweb3-ropsten";
import { TX_POLL_OPTIONS } from "../configs/configs";

export default function BidPopup({ off, itemdata }) {
  const params = useParams();
  const navigate = useNavigate();
  const isMobile = useSelector((state) => state.common.isMobile);
  const [price, setPrice] = useState("");
  const [saleStatus] = useState(1);
  const [allowance, setAllowance] = useState(0);
  let [spinner, setSpinner] = useState(false);

  const queryAllowance = () => {
    let myaddress = getmyaddress();
    if (myaddress) {
    } else {
      SetErrorBar(messages.MSG_PLEASE_CONNECT_WALLET);
      setSpinner(false);
      return;
    }

    const options_arg = {
      kingkong: {
        contractaddress: addresses.contract_USDT,
        abikind: "ERC20",
        methodname: "allowance",
        aargs: [myaddress, addresses.contract_erc1155_sales],
      },
      ticket: {
        contractaddress: addresses.contract_USDT,
        abikind: "ERC20",
        methodname: "allowance",
        aargs: [myaddress, addresses.contract_erc1155_ticket_sales],
      },
    };

    console.log("$itemdata", itemdata);

    query_with_arg(options_arg[itemdata.group_]).then((resp) => {
      console.log("$allowance_usdt: ", resp);
      setAllowance(getethrep("" + resp));
      SetErrorBar(`Allowance: ${getethrep("" + resp)}`);
      setSpinner(false);
    });
  };

  const approve = async () => {
    let myaddress = getmyaddress();
    if (myaddress) {
    } else {
      SetErrorBar(messages.MSG_PLEASE_CONNECT_WALLET);
      setSpinner(false);
      return;
    }

    setSpinner(true);
    const options_arg = {
      kingkong: {
        abistr: {
          contractaddress: addresses.contract_USDT,
          abikind: "ERC20",
          methodname: "approve",
          aargs: [addresses.contract_erc1155_sales, getweirep("" + 10000_0000)],
=======
import I_tIcon from "../img/icon/I_tIcon.png";
import I_chkWhite from "../img/icon/I_chkWhite.svg";
import { get_contractaddress, putCommaAtPrice } from "../util/Util";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import PopupBg from "./PopupBg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  getabistr_forfunction,
  query_with_arg,
  query_noarg,
  query_eth_balance,
} from "../util/contract-calls";
import { DECIMALS_DISP_DEF } from "../configs/configs"; // DueAmount,
import { LOGGER, getmyaddress, getobjtype } from "../util/common";
import { getweirep, getethrep } from "../util/eth";
import { requesttransaction } from "../services/metamask";
import SetErrorBar from "../util/SetErrorBar";
import { messages } from "../configs/messages";
import { API } from "../configs/api";
import awaitTransactionMined from "await-transaction-mined";
import {
  web3,
  BASE_CURRENCY,
  PAY_CURRENCY,
  NETTYPE,
} from "../configs/configweb3";
import { TX_POLL_OPTIONS, MAX_GAS_LIMIT } from "../configs/configs";
import I_spinner from "../img/icon/I_spinner.svg";
import { strDot } from "../util/Util";
import { net } from "../configs/net";
import E_staking from "../img/common/E_staking.png";

export default function BidPopup({ off, itemdata }) {
  console.log("marketPlaceList", itemdata);
  const navigate = useNavigate();
  const isMobile = useSelector((state) => state.common.isMobile);
  let [myaddress, setmyaddress] = useState(getmyaddress());
  let [mybalance, setmybalance] = useState();
  let [isallowanceok, setisallowanceok] = useState(false);
  let [allowanceamount, setallowanceamount] = useState();
  let [approve, setApprove] = useState(false);
  // let [st akedbalance, setsta kedbalance] = useState();
  let [tvl, settvl] = useState();
  let [tickerusdt, settickerusdt] = useState(1);
  let [myethbalance, setmyethbalance] = useState();
  let [done, setDone] = useState(false);
  let spinnerHref = useRef();
  let spinnerHref_approve = useRef();
  let [isloader_00, setisloader_00] = useState(false);
  let [isloader_01, setisloader_01] = useState(false);
  let [DueAmount, setDueAmount] = useState(parseInt(itemdata?.price));
  let [refererFeeRate, setRefererFeeRate] = useState("");
  let [userinfo, setuserinfo] = useState("");
  const [contractaddresses, setContractaddresses] = useState([]);

  const query_contractaddresses = async () => {
    return new Promise(async (res, rej) => {
      try {
        let { data } = await axios.get(API.API_CADDR);
        let { status, list } = data;
        if (status == "OK") {
          setContractaddresses(list);
          res(list);
        } else {
          rej("Failed to fetch contractaddresses");
        }
      } catch (err) {
        console.error(err);
      }
    });
  };

  useEffect((_) => {
    query_contractaddresses().then(async (resp) => {
      const spinner = spinnerHref.current; // document.querySelector("Spinner");
      spinner.animate(
        [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
        {
          duration: 1000,
          iterations: Infinity,
        }
      );
      const spinner_approve = spinnerHref_approve.current; // document.querySelector("Spinner");
      spinner_approve.animate(
        [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
        {
          duration: 1000,
          iterations: Infinity,
        }
      );
      axios
        .get(API.API_QUERY_STRING("SALE_REFERER_FEE_RATE") + `?nettype=${net}`)
        .then((res) => {
          if (res.data && res.data.respdata) {
            console.log("$fee_rate", res);
            let { value_ } = res.data.respdata;
            setRefererFeeRate(value_);
          }
        })
        .catch((err) => console.log(err));

      const fetchdata = async (_) => {
        let myaddress = getmyaddress();

        axios
          .get(API.API_USERINFO + `/${myaddress}?nettype=${net}`)
          .then((resp) => {
            if (resp.data && resp.data.respdata) {
              let { respdata } = resp.data;
              setuserinfo(respdata);
            }
          });

        const options_arg = {
          kingkong: {
            contractaddress: await get_contractaddress("contract_USDT", resp),
            abikind: "ERC20",
            methodname: "allowance",
            aargs: [myaddress, await get_contractaddress("KIP17[sales]", resp)],
          },
          ticket: {
            contractaddress: await get_contractaddress("contract_USDT", resp),
            abikind: "ERC20",
            methodname: "allowance",
            aargs: [
              myaddress,
              await get_contractaddress("ERC1155[sales]", resp),
            ],
          },
        };

        if (itemdata?.type === "kingkong") {
          query_with_arg(options_arg["kingkong"]).then((resp) => {
            let allowanceineth = getethrep(resp);
            console.log("_________allowance", allowanceineth);

            setallowanceamount(allowanceineth);
            //				setallowanceamount ( 100 )
            if (allowanceineth > 0) {
              setisallowanceok(false);
            } else {
            }
          });
        }

        if (itemdata?.type === "ticket") {
          query_with_arg(options_arg["ticket"]).then((resp) => {
            let allowanceineth = getethrep(resp);

            LOGGER("8LYRxjNp8k_ticket", resp, allowanceineth);
            setallowanceamount(allowanceineth);
            //				setallowanceamount ( 100 )
            if (allowanceineth > 0) {
              setisallowanceok(false);
            } else {
            }
          });
        }

        query_with_arg({
          contractaddress: await get_contractaddress("contract_USDT", resp), // ETH_TESTNET.
          abikind: "ERC20",
          methodname: "balanceOf",
          aargs: [myaddress],
        }).then((resp) => {
          LOGGER("mybalance", resp);
          setmybalance(getethrep(resp, 4));
        });

        query_eth_balance(myaddress).then((resp) => {
          LOGGER("rmgUxgo5ye", resp);
          setmyethbalance((+getethrep(resp)).toFixed(DECIMALS_DISP_DEF));
        });
      };
      fetchdata();
    });
  }, []);

  const onclick_approve = async (_) => {
    LOGGER("");
    setisloader_00(true);
    let myaddress = getmyaddress();

    const options_arg = {
      kingkong: {
        abistr: {
          contractaddress: await get_contractaddress(
            "contract_USDT",
            contractaddresses
          ),
          abikind: "ERC20",
          methodname: "approve",
          aargs: [
            await get_contractaddress("KIP17[sales]", contractaddresses),
            getweirep("" + 10000_0000),
          ],
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
        },
      },
      ticket: {
        abistr: {
<<<<<<< HEAD
          contractaddress: addresses.contract_USDT,
          abikind: "ERC20",
          methodname: "approve",
          aargs: [
            addresses.contract_erc1155_ticket_sales,
=======
          contractaddress: await get_contractaddress(
            "contract_USDT",
            contractaddresses
          ),
          abikind: "ERC20",
          methodname: "approve",
          aargs: [
            await get_contractaddress("ERC1155[sales]", contractaddresses),
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
            getweirep("" + 10000_0000),
          ],
        },
      },
    };

<<<<<<< HEAD
    let abistr = getabistr_forfunction(
      options_arg[itemdata.itembalances?.group_].abistr
    );

    requesttransaction({
      from: myaddress,
      to: addresses.contract_USDT,
      data: abistr,
      value: "0x00",
    }).then((resp) => {
      if (resp) {
      } else {
        SetErrorBar(messages.MSG_USER_DENIED_TX);
        return;
      }

      let txhash = resp;

      awaitTransactionMined
        .awaitTx(web3, txhash, TX_POLL_OPTIONS)
        .then(async (minedtxreceipt) => {
          console.log(minedtxreceipt);
          SetErrorBar(messages.MSG_TX_FINALIZED);
          queryAllowance();
          setSpinner(false);
        });
      console.log("txhash", txhash);
    });
  };

  const onClickBuy = async () => {
    let myaddress = getmyaddress();
    if (myaddress) {
    } else {
      SetErrorBar(messages.MSG_PLEASE_CONNECT_WALLET);
      setSpinner(false);
      return;
    }
    setSpinner(true);
    console.log(
      "$abistr_forfunction",
      addresses.contract_erc1155, // target contractaddress
      itemdata.itembalances?.itemid, // itemid
      "1", // amounttomint
      "0", // decimals
      "250", // authorroyalty
      itemdata.itembalances?.username, // authoraddress
      "1", // amounttobuy
      getweirep("" + itemdata.itembalances?.buyprice), // amounttopay
      itemdata.itembalances?.paymeansaddress, // paymeansaddress
      itemdata.itembalances?.username // sellersaddress
    );

    const options_abistr = {
      kingkong: {
        operator_contract: addresses.contract_erc1155_sales,
        typestr: "BUY_NFT_ITEM",
        amount: itemdata.itembalances?.buyprice,
        auxdata: {
          user_action: "BUY_NFT_ITEM",
          contract_type: "ERC1155Sale", // .ETH_TESTNET
          contractaddress: addresses.contract_erc1155_sales, // .ETH_TESTNET
          my_address: myaddress,
          authorRoyalty: "250",
          itemid: itemdata.itembalances?.itemid,
          tokenid: itemdata.itembalances?.id,
          author: "",
          paymeansaddress: itemdata.itembalances?.paymeansaddress,
          amount: itemdata.itembalances?.buyprice,
          uuid: itemdata.order_detail?.uuid,
          paymeansname: itemdata.itembalances?.paymeans,
          nettype: net,
        },
        abistr: {
          contractaddress: addresses.contract_erc1155,
          abikind: "ERC1155Sale",
          methodname: "mint_and_match_single_simple_legacy",
          // eslint-disable-next-line no-sparse-arrays
          aargs: [
            addresses.contract_erc1155, // target contractaddress
            itemdata.itembalances?.itemid, // itemid
            "1", // amounttomint
            "0", // decimals
            "250", // authorroyalty
            itemdata.itembalances?.username, // authoraddress
            "1", // amounttobuy
            getweirep("" + itemdata.itembalances?.buyprice), // amounttopay
            itemdata.itembalances?.paymeansaddress, // paymeansaddress
            itemdata.itembalances?.username, // sellersaddress
=======
    if (itemdata?.type === "ticket") {
      let abistr = getabistr_forfunction(options_arg["ticket"].abistr);
      requesttransaction({
        from: myaddress,
        to: await get_contractaddress("contract_USDT", contractaddresses),
        data: abistr,
        value: "0x00",
      }).then((resp) => {
        if (resp) {
        } else {
          SetErrorBar(messages.MSG_USER_DENIED_TX);
          setisloader_00(false);
          return;
        }

        let txhash = resp;
        SetErrorBar(messages.MSG_TX_REQUEST_SENT);

        awaitTransactionMined
          .awaitTx(web3, txhash, TX_POLL_OPTIONS)
          .then((minedtxreceipt) => {
            LOGGER("____minedtxreceipt", minedtxreceipt);
            let { status } = minedtxreceipt;
            if (status) {
            } else {
              SetErrorBar(messages.MSG_TX_FAILED);
              off();
              return;
            }
            SetErrorBar(messages.MSG_TX_FINALIZED);
            setApprove(true);
            axios
              .post(API.API_TXS + `/${txhash}`, {
                txhash,
                username: myaddress,
                typestr: "APPROVE",
                amount: options_arg["ticket"].amount,
                auxdata: options_arg["ticket"].auxdata,
                contractaddress: options_arg["ticket"].operator_contract,
                nettype: net,
              })
              .then(async (resp) => {
                LOGGER("APPROVE RESP", resp);
                SetErrorBar(messages.MSG_TX_REQUEST_SENT);
                query_with_arg({
                  contractaddress: await get_contractaddress(
                    "contract_USDT",
                    contractaddresses
                  ), // .ETH_TESTNET
                  abikind: "ERC20",
                  methodname: "allowance",
                  aargs: [
                    myaddress,
                    await get_contractaddress(
                      "ERC1155[sales]",
                      contractaddresses
                    ),
                  ], // ETH_TESTNET.
                }).then((resp) => {
                  let allowanceineth = getethrep(resp);
                  LOGGER("gCwXF6Jjkh", resp, allowanceineth);
                  setallowanceamount(allowanceineth); //				setallowanceamount ( 100 )
                  setisloader_00(false);
                  if (allowanceineth > 0) {
                    setisallowanceok(false);
                    setisloader_00(false);
                  } else {
                  }
                });
              });
          });
        console.log("txhash_ticket", txhash);
      });
    }
    if (itemdata?.type === "kingkong") {
      let abistr = getabistr_forfunction(options_arg["kingkong"].abistr);
      requesttransaction({
        from: myaddress,
        to: await get_contractaddress("contract_USDT", contractaddresses),
        data: abistr,
        value: "0x00",
      }).then((resp) => {
        if (resp) {
        } else {
          SetErrorBar(messages.MSG_USER_DENIED_TX);
          setisloader_00(false);
          return;
        }

        let txhash = resp;
        SetErrorBar(messages.MSG_TX_REQUEST_SENT);
        awaitTransactionMined
          .awaitTx(web3, txhash, TX_POLL_OPTIONS)
          .then((minedtxreceipt) => {
            LOGGER("minedtxreceipt", minedtxreceipt);
            let { status } = minedtxreceipt;
            if (status) {
            } else {
              SetErrorBar(messages.MSG_TX_FAILED);
              off();
              return;
            }
            SetErrorBar(messages.MSG_TX_FINALIZED);
            setApprove(true);
            axios
              .post(API.API_TXS + `/${txhash}`, {
                txhash,
                username: myaddress,
                typestr: "APPROVE",
                amount: options_arg["kingkong"].amount,
                auxdata: options_arg["kingkong"].auxdata,
                contractaddress: options_arg["kingkong"].operator_contract,
                nettype: net,
              })
              .then(async (resp) => {
                LOGGER("APPROVE RESP", resp);
                SetErrorBar(messages.MSG_TX_REQUEST_SENT);
                query_with_arg({
                  contractaddress: await get_contractaddress(
                    "contract_USDT",
                    contractaddresses
                  ), // .ETH_TESTNET
                  abikind: "ERC20",
                  methodname: "allowance",
                  aargs: [
                    myaddress,
                    await get_contractaddress(
                      "KIP17[sales]",
                      contractaddresses
                    ),
                  ], // ETH_TESTNET.
                }).then((resp) => {
                  let allowanceineth = getethrep(resp);
                  LOGGER("gCwXF6Jjkh", resp, allowanceineth);
                  setallowanceamount(allowanceineth); //				setallowanceamount ( 100 )
                  setisloader_00(false);
                  if (allowanceineth > 0) {
                    setisallowanceok(false);
                    setisloader_00(false);
                  } else {
                  }
                });
              });
          });
        console.log("txhash_kingkong", txhash);
      });
    }
  };

  const onclick_buy = async (_) => {
    setDone(true);
    setisloader_01(true);
    LOGGER("YFVGAF0sBJ");
    let myaddress = getmyaddress();

    if (parseInt(mybalance) >= parseInt(DueAmount)) {
    } else {
      SetErrorBar(messages.MSG_BALANCE_NOT_ENOUGH);
      setDone(false);
      setisloader_01(false);
      return;
    }

    const options_abistr = {
      kingkong: {
        operator_contract: await get_contractaddress(
          "KIP17[sales]",
          contractaddresses
        ),
        typestr: "BUY_NFT_ITEM",
        itemid: itemdata?.itemid,
        tokenid: itemdata?.tokenid,
        amount: 1,
        uuid: itemdata?.uuid,
        username: myaddress,
        buyer: myaddress,
        seller: myaddress,
        saletype: 0,
        price: itemdata?.price,
        type: itemdata?.type,
        nettype: net,
        auxdata: {
          user_action: "BUY_NFT_ITEM",
          contract_type: "KIP17Sale", // .ETH_TESTNET
          contractaddress: await get_contractaddress(
            "KIP17[sales]",
            contractaddresses
          ), // .ETH_TESTNET
          my_address: myaddress,
          authorRoyalty: "0",
          itemid: itemdata?.itemid,
          tokenid: itemdata?.id,
          author: "",
          paymeansaddress: itemdata?.paymeansaddress,
          amount: "1",
          uuid: itemdata?.uuid,
          paymeansname: itemdata?.paymeansname,
          nettype: net,
        },
        abistr: {
          contractaddress: await get_contractaddress(
            "KIP17[sales]",
            contractaddresses
          ),
          abikind: "KIP17Sale",
          methodname: "match_single_simple_legacy",
          // eslint-disable-next-line no-sparse-arrays
          aargs: [
            await get_contractaddress("KIP17", contractaddresses), // target contractaddress
            "288", // author_royalty
            await get_contractaddress(
              "admin_account_address",
              contractaddresses
            ), // admin account address
            `${itemdata?.itemid}`, // itemid
            await get_contractaddress("contract_USDT", contractaddresses), // paymeansaddress
            getweirep("" + itemdata?.price), // amounttopay
            itemdata?.seller, // seller
            userinfo?.refereraddress,
            "12",
            "0",
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
          ],
        },
      },
      ticket: {
<<<<<<< HEAD
        operator_contract: addresses.contract_erc1155_ticket_sales,
        typestr: "BUY_NFT_ITEM",
        amount: itemdata.itembalances?.buyprice,
        auxdata: {
          user_action: "BUY_NFT_ITEM",
          contract_type: "contract_erc1155_ticket_sales", // .ETH_TESTNET
          contractaddress: addresses.item_order_details?.contractaddress, // .ETH_TESTNET
          my_address: myaddress,
          authorRoyalty: "250",
          itemid: itemdata.itembalances?.itemid,
          tokenid: itemdata.itembalances?.id,
          author: "",
          paymeansaddress: itemdata.item_order_details?.paymeansaddress,
          amount: itemdata.itembalances?.buyprice,
          uuid: itemdata.item_order_details?.uuid,
          paymeansname: itemdata.item_order_details?.paymeans,
          nettype: itemdata.item_order_details.nettype,
        },
        abistr: {
          contractaddress: addresses.contract_erc1155_ticket_sales,
          abikind: "TICKETNFT",
          methodname: "stake_featuring_transferfrom",
          // eslint-disable-next-line no-sparse-arrays
          aargs: [
            // addresses.contract_erc1155, // target contractaddress
            // itemdata.itembalances?.itemid, // itemid
            // "1", // amounttomint
            // "0", // decimals
            // "250", // authorroyalty
            // itemdata.itembalances?.username, // authoraddress
            // "1", // amounttobuy
            // getweirep("" + itemdata.itembalances?.buyprice), // amounttopay
            // itemdata.itembalances?.paymeansaddress, // paymeansaddress
            // itemdata.itembalances?.username, // sellersaddress
=======
        operator_contract: await get_contractaddress(
          "ERC1155[sales]",
          contractaddresses
        ),
        typestr: "BUY_NFT_ITEM_TICKET",
        amount: 1,
        uuid: itemdata?.uuid,
        username: myaddress,
        buyer: myaddress,
        seller: myaddress,
        saletype: 0,
        price: itemdata?.price,
        type: itemdata?.type,
        nettype: net,
        auxdata: {
          user_action: "BUY_NFT_ITEM_TICKET",
          contract_type: "ERC1155TicketSale", // .ETH_TESTNET
          contractaddress: await get_contractaddress(
            "ERC1155",
            contractaddresses
          ), // .ETH_TESTNET
          my_address: myaddress,
          authorRoyalty: "0",
          tokenid: itemdata?.tokenid,
          author: "",
          paymeansaddress: itemdata?.paymeansaddress,
          amount: itemdata?.price,
          uuid: itemdata?.uuid,
          paymeansname: itemdata?.paymeans,
          nettype: net,
        },

        abistr: {
          contractaddress: await get_contractaddress(
            "ERC1155[sales]",
            contractaddresses
          ),
          abikind: "ERC1155Sale",
          methodname: "mint_and_match_single_simple_legacy",
          // eslint-disable-next-line no-sparse-arrays
          aargs: [
            await get_contractaddress("ERC1155", contractaddresses), // target contractaddress
            `${itemdata?.id}`,
            "1", // amounttomint
            "0", // _decimals
            "0",
            userinfo?.refereraddress,
            "1",
            getweirep("" + itemdata?.price),
            await get_contractaddress("contract_USDT", contractaddresses), // sellersaddress
            itemdata?.seller,
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
          ],
        },
      },
    };

<<<<<<< HEAD
    let abistr = await getabistr_forfunction(
      options_abistr[itemdata?.itembalances.group_].abistr
    );
    console.log("", abistr);
    requesttransaction({
      from: myaddress,
      to: options_abistr[itemdata?.itembalances.group_].operator_contract,
      data: abistr,
      value: "0x00",
    }).then((resp) => {
      console.log("asdofijdf", resp);
      if (resp) {
      } else {
        console.log("USER DENIED TX");
        SetErrorBar(messages.MSG_USER_DENIED_TX);
        setSpinner(false);
        off();
        return;
      }
      SetErrorBar(messages.MSG_DONE_SENDING_TX_REQ);
      setSpinner(false);
      let txhash = resp;

      console.log("txhash", txhash);
      axios
        .post(API.API_TXS + `/${txhash}`, {
          txhash,
          username: myaddress,
          typestr: options_abistr[itemdata?.itembalances.group_].typestr,
          amount: options_abistr[itemdata?.itembalances.group_].amount,
          auxdata: options_abistr[itemdata?.itembalances.group_].auxdata,
        })
        .then((res) => {
          LOGGER("BUY_NFT_ITEM", resp);
          off();
        })
        .catch((err) => console.log(err));
    });
  };

  useEffect(() => {
    console.log("$itemdata", itemdata);
    setSpinner(true);
    setTimeout(() => {
      queryAllowance();
    }, 1200);
  }, []);

  if (isMobile)
    return (
      <MbidPopupBox>
        <article className="topBar">
          <span className="blank" />
          <p className="title">Place a bid</p>
          <button className="exitBtn" onClick={() => navigate(-1)}>
            <img src={I_x} alt="" />
          </button>
        </article>

        <article className="contBox">
          <div className="itemBox">
            <img src={itemdata?.url} alt="" />
            <p>You are about to purchase a Kingkong #12</p>
          </div>

          <div className="priceBox">
            <div className="inputBox">
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0"
              />
              <span className="unit">USDT</span>
            </div>

            <ul className="priceList">
              <li>
                <p className="key">Your bidding balance</p>
                <p className="value">0 USDT</p>
              </li>
              <li>
                <p className="key">Fee</p>
                <p className="value">0 USDT</p>
              </li>
              <li>
                <p className="key">Total</p>
                <p className="value">0 USDT</p>
              </li>
            </ul>
          </div>

          <div className="confrimBox">
            <p className="explain">
              Placing this bid will start a 24 hour auction for the artwork.
              Once a bid is placed, it cannot be withdrawn.
            </p>
            <button className="confirmBtn" onClick={() => navigate(-1)}>
              Bid amount is required
            </button>
          </div>
        </article>
      </MbidPopupBox>
    );
  else
    return (
      <PbidPopupBox>
        <article className="topBar">
          <span className="blank" />
          <p className="title">{saleStatus == 1 ? "Buy now" : "Place bid"}</p>
=======
    if (itemdata?.type === "ticket") {
      let abistr = await getabistr_forfunction(options_abistr["ticket"].abistr);
      console.log("", abistr);
      const callreqtx = async () => {
        let resp;
        try {
          resp = await requesttransaction({
            from: myaddress,
            to: await get_contractaddress("ERC1155[sales]", contractaddresses), // .ETH_TESTNET
            data: abistr,
          });
          if (resp) {
          } else {
            SetErrorBar(messages.MSG_USER_DENIED_TX);
            setDone(false);
            setisloader_01(false);
            return;
          }
          let txhash = resp;

          /***** */
          awaitTransactionMined
            .awaitTx(web3, txhash, TX_POLL_OPTIONS)
            .then(async (minedtxreceipt) => {
              LOGGER("minedtxreceipt", minedtxreceipt);
              let { status } = minedtxreceipt;
              if (status) {
              } else {
                SetErrorBar(messages.MSG_TX_FAILED);
                off();
                return;
              }
              SetErrorBar(messages.MSG_TX_FINALIZED);
              setDone(false);
              setisloader_01(false);
              off();
              navigate("/market");
              axios
                .post(API.API_TXS + `/${txhash}?nettype=${net}`, {
                  txhash,
                  username: myaddress,
                  itemid: itemdata?.itemid,
                  tokenid: itemdata?.itemid,
                  uuid: itemdata?.uuid,
                  typestr: options_abistr["ticket"].typestr,
                  amount: options_abistr["ticket"].amount,
                  auxdata: options_abistr["ticket"].auxdata,
                  contractaddress: options_abistr["ticket"].operator_contract,
                })
                .then(async (resp) => {
                  LOGGER("", resp);
                  axios.put(API.API_UPDATE_ORDERS, {
                    matcher_contract:
                      options_abistr["ticket"].operator_contract,
                    typestr: options_abistr["ticket"].typestr,
                    amount: options_abistr["ticket"].amount,
                    uuid: itemdata?.uuid,
                    username: myaddress,
                    buyer: options_abistr["ticket"].buyer,
                    paymeansaddress: await get_contractaddress(
                      "contract_USDT",
                      contractaddresses
                    ),
                    paymeansname: "USDT",
                    seller: options_abistr["ticket"].seller,
                    saletype: 0,
                    price: itemdata?.price,
                    nettype: net,
                    auxdata: options_abistr["ticket"].auxdata,
                    type: itemdata?.type,
                    txhash: txhash,
                    tokenid: itemdata?.itemid,
                    oldseller: itemdata?.seller,
                  });
                  SetErrorBar(messages.MSG_TX_REQUEST_SENT);
                });
            });
        } catch (err) {
          SetErrorBar(messages.MSG_USER_DENIED_TX);
          setDone(false);
          setisloader_01(false);
          LOGGER();
        }
      };
      callreqtx();
    }
    if (itemdata?.type === "kingkong") {
      let abistr = await getabistr_forfunction(
        options_abistr["kingkong"].abistr
      );
      console.log("kingkong_abistr", abistr);
      const callreqtx = async () => {
        let resp;
        try {
          resp = await requesttransaction({
            from: myaddress,
            to: await get_contractaddress("KIP17[sales]", contractaddresses), // .ETH_TESTNET
            data: abistr,
          });
          if (resp) {
          } else {
            SetErrorBar(messages.MSG_USER_DENIED_TX);
            setDone(false);
            setisloader_01(false);
            return;
          }
          let txhash = resp;

          /***** */
          awaitTransactionMined
            .awaitTx(web3, txhash, TX_POLL_OPTIONS)
            .then(async (minedtxreceipt) => {
              LOGGER("minedtxreceipt", minedtxreceipt);
              let { status } = minedtxreceipt;
              if (status) {
              } else {
                SetErrorBar(messages.MSG_TX_FAILED);
                off();
                return;
              }

              axios
                .post(API.API_TXS + `/${txhash}?nettype=${net}`, {
                  txhash,
                  username: myaddress,
                  itemid: itemdata?.itemid,
                  tokenid: itemdata?.tokenid,
                  uuid: itemdata?.uuid,
                  typestr: options_abistr["kingkong"].typestr,
                  amount: options_abistr["kingkong"].amount,
                  auxdata: options_abistr["kingkong"].auxdata,
                  contractaddress: options_abistr["kingkong"].operator_contract,
                })
                .then(async (resp) => {
                  LOGGER("", resp);
                  axios.put(API.API_UPDATE_ORDERS, {
                    matcher_contract:
                      options_abistr["kingkong"].operator_contract,
                    typestr: options_abistr["kingkong"].typestr,
                    amount: options_abistr["kingkong"].amount,
                    uuid: itemdata?.uuid,
                    username: myaddress,
                    buyer: options_abistr["kingkong"].buyer,
                    paymeansaddress: await get_contractaddress(
                      "contract_USDT",
                      contractaddresses
                    ),
                    paymeansname: "USDT",
                    seller: options_abistr["kingkong"].seller,
                    saletype: 0,
                    price: itemdata?.price,
                    nettype: net,
                    auxdata: options_abistr["kingkong"].auxdata,
                    type: itemdata?.type,
                    txhash: txhash,
                    tokenid: itemdata?.tokenid,
                    oldseller: itemdata?.seller,
                    itemid: itemdata?.itemid,
                  });
                  SetErrorBar(messages.MSG_TX_REQUEST_SENT);
                });

              SetErrorBar(messages.MSG_TX_FINALIZED);
              setDone(false);
              setisloader_01(false);
              off();
              navigate("/market");
            });
        } catch (err) {
          SetErrorBar(messages.MSG_USER_DENIED_TX);
          setDone(false);
          setisloader_01(false);
          LOGGER();
        }
      };
      callreqtx();
    }
  };

  if (isMobile)
    return (
      <>
        <MstakingPopupBox>
          <article className="topBar">
            <span className="blank" />
            <p className="title">Pay</p>
            <button className="exitBtn" onClick={() => navigate(-1)}>
              <img src={I_x} alt="" />
            </button>
          </article>

          <article className="contBox">
            <div className="infoBox">
              <div className="coinBox">
                <span className="coinImgBox">
                  <img src={I_tIcon} alt="" />
                </span>

                <ul className="priceList">
                  <li className="price">{DueAmount} USDT</li>
                  <li className="exchange">
                    $
                    {+DueAmount && tickerusdt
                      ? putCommaAtPrice(+DueAmount * +tickerusdt)
                      : null}
                  </li>
                </ul>
              </div>

              <ul className="dataList">
                <li>
                  <p className="key">Your address</p>
                  <p className="value">{strDot(myaddress, 6, 0)}</p>
                </li>
                <li>
                  <p className="key">Your USDT balance</p>
                  <p className="value">{mybalance} USDT</p>
                </li>
                <li
                  style={
                    allowanceamount && +allowanceamount
                      ? { display: "block" }
                      : {}
                  }
                >
                  <p className="key">Allowance</p>
                  <p className="value">{allowanceamount} USDT</p>
                </li>
                <li>
                  <p className="key">Your {BASE_CURRENCY} balance</p>
                  <p className="value">
                    {myethbalance} {BASE_CURRENCY}
                  </p>
                </li>
              </ul>
            </div>

            <div className="confirmBox">
              <div className="termBox"></div>

              <button
                className="confirmBtn"
                onClick={() => {
                  onclick_approve();
                }}
                style={approve ? { display: "none" } : { display: "inline" }}
              >
                Approve!
                <img
                  ref={spinnerHref}
                  src={I_spinner}
                  alt=""
                  style={{
                    display: isloader_00 ? "block" : "none",
                    width: "18px",
                    position: "absolute",
                    margin: "0 0 0 64px",
                  }}
                />
              </button>

              <div>
                {" "}
                <button
                  className="confirmBtn"
                  disabled={approve === false ? true : false}
                  onClick={() => {
                    onclick_buy();
                    false && navigate(-1);
                  }}
                >
                  Pay
                </button>
              </div>
            </div>
          </article>
        </MstakingPopupBox>
        <PopupBg blur />
      </>
    );
  else
    return (
      <PstakingPopupBox>
        <article className="topBar">
          <span className="blank" />
          <p className="title">Pay</p>
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
          <button className="exitBtn" onClick={() => off()}>
            <img src={I_x} alt="" />
          </button>
        </article>

        <article className="contBox">
<<<<<<< HEAD
          <div className="itemBox">
            {itemdata?.url ? (
              <img src={itemdata?.url} alt="" />
            ) : (
              <img src={E_staking} alt="" />
            )}
            <p>You are about to purchase a King Kong {itemdata?.titlename}</p>
          </div>

          <div className="priceBox">
            <div className="inputBox">
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0"
              />
              <span className="unit">USDT</span>
            </div>

            <ul className="priceList">
              <li>
                <p className="key">Your bidding balance</p>
                <p className="value">0 USDT</p>
              </li>
              <li>
                <p className="key">Fee</p>
                <p className="value">0 USDT</p>
              </li>
              <li>
                <p className="key">Total</p>
                <p className="value">0 USDT</p>
=======
          <div className="infoBox">
            <div className="coinBox">
              <span className="coinImgBox">
                {itemdata.type === "kingkong" ? (
                  <img src={itemdata?.item.url} alt="" />
                ) : (
                  <img src={E_staking} alt="" />
                )}
              </span>

              <ul className="priceList">
                <li className="price">{DueAmount} USDT</li>
                <li className="exchange">
                  $
                  {+DueAmount && tickerusdt
                    ? putCommaAtPrice(+DueAmount * +tickerusdt)
                    : null}
                </li>
              </ul>
            </div>

            <ul className="dataList">
              <li>
                <p className="key">Your address</p>
                <p className="value">{strDot(myaddress, 8, 0)} </p>
              </li>
              <li>
                <p className="key">Your USDT balance</p>
                <p className="value">{mybalance} USDT</p>
              </li>
              <li>
                <p className="key">Allowance:</p>
                <p className="value">{allowanceamount} USDT</p>
              </li>
              <li>
                <p className="key">Your {BASE_CURRENCY} balance</p>
                <p className="value">
                  {myethbalance} {BASE_CURRENCY}
                </p>
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
              </li>
            </ul>
          </div>

<<<<<<< HEAD
          {saleStatus == 1 ? (
            <div>
              <div className="confrimBox">
                {allowance > 0 ? (
                  <button
                    disabled={spinner}
                    className="confirmBtn"
                    onClick={() => onClickBuy()}
                  >
                    {spinner ? <div id="loading"></div> : "Buy"}
                  </button>
                ) : (
                  <button
                    disabled={spinner}
                    className="confirmBtn"
                    onClick={() => approve()}
                  >
                    {spinner ? <div id="loading"></div> : "Approve"}
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="confrimBox">
              <p className="explain">
                Placing this bid will start a 24 hour auction for the artwork.
                Once a bid is placed, it cannot be withdrawn.
              </p>
              <button className="confirmBtn" onClick={() => off()}>
                Bid amount is required
              </button>
            </div>
          )}
        </article>
      </PbidPopupBox>
    );
}

const MbidPopupBox = styled.section`
  width: 88.9vw;
  max-height: 80vh;
  @media screen and (max-height: 190vw) {
    overflow-y: scroll;
  }

  padding: 0;
  border-radius: 5.55vw;
=======
          <div className="confirmBox">
            <div className="termBox">
              <span className="value"></span>
            </div>

            {!+allowanceamount && (
              <button
                className="confirmBtn"
                onClick={() => {
                  onclick_approve();
                }}
                style={approve ? { display: "none" } : { display: "inline" }}
              >
                Approve
                <img
                  ref={spinnerHref_approve}
                  src={I_spinner}
                  alt=""
                  style={{
                    display: isloader_00 ? "block" : "none",
                    width: "18px",
                    top: "20px",
                    right: "150px",
                    top: "20px",
                    position: "absolute",
                  }}
                />
              </button>
            )}

            <button
              className="confirmBtn"
              disabled={+allowanceamount && done === true}
              onClick={() => {
                onclick_buy();
              }}
            >
              {done ? "Pending" : "Confirm"}
              <img
                ref={spinnerHref}
                src={I_spinner}
                alt=""
                style={{
                  display: isloader_01 ? "block" : "none",
                  width: "18px",
                  right: "140px",
                  position: "absolute",
                }}
              />
            </button>
          </div>
        </article>
      </PstakingPopupBox>
    );
}

const MstakingPopupBox = styled.section`
  width: 88.88vw;
  border-radius: 20px;
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
  background: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
  z-index: 6;
<<<<<<< HEAD

=======
  overflow: hidden;
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
  .topBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
<<<<<<< HEAD
    height: 16.66vw;
    padding: 0 7.22vw;

=======
    height: 15.55vw;
    padding: 0 5.55vw;
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
    .title {
      font-size: 5vw;
      font-weight: 600;
      line-height: 5vw;
    }
<<<<<<< HEAD

    .blank,
    .exitBtn img {
      width: 4.16vw;
    }
  }

  .contBox {
    padding: 7.77vw 5.55vw 9.16vw;

    .itemBox {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4.16vw;
      font-size: 4.44vw;

      img {
        width: 21.11vw;
        height: 21.11vw;
        object-fit: cover;
      }
    }

    .priceBox {
      display: flex;
      flex-direction: column;
      gap: 7.22vw;
      margin: 5.55vw 0 0 0;

      .inputBox {
        display: flex;
        align-items: center;
        width: 100%;
        height: 16.66vw;
        padding: 2.77vw 2.77vw 2.77vw 6.66vw;
        background: #fff;
        border-radius: 3.33vw;
        box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.2);

        * {
          font-weight: 700;
        }

        input {
          flex: 1;
          height: 100%;
          font-size: 6.66vw;
          min-width: 0;

          &::placeholder {
            color: #d9d9d9;
          }
        }

        .unit {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          padding: 0 4.44vw;
          font-size: 6.66vw;
          color: #fff;
          background: #000;
          border-radius: 2.77vw;
        }
      }

      .priceList {
        display: flex;
        flex-direction: column;
        gap: 3.61vw;

        li {
          display: flex;
          justify-content: space-between;
          font-size: 3.88vw;
          font-weight: 500;

          .key {
            color: #7a7a7a;
=======
    .blank,
    .exitBtn img {
      width: 4.44vw;
    }
  }
  .contBox {
    display: flex;
    flex-direction: column;
    gap: 4.44vw;
    padding: 3.61vw 5.55vw 7.77vw 5.55vw;
    * {
      font-family: "Roboto", sans-serif;
    }
    .infoBox {
      display: flex;
      flex-direction: column;
      gap: 4.16vw;
      .coinBox {
        display: flex;
        align-items: center;
        gap: 4.16vw;
        height: 24.44vw;
        padding: 0 4.72vw;
        background: #f6f6f6;
        border-radius: 3.33vw;
        .coinImgBox {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 13.88vw;
          height: 13.88vw;
          padding: 3.61vw;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
          img {
            width: 100%;
            object-fit: contain;
          }
        }
        .priceList {
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 5vw;
          line-height: 5vw;
          .price {
            font-weight: 600;
          }
          .exchange {
            font-weight: 500;
            color: #7a7a7a;
          }
        }
      }
      .dataList {
        display: flex;
        flex-direction: column;
        gap: 3.61vw;
        font-size: 4.44vw;
        font-weight: 500;
        color: #7a7a7a;
        li {
          display: flex;
          flex-direction: column;
          gap: 0.8vw;
          .key {
            color: #aeaeae;
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
          }
        }
      }
    }
<<<<<<< HEAD

    .confrimBox {
      display: flex;
      flex-direction: column;
      gap: 3.33vw;
      margin: 6.66vw 0 0 0;

      .explain {
        font-size: 3.61vw;
        text-align: center;
      }

      .confirmBtn {
        height: 13.88vw;
        font-size: 5vw;
        font-weight: 500;
        font-family: "Poppins", sans-serif;
        color: #fff;
        background: #000;
        border-radius: 3.33vw;

        /* &:disabled {
          color: #7a7a7a;
          background: #e1e1e1;
        } */
=======
    .confirmBox {
      display: flex;
      flex-direction: column;
      gap: 20px;
      .termBox {
        display: flex;
        flex-direction: column;
        gap: 4.44vw;
        * {
          font-size: 4.44vw;
          line-height: 4.44vw;
        }
        .value {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 5vw;
          button {
            display: flex;
            align-items: center;
            gap: 6px;
            .chkBtn {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 6.11vw;
              height: 6.11vw;
              border: 1.4px solid #000;
              border-radius: 1.11vw;
            }
          }
        }
      }
      .confirmBtn {
        height: 13.88vw;
        font-size: 5.55vw;
        font-weight: 500;
        color: #fff;
        background: #000;
        border-radius: 3.33vw;
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
      }
    }
  }
`;

<<<<<<< HEAD
const PbidPopupBox = styled.section`
  width: 540px;
  padding: 0;
=======
const PstakingPopupBox = styled.section`
  width: 540px;
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
  border-radius: 20px;
  background: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
  z-index: 6;
<<<<<<< HEAD

=======
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
  .topBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 72px;
    padding: 0 30px;
<<<<<<< HEAD

=======
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
    .title {
      font-size: 24px;
      font-weight: 600;
      line-height: 24px;
    }
<<<<<<< HEAD

=======
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
    .blank,
    .exitBtn {
      width: 22px;
    }
  }
<<<<<<< HEAD

  .contBox {
    padding: 34px 30px 40px;

    .itemBox {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      font-size: 18px;

      img {
        width: 104px;
        height: 104px;
        object-fit: cover;
      }
    }

    .priceBox {
      display: flex;
      flex-direction: column;
      gap: 24px;
      margin: 60px 0 0 0;

      .inputBox {
        display: flex;
        align-items: center;
        height: 70px;
        padding: 10px 10px 10px 24px;
        box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.2);
        border-radius: 12px;

        input {
          flex: 1;
          font-size: 30px;
          font-weight: 700;
          min-width: 0;

          &::placeholder {
            color: #d9d9d9;
          }
        }

        .unit {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 102px;
          height: 50px;
          font-size: 26px;
          font-weight: 700;
          color: #fff;
          background: #000;
          border-radius: 10px;
        }
      }

      .priceList {
        display: flex;
        flex-direction: column;
        gap: 8px;

        li {
          display: flex;
          justify-content: space-between;
          font-size: 18px;
          font-weight: 500;

          .key {
            color: #7a7a7a;
          }
        }
      }
    }

    .confrimBox {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin: 84px 0 0 0;

      .explain {
        font-size: 18px;
        text-align: center;
      }

      .confirmBtn {
        height: 60px;
        font-size: 20px;
        font-weight: 500;
        font-family: "Poppins", sans-serif;
        color: #fff;
        background: #000;
        border-radius: 12px;

        #loading {
          display: inline-block;
          width: 38px;
          height: 38px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: #fff;
          animation: spin 1s ease-in-out infinite;
          -webkit-animation: spin 1s ease-in-out infinite;
        }

        @keyframes spin {
          to {
            -webkit-transform: rotate(360deg);
          }
        }
        @-webkit-keyframes spin {
          to {
            -webkit-transform: rotate(360deg);
          }
        }

        /* &:disabled {
          color: #7a7a7a;
          background: #e1e1e1;
        } */
=======
  .contBox {
    display: flex;
    flex-direction: column;
    gap: 80px;
    padding: 40px;
    * {
      font-family: "Roboto", sans-serif;
    }
    .infoBox {
      display: flex;
      flex-direction: column;
      gap: 24px;
      .coinBox {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 104px;
        padding: 0 26px;
        background: #f6f6f6;
        border-radius: 12px;
        .coinImgBox {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 68px;
          height: 68px;
          padding: 15px;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
          img {
            width: 100%;
            object-fit: contain;
          }
        }
        .priceList {
          display: flex;
          flex-direction: column;
          text-align: end;
          gap: 6px;
          font-size: 20px;
          line-height: 20px;
          .price {
            font-weight: 600;
          }
          .exchange {
            font-weight: 500;
            color: #7a7a7a;
          }
        }
      }
      .dataList {
        display: flex;
        flex-direction: column;
        gap: 8px;
        font-size: 18px;
        font-weight: 500;
        color: #7a7a7a;
        li {
          display: flex;
          justify-content: space-between;
          flex-wrap: nowrap;
        }
      }
    }
    .confirmBox {
      display: flex;
      flex-direction: column;
      gap: 20px;
      .termBox {
        display: flex;
        align-items: center;
        gap: 10px;
        * {
          font-size: 18px;
          line-height: 18px;
        }
        .value {
          display: flex;
          gap: 18px;
          align-items: center;
          button {
            display: flex;
            align-items: center;
            gap: 6px;
            .chkBtn {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 22px;
              height: 22px;
              border: 1.4px solid #000;
              border-radius: 4px;
            }
          }
        }
      }
      .confirmBtn {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 60px;
        font-size: 20px;
        font-weight: 500;
        color: #fff;
        background: #000;
        border-radius: 12px;
        position: relative;
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
      }
    }
  }
`;
