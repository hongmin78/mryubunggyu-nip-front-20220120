import styled from "styled-components";
import I_x from "../img/icon/I_x.svg";
import I_tIcon from "../img/icon/I_tIcon.png";
import I_chkWhite from "../img/icon/I_chkWhite.svg";
import {
  get_contractaddress,
  get_ipfsformatcid,
  putCommaAtPrice,
} from "../util/Util";
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
import { addresses } from "../configs/addresses";
import { DECIMALS_DISP_DEF } from "../configs/configs"; // MIN_STAKE_AMOUNT,
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
  STAKE_CURRENCY,
  NETTYPE,
} from "../configs/configweb3";
import { TX_POLL_OPTIONS } from "../configs/configs";
import I_spinner from "../img/icon/I_spinner.svg";
import { strDot } from "../util/Util";
import { net } from "../configs/net";
const MODE_DEV_PROD = "PROD";
export default function StakingPopup({ off }) {
  const navigate = useNavigate();
  const isMobile = useSelector((state) => state.common.isMobile);
  const [termChk, setTermChk] = useState(false);
  let [myaddress, setmyaddress] = useState(getmyaddress());
  let [mybalance, setmybalance] = useState();
  let [isallowanceok, setisallowanceok] = useState(false);
  let [allowanceamount, setallowanceamount] = useState();
  // let [stakedbalance, setstakedbalance] = useState();
  // let [tvl, settvl] = useState();
  let [tickerusdt, settickerusdt] = useState(1);
  let [myethbalance, setmyethbalance] = useState();
  let [done, setDone] = useState(false);
  let spinnerHref = useRef();
  let spinnerHref_approve = useRef();
  let [isloader_00, setisloader_00] = useState(false);
  let [isloader_01, setisloader_01] = useState(false);
  const [userinfo, setuserinfo] = useState({});
  let [MIN_STAKE_AMOUNT, setMIN_STAKE_AMOUNT] = useState("100");
  const [contractaddresses, setContractaddresses] = useState([]);
  useEffect((_) => {
    query_contractaddresses().then((res) => {
      console.log("CONTRACTADDRESSES", contractaddresses);
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

      const fetchdata = async (_) => {
        axios.get(API.API_TICKERS + `?nettype=${net}`).then((resp) => {
          LOGGER("MDmEMQ5xde", resp.data);
          let { status, payload, list } = resp;
          //				let { USDT } = payload.list
          //			LOGGER( 'mlB7HasjBh' , USDT )
          //		settickerusdt ( USDT )
        });
        let myaddress = getmyaddress();
        // LOGGER("", addresses.con tract_stake, myaddress); // .ETH_TESTNET
        // let resp_balances = await query_with_arg({
        //   contractaddress: addresses.contra ct_stake, // ETH_TESTNET.
        //   abikind: "STAKE",
        //   methodname: "_balances",
        //   aargs: [myaddress],
        // });
        // LOGGER("uQJ2POHvP8", resp_balances);
        // setstakedbalance(getethrep(resp_balances));
        query_with_arg({
          contractaddress: get_contractaddress(
            "contract_USDT",
            contractaddresses
          ), // ETH_TESTNET.
          abikind: "ERC20",
          methodname: "allowance",
          aargs: [
            myaddress,
            get_contractaddress("ERC1155[sales]", contractaddresses),
          ], // ETH_TESTNET.
        }).then((resp) => {
          let allowanceineth = getethrep(resp);
          LOGGER("8LYRxjNp8k", resp, allowanceineth);
          setallowanceamount(allowanceineth);
          //				setallowanceamount ( 100 )
          if (allowanceineth > 0) {
            setisallowanceok(false);
          } else {
          }
        });
        query_with_arg({
          contractaddress: get_contractaddress(
            "contract_USDT",
            contractaddresses
          ), // ETH_TESTNET.
          abikind: "ERC20",
          methodname: "balanceOf",
          aargs: [myaddress],
        }).then((resp) => {
          LOGGER("", resp);
          setmybalance(getethrep(resp, 4));
        });
        // query_noarg({
        //   contractaddress: addresses.contr act_stake, // ETH_TESTNET.
        //   abikind: "STAKE",
        //   methodname: "_tvl",
        // }).then((resp) => {
        //   LOGGER("", resp);
        //   settvl(getethrep(resp));
        // });

        query_with_arg({
          contractaddress: get_contractaddress(
            "contract_admin",
            contractaddresses
          ),
          abikind: "ADMIN",
          methodname: "_stakeplans",
          aargs: [get_contractaddress("contract_USDT", contractaddresses)],
        }).then((resp) => {
          LOGGER("HSudcIgxuB", resp);
          if (resp) {
          } else {
            return;
          }
          setMIN_STAKE_AMOUNT(getethrep(resp[4]));
        });

        query_eth_balance(myaddress).then((resp) => {
          LOGGER("rmgUxgo5ye", resp);
          setmyethbalance((+getethrep(resp)).toFixed(DECIMALS_DISP_DEF));
        });
      };
      fetchdata();
    });
  }, []);

  const getuserinfo = async () => {
    try {
      let myaddress = getmyaddress();
      let { data } = await axios.get(
        API.API_USERINFO + `/${myaddress}?nettype=${net}`
      );
      let { status, respdata } = data;
      if (status == "OK") {
        setuserinfo(respdata);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const query_contractaddresses = async () => {
    return new Promise(async (res, rej) => {
      try {
        let { data } = await axios.get(API.API_CADDR);
        let { status, list } = data;
        if (status == "OK") {
          setContractaddresses(list);
          if (contractaddresses.length > 0) {
            res("Successfully fetched contractaddresses");
          }
        } else {
          rej("Failed to fetch contractaddresses");
        }
      } catch (err) {
        console.error(err);
      }
    });
  };

  useEffect(() => {
    getuserinfo();
  }, []);

  const onclick_approve = async (_) => {
    LOGGER("");

    let myaddress = getmyaddress();
    let abistr = getabistr_forfunction({
      contractaddress: get_contractaddress("contract_USDT", contractaddresses), // ETH_TESTNET.
      abikind: "ERC20",
      methodname: "approve",
      aargs: [
        get_contractaddress("ERC1155[sales]", contractaddresses),
        getweirep("" + 10 ** 6),
      ], // .ETH_TESTNET
    });
    LOGGER("", abistr);
    setisloader_00(true);
    requesttransaction({
      from: myaddress,
      to: get_contractaddress("contract_USDT", contractaddresses), // ETH_TESTNET.
      data: abistr,
    }).then((resp) => {
      if (resp) {
      } else {
        setDone(false);
        SetErrorBar(messages.MSG_USER_DENIED_TX);
        return;
      }
      let txhash = resp;
      SetErrorBar(messages.MSG_TX_REQUEST_SENT);
      awaitTransactionMined
        .awaitTx(web3, txhash, TX_POLL_OPTIONS)
        .then((minedtxreceipt) => {
          LOGGER("asdasdasd", minedtxreceipt);
          let { status } = minedtxreceipt;
          if (status) {
          } else {
            SetErrorBar(messages.MSG_TX_FAILED);
            return;
          }
          SetErrorBar(messages.MSG_TX_FINALIZED);

          axios
            .post(API.API_TXS + `/${txhash}?nettype=${net}`, {
              txhash,
              username: myaddress,
              typestr: "APPROVE",
              auxdata: {
                erc20: get_contractaddress("contract_USDT", contractaddresses), // .ETH_TESTNET
                target: get_contractaddress(
                  "ERC1155[sales]",
                  contractaddresses
                ), // .ETH_TESTNET
                nettype: net,
              },
              nettype: NETTYPE,
            })
            .then((resp) => {
              LOGGER("", resp);
              SetErrorBar(messages.MSG_TX_REQUEST_SENT);
            });

          query_with_arg({
            contractaddress: get_contractaddress(
              "contract_USDT",
              contractaddresses
            ), // .ETH_TESTNET
            abikind: "ERC20",
            methodname: "allowance",
            aargs: [
              myaddress,
              get_contractaddress("ERC1155[sales]", contractaddresses),
            ], // ETH_TESTNET.
          }).then((resp) => {
            let allowanceineth = getethrep(resp);
            LOGGER("gCwXF6Jjkh", resp, allowanceineth);
            setallowanceamount(allowanceineth); //				setallowanceamount ( 100 )
            setisloader_00(false);
            if (allowanceineth > 0) {
              setisallowanceok(false);
            } else {
            }
          });
        });
    });
  };
  const onclick_buy = async (_) => {
    let itemid = get_ipfsformatcid();
    setDone(true);
    LOGGER("YFVGAF0sBJ");
    let myaddress = getmyaddress();
    LOGGER("eYJAgMYkR5", myaddress);
    if (mybalance >= MIN_STAKE_AMOUNT) {
    } else {
      SetErrorBar(messages.MSG_BALANCE_NOT_ENOUGH);
      setDone(false);
      return;
    }
    let abistr = getabistr_forfunction({
      contractaddress: get_contractaddress("ERC1155[sales]", contractaddresses), // .ETH_TESTNET
      abikind: "ERC1155Sale",
      methodname: "mint_and_match_single_simple_legacy",
      aargs: [
        get_contractaddress("ERC1155[sales]", contractaddresses),
        itemid,
        "1",
        "0",
        "0",
        userinfo?.refereraddress,
        "1",
        getweirep("" + 100),
        get_contractaddress("contract_USDT", contractaddresses),
        addresses.admin_account_address,
      ],
    });

    const callreqtx = async (_) => {
      let resp;
      try {
        setisloader_01(true);
        resp = await requesttransaction({
          from: myaddress,
          to: get_contractaddress("ERC1155[sales]", contractaddresses), // .ETH_TESTNET
          data: abistr,
        });

        if (resp) {
        } else {
          setDone(false);
          SetErrorBar(messages.MSG_USER_DENIED_TX);
          return;
        }
        // eslint-disable-next-line default-case
        let txhash = resp;

        awaitTransactionMined
          .awaitTx(web3, txhash, TX_POLL_OPTIONS)
          .then(async (minedtxreceipt) => {
            LOGGER("", minedtxreceipt);
            let { status } = minedtxreceipt;
            if (status) {
            } else {
              SetErrorBar(messages.MSG_TX_FAILED);
              return;
            }
            SetErrorBar(messages.MSG_TX_FINALIZED);
            setisloader_01(true);
            axios
              .post(API.API_TXS + `/${txhash}?nettype=${net}`, {
                txhash,
                username: myaddress,
                typestr: "STAKE",
                auxdata: {
                  amount: MIN_STAKE_AMOUNT,
                  currency: STAKE_CURRENCY,
                  currencyaddress: get_contractaddress(
                    "contract_USDT",
                    contractaddresses
                  ), // ETH_TESTNET.
                  nettype: NETTYPE,
                },
                nettype: net,
              })
              .then((resp) => {
                LOGGER("", resp);
                SetErrorBar(messages.MSG_TX_REQUEST_SENT);
                console.log("0");
              });
            // let resp_balances = await query_with_arg({
            //   contractaddress: addresses.contra ct_stake,
            //   abikind: "STAKE",
            //   methodname: "_balances",
            //   aargs: [myaddress],
            // });
            setDone(false);
            off(false);
            setisloader_01(false);
            navigate("/");
          });
      } catch (err) {
        setisloader_01(false);
        setDone(false);
        off(false);
        LOGGER();
        SetErrorBar(messages.MSG_USER_DENIED_TX);
      }
      console.log("4");
    };
    callreqtx();
  };

  if (isMobile)
    return (
      <>
        <MstakingPopupBox>
          <article className="topBar">
            <span className="blank" />
            <p className="title">Stake</p>
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
                  <li className="price">{MIN_STAKE_AMOUNT} USDT</li>
                  <li className="exchange">
                    $
                    {+MIN_STAKE_AMOUNT && tickerusdt
                      ? putCommaAtPrice(+MIN_STAKE_AMOUNT * +tickerusdt)
                      : null}
                  </li>
                </ul>
              </div>

              <ul className="dataList">
                {/* <li>
                  <p className="key">Calculation</p>
                  <p className="value">2022-01-11 00:00 UTC</p>
                </li>
                <li>
                  <p className="key">Distribution</p>
                  <p className="value">2022-03-12 00:00 UTC</p>
                </li> */}
                {/* <li style={MODE_DEV_PROD == "DEV" ? {} : { display: "none" }}>
                  <p className="key">Total Staked</p>
                  <p className="value">{tvl} USDT</p>
                </li> */}
                {/* <li>
                  <p className="key">Your Stake</p>
                  <p className="value">{stakedbalance} USDT</p>
                </li> */}

                <li>
                  <p className="key">Your address</p>
                  <p className="value">{strDot(myaddress, 6, 0)}</p>
                </li>
                <li>
                  <p className="key">Your USDT balance</p>
                  <p className="value">{mybalance} USDT</p>
                </li>
                <li style={allowanceamount ? { display: "none" } : {}}>
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
              <div className="termBox">
                <p className="key">Would you like to stake long term?</p>
                <span className="value">
                  <button className="yesBtn" onClick={() => setTermChk(true)}>
                    <span
                      className="chkBtn"
                      style={{
                        background: termChk && "#000",
                      }}
                    >
                      <img src={I_chkWhite} alt="" />
                    </span>
                    yes
                  </button>
                  <button className="noBtn" onClick={() => setTermChk(false)}>
                    <span
                      className="chkBtn"
                      style={{
                        background: !termChk && "#000",
                      }}
                    >
                      <img src={I_chkWhite} alt="" />
                    </span>
                    no
                  </button>
                </span>
              </div>

              <button
                className="confirmBtn"
                onClick={() => {
                  onclick_approve();
                  false && navigate(-1);
                }}
                style={
                  +allowanceamount > 0
                    ? { visibility: "hidden" }
                    : { display: "block" }
                }
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
                  onClick={() => {
                    onclick_buy();
                    false && navigate(-1);
                  }}
                >
                  Confirm
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
          <p className="title">Stake</p>
          <button className="exitBtn" onClick={() => off(false)}>
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
                <li className="price">100 USDT</li>
                <li className="exchange">100$</li>
              </ul>
            </div>

            <ul className="dataList">
              {/* <li>
                <p className="key">Calculation</p>
                <p className="value">2022-01-11 00:00 UTC</p>
              </li>
              <li>
                <p className="key">Distribution</p>
                <p className="value">2022-03-12 00:00 UTC</p>
              </li> */}
              {/* <li style={MODE_DEV_PROD == "DEV" ? {} : { display: "none" }}>
                <p className="key">Total Staked</p>
                <p className="value">{tvl} USDT</p>
              </li> */}
              {/* <li>
                <p className="key">Your Stake</p>
                <p className="value">{stakedbalance} USDT</p>
              </li> */}

              <li>
                <p className="key">Your address</p>
                <p className="value">{strDot(myaddress, 8, 0)} </p>
              </li>
              <li>
                <p className="key">Your USDT balance</p>
                <p className="value">{mybalance} USDT</p>
              </li>
              <li style={allowanceamount ? { display: "none" } : {}}>
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
            <div className="termBox">
              <p className="key">Would you like to stake long term?</p>
              <span className="value">
                <button
                  className="yesBtn"
                  onClick={() => {
                    setTermChk(true);
                  }}
                >
                  <span
                    className="chkBtn"
                    style={{
                      background: termChk && "#000",
                    }}
                  >
                    <img src={I_chkWhite} alt="" />
                  </span>
                  yes
                </button>
                <button className="noBtn" onClick={() => setTermChk(false)}>
                  <span
                    className="chkBtn"
                    style={{
                      background: !termChk && "#000",
                    }}
                  >
                    <img src={I_chkWhite} alt="" />
                  </span>
                  no
                </button>
              </span>
            </div>

            <button
              className="confirmBtn"
              onClick={() => {
                onclick_approve();
              }}
              style={
                +allowanceamount > 0
                  ? { visibility: "hidden" }
                  : { display: "inline" }
              }
            >
              {" "}
              Approve
              <img
                ref={spinnerHref_approve}
                src={I_spinner}
                alt=""
                style={{
                  display: isloader_00 ? "block" : "none",
                  width: "18px",
                  right: "160px",
                  position: "absolute",
                }}
              />
            </button>

            <button
              className="confirmBtn"
              disabled={done}
              onClick={() => {
                onclick_buy();
                false && off(false);
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
                  right: "160px",
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
  background: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
  z-index: 6;
  overflow: hidden;

  .topBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 15.55vw;
    padding: 0 5.55vw;

    .title {
      font-size: 5vw;
      font-weight: 600;
      line-height: 5vw;
    }

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
          }
        }
      }
    }

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
      }
    }
  }
`;

const PstakingPopupBox = styled.section`
  width: 540px;
  border-radius: 20px;
  background: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
  z-index: 6;

  .topBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 72px;
    padding: 0 30px;

    .title {
      font-size: 24px;
      font-weight: 600;
      line-height: 24px;
    }

    .blank,
    .exitBtn {
      width: 22px;
    }
  }

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
      }
    }
  }
`;
