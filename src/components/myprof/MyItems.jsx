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
import { query_with_arg, getabistr_forfunction } from "../../util/contract-calls";
import { addresses } from "../../configs/addresses";
import { TIME_FETCH_MYADDRESS_DEF, TX_POLL_OPTIONS } from "../../configs/configs";
import { getmyaddress, LOGGER } from "../../util/common";
import { web3 } from "../../configs/configweb3-bscmainnet";
import { abi } from "../../contracts/abi-staker-20220414";
// import BidPopup from "../BidPopup";
import StakingPopup from "../StakingPopup";
import moment from "moment";
import PayPopup from "../PayPopup";
import { net } from "../../configs/net";
import { nettype } from "../../configs/configweb3-ropsten";
import SetErrorBar from "../../util/SetErrorBar";
import { requesttransaction } from "../../services/metamask";
import awaitTransactionMined from "await-transaction-mined";

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
  const [tokenId, setTokenId] = useState();
  let [itemData, setItemData] = useState([]);
  let [itemBalData, setItemBalData] = useState([]);
  let [kingKongItem, setKingKongItem] = useState([]);
  let [userinfo, setuserinfo] = useState(null);
  const [getTickTimer, setGetTickTimer] = useState();
  const [tickTimer, setTickTimer] = useState();
  const [ticketInfo, setTickInfo] = useState();
  const [circulations, setCirculations] = useState([]);
  let [spinner, setSpinner] = useState(false);
  const [isApproved, setIsApproved] = useState(false);

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
    axios.get(API.API_GET_KING_KONG_ITEM + `/${myaddress}/0/100/id/ASC?nettype=${net}`).then((resp) => {
      LOGGER("Buy my item", resp.data);
      let { status, list, payload } = resp.data;
      if (status == "OK") {
        setKingKongItem(list);
      }
    });

    axios
      .get(API.API_RECEIVABLES + `/${myaddress}?nettype=${net}`)
      .then((res) => {
        let { list } = res.data;
        setItemData(list);
        LOGGER("receivables", list);
      })
      .catch((err) => console.log(err));

    axios.get(API.API_ITEMBALANCES + `/${myaddress}?nettype=${net}`).then((res) => {
      let { list, status } = res.data;

      if (status === "OK" && list?.length > 0) {
        setItemBalData(list);
        LOGGER("ITEMBALANCES", list);
      }
      axios //
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

      let myaddress = getmyaddress();
      axios.get(API.API_GET_TICK_INFO + `/${myaddress}?nettype=${net}`).then((resp) => {
        let { status, respdata } = resp.data;
        if (status == "OK" && respdata !== null) {
          setTickInfo(respdata);
        }
      });
    });

    //true
    true &&
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
          setTokenId(mytokenid);
        } catch (err) {
          LOGGER(err);
          mytokenid = null;
          return;
        }
      });
  };

  useEffect(() => {
    let myaddress = getmyaddress();
    axios.get(API.API_LOGSTAKES + `/${myaddress}?nettype=${net}`).then((resp) => {
      LOGGER("API_LOGSTAKES", resp.data);
      let { status, respdata } = resp.data;
      if (status == "OK") {
        setGetTickTimer(respdata?.createdat);

        setTickTimer("2022-08-04");
      }
    });
  }, [getTickTimer]);

  useEffect(
    (_) => {
      fetchdata();
    },
    [isOpen]
  );

  const openModal = () => {
    setIsOpen((prevState) => !prevState);
  };

  const onclick_staking = () => {
    let myaddress = getmyaddress();
    if (myaddress) {
    } else {
      return;
    }
    setSpinner(true);
    let abistring;
    abistring = getabistr_forfunction({
      contractaddress: addresses.contract_erc1155,
      abikind: "STAKING",
      methodname: "deposit_batch",
      aargs: [
        //kip17토큰컨트렉터, itemData.id
      ],
    });
    requesttransaction({
      from: myaddress,
      to: myaddress, //스테이킹컨트렉터,
      data: abistring,
      value: "0x00",
    }).then((resp) => {
      console.log("$EMPLOY_res", resp);
      if (resp) {
      } else {
        SetErrorBar("User denied");
        setSpinner(false);
        return;
      }
      SetErrorBar("Staked");
      setSpinner(false);
      let txhash;
      txhash = resp;
    });
  };

  if (isMobile)
    return (
      <MmyItemsBox>
        <div className="topBar">
          <div className="sortBox">
            <button
              className="sortBtn"
              ref={sortBtnRef}
              onFocus={() => (sortBtnRef.current.style.border = "3px solid #000")}
              onBlur={() => (sortBtnRef.current.style.border = "1px solid #d9d9d9")}
              onClick={() => setSortPopup(true)}
            >
              <p>{sortOpt}</p>
              <img src={I_dnArw} alt="" />
            </button>

            {sortPopup && (
              <>
                <SelectPopup off={setSortPopup} dataList={D_sortList} select={sortOpt} setFunc={setSortOpt} />

                <PopupBg off={setSortPopup} />
              </>
            )}
          </div>

          <ul className="filterList">
            {filterList.map((cont, index) => (
              <li key={index} className={filter === index ? "on" : ""} onClick={() => setFilter(index)}>
                {cont}
              </li>
            ))}
          </ul>
        </div>

        <ul className="itemList">
          <li className="stakingBox" style={isstaked ? {} : { display: "none" }}>
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

                <button className="actionBtn" onClick={() => navigate("/")}>
                  Buy
                </button>

                <p className="description">
                  The NFT purchased by participating in the subscription auction generates 12% of profits after 3 days
                  and is sold random. In addition, the results are announced at 9:00 AM, and the transaction is
                  completed from 9:00 AM to 21:00 PM. If the transaction is not completed within time, all transactions
                  in your account will be suspended. It operates normally after applying a penalty of 10% of the winning
                  bid amount.
                </p>
              </div>
            )}
            {ticketInfo && (
              <div className="infoBox">
                <div className="titleBox">
                  <strong className="title">Lucky Ticket #{ticketInfo.id}</strong>
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
                  </div>

                  <ul className="priceBox">
                    <li>
                      <p className="key">Current price</p>
                      <p className="value">100 USDT</p>
                    </li>
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
                  The NFT purchased by participating in the subscription auction generates 12% of profits after 3 days
                  and is sold random. In addition, the results are announced at 9:00 AM, and the transaction is
                  completed from 9:00 AM to 21:00 PM. If the transaction is not completed within time, all transactions
                  in your account will be suspended. It operates normally after applying a penalty of 10% of the winning
                  bid amount.
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

                <button className="actionBtn" onClick={() => navigate("/")}>
                  Buy
                </button>

                <p className="description">
                  The NFT purchased by participating in the subscription auction generates 12% of profits after 3 days
                  and is sold random. In addition, the results are announced at 9:00 AM, and the transaction is
                  completed from 9:00 AM to 21:00 PM. If the transaction is not completed within time, all transactions
                  in your account will be suspended. It operates normally after applying a penalty of 10% of the winning
                  bid amount.
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
                      <strong className="title">{item.itemdata?.titlename}</strong>
                    </div>

                    <div className="ownedBox">
                      <p className="key">Owned by</p>
                      <p className="value">@{item.username}</p>
                    </div>
                    <div className="ownedBox">
                      <p className="key">Round Number</p>
                      <p className="value">{item.roundnumber} Round</p>
                    </div>

                    <div className="saleBox"></div>

                    <ul className="priceBox">
                      <li>
                        <p className="key">Current price</p>
                        <p className="value">{Math.ceil(item.amount * 100) / 100} USDT</p>
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
                      The NFT purchased by participating in the subscription auction generates 12% of profits after 3
                      days and is sold random. In addition, the results are announced at 9:00 AM, and the transaction is
                      completed from 9:00 AM to 21:00 PM. If the transaction is not completed within time, all
                      transactions in your account will be suspended. It operates normally after applying a penalty of
                      10% of the winning bid amount.
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
                        <strong className="value">{putCommaAtPrice(item.buyprice)} USDT</strong> */}
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
                          return <p className="value"> {parseInt(item && item.buyprice).toFixed(2)} USDT</p>;
                      })}
                    </li>
                  </ul>
                  <p className="description">
                    King Kong NFT can be staking or sold to Marketplace at a price of up to 25%. If you steaking, you
                    will get 30% annual NIP COIN reward.
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
              <li key={index} className={filter === index ? "on" : ""} onClick={() => setFilter(index)}>
                {cont}
              </li>
            ))}
          </ul>

          <div className="sortBox">
            <button
              className="sortBtn"
              ref={sortBtnRef}
              onFocus={() => (sortBtnRef.current.style.border = "3px solid #000")}
              onBlur={() => (sortBtnRef.current.style.border = "1px solid #d9d9d9")}
              onClick={() => setSortPopup(true)}
            >
              <p>{sortOpt}</p>
              <img src={I_dnArw} alt="" />
            </button>

            {sortPopup && (
              <>
                <SelectPopup off={setSortPopup} dataList={D_sortList} select={sortOpt} setFunc={setSortOpt} />

                <PopupBg off={setSortPopup} />
              </>
            )}
          </div>
        </div>

        <ul className="itemList">
          <li className="stakingBox" style={isstaked ? {} : { display: "none" }}>
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

                <button className="actionBtn" onClick={() => navigate("/")}>
                  Buy
                </button>

                <p className="description">
                  The NFT purchased by participating in the subscription auction generates 12% of profits after 3 days
                  and is sold random. In addition, the results are announced at 9:00 AM, and the transaction is
                  completed from 9:00 AM to 21:00 PM. If the transaction is not completed within time, all transactions
                  in your account will be suspended. It operates normally after applying a penalty of 10% of the winning
                  bid amount.
                </p>
              </div>
            )}

            {ticketInfo && (
              <div className="infoBox">
                <div className="titleBox">
                  <strong className="title">
                    Lucky Ticket #{ticketInfo.itemid === null ? ticketInfo.id : ticketInfo.itemid}
                  </strong>
                </div>

                <div className="ownedBox">
                  <p className="key">Owned by</p>
                  <p className="value">@{userinfo?.nickname}</p>
                </div>

                <div className="saleBox">
                  <div className="ownedBox">
                    <p className="key">Bought Date</p>
                    <p className="value">{ticketInfo && ticketInfo.createdat.split("T", 1)}</p>
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
                    </li>
                  </ul>
                </div>

                <button
                  className="actionBtn"
                  onClick={() => navigate(`/resell/${ticketInfo.username}/ticket/${tokenId}`, { state: ticketInfo })}
                >
                  SELL
                </button>

                <p className="description">
                  The NFT purchased by participating in the subscription auction generates 12% of profits after 3 days
                  and is sold random. In addition, the results are announced at 9:00 AM, and the transaction is
                  completed from 9:00 AM to 21:00 PM. If the transaction is not completed within time, all transactions
                  in your account will be suspended. It operates normally after applying a penalty of 10% of the winning
                  bid amount.
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
                      <strong className="title">#{item.itemdata.titlename}</strong>
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
                      <div className="key"></div>
                      <div className="value">
                        <strong className="price">{parseInt(item.amount).toFixed(2)} USDT</strong>
                      </div>

                      <ul className="priceBox">
                        <li>
                          <p className="key">Current price</p>
                          <p className="value">{parseInt(item.amount).toFixed(2)} USDT</p>
                        </li>
                      </ul>
                    </div>

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
                      The NFT purchased by participating in the subscription auction generates 12% of profits after 3
                      days and is sold random. In addition, the results are announced at 9:00 AM, and the transaction is
                      completed from 9:00 AM to 21:00 PM. If the transaction is not completed within time, all
                      transactions in your account will be suspended. It operates normally after applying a penalty of
                      10% of the winning bid amount.
                    </p>
                  </div>
                </li>
              );
            })}

          {itemBalData?.length !== 0 &&
            itemBalData?.map((item, index) => (
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

                  {item.group_ !== "kingkong" ? (
                    <div className="ownedBox">
                      <p className="key">Bought Date</p>
                      <p className="value">
                        {item && item.updatedat ? item.updatedat.split("T", 1) : item.createdat.split("T", 1)}
                      </p>{" "}
                      <p className="key">Sold Date</p>
                      <p className="value">
                        {item.updatedat
                          ? moment(item && item.updatedat)
                              .add(3, "days")
                              .format("YYYY-MM-DD")
                          : moment(item && item.createdat)
                              .add(3, "days")
                              .format("YYYY-MM-DD")}
                      </p>
                    </div>
                  ) : null}

                  <div className="saleBox">
                    <div className="key"></div>
                    <ul className="priceBox">
                      <li key={index}>
                        <p className="key">Current price</p>
                        <p className="value"> {parseInt(item && item.buyprice).toFixed(2)} USDT</p>
                      </li>
                      {item.group_ == "kingkong" && (
                        <>
                          <button
                            className="actionBtn"
                            onClick={() =>
                              navigate(`/resell/${item?.username}/kingkong/${item.itemid}`, { state: item[index] })
                            }
                          >
                            Sell
                          </button>
                          <button className="actionBtn_two" onClick={() => navigate("/resell/" + item.itemid)}>
                            Stake
                          </button>
                        </>
                      )}
                    </ul>
                  </div>

                  <p className="description">
                    The NFT purchased by participating in the subscription auction generates 12% of profits after 3 days
                    and is sold random. In addition, the results are announced at 9:00 AM, and the transaction is
                    completed from 9:00 AM to 21:00 PM. If the transaction is not completed within time, all
                    transactions in youasdfasdfasdfasdfsadfasdfr account will be suspended. It operates normally after
                    applying a penalty of 10% of the winning bid amount.
                  </p>
                </div>
              </li>
            ))}
          {kingKongItem.length !== 0 &&
            kingKongItem.map((item, index) => {
              if (item.isminted === 1 && item.group_ === "kingkong") {
                return (
                  <li key={index} className="swapBox">
                    <div className="imgBoxBal">
                      <img className="itemImgBal" src={item.url} alt="" />
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
                        <p className="value">
                          {item && item.updatedat ? item.updatedat.split("T", 1) : item.createdat.split("T", 1)}
                        </p>{" "}
                      </div>

                      <div className="saleBox">
                        <div className="key"></div>
                        <ul className="priceBox">
                          <li key={index}>
                            <p className="key">Current price</p>
                            <p className="value"> {parseInt(item && item.price).toFixed(2)} USDT</p>
                          </li>
                          {item.group_ == "kingkong" && (
                            <>
                              <button
                                className="actionBtn"
                                onClick={() =>
                                  navigate(`/resell/${item?.username}/kingkong/${item.itemid}`, { state: item[index] })
                                }
                              >
                                Sell
                              </button>
                              <button className="actionBtn_two" onClick={() => navigate("/resell/" + item.itemid)}>
                                Stake
                              </button>
                            </>
                          )}
                        </ul>
                      </div>

                      <p className="description">
                        The NFT purchased by participating in the subscription auction generates 12% of profits after 3
                        days and is sold random. In addition, the results are announced at 9:00 AM, and the transaction
                        is completed from 9:00 AM to 21:00 PM. If the transaction is not completed within time, all
                        transactions in youasdfasdfasdfasdfsadfasdfr account will be suspended. It operates normally
                        after applying a penalty of 10% of the winning bid amount.
                      </p>
                    </div>
                  </li>
                );
              }
            })}

          {isOpen && <PayPopup off={openModal} userInfo={userinfo} receivables={receivables} />}
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
        background-image: linear-gradient(to right, red 0%, orange 100%), linear-gradient(to right, red 0%, orange 100%);
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
        border-radius: 10px;
        border: 20px solid transparent;
        background-image: linear-gradient(red, red), linear-gradient(to right, red 0%, orange 100%);
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
          border-radius: 10px;
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
    border-radius: 50px;
    flex-direction: column;
    border-radius: 12px;
    border: 20px;
    * {
      font-family: "Roboto", sans-serif;
    }
    width: 760px;
    height: 760px;
    object-fit: contain;
    position: relative;
    overflow: hidden;
    @media screen and (max-width: 1440px) {
      min-width: 500px;
      height: 500px;
    }
    .itemImgBal {
      width: 100%;
      height: 100%;
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
        background-image: linear-gradient(to right, red 0%, orange 100%), linear-gradient(to right, red 0%, orange 100%);
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
          line-height: 20px;
          color: #fff;
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
