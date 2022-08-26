import { useState, useEffect } from "react";
import styled from "styled-components";
import I_ltArw from "../img/icon/I_ltArw.svg";
import I_dnArw from "../img/icon/I_dnArw.svg";
import I_info from "../img/icon/I_info.svg";
import E_item3 from "../img/mypage/E_item3.png";
import PopupBg from "../components/PopupBg";
import SelectPopup from "../components/SelectPopup";
import { D_expDateList, D_startDateList } from "../data/Dresell";
import { useNavigate, useLocation } from "react-router-dom";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import DetailHeader from "../components/header/DetailHeader";
import Header from "../components/header/Header";
import axios from "axios";
import { net } from "../configs/net";
import { API } from "../configs/api";
import { getmyaddress } from "../util/common";
import { messages } from "../configs/messages";
import SetErrorBar from "../util/SetErrorBar";
import ticketImg from "../img/staking/E_prof1.png";
import moment from "moment";
import { addresses } from "../configs/addresses";
import { getabistr_forfunction, query_with_arg } from "../util/contract-calls";
import { requesttransaction } from "../services/metamask";
import awaitTransactionMined from "await-transaction-mined";
import { web3 } from "../configs/configweb3-ropsten";
import { TX_POLL_OPTIONS } from "../configs/configs";
import { getethrep, getweirep } from "../util/eth";

export default function Resell() {
  const navigate = useNavigate();
  const isMobile = useSelector((state) => state.common.isMobile);
  const ticketInfo = useLocation().state;
  const [bid, setBid] = useState("");
  const [sign, setSign] = useState();
  let [userInfo, setUserInfo] = useState();
  let [itemDetail, setItemDetail] = useState();
  const { id } = useParams();
  const { type } = useParams();
  const { tokenId } = useParams();
  const [saleType, setSaleType] = useState("COMMON");
  const [isApprovedForAll, setApprovalForAll] = useState(false);
  let [spinner, setSpinner] = useState(false);
  console.log("ticketInfo", itemDetail);

  const getUserInfo = async () => {
    try {
      let myaddress = getmyaddress();
      if (myaddress) {
      } else {
        SetErrorBar(messages.MSG_PLEASE_CONNECT_WALLET);
        return;
      }
      const resp = await axios.get(
        API.API_USERINFO + `/${myaddress}?nettype=${net}`
      );
      if (resp.data && resp.data.respdata) {
        let { respdata } = resp.data;
        setUserInfo(respdata);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const queryItemDetail = async () => {
    if (type === "kingkong") {
      try {
        const resp = await axios.get(
          API.API_GET_ITEMS_DETAIL + `/${tokenId}?nettype=${net}`
        );
        if (resp.data && resp.data.respdata) {
          let { respdata } = resp.data;
          console.log("$itemdetail_ITEMDETAIL", respdata);
          if (resp.data.status === "OK") {
            setItemDetail(respdata);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
    if (type === "ticket") {
      try {
        const resp = await axios.get(
          API.API_LOGSTAKES + `/${id}?nettype=${net}`
        );
        if (resp.data && resp.data.respdata) {
          let { respdata } = resp.data;
          console.log("$itemdetail_ITEMDETAIL", respdata);
          if (resp.data.status === "OK") {
            setItemDetail(respdata);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const queryApprovalForAll = async (item) => {
    setSpinner(true);
    try {
      let myaddress = getmyaddress();
      if (myaddress) {
      } else {
        SetErrorBar(messages.MSG_PLEASE_CONNECT_WALLET);
        return;
      }

      const options_arg = {
        kingkong: {
          contractaddress: addresses.contract_kip17,
          abikind: "KIP17",
          methodname: "isApprovedForAll",
          aargs: [myaddress, addresses.contract_kip17_salse],
        },
        ticket: {
          contractaddress: addresses.contract_erc1155,
          abikind: "ERC1155",
          methodname: "isApprovedForAll",
          aargs: [myaddress, addresses.contract_erc1155_sales],
        },
      };

      if (type === "kingkong") {
        query_with_arg(options_arg["kingkong"]).then((resp) => {
          console.log("$sell-isApprovedForAll?", resp);
          setApprovalForAll(resp);
          setSpinner(false);
        });
      }
      if (type === "ticket") {
        query_with_arg(options_arg["ticket"]).then((resp) => {
          console.log("$sell-ticket-isApprovedForAll?", resp);
          setApprovalForAll(resp);
          setSpinner(false);
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const approveForAll = () => {
    let myaddress = getmyaddress();
    setSpinner(true);
    if (myaddress) {
    } else {
      SetErrorBar(messages.MSG_PLEASE_CONNECT_WALLET);
      setSpinner(false);
      return;
    }
    if (type === "kingkong") {
      let abistr = getabistr_forfunction({
        contractaddress: addresses.contract_kip17,
        abikind: "KIP17",
        methodname: "setApprovalForAll",
        aargs: [addresses.contract_kip17_salse, true],
      });
      requesttransaction({
        from: myaddress,
        to: addresses.contract_kip17,
        data: abistr,
        value: "0x00",
      }).then((resp) => {
        if (resp) {
          console.log("resp", resp);
          setApprovalForAll(resp);
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
            setSpinner(false);
          });
      });
    }
    if (type === "ticket") {
      let abistr = getabistr_forfunction({
        contractaddress: addresses.contract_erc1155,
        abikind: "ERC1155",
        methodname: "setApprovalForAll",
        aargs: [addresses.contract_erc1155_sales, true],
      });
      requesttransaction({
        from: myaddress,
        to: addresses.contract_erc1155,
        data: abistr,
        value: "0x00",
      }).then((resp) => {
        console.log("resp", resp);
        setApprovalForAll(resp);
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
            setSpinner(false);
          });
      });
    }
  };

  const onClickSignRequest = async () => {
    let myaddress = getmyaddress();
    const { ethereum } = window; //    const exampleMessage = "Test `personal_sign` message";
    const from = myaddress; // store.isLogin;
    let msg; // = `0x${Buffer.from(exampleMessage, "utf8").toString("hex")}`;
    if (type === "kingkong") {
      msg = `Token id:${itemDetail.itemid}, ${getweirep(
        bid
      )},Contract address :${
        addresses.contract_erc1155_ticket_sales
      }, wallet: ${myaddress}`;
    }
    if (type === "ticket") {
      msg = `Token id:${
        ticketInfo?.itemid ? ticketInfo.itemid : ticketInfo?.id
      }, ${getweirep(bid)},Contract address :${
        addresses.contract_erc1155_ticket_sales
      }, wallet: ${myaddress}`;
    }

    const sign = await ethereum.request({
      method: "personal_sign",
      params: [msg, from],
    });

    setSign(sign);
    return sign;
  };

  const postSell = async () => {
    let respsign = await onClickSignRequest();
    console.log("res", itemDetail);
    let msg;
    setSpinner(true);
    if (respsign) {
      let myaddress = getmyaddress();
      if (type === "kingkong") {
        msg = `Token id:${itemDetail?.id}, ${getweirep(
          bid
        )},Contract address :${
          addresses.contract_kip17_salse
        }, wallet: ${myaddress}`;
      }
      if (type === "ticket") {
        msg = `Token id:${itemDetail?.id}, ${getweirep(
          bid
        )},Contract address :${
          addresses.contract_erc1155_ticket_sales
        }, wallet: ${myaddress}`;
      }

      let options_data = {
        kingkong: {
          username: itemDetail?.username,
          contractaddress: addresses.contract_kip17,
          tokenid: itemDetail?.id,
          price: bid,
          itemid: itemDetail?.itemid,
          expiry: 4119051884,
          paymeansaddress: addresses.contract_USDT,
          paymeansname: "USDT",
          saletype: saleType === "COMMON" ? 1 : saleType === "AUCTION" ? 2 : 0,
          saletypestr: saleType,
          salestatusstr: saleType,
          salestatus: 1, // "on sale",
          jsignature: {
            signature: sign,
            msg,
          },
          expirystr: 4119051884,
          nettype: net,
          seller: itemDetail?.username,
          typestr: saleType,
          type: "kingkong",
        },
        ticket: {
          username: itemDetail?.username,
          contractaddress: addresses.contract_erc1155,
          tokenid: ticketInfo?.itemid ? ticketInfo.itemid : ticketInfo?.id,
          price: bid,
          itemid: ticketInfo?.itemid ? ticketInfo?.itemid : ticketInfo?.id,
          expiry: 4119051884,
          paymeansaddress: addresses.contract_USDT,
          paymeansname: "USDT",
          saletype: saleType === "COMMON" ? 1 : saleType === "AUCTION" ? 2 : 0,
          saletypestr: saleType,
          salestatusstr: saleType,
          salestatus: 1, // "on sale",
          jsignature: {
            signature: sign,
            msg,
          },
          expirystr: 4119051884,
          nettype: net,
          seller: itemDetail?.username,
          typestr: saleType,
          type: "ticket",
        },
      };

      if (type === "kingkong") {
        axios
          .post(
            API.API_POST_SALE + `/?nettype=${net}`,
            options_data["kingkong"]
          )
          .then((res) => {
            console.log(res);
            SetErrorBar("Item has been posted!");
            // reload();
            if (res.data.status === "OK") {
              SetErrorBar("Item has been posted!");
              setSpinner(false);
              navigate("/market");
            }
          })
          .catch((err) => console.log(err));
      }
      if (type === "ticket") {
        axios
          .post(API.API_POST_SALE, options_data["ticket"])
          .then((res) => {
            console.log(res);

            if (res.data.status === "OK") {
              SetErrorBar("Item has been posted!");
              setSpinner(false);
              navigate("/market");
            }
          })
          .catch((err) => console.log(err));
      }
    } else {
      SetErrorBar("Failed to provide all information.");
    }
  };

  useEffect(() => {
    // setTimeout(() => {
    queryApprovalForAll();
    queryItemDetail();
    getUserInfo();
    // }, 1200);
  }, []);

  if (isMobile)
    return (
      <>
        <DetailHeader title="Put on marketplace" />
        <MresellBox>
          <img className="itemImg" src={E_item3} alt="" />

          <article className="sellSec">
            <div className="topBar">
              <p className="title">
                {" "}
                {type === "ticket"
                  ? `Lucky Ticket #${
                      itemDetail.itemid === null
                        ? itemDetail.id
                        : itemDetail.itemid
                    }`
                  : `King Kong #${itemDetail.titlename}`}
              </p>
            </div>

            <ul className="sellBox">
              <li className="transactionBox contBox">
                <p className="title">
                  Summary of
                  <br /> transaction information
                </p>

                <p className="explain">
                  The auction begins. If the bid is more than 10 USDT, the bid
                  will be awarded at 19:05 on July 17, 2022
                </p>

                <div className="priceBox">
                  <p className="priceTitle">Fees</p>
                  <ul className="priceList">
                    <li>
                      <p className="key">platform fee</p>
                      <p className="value">2.88%</p>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="bidBox contBox">
                <div className="titleBox">
                  <p className="title">Minimum bid</p>

                  <span className="hovInfo">
                    <img src={I_info} alt="" />

                    <div className="hovPopup">
                      <p>
                        You can always accept a sale even if you are offered a
                        price that is higher than your minimum bid and lower
                        than your target bid.
                      </p>
                    </div>
                  </span>
                </div>

                <div className="inputBox">
                  <input
                    value={bid}
                    onChange={(e) => setBid(e.target.value)}
                    placeholder={
                      type === "ticket"
                        ? "Ticket Minimun bid 90$"
                        : "Enter Minimum bid"
                    }
                  />
                  <strong className="unit">USDT</strong>
                </div>

                <p className="explain">
                  Suggested: 0%, 10%, 20%. Maximum is 25%
                </p>
              </li>

              <li className="instructionBox contBox">
                <p className="title">Instruction</p>

                <div className="textBox">
                  <p>
                    When you sell items for the first time in your account, you
                    need to go through the contract approval process
                  </p>

                  <ul className="processList">
                    <li>
                      <p>
                        - If you are trading for the first time, you will need
                        to reset your account. The process of sending 0 USDT to
                        verify that the account is a valid account proceeds.
                      </p>
                    </li>
                    <li>
                      <p>
                        - Please complete the signature to create a sales list.
                      </p>
                    </li>
                    <li>
                      <p>
                        - Gas fee is paid only for the first time, and
                        subsequent listings are supported free of charge.
                      </p>
                    </li>
                  </ul>
                </div>
              </li>

              <button className="actionBtn" onClick={() => postSell()}>
                Sales start
              </button>
            </ul>
          </article>
        </MresellBox>
      </>
    );
  else
    return (
      <>
        <Header />
        <PresellBox>
          <article className="sellSec">
            <div className="topBar">
              <button className="exitBtn" onClick={() => navigate(-1)}>
                <img src={I_ltArw} alt="" />
              </button>
              <p className="title">Put on marketplace</p>
            </div>

            <ul className="sellBox">
              <li className="bidBox contBox">
                <div className="titleBox">
                  <p className="title">Minimum bid</p>

                  <span className="hovInfo">
                    <img src={I_info} alt="" />

                    <div className="hovPopup">
                      <p>
                        You can always accept a sale even if you are offered a
                        price that is higher than your minimum bid and lower
                        than your target bid.
                      </p>
                    </div>
                  </span>
                </div>

                <div className="inputBox">
                  <input
                    style={{ width: "100%" }}
                    value={bid}
                    onChange={(e) => setBid(e.target.value)}
                    onBlur={(e) => {
                      if (type === "ticket" && parseInt(bid) < 90) {
                        setBid("");
                        SetErrorBar("Ticket minumum bid 90 USDT");
                      }
                    }}
                    placeholder={
                      type === "ticket"
                        ? "Minimun bid 90 USDT"
                        : "Enter Minimum bid"
                    }
                  />
                  <strong className="unit">USDT</strong>
                </div>

                <p className="explain">
                  Suggested: 0%, 10%, 20%. Maximum is 25%
                </p>
              </li>
              <li className="instructionBox contBox">
                <p className="title">Instruction</p>

                <div className="textBox">
                  <p>
                    When you sell items for the first time in your account, you
                    need to go through the contract approval process
                  </p>

                  <ul className="processList">
                    <li>
                      <p>
                        - If you are trading for the first time, you will need
                        to reset your account. The process of sending 0 USDT to
                        verify that the account is a valid account proceeds.
                      </p>
                    </li>
                    <li>
                      <p>
                        - Please complete the signature to create a sales list.
                      </p>
                    </li>
                    <li>
                      <p>
                        - Gas fee is paid only for the first time, and
                        subsequent listings are supported free of charge.
                      </p>
                    </li>
                  </ul>
                </div>
              </li>{" "}
              <div className="employment">
                {/* <button className="actionBtn" onCl ick={() => {}}>
                  Employ
                </button>
                <button className="actionBtn" onCl ick={() => {}}>
                  UnEmploy
                </button> */}
              </div>
              {isApprovedForAll ? (
                <button
                  className="actionBtn"
                  disabled={bid !== "" ? false : true}
                  onClick={() => postSell()}
                >
                  {spinner ? <div id="loading"></div> : "Sell"}
                </button>
              ) : (
                <button className="actionBtn" onClick={() => approveForAll()}>
                  {spinner ? <div id="loading"></div> : "Approve for all"}
                </button>
              )}
            </ul>
          </article>

          <ul className="itemSec">
            <li className="itemBox">
              {type === "ticket" ? (
                <img style={{ width: "8vw" }} src={ticketImg} alt="" />
              ) : itemDetail && itemDetail.url ? (
                <img className="itemImg" src={itemDetail.url} alt="" />
              ) : (
                <img className="itemImg" src="" alt="broken_image" />
              )}
              <p className="title">
                {" "}
                {type === "ticket"
                  ? `Lucky Ticket #${
                      ticketInfo.itemid === null
                        ? ticketInfo.id
                        : ticketInfo.itemid
                    }`
                  : `King Kong #${itemDetail?.titlename}`}
              </p>
              {/* <p className="title">Series {itemDetail && itemDetail.itembalances?.group_.toUpperCase()} #112</p> */}
            </li>

            <li className="transactionBox">
              <p className="title">
                Summary of
                <br /> transaction information
              </p>
            </li>

            <li className="priceBox">
              <p className="title">Fees : 3%</p>
            </li>
          </ul>
        </PresellBox>
      </>
    );
}

const MresellBox = styled.section`
  padding: 56px 0 0 0;

  .itemImg {
    width: 100%;
    height: 100vw;
    object-fit: contain;
  }

  .sellSec {
    padding: 0 5.55vw 9.44vw 5.55vw;

    .topBar {
      display: flex;
      align-items: center;
      height: 15vw;

      .title {
        font-size: 5vw;
        font-weight: 600;
        line-height: 5vw;
      }
    }

    .sellBox {
      display: flex;
      flex-direction: column;
      gap: 4.44vw;
      padding: 4.44vw 0 0 0;
      border-top: 1px solid #d9d9d9;

      * {
        font-family: "Roboto", sans-serif;
      }

      .contBox {
        display: flex;
        flex-direction: column;

        .title {
          font-size: 4.44vw;
          font-weight: 600;
        }

        .inputBox {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 12.22vw;
          margin: 4.44vw 0 0 0;
          padding: 0 3.33vw 0 4.44vw;
          border: 1px solid #d9d9d9;
          border-radius: 3.33vw;
        }

        .explain {
          margin: 2.77vw 0 0 0;
          font-size: 3.88vw;
          color: #7a7a7a;
        }

        &.transactionBox {
          gap: 3.88vw;

          .priceBox {
            display: flex;
            flex-direction: column;
            gap: 4.44vw;
            padding: 4.44vw;
            background: #f6f6f6;

            .priceTitle {
              font-size: 4.44vw;
              font-weight: 600;
              font-family: "Poppins", sans-serif;
            }

            .priceList {
              display: flex;
              flex-direction: column;
              gap: 2.22vw;
              font-size: 3.88vw;
              color: #7a7a7a;

              li {
                display: flex;
                justify-content: space-between;

                &.total {
                  font-size: 4.44vw;
                  font-weight: 500;
                  color: #000;
                }
              }
            }
          }
        }

        &.bidBox {
          margin: 4.44vw 0 0 0;

          .titleBox {
            display: flex;
            align-items: center;
            gap: 2.5vw;
            position: relative;

            .hovInfo {
              display: flex;
              align-items: center;
              cursor: pointer;

              img {
                width: 5.55vw;
              }

              &:hover {
                .hovPopup {
                  display: block;
                }
              }

              .hovPopup {
                display: none;
                width: 10000%;
                max-width: 88.9vw;
                padding: 2.77vw 3.33vw;
                font-size: 3.88vw;
                color: #fff;
                background: rgba(0, 0, 0, 0.6);
                border-radius: 2.22vw;
                top: 0;
                left: 50%;
                position: absolute;
                transform: translate(-50%, 10vw);
                z-index: 2;

                p {
                  font-family: "Roboto", sans-serif;
                }
              }
            }
          }

          .inputBox {
            .unit {
              font-size: 4.44vw;
            }
          }
        }

        &.dateBox {
          .posBox {
            position: relative;
            width: 100%;
            cursor: pointer;

            input {
              cursor: pointer;
            }
          }
        }

        &.instructionBox {
          .textBox {
            display: flex;
            flex-direction: column;
            gap: 5vw;
            padding: 5.55vw 4.44vw;
            margin: 4.44vw 0 0 0;
            font-size: 3.33vw;
            color: #7a7a7a;
            font-family: "Roboto", sans-serif;
            border: 1px solid #d9d9d9;
            border-radius: 3.33vw;

            .processList {
              display: flex;
              flex-direction: column;
              gap: 2.77vw;
            }
          }
        }
      }

      .actionBtn {
        height: 13.88vw;
        font-size: 5vw;
        font-weight: 500;
        color: #fff;
        background: #000;
        border-radius: 3.33vw;
      }
    }
  }
`;

const PresellBox = styled.section`
  display: flex;
  justify-content: space-between;
  padding: 190px 0 0 0;
  margin: 0 auto;
  max-width: 1134px;

  .sellSec {
    max-width: 800px;
    box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.16);
    border-radius: 20px;

    .topBar {
      display: flex;
      align-items: center;
      gap: 26px;
      height: 84px;
      padding: 0 32px;

      .title {
        font-size: 24px;
        font-weight: 600;
        line-height: 24px;
      }
    }

    .sellBox {
      display: flex;
      flex-direction: column;
      gap: 30px;
      padding: 44px 50px;
      border-top: 1px solid #d9d9d9;

      .contBox {
        display: flex;
        flex-direction: column;
        gap: 14px;

        .title {
          font-size: 18px;
          font-weight: 600;
        }

        .inputBox {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 44px;
          padding: 0 20px 0 16px;
          border: 1px solid #d9d9d9;
          border-radius: 12px;

          * {
            font-size: 16px;
            font-family: "Roboto", sans-serif;
          }

          input {
            font-weight: 500;

            &::placeholder {
              color: #d9d9d9;
            }
          }
        }

        .explain {
          font-size: 16px;
          color: #7a7a7a;
          font-family: "Roboto", sans-serif;
        }

        &.bidBox {
          .titleBox {
            display: flex;
            align-items: center;
            gap: 8px;

            .hovInfo {
              display: flex;
              align-items: center;
              position: relative;
              cursor: pointer;

              &:hover {
                .hovPopup {
                  display: block;
                }
              }

              .hovPopup {
                display: none;
                width: 10000%;
                max-width: 380px;
                padding: 10px 12px;
                font-size: 16px;
                color: #fff;
                background: rgba(0, 0, 0, 0.6);
                border-radius: 8px;
                top: 0;
                left: 0;
                position: absolute;
                transform: translate(-22px, 26px);
                z-index: 2;

                p {
                  font-family: "Roboto", sans-serif;
                }
              }
            }
          }
        }

        &.dateContainer {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          gap: 24px;

          .dateBox {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 14px;

            .posBox {
              position: relative;
              width: 100%;
              cursor: pointer;

              input {
                cursor: pointer;
              }
            }
          }
        }

        &.instructionBox {
          .textBox {
            display: flex;
            flex-direction: column;
            gap: 14px;
            padding: 20px 18px;
            font-size: 16px;
            color: #7a7a7a;
            font-family: "Roboto", sans-serif;
            border: 1px solid #d9d9d9;
            border-radius: 12px;

            .processList {
              display: flex;
              flex-direction: column;
              gap: 10px;
              line-height: 18px;
            }
          }
        }
      }

      .employment {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .actionBtn {
          width: 320px;
        }
      }

      .actionBtn {
        height: 60px;
        font-size: 20px;
        font-weight: 500;
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
      }
    }
  }

  .itemSec {
    width: 100%;
    max-width: 310px;
    height: 100%;
    padding: 30px;
    box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.16);
    border-radius: 20px;

    & > li {
      display: flex;
      flex-direction: column;
      gap: 14px;
      padding-bottom: 20px;

      &:nth-of-type(n + 2) {
        border-top: 1px solid #d9d9d9;
        padding-top: 20px;
      }
      &:last-of-type {
        padding-bottom: 0;
      }

      .title {
        font-size: 18px;
        font-weight: 600;
      }

      &.itemBox {
        .itemImg {
          width: 100%;
          max-height: 250px;
          object-fit: contain;
          border-radius: 12px;
        }
      }

      &.transactionBox {
      }

      &.priceBox {
        .priceList {
          display: flex;
          flex-direction: column;
          gap: 10px;
          color: #7a7a7a;

          .total {
            color: #000;
            font-weight: 500;
          }
        }
      }
    }
  }
`;
