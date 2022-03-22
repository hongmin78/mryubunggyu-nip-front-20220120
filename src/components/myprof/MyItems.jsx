import styled from "styled-components";
import I_heartO from "../../img/icon/I_heartO.svg";
import I_tIcon from "../../img/icon/I_tIcon.png";
import I_dnArw from "../../img/icon/I_dnArw.svg";
import E_item2 from "../../img/mypage/E_item2.png";
import E_staking from "../../img/common/E_staking.png";
import E_item3 from "../../img/mypage/E_item3.png";
import { putCommaAtPrice, strDot } from "../../util/Util";
import { useRef, useEffect, useState } from "react";
import PopupBg from "../../components/PopupBg";
import { D_sortList } from "../../data/DmyPage";
import { useNavigate } from "react-router-dom";
import SelectPopup from "../SelectPopup";
import { useSelector } from "react-redux";
import axios from "axios";
import { API } from "../../configs/api";
import { query_with_arg } from "../../util/contract-calls";
import { addresses } from "../../configs/addresses";
import { TIME_FETCH_MYADDRESS_DEF } from "../../configs/configs";
import { getmyaddress, LOGGER } from "../../util/common";
import moment from "moment";

const MAP_NETTYPE_SCAN = {
  ETH_TESTNET: "https://etherscan.io",
  BSC_MAINNET: "https://bscscan.com",
};
export default function MyItems() {
  const navigate = useNavigate();
  const sortBtnRef = useRef();
  const isMobile = useSelector((state) => state.common.isMobile);
  const [filter, setFilter] = useState(0);
  const [sortOpt, setSortOpt] = useState(D_sortList[1]);
  const [sortPopup, setSortPopup] = useState(false);
  const [isstaked, setisstaked] = useState(true);
  let [itemData, setItemData] = useState([]);
  let [mytokenid, setmytokenid] = useState(0);
  let [stakedata, setstakedata] = useState({});
  let [myaddress, setmyaddress] = useState();
  let [txhash, settxhash] = useState();
  let [txscanurl, settxscanurl] = useState();
  let [buydate, setbuydate] = useState([]);
  let [userinfo, setuserinfo] = useState(null);

  const fetchdata = async (_) => {
    let myaddress = getmyaddress();
    console.log("myaddress", myaddress);

    axios.get(API.API_USERINFO + `/${myaddress}`).then((resp) => {
      LOGGER("", resp.data);
      let { status, respdata } = resp.data;
      if (status == "OK") {
        setuserinfo(respdata);
      }
    });
    axios
      .get(API.API_RECEIVABLES + `/${myaddress}`)
      .then((res) => {
        console.log(res);
        let { list } = res.data;
        setItemData(list);
        LOGGER("receivables", list);
      })
      .catch((err) => console.log(err));
    axios
      .get(
        API.API_QUERY_SINGLEROW +
          `/transactions/username/${myaddress}?typestr=STAKE&status=1`
      )
      .then((resp) => {
        LOGGER("", resp.data);
        let { status, respdata } = resp.data;
        if (status == "OK") {
          let { txhash } = respdata;
          setstakedata(respdata);
          settxhash(strDot(txhash, 16, 0));
          settxscanurl(MAP_NETTYPE_SCAN[respdata.nettype] + `/tx/${txhash}`);
          let buydatetime = moment(respdata.createdat);
          setbuydate([
            buydatetime.year().toString().substr(2),
            (1 + buydatetime.month()).toString().padStart(2, "0"),
            buydatetime.day().toString().padStart(2, "0"),
            buydatetime.hour().toString().padStart(2, "0"),
          ]);
        }
      });
    query_with_arg({
      contractaddress: addresses.contract_ticketnft, // ETH_TESTNET.
      abikind: "TICKETNFT",
      methodname: "_balance_user_itemhash",
      aargs: [myaddress], // ETH_TESTNET.
    }).then(async (resp) => {
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
        setmytokenid(mytokenid);
      } catch (err) {
        LOGGER(err);
        mytokenid = null;
        return;
      }
    });
  };

  // const fetchReceivables = () => {
  //   let myAddress = getmyaddress();
  //   // fetching receivables data
  //   axios
  //     .get(API.API_RECEIVABLES + `/${myAddress}`)
  //     .then(res => {
  //       console.log(res);
  //       // let { list } = res.data;
  //       // setItemData(list);
  //       // LOGGER("receivables", list);
  //     })
  //     .catch(err => console.log(err));
  // };

  // useEffect(() => {
  //   fetchReceivables();
  // }, []);

  useEffect((_) => {
    setTimeout((_) => {
      fetchdata();
    }, TIME_FETCH_MYADDRESS_DEF);
  }, []);

  useEffect(() => {
    LOGGER("receivables1", itemData);
    itemData.forEach((el) => {
      console.log(el.itemdata.url);
    });
  }, [itemData]);

  if (isMobile)
    return (
      <MmyItemsBox>
        <div className="topBar">
          <div className="sortBox">
            <button
              className="sortBtn"
              ref={sortBtnRef}
              onFocus={() =>
                (sortBtnRef.current.style.border = "3px solid #000")
              }
              onBlur={() =>
                (sortBtnRef.current.style.border = "1px solid #d9d9d9")
              }
              onClick={() => setSortPopup(true)}
            >
              <p>{sortOpt}</p>
              <img src={I_dnArw} alt="" />
            </button>

            {sortPopup && (
              <>
                <SelectPopup
                  off={setSortPopup}
                  dataList={D_sortList}
                  select={sortOpt}
                  setFunc={setSortOpt}
                />

                <PopupBg off={setSortPopup} />
              </>
            )}
          </div>

          <ul className="filterList">
            {filterList.map((cont, index) => (
              <li
                key={index}
                className={filter === index ? "on" : ""}
                onClick={() => setFilter(index)}
              >
                {cont}
              </li>
            ))}
          </ul>
        </div>

        <ul className="itemList">
          <li
            className="stakingBox"
            style={isstaked ? {} : { display: "none" }}
          >
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

            <div className="infoBox">
              <div className="titleBox">
                <strong className="title">
                  Lucky Ticket #{("" + mytokenid)?.padStart(5, "0")}
                </strong>
              </div>

              <div className="ownedBox">
                <p className="key">Owned by</p>
                <p className="value">@{userinfo?.nickname}</p>
              </div>

              <div className="saleBox">
                <div className="price">
                  <p className="key">Current price</p>
                  <strong className="value">{putCommaAtPrice(100)} USDT</strong>
                </div>

                <div className="time">
                  <p className="key">Bought</p>
                  <ul className="timeList">
                    <li>{buydate[0]}</li>
                    <li>{buydate[1]}</li>
                    <li>{buydate[2]}</li>
                    <li>{buydate[3]}</li>
                  </ul>
                </div>
              </div>

              <ul className="priceBox">
                <li>
                  <p className="key">Current price</p>
                  <p className="value">586 USDT</p>
                </li>
                <li>
                  <p className="key">Transaction price</p>
                  <p className="value">688 USDT</p>
                </li>
                <li
                  onClick={(evt) => {
                    window.open(txscanurl);
                  }}
                >
                  <p className="key">TxHash</p>
                  <p className="value">{txhash}</p>
                </li>
              </ul>

              <button className="actionBtn" onClick={() => navigate("/resell")}>
                Sell
              </button>

              <p className="description">
                The NFT purchased by participating in the subscription auction
                generates 12% of profits after 3 days and is sold random. In
                addition, the results are announced at 9:00 AM, and the
                transaction is completed from 9:00 AM to 21:00 PM. If the
                transaction is not completed within time, all transactions in
                your account will be suspended. It operates normally after
                applying a penalty of 10% of the winning bid amount.
              </p>
            </div>
          </li>

          <li className="swapBox">
            <div className="imgBox">
              <img className="itemImg" src={E_item2} alt="" />

              <div className="topBar">
                <button className="likeBtn" onClick={() => {}}>
                  <img src={I_heartO} alt="" />
                  <p>22</p>
                </button>
              </div>
            </div>

            <div className="infoBox">
              <div className="titleBox">
                <strong className="title">Series Kong #010000</strong>
              </div>

              <div className="ownedBox">
                <p className="key">Owned by</p>
                <p className="value">@andyfeltham</p>
              </div>

              <div className="saleBox">
                <div className="price">
                  <p className="key">Current price</p>
                  <strong className="value">{putCommaAtPrice(372)} USDT</strong>
                </div>

                <div className="time">
                  <p className="key">Ending in</p>
                  <ul className="timeList">
                    <li>00</li>
                    <li>00</li>
                    <li>00</li>
                    <li>00</li>
                  </ul>
                </div>
              </div>

              <ul className="priceBox">
                <li>
                  <p className="key">Current price</p>
                  <p className="value">372 USDT</p>
                </li>
                <li>
                  <p className="key">Transaction price</p>
                  <p className="value">688 USDT</p>
                </li>
                <li
                  onClick={(evt) => {
                    window.open(txscanurl);
                  }}
                >
                  <p className="key">TxHash</p>
                  <p className="value">{txhash}</p>
                </li>
              </ul>

              <button className="actionBtn">Swap</button>

              <p className="description">
                The NFT purchased by participating in the subscription auction
                generates 12% of profits after 3 days and is sold random. In
                addition, the results are announced at 9:00 AM, and the
                transaction is completed from 9:00 AM to 21:00 PM. If the
                transaction is not completed within time, all transactions in
                your account will be suspended. It operates normally after
                applying a penalty of 10% of the winning bid amount.
              </p>
            </div>
          </li>

          <li className="sellBox">
            <div className="imgBox">
              <img className="itemImg" src={E_item3} alt="" />

              <div className="topBar">
                <button className="likeBtn" onClick={() => {}}>
                  <img src={I_heartO} alt="" />
                  <p>22</p>
                </button>
              </div>
            </div>

            <div className="infoBox">
              <div className="titleBox">
                <strong className="title">King Kong #010000</strong>
              </div>

              <div className="ownedBox">
                <p className="key">Owned by</p>
                <p className="value">@andyfeltham</p>
              </div>

              <div className="saleBox">
                <div className="price">
                  <p className="key">Current price</p>
                  <strong className="value">{putCommaAtPrice(100)} USDT</strong>
                </div>

                <div className="time">
                  <p className="key">Ending in</p>
                  <ul className="timeList">
                    <li>00</li>
                    <li>00</li>
                    <li>00</li>
                    <li>00</li>
                  </ul>
                </div>
              </div>

              <ul className="priceBox">
                <li>
                  <p className="key">Current price</p>
                  <p className="value">586 USDT</p>
                </li>
                <li>
                  <p className="key">Transaction price</p>
                  <p className="value">688 USDT</p>
                </li>
                <li
                  onClick={(evt) => {
                    window.open(txscanurl);
                  }}
                >
                  <p className="key">TxHash</p>
                  <p className="value">{txhash}</p>
                </li>
              </ul>

              <div className="btnBox">
                <button
                  className="actionBtn"
                  onClick={() => navigate("/resell")}
                >
                  Sell
                </button>
                <button className="actionBtn">Staking</button>
              </div>

              <p className="description">
                King Kong NFT can be staking or sold to Marketplace at a price
                of up to 25%. If you steaking, you will get 30% annual NIP COIN
                reward.
              </p>
            </div>
          </li>
        </ul>
      </MmyItemsBox>
    );
  else
    return (
      <PmyItemsBox>
        <div className="topBar">
          <ul className="filterList">
            {filterList.map((cont, index) => (
              <li
                key={index}
                className={filter === index ? "on" : ""}
                onClick={() => setFilter(index)}
              >
                {cont}
              </li>
            ))}
          </ul>

          <div className="sortBox">
            <button
              className="sortBtn"
              ref={sortBtnRef}
              onFocus={() =>
                (sortBtnRef.current.style.border = "3px solid #000")
              }
              onBlur={() =>
                (sortBtnRef.current.style.border = "1px solid #d9d9d9")
              }
              onClick={() => setSortPopup(true)}
            >
              <p>{sortOpt}</p>
              <img src={I_dnArw} alt="" />
            </button>

            {sortPopup && (
              <>
                <SelectPopup
                  off={setSortPopup}
                  dataList={D_sortList}
                  select={sortOpt}
                  setFunc={setSortOpt}
                />

                <PopupBg off={setSortPopup} />
              </>
            )}
          </div>
        </div>

        <ul className="itemList">
          <li
            className="stakingBox"
            style={isstaked ? {} : { display: "none" }}
          >
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

            <div className="infoBox">
              <div className="titleBox">
                <strong className="title">
                  Lucky Ticket #{("" + mytokenid)?.padStart(5, "0")}
                </strong>
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
                  <strong className="price">{putCommaAtPrice(100)} USDT</strong>

                  <ul className="timeList">
                    <li>{buydate[0]}</li>
                    <li>{buydate[1]}</li>
                    <li>{buydate[2]}</li>
                    <li>{buydate[3]}</li>
                  </ul>
                </div>

                <ul className="priceBox">
                  <li>
                    <p className="key">Current price</p>
                    <p className="value">586 USDT</p>
                  </li>
                  <li>
                    <p className="key">Transaction price</p>
                    <p className="value">688 USDT</p>
                  </li>
                  <li
                    onClick={(evt) => {
                      window.open(txscanurl);
                    }}
                  >
                    <p className="key">TxHash</p>
                    <p className="value">{txhash}</p>
                  </li>
                </ul>
              </div>

              <button className="actionBtn" onClick={() => navigate("/resell")}>
                Sell
              </button>

              <p className="description">
                The NFT purchased by participating in the subscription auction
                generates 12% of profits after 3 days and is sold random. In
                addition, the results are announced at 9:00 AM, and the
                transaction is completed from 9:00 AM to 21:00 PM. If the
                transaction is not completed within time, all transactions in
                your account will be suspended. It operates normally after
                applying a penalty of 10% of the winning bid amount.
              </p>
            </div>
          </li>

          {itemData.length !== 0 &&
            itemData.map((item) => (
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
                    <strong className="title">Series Kong #010000</strong>
                  </div>

                  <div className="ownedBox">
                    <p className="key">Owned by</p>
                    <p className="value">@andyfeltham</p>
                  </div>

                  <div className="saleBox">
                    <div className="key">
                      <p className="price">Current price</p>
                      <p className="time">Ending in</p>
                    </div>

                    <div className="value">
                      <strong className="price">
                        {putCommaAtPrice(372)} USDT
                      </strong>

                      <ul className="timeList">
                        <li>00</li>
                        <li>00</li>
                        <li>00</li>
                        <li>00</li>
                      </ul>
                    </div>

                    <ul className="priceBox">
                      <li>
                        <p className="key">Current price</p>
                        <p className="value">586 USDT</p>
                      </li>
                      <li>
                        <p className="key">Transaction price</p>
                        <p className="value">688 USDT</p>
                      </li>
                      <li
                        onClick={(evt) => {
                          window.open(txscanurl);
                        }}
                      >
                        <p className="key">TxHash</p>
                        <p className="value">{txhash}</p>
                      </li>
                    </ul>
                  </div>

                  <button className="actionBtn">Swap</button>

                  <p className="description">
                    The NFT purchased by participating in the subscription
                    auction generates 12% of profits after 3 days and is sold
                    random. In addition, the results are announced at 9:00 AM,
                    and the transaction is completed from 9:00 AM to 21:00 PM.
                    If the transaction is not completed within time, all
                    transactions in your account will be suspended. It operates
                    normally after applying a penalty of 10% of the winning bid
                    amount.
                  </p>
                </div>
              </li>
            ))}

          {/* <li className="sellBox">
            <div className="imgBox">
              <img className="itemImg" src={E_item3} alt="" />

              <div className="topBar">
                <button className="likeBtn" onClick={() => {}}>
                  <img src={I_heartO} alt="" />
                  <p>22</p>
                </button>
              </div>
            </div>

            <div className="infoBox">
              <div className="titleBox">
                <strong className="title">King Kong #010000</strong>
              </div>

              <div className="ownedBox">
                <p className="key">Owned by</p>
                <p className="value">@andyfeltham</p>
              </div>

              <div className="saleBox">
                <div className="key">
                  <p className="price">Current price</p>
                  <p className="time">Ending in</p>
                </div>

                <div className="value">
                  <strong className="price">
                    {putCommaAtPrice(686.6)} USDT
                  </strong>

                  <ul className="timeList">
                    <li>00</li>
                    <li>12</li>
                    <li>59</li>
                    <li>09</li>
                  </ul>
                </div>

                <ul className="priceBox">
                  <li>
                    <p className="key">Current price</p>
                    <p className="value">10 USDT</p>
                  </li>
                  <li>
                    <p className="key">Transaction price</p>
                    <p className="value">15 USDT</p>
                  </li>
                  <li
                    onClick={evt => {
                      window.open(txscanurl);
                    }}
                  >
                    <p className="key">TxHash</p>
                    <p className="value">{txhash}</p>
                  </li>
                </ul>
              </div>

              <div className="btnBox">
                <button
                  className="actionBtn"
                  onClick={() => navigate("/resell")}
                >
                  Sell
                </button>
                <button className="actionBtn">Staking</button>
              </div>

              <p className="description">
                King Kong NFT can be staking or sold to Marketplace at a price
                of up to 25%. If you steaking, you will get 30% annual NIP COIN
                reward.
              </p>
            </div>
          </li> */}
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

        .itemImg {
          width: 100%;
          height: 100%;
          object-fit: contain;
          position: absolute;
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
                width: 9.72vw;
                height: 9.72vw;
                font-weight: 700;
                font-size: 5.55vw;
                line-height: 5.55vw;
                color: #fff;
                background: #000;
                border-radius: 1.66vw;
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
        border-radius: 12px;
        position: relative;
        overflow: hidden;

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
