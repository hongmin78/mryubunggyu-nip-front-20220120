import styled from "styled-components";
import I_x from "../img/icon/I_x.svg";
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

    query_with_arg({
      contractaddress: addresses.contract_USDT,
      abikind: "ERC20",
      methodname: "allowance",
      aargs: [myaddress, addresses.contract_erc1155_sales],
    }).then((resp) => {
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

    let abistr = getabistr_forfunction({
      contractaddress: addresses.contract_USDT,
      abikind: "ERC20",
      methodname: "approve",
      aargs: [addresses.contract_erc1155_sales, getweirep("" + 10000_0000)],
    });

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

    let abistr = await getabistr_forfunction({
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
      ],
    });
    console.log("", abistr);
    requesttransaction({
      from: myaddress,
      to: addresses.contract_erc1155_sales,
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
          <button className="exitBtn" onClick={() => off()}>
            <img src={I_x} alt="" />
          </button>
        </article>

        <article className="contBox">
          <div className="itemBox">
            <img src={itemdata?.url} alt="" />
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
              </li>
            </ul>
          </div>

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
    height: 16.66vw;
    padding: 0 7.22vw;

    .title {
      font-size: 5vw;
      font-weight: 600;
      line-height: 5vw;
    }

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
          }
        }
      }
    }

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
      }
    }
  }
`;

const PbidPopupBox = styled.section`
  width: 540px;
  padding: 0;
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
      }
    }
  }
`;
