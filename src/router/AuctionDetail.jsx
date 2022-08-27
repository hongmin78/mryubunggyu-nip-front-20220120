import styled from "styled-components";
import I_clip from "../img/icon/I_clip.svg";
import I_heart from "../img/icon/I_heart.svg";
import I_heartO from "../img/icon/I_heartO.svg";
import I_3dot from "../img/icon/I_3dot.svg";
import I_rtArw from "../img/icon/I_rtArw.svg";
import { Fragment, useEffect, useRef, useState } from "react";
import { getStyle, putCommaAtPrice, strDot, onClickNextBtn, onClickPreBtn } from "../util/Util";
import { D_category, D_transactionHistory } from "../data/DauctionDetail";
import Offer from "../components/itemDetail/Offer";
import { autoAuctionList } from "../data/Dmain";
// import AuctionItem from "../components/AuctionItem";
import I_tagWhite from "../img/icon/I_tagWhite.svg";
import I_arwCrossWhite from "../img/icon/I_arwCrossWhite.svg";
import AuctionItem0228 from "../components/AuctionItem0228";
import Details from "../components/itemDetail/Details";
import Details0303 from "../components/itemDetail/Details0303";
import Properties from "../components/itemDetail/Properties";
import { useSelector } from "react-redux";
import Header from "../components/header/Header";
import PopupBg from "../components/PopupBg";

import axios from "axios";
import { useParams } from "react-router-dom";
import { LOGGER, getmyaddress, onclickcopy, PARSER, conv_jdata_arrkeyvalue } from "../util/common";
import { API } from "../configs/api";
import SetErrorBar from "../util/SetErrorBar";
import { messages } from "../configs/messages";
import { ITEM_PRICE_DEF } from "../configs/configs";
import { GET_CONTENTS_DEF } from "../configs/configs";
import moment from "moment";
import { net } from "../configs/net";
import person from "../img/itemDetail/E_prof3.png";

export default function AuctionDetail() {
  const params = useParams();
  const moreRef = useRef();
  const isMobile = useSelector((state) => state.common.isMobile);
  const [toggleLike, setToggleLike] = useState(false);
  const [category, setCategory] = useState(0);
  const [moreIndex, setMoreIndex] = useState(0);
  const [moreAutcionIndex, setMoreAuctionIndex] = useState(0);
  const [showCopyBtn, setShowCopyBtn] = useState(false);
  const [itemdata, setitemdata] = useState();
  const [moreCollection, setMoreCollection] = useState([]);
  let [attributes, setattributes] = useState([]);

  const [transaction, setTranSaction] = useState([]);

  const onclicklike = (_) => {
    let myaddress = getmyaddress();
    if (myaddress) {
    } else {

      return;
    }
    axios
      .post(API.API_TOGGLE_FAVORITE + `/${itemdata?.itemid}?nettype=${net}`, {
        username: myaddress,
        nettype: net,
      })
      .then((resp) => {
        LOGGER("", resp.data);
        let { status, respdata } = resp.data;
        if (status == "OK") {
          setToggleLike(respdata ? true : false);
          switch (+respdata) {
            case 1:
              SetErrorBar(messages.MSG_DONE_LIKE);
              break;
            default:
              SetErrorBar(messages.MSG_DONE_UNLIKE);
              break;
          }
        }
      });
    setToggleLike(!toggleLike);
  };

  function onClickAuctionNextBtn() {
    if (!moreRef.current.children[0]) return;
    const wrapWidth = moreRef.current.offsetWidth;
    const contWidth = moreRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(moreCollection.length / itemNumByPage);
    if (moreIndex < pageNum - 1) setMoreIndex(moreIndex + 1);
    else setMoreIndex(0);
  }
  const getitem = (_) => {
    axios.get(API.API_GET_ITEMS_DETAIL + `/${params.itemid}?nettype=${net}`).then((resp) => {
      LOGGER("7FzS4oxYPN", resp.data);
      let { status, respdata } = resp.data;
      if (status == "OK") {
        setitemdata(respdata);
        let { metadata } = respdata;
        if (metadata) {
          let jmetadata = JSON.parse(metadata);
          LOGGER("oXhffF8eTM", conv_jdata_arrkeyvalue(jmetadata));
          setattributes(jmetadata);
        }
      }
    });
    axios.get(API.API_GET_TRANSACTIONS + `/${params.itemid}?nettype=${net}`).then((resp) => {
      LOGGER("transction", resp.data);
      let { status, respdata } = resp.data;
      if (status === "OK") {
        setTranSaction(resp.data.list.splice(1, resp.data.list.length - 1));
      }
    });
  };

  const setIcon = (param) => {
    switch (param) {
      case "TENTATIVE_ASSIGN":
        return <img src={I_tagWhite} alt="" />;
      case "PAY":
        return <img src={I_arwCrossWhite} alt="" />;
      default:
        break;
    }
  };

  function getAuction() {
    axios
      .get(API.API_COMMONITEMS + `/items/group_/kong/0/128/roundnumber/DESC?nettype=${net}` + `&itemdetail=1`)
      .then((resp) => {
        LOGGER("@circulations", resp.data);
        let { status, list } = resp.data;
        if (status == "OK") {
          let roundNumber1 = list.filter((item) => item.roundnumber > 0);
          setMoreCollection(roundNumber1);
        }
      });
  }

  useEffect(
    (_) => {
      getitem();
    },
    [params]
  );

  useEffect(() => {
    getAuction();
  }, []);

  useEffect(() => {
    if (!moreRef.current.children[0]) return;
    const wrapWidth = moreRef.current.offsetWidth;
    const contWidth = moreRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    if (moreRef.current?.scrollTo) {
      if (moreIndex === 0) {
        moreRef.current.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        moreRef.current.scrollTo({
          left: contWidth * itemNumByPage * moreIndex + moreIndex * getStyle(moreRef, "gap") * itemNumByPage,
          behavior: "smooth",
        });
      }
    }
  }, [moreIndex]);

  if (isMobile)
    return (
      <>
        <Header />

        <MauctionDetailBox>
          <section className="itemInfoContainer">
            <span className="itemImgBox">
              <img className="itemImg" src={itemdata?.url} alt="" />
            </span>

            <article className="infoBox">
              <div className="itemInfoBox">
                <div className="titleBox">
                  <div className="topBar">
                    <div className="btnBox">
                      <button
                        className="likeBtn hoverBtn"
                        onClick={() => {
                          onclicklike(); // onclick favorite ()
                        }}
                      >
                        <img src={toggleLike ? I_heartO : I_heart} alt="" />
                      </button>
                      <button className="moreBtn hoverBtn" onClick={() => setShowCopyBtn(true)}>
                        <img src={I_3dot} alt="" />
                      </button>
                    </div>

                    {showCopyBtn && (
                      <>
                        <button
                          className="copyBtn displayBtn"
                          onClick={() => {
                            onclickcopy(window.location.href);
                            SetErrorBar(messages.MSG_COPIED);
                            setShowCopyBtn(false);
                          }}
                        >
                          <img src={I_clip} alt="" />
                          Copy Link
                        </button>
                        <PopupBg off={setShowCopyBtn} />
                      </>
                    )}
                  </div>

                  <strong className="title">
                    Series {itemdata?.group_} {attributes.name}
                  </strong>
                </div>

                <div className="ownedBox">
                  <p className="key">Owned by</p>
                  {itemdata && <p className="value">@ {itemdata?.circulations?.username}</p>}
                </div>

                <div className="saleBox">
                  <div className="price">
                    <p className="key">Current price</p>
                    {itemdata && (
                      <strong className="price">
                        {putCommaAtPrice(parseInt(itemdata?.circulations?.price))} {itemdata?.circulations?.priceunit}{" "}
                      </strong>
                    )}
                  </div>
                </div>
              </div>

              <div className="categoryBox">
                <ul className="category">
                  {D_category.map((cont, index) => (
                    <li key={index} onClick={() => setCategory(index)}>
                      {cont}

                      <div
                        className="underLine"
                        style={{
                          display: category === index && "block",
                        }}
                      />
                    </li>
                  ))}
                </ul>

                <div className="contBox">
                  {category === 0 && <Offer params={params} path="auction" />}
                  {category === 1 && <Details0303 attributes={attributes} />}
                  {category === 2 && <Properties itemdata={itemdata} />}
                </div>
              </div>
            </article>
          </section>

          <section className="historyBox">
            <article className="titleBox">
              <strong className="title">Transaction History</strong>
            </article>
            <ul className="historyList">
              {transaction?.map((itm, index) => (
                <Fragment key={index}>
                  {index ? (
                    <div className="sideBarBox">
                      <span className="sideBar" />
                    </div>
                  ) : (
                    <></>
                  )}
                  <li>
                    <span className="iconBox">
                      <img src={I_tagWhite} alt="" />
                    </span>

                    <div className="contBox">
                      <p className="cont">
                        {strDot(itm.username, 15)} / {putCommaAtPrice(parseInt(itemdata?.circulations?.price))} USDT{" "}
                      </p>
                      <p className="time">{itm.createdat?.split("T")[0]}</p>
                    </div>
                  </li>
                </Fragment>
              ))}
            </ul>
          </section>
          <section className="moreBox">
            <strong className="title">More from this collection</strong>

            <div className="listBox">
              <div className="posBox">
                <ul className="itemList" ref={moreRef}>
                  {moreCollection.map((cont, index) => (
                    <Fragment key={index}>
                      <AuctionItem0228 data={cont} index={index} />
                    </Fragment>
                  ))}
                </ul>
                <button
                  className="nextBtn"
                  onClick={() => {
                    onClickAuctionNextBtn();
                  }}
                >
                  <img src={I_rtArw} alt="" />
                </button>
              </div>
            </div>
          </section>

          <button className="bidBtn">Auction in progress..</button>
        </MauctionDetailBox>
      </>
    );
  else
    return (
      <>
        <Header />
        <PauctionDetailBox>
          <section className="itemInfoContainer">
            <span className="itemImgBox">
              <img className="itemImg" src={itemdata?.url} alt="" />
            </span>

            <article className="infoBox">
              <div className="itemInfoBox">
                <div className="titleBox">
                  <strong className="title">
                    Series {itemdata?.group_} {itemdata?.titlename}
                  </strong>

                  <div className="btnBox">
                    <div className="posBox">
                      <button
                        className="likeBtn hoverBtn"
                        onClick={() => {
                          onclicklike(); // onclickfavorite()
                        }}
                      >
                        <img src={toggleLike ? I_heartO : I_heart} alt="" />
                      </button>
                    </div>

                    <div className="posBox">
                      <button className="moreBtn hoverBtn" onClick={() => setShowCopyBtn(true)}>
                        <img src={I_3dot} alt="" />
                      </button>

                      <div className="hoverBox">
                        <button
                          className="copyBtn displayBtn"
                          onClick={() => {
                            onclickcopy(window.location.href);
                            SetErrorBar(messages.MSG_COPIED);
                            setShowCopyBtn(false);
                          }}
                        >
                          <img src={I_clip} alt="" />
                          Copy Link
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ownedBox">
                  <p className="key">Owned by</p>
                  {itemdata && <p className="value">@ {itemdata?.circulations?.username}</p>}
                </div>

                <div className="saleBox">
                  <div className="key">
                    <p className="price">Current price</p>
                  </div>

                  <div className="value">
                    {itemdata && (
                      <strong className="price">
                        {putCommaAtPrice(parseInt(itemdata?.circulations?.price))} {itemdata?.circulations?.priceunit}{" "}
                      </strong>
                    )}
                  </div>
                </div>

                <button className="bidBtn">Auction in progress..</button>
              </div>

              <div className="categoryBox">
                <ul className="category">
                  {D_category.map((cont, index) => (
                    <li key={index} onClick={() => setCategory(index)}>
                      {cont}

                      <div
                        className="underLine"
                        style={{
                          display: category === index && "block",
                        }}
                      />
                    </li>
                  ))}
                </ul>

                <div className="contBox">
                  {category === 0 && <Offer params={params} type="aution" />}
                  {category === 1 && <Details0303 attributes={attributes} />}
                  {category === 2 && <Properties itemdata={itemdata} />}
                </div>
              </div>
            </article>
          </section>

          <section className="historyBox">
            <article className="titleBox">
              <strong className="title">Transaction History</strong>
            </article>

            <ul className="historyList">
              {transaction?.map((itm, index) => (
                <Fragment key={index}>
                  {index ? (
                    <div className="sideBarBox">
                      <span className="sideBar" />
                    </div>
                  ) : (
                    <></>
                  )}
                  <li>
                    <span className="iconBox">
                      <img src={I_tagWhite} alt="" />
                    </span>

                    <div className="contBox">
                      <p className="cont">
                        {strDot(itm.username, 15)} / {putCommaAtPrice(parseInt(itm?.amount))} USDT{" "}
                      </p>
                      <p className="time">{itm.createdat?.split("T")[0]}</p>
                    </div>
                  </li>
                </Fragment>
              ))}
            </ul>

            <ul className="historyList">
              {itemdata?.itemhistories &&
                itemdata?.itemhistories.map((cont, index) => (
                  <Fragment key={index}>
                    {index ? (
                      <div className="sideBarBox">
                        <span className="sideBar" />
                      </div>
                    ) : (
                      <></>
                    )}
                    <li>
                      <span className="iconBox">{setIcon(cont.typestr)}</span>

                      <div className="contBox">
                        <p className="cont">{cont.typestr}</p>
                        <p className="time">{moment(cont.createdat).fromNow()}</p>
                      </div>
                    </li>
                  </Fragment>
                ))}
            </ul>
          </section>

          <section className="moreBox">
            <strong className="title">More from this collection</strong>

            <div className="listBox">
              <div className="posBox">
                <ul className="itemList" ref={moreRef}>
                  {moreCollection.map((cont, index) => (
                    <Fragment key={index}>
                      <AuctionItem0228 data={cont} index={index} />
                    </Fragment>
                  ))}
                </ul>
                <button
                  className="nextBtn"
                  onClick={() => {
                    onClickAuctionNextBtn();
                  }}
                >
                  <img src={I_rtArw} alt="" />
                </button>
              </div>
            </div>
          </section>
        </PauctionDetailBox>
      </>
    );
}

const MauctionDetailBox = styled.div`
  padding: 72px 0 80px 0;

  * {
    font-family: "Roboto", sans-serif;
  }

  .itemInfoContainer {
    .itemImg {
      width: 100%;
      height: 100vw;
      object-fit: contain;
      border-radius: 5.55vw;
    }

    & > .infoBox {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;

      .itemInfoBox {
        padding: 5.55vw 5.55vw 0 5.55vw;

        .titleBox {
          display: flex;
          flex-direction: column;
          gap: 3.33vw;
          font-size: 56px;
          font-weight: 600;
          line-height: 84px;

          .topBar {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .btnBox {
              display: flex;
              gap: 5vw;

              button {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 8.33vw;
                height: 8.33vw;
                border-radius: 50%;
                box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);

                &.likeBtn {
                  padding: 1.94vw;
                }

                &.moreBtn {
                  padding: 1.38vw;
                }

                img {
                  width: 100%;
                }
              }
            }

            .copyBtn {
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 2.22vw;
              width: 32.22vw;
              height: 8.33vw;
              font-size: 3.88vw;
              font-weight: 500;
              line-height: 3.88vw;
              background: #fff;
              border-radius: 1.66vw;
              box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

              img {
                height: 5vw;
              }
            }
          }

          .title {
            font-size: 7.77vw;
            line-height: 7.77vw;
            font-family: "Poppins", sans-serif;
          }
        }

        .ownedBox {
          display: flex;
          gap: 2.22vw;
          margin: 2.22vw 0 0 0;
          font-size: 3vw;
          font-weight: 500;

          .key {
            color: #7a7a7a;
          }
        }

        .saleBox {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin: 4.44vw 0 0 0;

          .price {
            display: flex;
            flex-direction: column;
            gap: 1.11vw;

            .key {
              font-size: 3.88vw;
              font-weight: 500;
              line-height: 3.88vw;
            }

            .value {
              font-size: 6.11vw;
            }
          }

          .time {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 3.05vw;

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
      }

      .categoryBox {
        margin: 10vw 0 0 0;

        .category {
          display: flex;
          height: 16.66vw;
          border-bottom: 1.4px solid #d9d9d9;

          li {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            font-size: 4.44vw;
            font-weight: 600;
            font-family: "Poppins", sans-serif;
            position: relative;
            cursor: pointer;

            .underLine {
              display: none;
              width: 100%;
              height: 4px;
              background: #000;
              bottom: 0;
              position: absolute;
            }
          }
        }

        .contBox {
          height: 90.83vw;
          overflow-y: scroll;

          &::-webkit-scrollbar {
            width: 10px;
          }

          &::-webkit-scrollbar-thumb {
            width: 10px;
            background-color: #d9d9d9;
            border-radius: 8px;
          }

          &::-webkit-scrollbar-track {
            background-color: #fff;
          }
        }
      }
    }
  }

  .historyBox {
    margin: 9.44vw 0 0 0;

    .titleBox {
      display: flex;
      align-items: center;
      height: 13.88vw;
      border-bottom: 1.4px solid #d9d9d9;

      .title {
        padding: 0 20px;
        font-size: 5vw;
        line-height: 5vw;
      }
    }

    .historyList {
      display: flex;
      flex-direction: column;
      gap: 2.22vw;
      padding: 40px 20px 0;

      .sideBarBox {
        display: flex;
        justify-content: center;
        width: 10.55vw;

        .sideBar {
          width: 0.55vw;
          height: 5.55vw;
          background: #d9d9d9;
        }
      }

      li {
        display: flex;
        align-items: center;
        gap: 3.33vw;

        .iconBox {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 10.55vw;
          height: 10.55vw;
          padding: 2.5vw;
          border-radius: 50%;
          background: #004ce0;

          img {
            width: 100%;
          }
        }

        .contBox {
          display: flex;
          flex-direction: column;

          .cont {
            font-size: 3.88vw;
            font-weight: 500;
          }

          .time {
            font-size: 3.33vw;
            color: #7a7a7a;
          }
        }
      }
    }
  }

  .moreBox {
    display: flex;
    flex-direction: column;
    gap: 1.38vw;
    padding: 0;
    margin: 15.55vw 0 0 0;

    .title {
      padding: 0 20px;
      font-size: 5vw;
    }

    .listBox {
      .posBox {
        display: flex;
        align-items: center;
        position: relative;

        .itemList {
          display: flex;
          gap: 20px;
          padding: 20px;
          overflow-x: scroll;

          .item {
            min-width: 100%;
          }
        }

        .nextBtn {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 54px;
          height: 54px;
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid #f6f6f6;
          border-radius: 50%;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
          position: absolute;
          z-index: 2;
          right: 6px;
        }
      }
    }
  }

  .bidBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 60px;
    font-size: 20px;
    font-weight: 500;
    color: #fff;
    background: #000;
    right: 0;
    bottom: 0;
    left: 0;
    position: fixed;
    z-index: 4;
  }
`;

const PauctionDetailBox = styled.div`
  max-width: 1480px;
  padding: 180px 0 220px 0;
  margin: 0 auto;

  & > * {
    padding: 0 20px;
  }

  * {
    font-family: "Roboto", sans-serif;
  }

  & > .topBar {
    display: flex;
    justify-content: flex-end;
  }

  .itemInfoContainer {
    display: flex;
    justify-content: space-between;
    gap: 40px;

    .itemImgBox {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 760px;
      height: 760px;
      object-fit: contain;

      @media screen and (max-width: 1440px) {
        min-width: 500px;
        height: 500px;
        border-radius: 20px;
      }

      .itemImg {
        height: 100%;
        border-radius: 20px;
      }
    }

    & > .infoBox {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      max-width: 608px;
      min-width: 445px;
      width: 100%;

      .itemInfoBox {
        .titleBox {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          font-size: 40px;
          font-weight: 600;
          line-height: 60px;

          .title {
            font-family: "Poppins", sans-serif;
          }

          .btnBox {
            display: flex;
            gap: 20px;

            .posBox {
              position: relative;

              &:hover {
                .hoverBox {
                  display: flex;
                  justify-content: flex-end;
                }
              }

              .hoverBtn {
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

              .hoverBox {
                display: none;
                width: 100%;
                height: 108px;
                bottom: 0;
                position: absolute;

                .copyBtn {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  gap: 10px;
                  min-width: 152px;
                  width: 152px;
                  height: 44px;
                  font-size: 18px;
                  font-weight: 500;
                  line-height: 18px;
                  background: #fff;
                  border-radius: 12px;
                  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                }
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
        }

        .bidBtn {
          width: 100%;
          height: 60px;
          margin: 44px 0 0 0;
          font-size: 20px;
          font-weight: 500;
          box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
          border-radius: 12px;
        }
      }

      .categoryBox {
        .category {
          display: flex;
          height: 66px;
          border-bottom: 1.4px solid #d9d9d9;

          li {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            padding: 0 16px;
            font-size: 18px;
            font-weight: 600;
            font-family: "Poppins", sans-serif;
            position: relative;
            cursor: pointer;

            .underLine {
              display: none;
              width: 100%;
              height: 4px;
              background: #000;
              position: absolute;
              bottom: 0;
            }
          }
        }

        .contBox {
          height: 270px;
          overflow-y: scroll;

          &::-webkit-scrollbar {
            width: 10px;
          }

          &::-webkit-scrollbar-thumb {
            width: 10px;
            background-color: #d9d9d9;
            border-radius: 8px;
          }

          &::-webkit-scrollbar-track {
            background-color: #fff;
          }
        }
      }
    }
  }

  .historyBox {
    margin: 120px 0 0 0;

    .titleBox {
      display: flex;
      align-items: center;
      height: 88px;
      border-bottom: 1.4px solid #d9d9d9;

      .title {
        font-size: 34px;
        font-weight: 700;
        line-height: 34px;
      }
    }

    .historyList {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 40px 20px 0;

      .sideBarBox {
        display: flex;
        justify-content: center;
        width: 52px;

        .sideBar {
          width: 2px;
          height: 20px;
          background: #d9d9d9;
        }
      }

      li {
        display: flex;
        align-items: center;
        gap: 16px;

        .iconBox {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: #004ce0;
        }

        .contBox {
          display: flex;
          flex-direction: column;
          gap: 6px;

          .cont {
            font-weight: 500;
          }

          .time {
            color: #7a7a7a;
          }
        }
      }
    }
  }

  .moreBox {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 0;
    margin: 120px 0 0 0;

    .title {
      padding: 0 20px;
      font-size: 30px;
    }

    .listBox {
      .posBox {
        display: flex;
        align-items: center;
        position: relative;

        .itemList {
          display: flex;
          gap: 40px;
          width: 100%;
          padding: 20px;
          overflow-x: scroll;
        }

        .nextBtn {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 54px;
          height: 54px;
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid #f6f6f6;
          border-radius: 50%;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
          position: absolute;
          z-index: 2;
          right: -7px;
        }
      }
    }
  }
`;
