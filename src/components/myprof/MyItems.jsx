import styled from "styled-components";
import I_heartO from "../../img/icon/I_heartO.svg";
import I_tIcon from "../../img/icon/I_tIcon.png";
import I_dnArw from "../../img/icon/I_dnArw.svg";
<<<<<<< HEAD
import E_item2 from "../../img/mypage/E_item2.png";
import E_staking from "../../img/common/E_staking.png";
import E_item3 from "../../img/mypage/E_item3.png";
import { putCommaAtPrice, strDot } from "../../util/Util";
=======
import E_staking from "../../img/common/E_staking.png";
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
import { useRef, useEffect, useState } from "react";
import PopupBg from "../../components/PopupBg";
import { D_sortList } from "../../data/DmyPage";
import { useNavigate } from "react-router-dom";
import SelectPopup from "../SelectPopup";
import { useSelector } from "react-redux";
import axios from "axios";
import { API } from "../../configs/api";
<<<<<<< HEAD
import { query_with_arg } from "../../util/contract-calls";
import { addresses } from "../../configs/addresses";
import { TIME_FETCH_MYADDRESS_DEF } from "../../configs/configs";
import { getmyaddress, LOGGER } from "../../util/common";
import { web3 } from "../../configs/configweb3-bscmainnet";
import { abi } from "../../contracts/abi-staker-20220414";
// import BidPopup from "../BidPopup";
import StakingPopup from "../StakingPopup";
import moment from "moment";
import PayPopup from "../PayPopup";
import { net } from "../../configs/net";
import { nettype } from "../../configs/configweb3-ropsten";

const MAP_NETTYPE_SCAN = {
  ETH_TESTNET: "https://etherscan.io",
  BSC_MAINNET: "https://bscscan.com",
};
=======
import {
  query_with_arg,
  getabistr_forfunction,
} from "../../util/contract-calls";
import { addresses } from "../../configs/addresses";
import {
  TIME_FETCH_MYADDRESS_DEF,
  TX_POLL_OPTIONS,
} from "../../configs/configs";
import { getmyaddress, LOGGER } from "../../util/common";
import { web3 } from "../../configs/configweb3";
import moment from "moment";
import PayPopup from "../PayPopup";
import { net } from "../../configs/net";
import SetErrorBar from "../../util/SetErrorBar";
import { requesttransaction } from "../../services/metamask";
import awaitTransactionMined from "await-transaction-mined";
import I_spinner from "../../img/icon/I_spinner.svg";
import { get_contractaddress } from "../../util/Util";

>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
export default function MyItems() {
  const navigate = useNavigate();
  const sortBtnRef = useRef();
  const isMobile = useSelector((state) => state.common.isMobile);
  const [filter, setFilter] = useState(0);
  const [sortOpt, setSortOpt] = useState(D_sortList[1]);
  const [sortPopup, setSortPopup] = useState(false);
  const [isstaked, setisstaked] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [receivables, setReceivables] = useState();
<<<<<<< HEAD

  let [itemData, setItemData] = useState([]);
  let [itemBalData, setItemBalData] = useState([]);

  let [txscanurl, settxscanurl] = useState();

=======
  const [tokenId, setTokenId] = useState();
  let [itemData, setItemData] = useState([]);
  let [itemBalData, setItemBalData] = useState([]);
  let [kingKongItem, setKingKongItem] = useState([]);
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
  let [userinfo, setuserinfo] = useState(null);
  const [getTickTimer, setGetTickTimer] = useState();
  const [tickTimer, setTickTimer] = useState();
  const [ticketInfo, setTickInfo] = useState();
<<<<<<< HEAD
  const [itemDataInfo, setItemDataInfo] = useState();
  const [circulations, setCirculations] = useState([]);
  console.log("itemDataInfo", itemDataInfo);

  const fetchdata = async (_) => {
    let myaddress = getmyaddress();

    LOGGER("myaddress", myaddress);
    axios.get(API.API_USERINFO + `/${myaddress}?nettype=${net}`).then((resp) => {
      if (resp.data && resp.data.respdata) {
        let { respdata } = resp.data;
        LOGGER("myticket", resp.data);
        setuserinfo(respdata);
      }
    });
=======
  const [circulations, setCirculations] = useState([]);
  let [spinner, setSpinner] = useState(false);
  const [isApprovedForAll, setIsApprovedForAll] = useState(false);
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

  const fetchdata = async (_) => {
    // setTimeout((_) => {
    let myaddress = getmyaddress();
    LOGGER("@myaddress", myaddress);
    axios
      .get(API.API_USERINFO + `/${myaddress}?nettype=${net}`)
      .then((resp) => {
        if (resp.data && resp.data.respdata) {
          let { respdata } = resp.data;
          LOGGER("myticket", resp.data);
          setuserinfo(respdata);
        }
      });
    axios
      .get(
        API.API_GET_KING_KONG_ITEM + `/${myaddress}/0/100/id/ASC?nettype=${net}`
      )
      .then((resp) => {
        LOGGER("Buy my item", resp.data);
        let { status, list, payload } = resp.data;
        if (status == "OK") {
          // setKingKongItem(list);
        }
      });
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027

    axios
      .get(API.API_RECEIVABLES + `/${myaddress}?nettype=${net}`)
      .then((res) => {
        let { list } = res.data;
        setItemData(list);
        LOGGER("receivables", list);
      })
      .catch((err) => console.log(err));

<<<<<<< HEAD
    axios.get(API.API_ITEMBALANCES + `/${myaddress}?nettype=${net}`).then((res) => {
      let { list, status } = res.data;
      LOGGER("getITEmBALANCES", res.data);
      if (status === "OK" && list?.length) {
        setItemBalData(list);
        LOGGER("ITEMBALANCES", list);
      }
      axios //      .get("http://3.35.1 17.87:34705/auction/list", { params: { limit: 8 } })
        .get(API.API_GET_CIRCULATIONS_ITEM + `?nettype=${net}`)
        .then((resp) => {
          LOGGER("circulations", resp.data);
          let { status, list } = resp.data;
          if (status == "OK") {
            setCirculations(resp.data.list);
          }
          //        console.log(res.data);
          //      setMoreCollection(res.data);
        });
    });

    //true
    true &&
=======
    axios
      .get(API.API_ITEMBALANCES + `/${myaddress}?nettype=${net}`)
      .then((res) => {
        let { list, status } = res.data;
        LOGGER("@ITEMBALANCES", res.data);
        if (status === "OK" && list && list.length > 0) {
          setItemBalData(list);
        }
        axios //
          .get(API.API_GET_CIRCULATIONS_ITEM + `?nettype=${net}`)
          .then((resp) => {
            LOGGER("circulations", resp.data);
            let { status, list } = resp.data;
            if (status == "OK") {
              setCirculations(resp.data.list);
            }
          });

        //        let myaddress = getmyaddress();
        axios
          .get(API.API_GET_TICK_INFO + `/${myaddress}?nettype=${net}`)
          .then((resp) => {
            let { status, respdata } = resp.data;
            LOGGER(`@API_GET_TICK_INFO`, respdata);
            if (status == "OK" && respdata !== null) {
              setTickInfo(respdata);
            }
          });
      });
  };

  const openModal = () => {
    setIsOpen((prevState) => !prevState);
  };

  //Approve
  const on_click_approve = async (item) => {
    setSpinner(true);
    let myaddress = getmyaddress();
    if (myaddress) {
    } else {
      // SetErrorBar("Please connect wallet!");
      return;
    }

    const abistring = getabistr_forfunction({
      contractaddress: await get_contractaddress("KIP17", contractaddresses),
      abikind: "KIP17",
      methodname: "setApprovalForAll",
      aargs: [
        await get_contractaddress("KIP17[staking]", contractaddresses),
        true,
      ],
    });
    requesttransaction({
      from: myaddress,
      to: await get_contractaddress("KIP17", contractaddresses),
      data: abistring,
      value: "0x00",
    }).then((resp) => {
      console.log("stake", resp);
      if (resp) {
      } else {
        SetErrorBar("User denied");
        setSpinner(false);
        return;
      }

      let txhash;
      txhash = resp;

      awaitTransactionMined
        .awaitTx(web3, txhash, TX_POLL_OPTIONS)
        .then(async (minedtxreceipt) => {
          console.log("minedtxreceipt", minedtxreceipt);
          if (minedtxreceipt.status === true) {
            axios
              .post(API.API_TXS + `/${txhash}`, {
                txhash: txhash,
                username: myaddress,
                typestr: "STAKEAPPROVE",
                auxdata: {
                  user_action: "approve",
                  contract_type: "KIP17", // .ETH_TESTNET
                  contract_address: await get_contractaddress(
                    "KIP17",
                    contractaddresses
                  ), // .ETH_TESTNET
                  to_token_contract: await get_contractaddress(
                    "KIP17[staking]",
                    contractaddresses
                  ),
                  my_address: myaddress,
                  nettype: net,
                },
              })
              .then((res) => {
                SetErrorBar("Approved");
                setSpinner(false);
                setIsApprovedForAll(true);
              })
              .catch((err) => console.log(err));
          } else {
            SetErrorBar("Fail Approve");
          }
        });
    });
  };

  //stake
  const stake_for_diposit = async (item) => {
    if (item == null) {
      SetErrorBar("You have to select tokens first!");
      return;
    }

    let myaddress = getmyaddress();
    if (myaddress) {
    } else {
      return;
    }
    setSpinner(true);

    console.log("tostringitems", item);
    let abistring;
    if (item !== null) {
      abistring = getabistr_forfunction({
        contractaddress: await get_contractaddress(
          "KIP17[staking]",
          contractaddresses
        ),
        abikind: "KIP17Stake",
        methodname: "mint_deposit",
        aargs: [
          await get_contractaddress("KIP17", contractaddresses),
          item?.itemid,
          0,
        ],
      });
    }
    console.log(abistring);

    requesttransaction({
      from: myaddress,
      to: await get_contractaddress("KIP17[staking]", contractaddresses),
      data: abistring,
      value: "0x00",
    }).then((resp) => {
      console.log("$EMPLOY_res", resp);
      if (resp) {
      } else {
        SetErrorBar("User denied");
        setSpinner(false);
      }

      let txhash;
      txhash = resp;

      awaitTransactionMined
        .awaitTx(web3, txhash, TX_POLL_OPTIONS)
        .then(async (minedtxreceipt) => {
          if (minedtxreceipt.status === true) {
            axios
              .post(API.API_TXS + `/${txhash}`, {
                txhash: txhash,
                username: myaddress,
                typestr: "KING_KONG_STAKING",
                auxdata: {
                  user_action: "KING_KONG_STAKING",
                  contract_type: "KING_KONG_STAKING", // .ETH_TESTNET
                  contract_address: await get_contractaddress(
                    "KIP17[staking]",
                    contractaddresses
                  ), // .ETH_TESTNET
                  to_token_contract: await get_contractaddress(
                    "KIP17",
                    contractaddresses
                  ),
                  my_address: myaddress,
                  tokenIds: item?.id,
                  itemIds: "itemid",
                  nettype: net,
                },
              })
              .then((res) => {
                axios
                  .put(API.API_UPDATE_KING_KONG_STAKE, {
                    itemid: item?.itemid,
                    nettype: net,
                    isstaked: 1,
                  })
                  .then((res) => {
                    setSpinner(false);
                    axios
                      .get(
                        API.API_GET_KING_KONG_ITEM +
                          `/${myaddress}/0/100/id/ASC?nettype=${net}`
                      )
                      .then((resp) => {
                        LOGGER("Buy my item", resp.data);
                        let { status, list, payload } = resp.data;
                        if (status == "OK") {
                          // setKingKongItem(list);
                        }
                      });
                    SetErrorBar("Success Staking");
                    console.log("minedtxreceipt", minedtxreceipt);
                  });
              })
              .catch((err) => console.log(err));
          } else {
            setSpinner(false);
            SetErrorBar("Fail Stake");
          }
        });
    });
  };

  //withdraw
  const stake_for_withdraw = async (item) => {
    console.log("withdraw", item);
    if (item === null) {
      SetErrorBar("You have to select tokens first!");
      return;
    }
    let myaddress = getmyaddress();
    if (myaddress) {
    } else {
      return;
    }
    setSpinner(true);
    const abistring = getabistr_forfunction({
      contractaddress: await get_contractaddress(
        "KIP17[staking]",
        contractaddresses
      ),
      abikind: "KIP17Stake",
      methodname: "withdraw",
      aargs: [
        await get_contractaddress("KIP17", contractaddresses),
        item?.itemid,
        myaddress,
      ],
    });

    requesttransaction({
      from: myaddress,
      to: await get_contractaddress("KIP17", contractaddresses),
      data: abistring,
      value: "0x00",
    }).then((resp) => {
      console.log("stake", resp);
      let txhash;
      txhash = resp;

      awaitTransactionMined
        .awaitTx(web3, txhash, TX_POLL_OPTIONS)
        .then(async (minedtxreceipt) => {
          console.log("minedtxreceipt", minedtxreceipt);
          if (minedtxreceipt.status === true) {
            axios
              .post(API.API_TXS + `/${txhash}`, {
                txhash: txhash,
                username: myaddress,
                typestr: "KING_KONG_UNSTAKE",
                auxdata: {
                  user_action: "KING_KONG_UNSTAKE",
                  contract_type: "KING_KONG_UNSTAKE", // .ETH_TESTNET
                  contract_address: await get_contractaddress(
                    "KIP17[staking]",
                    contractaddresses
                  ), // .ETH_TESTNET
                  to_token_contract: await get_contractaddress(
                    "KIP17",
                    contractaddresses
                  ),
                  my_address: myaddress,
                  tokenIds: itemData?.tokenid,
                  itemIds: item?.itemid,
                  nettype: net,
                },
              })
              .then((res) => {
                axios
                  .put(API.API_UPDATE_KING_KONG_STAKE, {
                    itemid: item?.itemid,
                    nettype: net,
                    isstaked: 0,
                  })
                  .then((res) => {
                    axios
                      .get(
                        API.API_GET_KING_KONG_ITEM +
                          `/${myaddress}/0/100/id/ASC?nettype=${net}`
                      )
                      .then((resp) => {
                        LOGGER("Buy my item", resp.data);
                        let { status, list, payload } = resp.data;
                        if (status == "OK") {
                          // setKingKongItem(list);
                        }
                      });
                  });
                console.log("onclickwithdraw reported!", res);
              })
              .catch((err) => console.log(err));
          } else {
            setSpinner(false);
            SetErrorBar("Fail Unstake");
          }
        });
    });
  };

  useEffect(() => {
    let myaddress = getmyaddress();
    axios
      .get(API.API_LOGSTAKES + `/${myaddress}?nettype=${net}`)
      .then((resp) => {
        LOGGER("API_LOGSTAKES", resp.data);
        let { status, respdata } = resp.data;
        if (status == "OK") {
          setGetTickTimer(respdata?.createdat);
          setTickTimer("2022-08-04");
        }
      });
  }, [getTickTimer]);

  useEffect(() => {
    query_contractaddresses().then(async (resp) => {
      let myaddress = getmyaddress();
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
      query_with_arg({
        contractaddress: addresses.contract_ticketnft, // ETH_TESTNET.
        abikind: "TICKETNFT",
        methodname: "_balance_user_itemhash",
        aargs: [myaddress], // ETH_TESTNET.
      }).then(async (resp) => {
        LOGGER("tickeinfo", resp);
        let myitemhash = resp;
        let mytokenid;
        try {
          mytokenid = await query_with_arg({
            contractaddress: addresses.contract_ticketnft,
            abikind: "TICKETNFT",
            methodname: "_itemhash_tokenid",
            aargs: [myitemhash],
          });
          LOGGER("GEVKU97nIv", mytokenid);
<<<<<<< HEAD
=======
          setTokenId(mytokenid);
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
        } catch (err) {
          LOGGER(err);
          mytokenid = null;
          return;
        }
      });
<<<<<<< HEAD
  };

  console.log("asdiofjaosdijfasdf", itemData);

  // useEffect(() => {
  //   setInterval(() => {
  //     getTimeMoment && setTimeMoment(moment(moment.unix(getTimeMoment) - moment()));
  //   }, 1000);
  // }, [getTimeMoment]);

  // useEffect(() => {
  //   setInterval(() => {
  //     gettimeReceivables && setTimeReceivables(moment(moment.unix(gettimeReceivables) - moment()));
  //   }, 1000);
  // }, [gettimeReceivables]);

  useEffect(() => {
    let myaddress = getmyaddress();
    axios.get(API.API_LOGSTAKES + `/${myaddress}?nettype=${net}`).then((resp) => {
      LOGGER("API_LOGSTAKES", resp.data);
      let { status, respdata } = resp.data;
      if (status == "OK") {
        setGetTickTimer(respdata?.createdat);
      }
    });

    // setInterval(() => {
    //   getTickTimer && setTickTimer(moment(getTickTimer).add(90, "days") - moment());
    // }, 1000);
  }, [getTickTimer]);

  useEffect(
    (_) => {
      setTimeout((_) => {
        fetchdata();
      }, 1000);
    },
    [isOpen]
  );
  const date = moment().unix();

  const openModal = () => {
    setIsOpen((prevState) => !prevState);
  };

  useEffect(() => {
    let myaddress = getmyaddress();
    axios.get(API.API_GET_TICK_INFO + `/${myaddress}?nettype=${net}`).then((resp) => {
      LOGGER("API_ticketInfo", resp.data);

      let { status, respdata } = resp.data;
      if (status == "OK" && respdata !== null) {
        setTickInfo(respdata);
      }
    });
  }, []);
=======

      const queryApproval = async () => {
        setSpinner(true);
        let myaddress = getmyaddress();
        if (myaddress) {
        } else {
          return;
        }
        query_with_arg({
          contractaddress: await get_contractaddress("KIP17", resp),
          abikind: "KIP17",
          methodname: "isApprovedForAll",
          aargs: [myaddress, await get_contractaddress("KIP17[staking]", resp)],
        }).then((res) => {
          console.log("approval", res);
          setIsApprovedForAll(res);
          setSpinner(false);
        });
      };
      fetchdata();
      queryApproval();
    });
  }, [isOpen, isApprovedForAll]);
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027

  if (isMobile)
    return (
      <MmyItemsBox>
        <div className="topBar">
          <div className="sortBox">
            <button
              className="sortBtn"
              ref={sortBtnRef}
<<<<<<< HEAD
              onFocus={() => (sortBtnRef.current.style.border = "3px solid #000")}
              onBlur={() => (sortBtnRef.current.style.border = "1px solid #d9d9d9")}
=======
              onFocus={() =>
                (sortBtnRef.current.style.border = "3px solid #000")
              }
              onBlur={() =>
                (sortBtnRef.current.style.border = "1px solid #d9d9d9")
              }
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
              onClick={() => setSortPopup(true)}
            >
              <p>{sortOpt}</p>
              <img src={I_dnArw} alt="" />
            </button>

            {sortPopup && (
              <>
<<<<<<< HEAD
                <SelectPopup off={setSortPopup} dataList={D_sortList} select={sortOpt} setFunc={setSortOpt} />
=======
                <SelectPopup
                  off={setSortPopup}
                  dataList={D_sortList}
                  select={sortOpt}
                  setFunc={setSortOpt}
                />
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027

                <PopupBg off={setSortPopup} />
              </>
            )}
          </div>

          <ul className="filterList">
            {filterList.map((cont, index) => (
<<<<<<< HEAD
              <li key={index} className={filter === index ? "on" : ""} onClick={() => setFilter(index)}>
=======
              <li
                key={index}
                className={filter === index ? "on" : ""}
                onClick={() => setFilter(index)}
              >
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
                {cont}
              </li>
            ))}
          </ul>
        </div>

        <ul className="itemList">
<<<<<<< HEAD
          <li className="stakingBox" style={isstaked ? {} : { display: "none" }}>
=======
          <li
            className="stakingBox"
            style={isstaked ? {} : { display: "none" }}
          >
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
            <div className="imgBox">
              <div className="topBar">
                <img className="itemImg" src={E_staking} alt="" />
                <span className="profImg">
                  <img src={I_tIcon} alt="" />
                </span>

                <span className="profName">
                  <strong>LUCKY TICKET</strong>
                </span>
              </div>
            </div>
            {ticketInfo == null && (
              <div className="infoBox">
                <div className="titleBox">
                  <strong className="title">
                    Need a buy <hr />
                    "Lucky Ticket"
                  </strong>
                </div>
                <div className="saleBox"></div>

<<<<<<< HEAD
                <button className="actionBtn" onClick={() => navigate("/staking")}>
=======
                <button className="actionBtn" onClick={() => navigate("/")}>
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
                  Buy
                </button>

                <p className="description">
<<<<<<< HEAD
                  The NFT purchased by participating in the subscription auction generates 12% of profits after 3 days
                  and is sold random. In addition, the results are announced at 9:00 AM, and the transaction is
                  completed from 9:00 AM to 21:00 PM. If the transaction is not completed within time, all transactions
                  in your account will be suspended. It operates normally after applying a penalty of 10% of the winning
                  bid amount.
=======
                  The NFT purchased by participating in the subscription auction
                  generates 12% of profits after 3 days and is sold random. In
                  addition, the results are announced at 9:00 AM, and the
                  transaction is completed from 9:00 AM to 21:00 PM. If the
                  transaction is not completed within time, all transactions in
                  your account will be suspended. It operates normally after
                  applying a penalty of 10% of the winning bid amount.
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
                </p>
              </div>
            )}
            {ticketInfo && (
              <div className="infoBox">
                <div className="titleBox">
<<<<<<< HEAD
                  <strong className="title">Lucky Ticket #{ticketInfo.id}</strong>
=======
                  <strong className="title">
                    Lucky Ticket #{ticketInfo.id}
                  </strong>
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
                </div>

                <div className="ownedBox">
                  <p className="key">Owned by</p>
                  <p className="value">@{userinfo?.nickname}</p>
                </div>

                <div className="saleBox">
                  <div className="key">
                    <p className="price">Current price</p>
                    <p className="time">Bought</p>
                  </div>

                  <div className="value">
                    <strong className="price">100 USDT</strong>
<<<<<<< HEAD

                    {/* <ul className="timeList">
                      <li>{moment(tickTimer).days()}일</li>
                      <li>{moment(tickTimer).hours()}시간</li>
                      <li>{moment(tickTimer).month()}분</li>
                      <li>{moment(tickTimer).second()}초</li>
                    </ul> */}
=======
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
                  </div>

                  <ul className="priceBox">
                    <li>
                      <p className="key">Current price</p>
                      <p className="value">100 USDT</p>
                    </li>
<<<<<<< HEAD
                    {/* <li>
                    <p className="key">Transaction price</p>
                    <p className="value">100 USDT</p>
                  </li> */}
                    <li
                      onClick={(evt) => {
                        window.open(txscanurl);
                      }}
                    >
                      {/* <p className="key">TxHash</p>
                    <p className="value">{txhash}</p> */}
                    </li>
=======
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
                  </ul>
                </div>

                <button
                  className="actionBtn"
                  disabled={tickTimer !== 0 ? true : false}
                  onClick={() => navigate("/resell")}
                >
                  Purchased
                </button>

                <p className="description">
<<<<<<< HEAD
                  The NFT purchased by participating in the subscription auction generates 12% of profits after 3 days
                  and is sold random. In addition, the results are announced at 9:00 AM, and the transaction is
                  completed from 9:00 AM to 21:00 PM. If the transaction is not completed within time, all transactions
                  in your account will be suspended. It operates normally after applying a penalty of 10% of the winning
                  bid amount.
=======
                  The NFT purchased by participating in the subscription auction
                  generates 12% of profits after 3 days and is sold random. In
                  addition, the results are announced at 9:00 AM, and the
                  transaction is completed from 9:00 AM to 21:00 PM. If the
                  transaction is not completed within time, all transactions in
                  your account will be suspended. It operates normally after
                  applying a penalty of 10% of the winning bid amount.
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
                </p>
              </div>
            )}
            {ticketInfo == null && (
              <div className="infoBox">
                <div className="titleBox">
                  <strong className="title">
                    Need a buy <hr />
                    "Lucky Ticket"
                  </strong>
                </div>
                <div className="saleBox"></div>

<<<<<<< HEAD
                <button className="actionBtn" onClick={() => navigate("/staking")}>
=======
                <button className="actionBtn" onClick={() => navigate("/")}>
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
                  Buy
                </button>

                <p className="description">
<<<<<<< HEAD
                  The NFT purchased by participating in the subscription auction generates 12% of profits after 3 days
                  and is sold random. In addition, the results are announced at 9:00 AM, and the transaction is
                  completed from 9:00 AM to 21:00 PM. If the transaction is not completed within time, all transactions
                  in your account will be suspended. It operates normally after applying a penalty of 10% of the winning
                  bid amount.
=======
                  The NFT purchased by participating in the subscription auction
                  generates 12% of profits after 3 days and is sold random. In
                  addition, the results are announced at 9:00 AM, and the
                  transaction is completed from 9:00 AM to 21:00 PM. If the
                  transaction is not completed within time, all transactions in
                  your account will be suspended. It operates normally after
                  applying a penalty of 10% of the winning bid amount.
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
                </p>
              </div>
            )}
          </li>
          {itemData &&
            itemData?.length !== 0 &&
            itemData.map((item, index) => {
              return (
                <li className="swapBox">
                  <div className="imgBox">
                    <img className="itemImg" src={item.itemdata.url} alt="" />

                    <div className="topBar">
                      <button className="likeBtn" onClick={() => {}}>
                        <img src={I_heartO} alt="" />
                        <p>22</p>
                      </button>
                    </div>
                  </div>

                  <div className="infoBox">
                    <div className="titleBox">
<<<<<<< HEAD
                      <strong className="title">{item.itemdata?.titlename}</strong>
=======
                      <strong className="title">
                        {item.itemdata?.titlename}
                      </strong>
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
                    </div>

                    <div className="ownedBox">
                      <p className="key">Owned by</p>
                      <p className="value">@{item.username}</p>
                    </div>
                    <div className="ownedBox">
                      <p className="key">Round Number</p>
                      <p className="value">{item.roundnumber} Round</p>
                    </div>

<<<<<<< HEAD
                    <div className="saleBox">
                      {/* <div className="time">
                        <p className="key">Ending in</p>
                        <ul className="timeList">
                          <li>{timeReceivables && timeReceivables.days()}일</li>
                          <li>{timeReceivables && timeReceivables.hour()}시간</li>
                          <li>{timeReceivables && timeReceivables.minutes()}분</li>
                          <li>{timeReceivables && timeReceivables.second()}초</li>
                        </ul>
                      </div> */}
                    </div>
=======
                    <div className="saleBox"></div>
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027

                    <ul className="priceBox">
                      <li>
                        <p className="key">Current price</p>
<<<<<<< HEAD
                        <p className="value">{Math.ceil(item.amount * 100) / 100} USDT</p>
=======
                        <p className="value">
                          {Math.ceil(item.amount * 100) / 100} USDT
                        </p>
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
                      </li>
                    </ul>

                    <button
                      className="actionBtn"
                      onClick={() => {
                        setReceivables(item);
                        openModal();
                      }}
                    >
                      Pay
                    </button>

                    <p className="description">
<<<<<<< HEAD
                      The NFT purchased by participating in the subscription auction generates 12% of profits after 3
                      days and is sold random. In addition, the results are announced at 9:00 AM, and the transaction is
                      completed from 9:00 AM to 21:00 PM. If the transaction is not completed within time, all
                      transactions in your account will be suspended. It operates normally after applying a penalty of
                      10% of the winning bid amount.
=======
                      The NFT purchased by participating in the subscription
                      auction generates 12% of profits after 3 days and is sold
                      random. In addition, the results are announced at 9:00 AM,
                      and the transaction is completed from 9:00 AM to 21:00 PM.
                      If the transaction is not completed within time, all
                      transactions in your account will be suspended. It
                      operates normally after applying a penalty of 10% of the
                      winning bid amount.
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
                    </p>
                  </div>
                </li>
              );
            })}
          {itemBalData.length !== 0 &&
            itemBalData.map((item, index) => (
              <li className="sellBox">
                <div className="imgBoxBal">
                  <img className="itemImgBal" src={item.itemdata.url} alt="" />

                  <div className="topBarBal">
                    <button className="likeBtnBal" onClick={() => {}}>
                      <img src={I_heartO} alt="" />
                      <p>22</p>
                    </button>
                  </div>
                </div>

                <div className="infoBox">
                  <div className="titleBox">
                    <strong className="title">{item.itemdata.titlename}</strong>
                  </div>

                  <div className="ownedBox">
                    <p className="key">Owned by</p>
                    <p className="value">@{item.username}</p>
                  </div>

                  <div className="saleBox">
                    <div className="price">
                      {/* 
<<<<<<< HEAD
                        <strong className="value">{putCommaAtPrice(item.buyprice)} USDT</strong> */}
=======
                        <strong className="value">{putCommaAtPrice(item.amount)} USDT</strong> */}
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
                      <strong className="value"></strong>
                    </div>
                    {/* <div className="time">
                      <p className="key">Ending in</p>
                      <ul className="timeList">
                        <li>{timeMoment && timeMoment.day()}일</li>
                        <li>{timeMoment && timeMoment.hour()}시간</li>
                        <li>{timeMoment && timeMoment.minutes()}분</li>
                        <li>{timeMoment && timeMoment.second()}초</li>
                      </ul>
                    </div> */}
                  </div>

                  <ul className="priceBox">
                    <li>
                      <p className="key">Current price</p>
                      {circulations.map((itm, i) => {
                        if (item.itemid === itm.itemid)
<<<<<<< HEAD
                          return <p className="value"> {Math.ceil(itm.price * 100) / 100} USDT</p>;
=======
                          return (
                            <p className="value">
                              {" "}
                              {parseInt(item && item.amount).toFixed(2)} USDT
                            </p>
                          );
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
                      })}
                    </li>
                  </ul>
                  <p className="description">
<<<<<<< HEAD
                    King Kong NFT can be staking or sold to Marketplace at a price of up to 25%. If you steaking, you
                    will get 30% annual NIP COIN reward.
=======
                    King Kong NFT can be staking or sold to Marketplace at a
                    price of up to 25%. If you steaking, you will get 30% annual
                    NIP COIN reward.
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
                  </p>
                </div>
              </li>
            ))}
          {isOpen && <PayPopup off={openModal} receivables={receivables} />}
        </ul>
      </MmyItemsBox>
    );
  else
    return (
      <PmyItemsBox>
        <div className="topBar">
          <ul className="filterList">
            {filterList.map((cont, index) => (
<<<<<<< HEAD
              <li key={index} className={filter === index ? "on" : ""} onClick={() => setFilter(index)}>
=======
              <li
                key={index}
                className={filter === index ? "on" : ""}
                onClick={() => setFilter(index)}
              >
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
                {cont}
              </li>
            ))}
          </ul>

          <div className="sortBox">
            <button
              className="sortBtn"
              ref={sortBtnRef}
<<<<<<< HEAD
              onFocus={() => (sortBtnRef.current.style.border = "3px solid #000")}
              onBlur={() => (sortBtnRef.current.style.border = "1px solid #d9d9d9")}
=======
              onFocus={() =>
                (sortBtnRef.current.style.border = "3px solid #000")
              }
              onBlur={() =>
                (sortBtnRef.current.style.border = "1px solid #d9d9d9")
              }
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
              onClick={() => setSortPopup(true)}
            >
              <p>{sortOpt}</p>
              <img src={I_dnArw} alt="" />
            </button>

            {sortPopup && (
              <>
<<<<<<< HEAD
                <SelectPopup off={setSortPopup} dataList={D_sortList} select={sortOpt} setFunc={setSortOpt} />
=======
                <SelectPopup
                  off={setSortPopup}
                  dataList={D_sortList}
                  select={sortOpt}
                  setFunc={setSortOpt}
                />
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027

                <PopupBg off={setSortPopup} />
              </>
            )}
          </div>
        </div>

        <ul className="itemList">
<<<<<<< HEAD
          <li className="stakingBox" style={isstaked ? {} : { display: "none" }}>
=======
          <li
            className="stakingBox"
            style={isstaked ? {} : { display: "none" }}
          >
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
            <div className="imgBox">
              <div className="topBar">
                <img className="itemImg" src={E_staking} alt="" />
                <span className="profImg">
                  <img src={I_tIcon} alt="" />
                </span>

                <span className="profName">
                  <strong>LUCKY TICKET</strong>
                </span>
              </div>
            </div>
            {ticketInfo == null && (
              <div className="infoBox">
                <div className="titleBox">
                  <strong className="title">
<<<<<<< HEAD
                    Need a buy <hr />
=======
                    Need to buy <hr />
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
                    "Lucky Ticket"
                  </strong>
                </div>
                <div className="saleBox"></div>

<<<<<<< HEAD
                <button className="actionBtn" onClick={() => navigate("/staking")}>
=======
                <button className="actionBtn" onClick={() => navigate("/")}>
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
                  Buy
                </button>

                <p className="description">
<<<<<<< HEAD
                  The NFT purchased by participating in the subscription auction generates 12% of profits after 3 days
                  and is sold random. In addition, the results are announced at 9:00 AM, and the transaction is
                  completed from 9:00 AM to 21:00 PM. If the transaction is not completed within time, all transactions
                  in your account will be suspended. It operates normally after applying a penalty of 10% of the winning
                  bid amount.
=======
                  The NFT purchased by participating in the subscription auction
                  generates 12% of profits after 3 days and is sold random. In
                  addition, the results are announced at 9:00 AM, and the
                  transaction is completed from 9:00 AM to 21:00 PM. If the
                  transaction is not completed within time, all transactions in
                  your account will be suspended. It operates normally after
                  applying a penalty of 10% of the winning bid amount.
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
                </p>
              </div>
            )}

            {ticketInfo && (
              <div className="infoBox">
                <div className="titleBox">
<<<<<<< HEAD
                  <strong className="title">Lucky Ticket #{ticketInfo.id}</strong>
=======
                  <strong className="title">
                    Lucky Ticket #
                    {ticketInfo.itemid === null
                      ? ticketInfo.id
                      : ticketInfo.itemid}
                  </strong>
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
                </div>

                <div className="ownedBox">
                  <p className="key">Owned by</p>
                  <p className="value">@{userinfo?.nickname}</p>
                </div>

                <div className="saleBox">
<<<<<<< HEAD
                  <div className="key">
                    <p className="price">Current price</p>
                    <p className="time">Bought</p>
                  </div>

                  <div className="value">
                    <strong className="price">100 USDT</strong>

                    {/* <ul className="timeList">
                      <li>{moment(tickTimer).days()}일</li>
                      <li>{moment(tickTimer).hours()}시간</li>
                      <li>{moment(tickTimer).month()}분</li>
                      <li>{moment(tickTimer).second()}초</li>
                    </ul> */}
                  </div>

                  <ul className="priceBox">
                    <li>
                      <p className="key">Current price</p>
                      <p className="value">100 USDT</p>
                    </li>
                    {/* <li>
                    <p className="key">Transaction price</p>
                    <p className="value">100 USDT</p>
                  </li> */}
                    <li
                      onClick={(evt) => {
                        window.open(txscanurl);
                      }}
                    >
                      {/* <p className="key">TxHash</p>
                    <p className="value">{txhash}</p> */}
=======
                  <div className="ownedBox">
                    <p className="key">Bought Date</p>
                    <p className="value">
                      {ticketInfo && ticketInfo.createdat.split("T", 1)}
                    </p>
                    <p className="key">Expire Date</p>
                    <p className="value">
                      {ticketInfo &&
                        moment(ticketInfo && ticketInfo.createdat)
                          .add(90, "days")
                          .format("YYYY-MM-DD")}
                    </p>
                  </div>
                  <div className="key">
                    <p className="price">Current price</p>
                  </div>
                  <div className="value">
                    <strong className="price">{ticketInfo.price} USDT</strong>
                  </div>
                  <ul className="priceBox">
                    <li>
                      <p className="key">Current price</p>
                      <p className="value">{ticketInfo.price} USDT</p>
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
                    </li>
                  </ul>
                </div>

                <button
                  className="actionBtn"
<<<<<<< HEAD
                  disabled={tickTimer !== 0 ? true : false}
                  onClick={() => navigate("/resell")}
                >
                  Purchased
                </button>

                <p className="description">
                  The NFT purchased by participating in the subscription auction generates 12% of profits after 3 days
                  and is sold random. In addition, the results are announced at 9:00 AM, and the transaction is
                  completed from 9:00 AM to 21:00 PM. If the transaction is not completed within time, all transactions
                  in your account will be suspended. It operates normally after applying a penalty of 10% of the winning
                  bid amount.
=======
                  onClick={() =>
                    navigate(
                      `/resell/${ticketInfo.username}/ticket/${tokenId}`,
                      { state: ticketInfo }
                    )
                  }
                >
                  SELL
                </button>

                <p className="description">
                  The NFT purchased by participating in the subscription auction
                  generates 12% of profits after 3 days and is sold random. In
                  addition, the results are announced at 9:00 AM, and the
                  transaction is completed from 9:00 AM to 21:00 PM. If the
                  transaction is not completed within time, all transactions in
                  your account will be suspended. It operates normally after
                  applying a penalty of 10% of the winning bid amount.
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
                </p>
              </div>
            )}
          </li>

          {itemData &&
            itemData?.length !== 0 &&
            itemData.map((item, index) => {
              return (
                <li key={index} className="swapBox">
                  <div className="imgBox">
                    {item && item.itemdata?.url ? (
                      <img className="itemImg" src={item.itemdata.url} alt="" />
                    ) : (
                      <img className="itemImg" src={E_staking} alt="" />
                    )}

                    <div className="topBar">
                      <button className="likeBtn" onClick={() => {}}>
                        <img src={I_heartO} alt="" />
                        <p>22</p>
                      </button>
                    </div>
                  </div>

                  <div className="infoBox">
                    <div className="titleBox">
<<<<<<< HEAD
                      <strong className="title">#{item.itemdata.titlename}</strong>
=======
                      <strong className="title">
                        #{item.itemdata.titlename}
                      </strong>
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
                    </div>

                    <div className="ownedBox">
                      <p className="key">Owned by</p>
                      <p className="value">@{item.username}</p>
                    </div>
                    <div className="ownedBox">
                      <p className="key">Round Number</p>
                      <p className="value">{item.roundnumber} Round</p>
                    </div>

                    <div className="saleBox">
<<<<<<< HEAD
                      <div className="key">
                        {/* <p className="price">Current price</p> */}
                        {/* <p className="time">Ending in</p> */}
                      </div>

                      <div className="value">
                        <strong className="price">{parseInt(item.amount).toFixed(2)} USDT</strong>

                        {/* <ul className="timeList">
                          <li>{timeReceivables && timeReceivables.days()}일</li>
                          <li>{timeReceivables && timeReceivables.hour()}시간</li>
                          <li>{timeReceivables && timeReceivables.minutes()}분</li>
                          <li>{timeReceivables && timeReceivables.second()}초</li>
                        </ul> */}
=======
                      <div className="key"></div>
                      <div className="value">
                        <strong className="price">
                          {item.amount
                            ? parseInt(item && item.amount).toFixed(2)
                            : "0.00"}{" "}
                          USDT
                        </strong>
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
                      </div>

                      <ul className="priceBox">
                        <li>
                          <p className="key">Current price</p>
<<<<<<< HEAD
                          <p className="value">{parseInt(item.amount).toFixed(2)} USDT</p>
=======
                          {item.amount
                            ? parseInt(item && item.amount).toFixed(2)
                            : "0.00"}{" "}
                          USDT
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
                        </li>
                      </ul>
                    </div>

                    <button
                      className="actionBtn"
                      onClick={() => {
                        setReceivables(item);
                        openModal();
<<<<<<< HEAD
                        setItemDataInfo(item.itemdata);
=======
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
                      }}
                    >
                      Pay
                    </button>

                    <p className="description">
<<<<<<< HEAD
                      The NFT purchased by participating in the subscription auction generates 12% of profits after 3
                      days and is sold random. In addition, the results are announced at 9:00 AM, and the transaction is
                      completed from 9:00 AM to 21:00 PM. If the transaction is not completed within time, all
                      transactions in your account will be suspended. It operates normally after applying a penalty of
                      10% of the winning bid amount.
=======
                      The NFT purchased by participating in the subscription
                      auction generates 12% of profits after 3 days and is sold
                      random. In addition, the results are announced at 9:00 AM,
                      and the transaction is completed from 9:00 AM to 21:00 PM.
                      If the transaction is not completed within time, all
                      transactions in your account will be suspended. It
                      operates normally after applying a penalty of 10% of the
                      winning bid amount.
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
                    </p>
                  </div>
                </li>
              );
            })}

          {itemBalData.length !== 0 &&
<<<<<<< HEAD
            itemBalData.map((item, index) => (
              <li key={index} className="swapBox">
                <div className="imgBoxBal">
                  {item && item.itemdata?.url ? (
                    <img className="itemImgBal" src={item.itemdata.url} alt="" />
                  ) : (
                    <img className="itemImgBal" src={E_staking} alt="" />
                  )}

                  <div className="topBarBal">
                    <button className="likeBtnBal" onClick={() => {}}>
                      <img src={I_heartO} alt="" />
                      <p>22</p>
                    </button>
                  </div>
                </div>
                <div className="infoBox">
                  <div className="titleBox">
                    <strong className="title">{item && item.itemdata?.titlename}</strong>
                  </div>

                  <div className="ownedBox">
                    <p className="key">Owned by</p>
                    <p className="value">@{item && item.username}</p>
                  </div>
                  <div className="ownedBox">
                    <p className="key">Bought Date</p>
                    <p className="value">{moment(item && item.createdat).format("YYYY-MM-DD")}</p>
                    <p className="key">Sold Date</p>
                    <p className="value">
                      {moment(item && item.createdat)
                        .add(3, "days")
                        .format("YYYY-MM-DD")}
                    </p>
                  </div>

                  <div className="saleBox">
                    <div className="key"></div>
                    {/* <div className="value">
                      <ul className="timeList">
                        <li>{timeMoment && timeMoment.day()}일</li>
                        <li>{timeMoment && timeMoment.hour()}시간</li>
                        <li>{timeMoment && timeMoment.minutes()}분</li>
                        <li>{timeMoment && timeMoment.second()}초</li>
                      </ul>
                    </div> */}

                    <ul className="priceBox">
                      {/* {circulations?.map((itm, i) => {
                          if (item?.itemid === itm.itemid)
                            return (
                              <p className="value">
                                {" "}
                                {parseInt(itm.price).toFixed(2)} USDT
                              </p>
                            );
                        })} */}

                      <li key={index}>
                        <p className="key">Current price</p>
                        <p className="value"> {parseInt(item && item.buyprice).toFixed(2)} USDT</p>
                      </li>
                      {item.group_ == "kingkong" && (
                        <button className="actionBtn" onClick={() => navigate("/resell/" + item.itemid)}>
                          Sell
                        </button>
                      )}
                    </ul>
                  </div>

                  <p className="description">
                    The NFT purchased by participating in the subscription auction generates 12% of profits after 3 days
                    and is sold random. In addition, the results are announced at 9:00 AM, and the transaction is
                    completed from 9:00 AM to 21:00 PM. If the transaction is not completed within time, all
                    transactions in your account will be suspended. It operates normally after applying a penalty of 10%
                    of the winning bid amount.
                  </p>
                </div>
              </li>
            ))}

          {isOpen && <PayPopup off={openModal} userInfo={userinfo} receivables={receivables} />}
=======
            itemBalData.map((item, index) => {
              if (item.group_ != "ticket") {
                return (
                  <li key={index} className="swapBox">
                    <div className="imgBoxBal">
                      <img
                        className="itemImgBal"
                        src={item.itemdata?.url}
                        alt=""
                      />
                      <div className="topBarBal">
                        <button className="likeBtnBal" onClick={() => {}}>
                          <img src={I_heartO} alt="" />
                          <p>22</p>
                        </button>
                      </div>
                    </div>
                    <div className="infoBox">
                      <div className="titleBox">
                        <strong className="title">
                          {item && item.itemdata?.titlename}
                        </strong>
                      </div>

                      <div className="ownedBox">
                        <p className="key">Owned by</p>
                        <p className="value">@{item && item.username}</p>
                      </div>

                      <div className="ownedBox">
                        <p className="key">Bought Date</p>
                        <p className="value">
                          {item && item.updatedat
                            ? item.updatedat.split("T", 1)
                            : item.createdat.split("T", 1)}
                        </p>{" "}
                      </div>

                      <div className="saleBox">
                        <div className="key"></div>
                        <ul className="priceBox">
                          <li key={index}>
                            <p className="key">Current price</p>
                            <p className="value">
                              {" "}
                              {item.amount
                                ? parseInt(item && item.amount).toFixed(2)
                                : "0.00"}{" "}
                              USDT
                            </p>
                          </li>
                          {item.group_ == "kingkong" && item.isstaked == 0 && (
                            <>
                              <button
                                disabled={spinner}
                                className="actionBtn"
                                onClick={() =>
                                  navigate(
                                    `/resell/${item?.username}/kingkong/${item.itemid}`,
                                    { state: item[index] }
                                  )
                                }
                              >
                                Sell
                              </button>

                              <button
                                className="actionBtn_two"
                                onClick={() =>
                                  navigate(
                                    `/employ/${item?.username}/kingkong/${item.itemid}`,
                                    { state: item[index] }
                                  )
                                }
                              >
                                Stake
                              </button>
                            </>
                          )}
                        </ul>
                      </div>

                      <p className="description">
                        The NFT purchased by participating in the subscription
                        auction generates 12% of profits after 3 days and is
                        sold random. In addition, the results are announced at
                        9:00 AM, and the transaction is completed from 9:00 AM
                        to 21:00 PM. If the transaction is not completed within
                        time, all transactions in youasdfasdfasdfasdfsadfasdfr
                        account will be suspended. It operates normally after
                        applying a penalty of 10% of the winning bid amount.
                      </p>
                    </div>
                  </li>
                );
              }
            })}

          {isOpen && (
            <PayPopup
              off={openModal}
              userInfo={userinfo}
              receivables={receivables}
            />
          )}
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
        </ul>
      </PmyItemsBox>
    );
}

const MmyItemsBox = styled.section`
  padding: 4.44vw 5.55vw 0 5.55vw;
  & > .topBar {
    display: flex;
    flex-direction: column;
    gap: 2.77vw;
    .sortBox {
      position: relative;
      width: 100%;
      .sortBtn {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: inherit;
        height: 12.22vw;
        padding: 0 5vw;
        font-size: 4.44vw;
        line-height: 4.44vw;
        font-weight: 500;
        border: 1px solid #d9d9d9;
        border-radius: 3.33vw;
      }
    }
    .filterList {
      display: flex;
      li {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 10.55vw;
        padding: 0 5vw;
        font-size: 3.88vw;
        font-weight: 500;
        font-family: "Roboto", sans-serif;
        border-radius: 3.33vw;
        cursor: pointer;
        &.on {
          color: #fff;
          background: #000;
        }
      }
    }
  }
  .itemList {
    display: flex;
    flex-direction: column;
    gap: 10vw;
    margin: 5.55vw 0 0 0;
    * {
      font-family: "Roboto", sans-serif;
    }
    & > li {
      display: flex;
      flex-direction: column;
      gap: 3.33vw;
      .imgBox {
        width: 100%;
        height: 88.9vw;
        border-radius: 3.33vw;
        position: relative;
        overflow: hidden;
        border-radius: 12px;
        border: 20px solid transparent;
<<<<<<< HEAD
        background-image: linear-gradient(to right, red 0%, orange 100%), linear-gradient(to right, red 0%, orange 100%);
=======
        background-image: linear-gradient(to right, red 0%, orange 100%),
          linear-gradient(to right, red 0%, orange 100%);
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
        background-origin: border-box;
        background-clip: content-box, border-box;

        .itemImg {
          width: 100%;
          height: 100%;
          object-fit: contain;
          position: absolute;
          border: 20px solid transparent;
        }
        .topBar {
          display: flex;
          justify-content: space-between;
          width: 100%;
          padding: 2.5vw 3.61vw;
          position: relative;
          .likeBtn {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 0 0 auto;
            gap: 1.66vw;
            width: 19.44vw;
            height: 10.55vw;
            font-size: 4.44vw;
            font-weight: 500;
            color: #ff5050;
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(60px);
            border-radius: 6.66vw;
          }
        }
      }
      .infoBox {
        .titleBox {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 7.77vw;
          font-weight: 600;
          .title {
            font-family: "Poppins", sans-serif;
          }
        }
        .ownedBox {
          display: flex;
          gap: 1.94vw;
          margin: 1.94vw 0 0 0;
          font-size: 4.44vw;
          font-weight: 500;
          .key {
            color: #7a7a7a;
          }
        }
        .saleBox {
          display: flex;
          flex-direction: column;
          gap: 1.38vw;
          margin: 4.44vw 0 0 0;
          .price {
            display: flex;
            flex-direction: column;
            gap: 1.11vw;
            .key {
              font-size: 3.88vw;
              font-weight: 500;
            }
            .value {
              font-size: 6.11vw;
            }
          }
          .time {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 3.33vw;
            .key {
              font-size: 5vw;
              font-weight: 500;
            }
            .timeList {
              display: flex;
              gap: 10px;
              li {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 80px;
                height: 45px;
                font-weight: 700;
                font-size: 24px;
                line-height: 24px;
                color: #fff;
                background: #000;
                border-radius: 6px;
              }
            }
          }
        }
        .priceBox {
          display: flex;
          flex-direction: column;
          gap: 2.5vw;
          padding: 5vw 5.55vw;
          margin: 4.4vw 0 0 0;
          background: #f7f7f7;
          border-radius: 3.33vw;
          li {
            display: flex;
            justify-content: space-between;
            font-size: 3.88vw;
            font-weight: 500;
          }
        }
        .actionBtn {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 13.88vw;
          margin: 5.55vw 0 0 0;
          font-size: 5vw;
          font-weight: 500;
          line-height: 5vw;
          font-family: "Poppins", sans-serif;
          color: #fff;
          background: #000;
          border-radius: 3.33vw;
        }
        .description {
          margin: 5.55vw 0 0 0;
          font-size: 3.88vw;
          color: #7a7a7a;
        }
      }
      &.stakingBox {
        .imgBox {
          background: #000;
          .itemImg {
            width: 71.66vw;
            height: 71.66vw;
            top: 58%;
            left: 50%;
            transform: translate(-50%, 0%);
          }
          .topBar {
            height: unset;
            padding: 6.66vw 5vw;
            justify-content: space-between;
            align-items: center;
            .profImg {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 16.66vw;
              height: 16.66vw;
              padding: 3.33vw;
              border-radius: 50%;
              background: #fff;
              border: 1.38vw solid #333;
              backdrop-filter: blur(60px);
              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }
            .profName {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 44.44vw;
              height: 11.11vw;
              border-radius: 8.33vw;
              font-size: 4.44vw;
              color: #fff;
              background: #333;
              strong {
                font-family: "Poppins", sans-serif;
              }
            }
          }
        }
      }
      &.swapBox {
        .saleBox {
          .time {
            .key {
              color: #ff5050;
            }
            .timeList {
              li {
                background: #d9d9d9;
              }
            }
          }
        }
      }
      &.sellBox {
        .btnBox {
          display: flex;
          gap: 20px;
          button {
            flex: 1;
          }
        }
      }
    }
    .imgBoxBal {
      display: flex;
      flex-direction: column;
<<<<<<< HEAD
=======

>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
      * {
        font-family: "Roboto", sans-serif;
      }
      width: 760px;
      height: 760px;
      position: relative;
      overflow: hidden;
      .itemImgBal {
        width: 100%;
        height: 100%;
        object-fit: contain;
        position: absolute;
        border-radius: 50px;
      }
      .topBarBal {
        display: flex;
        justify-content: flex-end;
        padding: 36px;
        .likeBtnBal {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          width: 110px;
          height: 54px;
          font-size: 22px;
          font-weight: 500;
          color: #ff5050;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(60px);
          border-radius: 30px;
        }
      }
    }
  }
`;

const PmyItemsBox = styled.section`
  & > .topBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 92px;
    .filterList {
      display: flex;
      gap: 10px;
      li {
        padding: 12px 14px;
        font-size: 18px;
        font-weight: 500;
        font-family: "Roboto", sans-serif;
        border-radius: 12px;
        cursor: pointer;
        &.on {
          color: #fff;
          background: #000;
        }
      }
    }
    .sortBox {
      position: relative;
      width: 240px;
      .sortBtn {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: inherit;
        height: 44px;
        padding: 0 18px;
        font-size: 18px;
        line-height: 18px;
        font-weight: 500;
        border: 1px solid #d9d9d9;
        border-radius: 12px;
      }
    }
  }
  .itemList {
    display: flex;
    flex-direction: column;
    gap: 90px;
    * {
      font-family: "Roboto", sans-serif;
    }
    li {
      display: flex;
      justify-content: space-between;
      gap: 40px;
      .imgBox {
        width: 760px;
        height: 760px;
        position: relative;
        overflow: hidden;
<<<<<<< HEAD
        border-radius: 12px;
        border: 20px solid transparent;
        background-image: linear-gradient(red, red), linear-gradient(to right, red 0%, orange 100%);
=======
        border-radius: 10px;
        border: 20px solid transparent;
        background-image: linear-gradient(red, red),
          linear-gradient(to right, red 0%, orange 100%);
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
        background-origin: border-box;
        background-clip: content-box, border-box;
        @media screen and (max-width: 1440px) {
          min-width: 500px;
          height: 500px;
        }
        .itemImg {
          width: 100%;
          height: 100%;
          object-fit: contain;
          position: absolute;
<<<<<<< HEAD
          border-radius: 12px;
=======
          border-radius: 10px;
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
          border: 20px solid transparent;
        }
        .topBar {
          display: flex;
          justify-content: flex-end;
          padding: 36px;
          .likeBtn {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 8px;
            width: 110px;
            height: 54px;
            font-size: 22px;
            font-weight: 500;
            color: #ff5050;
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(60px);
            border-radius: 30px;
          }
        }
      }
      .infoBox {
        max-width: 608px;
        min-width: 445px;
        width: 100%;
        .titleBox {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 56px;
          font-weight: 600;
          line-height: 84px;
          .title {
            font-family: "Poppins", sans-serif;
          }
          .btnBox {
            display: flex;
            gap: 20px;
            button {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 40px;
              height: 40px;
              padding: 10px;
              border-radius: 50%;
              box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
              img {
                width: 100%;
              }
            }
          }
        }
        .ownedBox {
          display: flex;
          gap: 10px;
          margin: 14px 0 0 0;
          font-size: 18px;
          font-weight: 500;
          .key {
            color: #7a7a7a;
          }
        }
        .saleBox {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin: 44px 0 0 0;
          button {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 45px;
            font-weight: 700;
            font-size: 24px;
            line-height: 24px;
            color: #fff;
            background: #000;
            border-radius: 6px;
          }
          .key {
            display: flex;
            justify-content: space-between;
            font-size: 18px;
            font-weight: 500;
            line-height: 21px;
          }
          .value {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .price {
              font-size: 38px;
            }
            .timeList {
              display: flex;
              gap: 10px;

              li {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 45px;
                height: 45px;
                font-weight: 700;
                font-size: 24px;
                line-height: 24px;
                color: #fff;
                background: #000;
                border-radius: 6px;
              }
            }
          }
          .priceBox {
            display: flex;
            flex-direction: column;
            gap: 10px;
            padding: 20px;
            background: #f7f7f7;
            border-radius: 12px;
            li {
              font-size: 18px;
              font-weight: 500;
            }
          }
        }
        .actionBtn {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
<<<<<<< HEAD
          height: 60px;
          margin: 60px 0 0 0;
          font-size: 20px;
          font-weight: 500;
          line-height: 20px;
          color: #fff;
          font-family: "Poppins", sans-serif;
          background: #000;
          border-radius: 12px;
        }
=======
          height: 70px;
          margin: 60px 0 0 0;
          font-size: 20px;
          line-height: 20px;
          background: #000;
          border-radius: 12px;
        }
        .actionBtn_two {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 70px;
          margin: 20px 0 0 0;
          font-size: 20px;
          line-height: 20px;
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
        }
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
        .description {
          margin: 30px 0 0 0;
          font-size: 18px;
          color: #7a7a7a;
        }
      }
      &.stakingBox {
        .imgBox {
          background: #000;
          .itemImg {
            width: 400px;
            height: 400px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border-radius: 12px;
            border: 20px solid transparent;
          }
          .topBar {
            height: unset;
            padding: 25px 40px;
            justify-content: space-between;
            .profImg {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 82px;
              height: 82px;
              padding: 16px;
              border-radius: 50%;
              background: #fff;
              border: 7px solid #333;
              backdrop-filter: blur(60px);
              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }
            .profName {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 206px;
              height: 52px;
              border-radius: 30px;
              font-size: 22px;
              color: #fff;
              background: #333;
              strong {
                font-family: "Poppins", sans-serif;
              }
            }
          }
        }
      }
      &.swapBox {
        .saleBox {
          .key {
            .time {
              color: #ff5050;
            }
          }
          .value {
            .timeList {
              li {
                background: #d9d9d9;
              }
            }
          }
        }
      }
      &.sellBox {
        .btnBox {
          display: flex;
          gap: 20px;
          button {
            flex: 1;
          }
        }
      }
    }
  }
  .imgBoxBal {
    display: flex;
<<<<<<< HEAD
    flex-direction: column;
=======
    border-radius: 50px;
    flex-direction: column;
    border-radius: 12px;
    border: 20px;
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
    * {
      font-family: "Roboto", sans-serif;
    }
    width: 760px;
    height: 760px;
<<<<<<< HEAD
=======
    object-fit: contain;
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
    position: relative;
    overflow: hidden;
    @media screen and (max-width: 1440px) {
      min-width: 500px;
      height: 500px;
    }
    .itemImgBal {
      width: 100%;
      height: 100%;
<<<<<<< HEAD
      object-fit: contain;
=======
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
      position: absolute;
      border-radius: 12px;
    }
    .topBarBal {
      display: flex;
      justify-content: flex-end;
      padding: 36px;
      .likeBtnBal {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;
        width: 110px;
        height: 54px;
        font-size: 22px;
        font-weight: 500;
        color: #ff5050;
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(60px);
        border-radius: 30px;
      }
    }
  }
  .itemList {
    display: flex;
    flex-direction: column;
    gap: 90px;
    * {
      font-family: "Roboto", sans-serif;
    }

    li {
      display: flex;
      justify-content: space-between;
      gap: 40px;
      .imgBox {
        width: 760px;
        height: 760px;
        position: relative;
        overflow: hidden;
        border-radius: 12px;
        border: 20px solid transparent;
<<<<<<< HEAD
        background-image: linear-gradient(to right, red 0%, orange 100%), linear-gradient(to right, red 0%, orange 100%);
=======
        background-image: linear-gradient(to right, red 0%, orange 100%),
          linear-gradient(to right, red 0%, orange 100%);
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
        background-origin: border-box;
        background-clip: content-box, border-box;
        @media screen and (max-width: 1440px) {
          min-width: 500px;
          height: 500px;
        }
        .itemImg {
          width: 100%;
          height: 100%;
          object-fit: contain;
          position: absolute;
          border-radius: 12px;
        }
        .topBar {
          display: flex;
          justify-content: flex-end;
          padding: 36px;
          .likeBtn {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 8px;
            width: 110px;
            height: 54px;
            font-size: 22px;
            font-weight: 500;
            color: #ff5050;
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(60px);
            border-radius: 30px;
          }
        }
      }
      .infoBox {
        max-width: 608px;
        min-width: 445px;
        width: 100%;
        .titleBox {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 56px;
          font-weight: 600;
          line-height: 84px;
          .title {
            font-family: "Poppins", sans-serif;
          }
          .btnBox {
            display: flex;
            gap: 20px;
            button {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 40px;
              height: 40px;
              padding: 10px;
              border-radius: 50%;
              box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
              img {
                width: 100%;
              }
            }
          }
        }
        .ownedBox {
          display: flex;
          gap: 10px;
          margin: 14px 0 0 0;
          font-size: 18px;
          font-weight: 500;
          .key {
            color: #7a7a7a;
          }
        }
        .saleBox {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin: 44px 0 0 0;
          .key {
            display: flex;
            justify-content: space-between;
            font-size: 18px;
            font-weight: 500;
            line-height: 21px;
          }
          .value {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .price {
              font-size: 38px;
            }
            .timeList {
              display: flex;
              gap: 10px;
              li {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 70px;
                height: 50px;
                font-weight: 700;
                font-size: 20px;
                line-height: 24px;
                color: #fff;
                background: #000;
                border-radius: 6px;
              }
            }
          }
          .priceBox {
            display: flex;
            flex-direction: column;
            gap: 10px;
            padding: 20px;
            background: #f7f7f7;
            border-radius: 12px;
            li {
              font-size: 18px;
              font-weight: 500;
            }
          }
        }
        .actionBtn {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 60px;
          margin: 60px 0 0 0;
          font-size: 20px;
<<<<<<< HEAD
          font-weight: 500;
          line-height: 20px;
          color: #fff;
          font-family: "Poppins", sans-serif;
=======
          line-height: 20px;
          color: #fff;
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
          background: #000;
          border-radius: 12px;
        }
        .description {
          margin: 30px 0 0 0;
          font-size: 18px;
          color: #7a7a7a;
        }
      }
      &.stakingBox {
        .imgBox {
          background: #000;
          .itemImg {
            width: 400px;
            height: 400px;
            top: 50%;
            left: 50%;

            transform: translate(-50%, -50%);
          }
          .topBar {
            height: unset;
            padding: 25px 40px;
            justify-content: space-between;
            .profImg {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 82px;
              height: 82px;
              padding: 16px;
              border-radius: 50%;
              background: #fff;
              border: 7px solid #333;
              backdrop-filter: blur(60px);
              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }
            .profName {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 206px;
              height: 52px;
              border-radius: 30px;
              font-size: 22px;
              color: #fff;
              background: #333;
              strong {
                font-family: "Poppins", sans-serif;
              }
            }
          }
        }
      }
      &.swapBox {
        .saleBox {
          .key {
            .time {
              color: #ff5050;
            }
          }
          .value {
            .timeList {
              li {
                background: #d9d9d9;
              }
            }
          }
        }
      }
      &.sellBox {
        .btnBox {
          display: flex;
          gap: 20px;
          button {
            flex: 1;
          }
        }
      }
    }
  }
`;

const filterList = ["All 8", "Available 7", "Sold 0"];
