import { Fragment, useRef, useState, useEffect } from "react";
import styled from "styled-components";
import I_search from "../img/icon/I_search.svg";
import I_dnArw from "../img/icon/I_dnArw.svg";
import Footer from "./Footer";
import PopupBg from "../components/PopupBg";
import MarketItem from "../components/MarketItem";
import MarketItem0227 from "../components/MarketItem0227";

import { D_marketItemList, E_sortList } from "../data/Dmarket";
import SelectPopup from "../components/SelectPopup";
import { useSelector } from "react-redux";
import Header from "../components/header/Header";
import { API } from "../configs/api";
import { LOGGER } from "../util/common";
import axios from "axios";
import { net } from "../configs/net";
import EmploymentItem from "../components/EmploymentItem";
import StatusBar from "../components/StatusBar";

export default function Employed () {
  const searchBoxRef = useRef();
  const sortBtnRef = useRef();
  const statBarRef = useRef();
  const isMobile = useSelector((state) => state.common.isMobile);
  const [search, setSearch] = useState("");
  const [sortOpt, setSortOpt] = useState(E_sortList[0]);
  const [statusBar, setStatusBar] = useState(false);
  const [sortPopup, setSortPopup] = useState(false);
  const [likeObj, setLikeObj] = useState({});
  const [limit, setLimit] = useState(8);
  // let [D_marketItemList, setD_marketItemList] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(API.API_ALL_ITEMS_MARKET + `/active/1/0/100/id/DESC?nettype=${net}`);
      if (res.data && res.data.list) {
        let { list } = res.data;
        console.log("$market_items", res);
        // setD_marketItemList(list);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // const employHandler = () => {
  //   if (selectedItems.length == 0) {
  //     SetErrorBar("You have to select tokens first!");
  //     return;
  //   }

  //   let myaddress = getmyaddress(wallet);
  //   if (myaddress) {
  //   } else {
  //     return;
  //   }
  //   dispatch(setSpinner(true));

  //   const tostringitems = selectedItems.map((el) => {
  //     return String(el);
  //   });
  //   let maxfee = calc_gas_limit();
  //   console.log("tostringitems", tostringitems);
  //   let abistring;
  //   if (selectedItems.length > 1) {
  //     abistring = getabistr_forfunction({
  //       contractaddress: contractEmployer,
  //       abikind: "STAKING",
  //       methodname: "deposit_batch",
  //       aargs: [contract, tostringitems],
  //     });
  //   } else {
  //     abistring = getabistr_forfunction({
  //       contractaddress: contractEmployer,
  //       abikind: "STAKING",
  //       methodname: "deposit",
  //       aargs: [contract, tostringitems[0]],
  //     });
  //   }
  //   console.log(abistring);

  //   requestTransaction(
  //     {
  //       from: myaddress,
  //       to: contractEmployer,
  //       data: abistring,
  //       value: "0x00",
  //       gas: maxfee,
  //     },
  //     wallet
  //   ).then((resp) => {
  //     setSelectedItems([]);
  //     setSelectedItemIds([]);
  //     setchecked(undefined);
  //     console.log("$EMPLOY_res", resp);
  //     if (resp) {
  //     } else {
  //       SetErrorBar("User denied");
  //       dispatch(setSpinner(false));
  //       setchecked(false);
  //       setchecked(undefined);
  //       return;
  //     }
  //     SetErrorBar("Employed");
  //     querytokenbalance(contract, contractEmployer);
  //     queryemploytokenbalance(contract, contractEmployer);
  //     setchecked(false);
  //     setchecked(undefined);
  //     dispatch(setSpinner(false));
  //     let txhash;
  //     if (wallet == "metamask") {
  //       txhash = resp;
  //     } else if (wallet == "klaytn") {
  //       let { transactionHash } = resp;
  //       txhash = transactionHash;
  //     }
  //     axios
  //       .post(API.API_TXS + `/${txhash}`, {
  //         txhash: txhash,
  //         username: myaddress,
  //         typestr: "EMPLOYMENT_EMPLOY",
  //         auxdata: {
  //           user_action: "EMPLOYMENT_EMPLOY",
  //           contract_type: contractType, // .ETH_TESTNET
  //           contract_address: contract, // .ETH_TESTNET
  //           to_token_contract: contractEmployer,
  //           my_address: myaddress,
  //           tokenIds: tostringitems,
  //           itemIds: selectedItemIds,
  //           maxfee, // :  MAX_GAS_LIMIT
  //           appver,
  //           nettype: net,
  //         },
  //       })
  //       .then((res) => {
  //         console.log("onclickstake reported!", res);
  //       })
  //       .catch((err) => console.log(err));
  //     awaitTransactionMined.awaitTx(web3, txhash, TX_POLL_OPTIONS).then(async (minedtxreceipt) => {
  //       setIsApproved(true);
  //       console.log("minedtxreceipt", minedtxreceipt);
  //     });
  //   });
  // };

  // const unEmployHandler = () => {
  //   if (selectedItems.length == 0) {
  //     SetErrorBar("You have to select tokens first!");
  //     return;
  //   }
  //   let myaddress = getmyaddress(wallet);
  //   if (myaddress) {
  //   } else {
  //     return;
  //   }
  //   dispatch(setSpinner(true));
  //   const abistring = getabistr_forfunction({
  //     contractaddress: contractEmployer,
  //     abikind: "STAKING",
  //     methodname: "withdraw_batch",
  //     aargs: [contract, selectedItems, myaddress],
  //   });
  //   const tostringitems = selectedItems.map((el) => {
  //     return String(el);
  //   });
  //   let maxfee = calc_gas_limit();
  //   requestTransaction(
  //     {
  //       from: myaddress,
  //       to: contractEmployer,
  //       data: abistring,
  //       value: "0x00",
  //       gas: maxfee,
  //     },
  //     wallet
  //   ).then((resp) => {
  //     console.log("stake", resp);
  //     setSelectedItems([]);
  //     setSelectedItemIds([]);
  //     setchecked(undefined);
  //     if (resp) {
  //     } else {
  //       SetErrorBar("User denied");
  //       dispatch(setSpinner(false));
  //       setchecked(false);
  //       setchecked(undefined);
  //       return;
  //     }
  //     SetErrorBar("Unemployed");
  //     setchecked(false);
  //     setchecked(undefined);
  //     dispatch(setSpinner(false));
  //     querytokenbalance(contract, contractEmployer);
  //     queryemploytokenbalance(contract, contractEmployer);
  //     let txhash;
  //     if (wallet == "metamask") {
  //       txhash = resp;
  //     } else if (wallet == "klaytn") {
  //       let { transactionHash } = resp;
  //       txhash = transactionHash;
  //     }
  //     axios
  //       .post(API.API_TXS + `/${txhash}`, {
  //         txhash: txhash,
  //         username: myaddress,
  //         typestr: "EMPLOYMENT_UNEMPLOY",
  //         auxdata: {
  //           user_action: "EMPLOYMENT_UNEMPLOY",
  //           contract_type: contractType, // .ETH_TESTNET
  //           contract_address: contract, // .ETH_TESTNET
  //           to_token_contract: contractEmployer,
  //           my_address: myaddress,
  //           tokenIds: tostringitems,
  //           itemIds: selectedItemIds,
  //           maxfee, // : MAX_GAS_LIMIT
  //           appver,
  //           nettype: net,
  //         },
  //       })
  //       .then((res) => {
  //         console.log("onclickwithdraw reported!", res);
  //       })
  //       .catch((err) => console.log(err));
  //     awaitTransactionMined.awaitTx(web3, txhash, TX_POLL_OPTIONS).then(async (minedtxreceipt) => {
  //       setIsApproved(true);
  //       console.log("minedtxreceipt", minedtxreceipt);
  //     });
  //   });
  // };

  useEffect(() => {
    fetchData();
  }, []);
  if (isMobile)
    return (
      <>
        <Header />
        <MmarketBox>
          <div className="innerBox">
            <section className="topBar">
              <p className="title">Marketplace All NFTs</p>

              <article className="rightBox">
                <div className="searchBox" ref={searchBoxRef}>
                  <input
                    value={search}
                    onFocus={() => (searchBoxRef.current.style.border = "3px solid #000")}
                    onBlur={() => (searchBoxRef.current.style.border = "1px solid #d9d9d9")}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search"
                  />

                  <img src={I_search} alt="" />
                </div>

                <div className="sortBox">
                  <button
                    ref={sortBtnRef}
                    className="sortBtn"
                    onFocus={() => (sortBtnRef.current.style.border = "3px solid #000")}
                    onBlur={() => (sortBtnRef.current.style.border = "1px solid #d9d9d9")}
                    onClick={() => setSortPopup(true)}
                  >
                    <p>{sortOpt.title}</p>
                    <img src={I_dnArw} alt="" />
                  </button>

                  {sortPopup && (
                    <>
                      <SelectPopup off={setSortPopup} dataList={E_sortList} select={sortOpt} setFunc={setSortOpt} />
                      <PopupBg off={setSortPopup} />
                    </>
                  )}
                </div>
              </article>
            </section>

            <ul className="itemList">
              {D_marketItemList.map((cont, index) => {
                if (index < limit)
                  return (
                    <Fragment key={index}>
                      <EmploymentItem
                        data={cont}
                        index={index}
                        likeObj={likeObj}
                        setLikeObj={setLikeObj}
                        sortOpt={sortOpt}
                      />
                    </Fragment>
                  );
                else return <Fragment key={index} />;
              })}
            </ul>

            <button className="moreBtn" onClick={() => setLimit(limit + 4)}>
              Load more
            </button>
          </div>
        </MmarketBox>
        <Footer />
      </>
    );
  else
    return (
      <>
        <Header />
        <PmarketBox>
          <section className="topBar">
            <p className="title">{sortOpt.title}</p>

            <article className="rightBox">
              <div className="sortBox">
                <button
                  ref={statBarRef}
                  className="sortBtn"
                  onFocus={() => (statBarRef.current.style.border = "3px solid #000000")}
                  onBlur={() => (statBarRef.current.style.border = "1px solid #d9d9d9")}
                  onClick={() => setStatusBar(true)}
                >
                  <p>Status Bar</p>
                  <img src={I_dnArw} alt="" />
                </button>
                {statusBar && (
                  <>
                    <StatusBar />
                    <PopupBg off={setStatusBar} />
                  </>
                )}
              </div>

              <div className="searchBox" ref={searchBoxRef}>
                <input
                  value={search}
                  onFocus={() => (searchBoxRef.current.style.border = "3px solid #000000")}
                  onBlur={() => (searchBoxRef.current.style.border = "1px solid #d9d9d9")}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search"
                />

                <img src={I_search} alt="" />
              </div>

              <div className="sortBox">
                <button
                  ref={sortBtnRef}
                  className="sortBtn"
                  onFocus={() => (sortBtnRef.current.style.border = "3px solid #000000")}
                  onBlur={() => (sortBtnRef.current.style.border = "1px solid #d9d9d9")}
                  onClick={() => setSortPopup(true)}
                >
                  <p>{sortOpt.title}</p>
                  <img src={I_dnArw} alt="" />
                </button>

                {sortPopup && (
                  <>
                    <SelectPopup off={setSortPopup} dataList={E_sortList} select={sortOpt} setFunc={setSortOpt} />
                    <PopupBg off={setSortPopup} />
                  </>
                )}
              </div>
            </article>
          </section>

          <ul className="itemList">
            {D_marketItemList.map((cont, index) => {
              // if (index < limit)
              return (
                <Fragment key={index}>
                  <EmploymentItem
                    data={cont}
                    index={index}
                    likeObj={likeObj}
                    setLikeObj={setLikeObj}
                    sortOpt={sortOpt}
                  />
                </Fragment>
              );
              // else return <Fragment key={index} />;
            })}
          </ul>

          <button className="moreBtn" onClick={() => setLimit(limit + 4)}>
            Load more
          </button>
        </PmarketBox>
        <Footer />
      </>
    );
}

const MmarketBox = styled.div`
  padding: 56px 0 0 0;
  margin: 0 auto;
  .innerBox {
    padding: 4.44vw 20px 15.55vw 20px;

    & > .topBar {
      display: flex;
      flex-direction: column;
      gap: 4.44vw;

      .title {
        font-size: 5.55vw;
        font-weight: 600;
        line-height: 5.55vw;
      }

      .rightBox {
        display: flex;
        flex-direction: column;
        gap: 2.77vw;

        * {
          font-family: "Roboto", sans-serif;
        }

        .searchBox {
          display: flex;
          align-items: center;
          height: 12.22vw;
          padding: 0 5vw;
          border: 1px solid #d9d9d9;
          border-radius: 3.33vw;

          * {
            font-size: 5vw;
            font-size: 500;
          }

          input {
            flex: 1;

            &::placeholder {
              color: #d9d9d9;
            }
          }
        }

        .sortBox {
          width: 100%;
          position: relative;

          .sortBtn {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: inherit;
            height: 12.22vw;
            padding: 0 5vw;
            font-size: 5vw;
            line-height: 5vw;
            font-weight: 500;
            border-radius: 3.33vw;
          }
        }
      }
    }

    .itemList {
      display: flex;
      flex-direction: column;
      gap: 2.77vw;
      margin: 4.44vw 0 0 0;
    }

    .moreBtn {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 6.66vw 0 0 0;
      width: 100%;
      height: 15vw;
      font-size: 4.44vw;
      font-weight: 500;
      line-height: 4.44vw;
      color: #fff;
      background: #000;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
      border-radius: 8.33vw;
    }
  }
`;

const PmarketBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 44px;
  padding: 208px 0 220px 0;
  margin: 0 auto;
  max-width: 1440px;
  @media screen and (max-width: 1440px) {
    padding-left: 20px;
    padding-right: 20px;
  }

  .topBar {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      font-size: 44px;
      font-weight: 600;
      line-height: 44px;
    }

    .rightBox {
      display: flex;
      gap: 14px;

      * {
        font-family: "Roboto", sans-serif;
      }

      .searchBox {
        display: flex;
        align-items: center;
        width: 340px;
        height: 44px;
        padding: 0 18px;
        border: 1px solid #d9d9d9;
        border-radius: 12px;

        * {
          font-size: 18px;
          font-size: 500;
        }

        input {
          flex: 1;

          &::placeholder {
            color: #d9d9d9;
          }
        }

        button {
          display: flex;
          justify-content: center;
          align-content: center;

          img {
            width: 24px;
            height: 24px;
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
  }

  .itemList {
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
    @media screen and (max-width: 1440px) {
      justify-content: center;
    }
  }

  .moreBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 54px;
    font-size: 18px;
    font-weight: 500;
    line-height: 18px;
    color: #fff;
    background: #000;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 30px;
  }
`;
