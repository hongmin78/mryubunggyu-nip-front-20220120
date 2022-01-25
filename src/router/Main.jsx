import { Fragment, useEffect, useRef } from "react";
import { useState } from "react";
import styled from "styled-components";
import I_ltArwWhite from "../img/icon/I_ltArwWhite.svg";
import I_rtArwWhite from "../img/icon/I_rtArwWhite.svg";
import E_interview from "../img/main/E_interview.svg";
import E_cc from "../img/common/E_cc.png";
import E_issueProf from "../img/main/E_issueProf.png";
import I_rtArw from "../img/icon/I_rtArw.svg";

import { autoAuctionList, marketPlaceList } from "../data/Dmain";
import { strDot } from "../util/Util";
import Footer from "./Footer";
import AuctionItem from "../components/AuctionItem";
import MarketItem from "../components/MarketItem";

export default function Main() {
  const headLineRef = useRef();
  const auctionRef = useRef();
  const marketRef = useRef();

  const [headLineIndex, setHeadLineIndex] = useState(0);
  const [auctionIndex, setAuctionIndex] = useState(0);
  const [marketIndex, setMarketIndex] = useState(0);

  const [likeObj, setLikeObj] = useState({});

  function onClickHeadLinePreBtn() {
    const wrapWidth = headLineRef.current.offsetWidth;
    const contWidth = headLineRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(headLineList.length / itemNumByPage);

    if (headLineIndex > 0) setHeadLineIndex(headLineIndex - 1);
    else setHeadLineIndex(pageNum - 1);
  }

  function onClickHeadLineNextBtn() {
    const wrapWidth = headLineRef.current.offsetWidth;
    const contWidth = headLineRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(headLineList.length / itemNumByPage);

    if (headLineIndex < pageNum - 1) setHeadLineIndex(headLineIndex + 1);
    else setHeadLineIndex(0);
  }

  function onClickAuctionNextBtn() {
    const wrapWidth = auctionRef.current.offsetWidth;
    const contWidth = auctionRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(autoAuctionList.length / itemNumByPage);

    if (auctionIndex < pageNum - 1) setAuctionIndex(auctionIndex + 1);
    else setAuctionIndex(0);
  }

  function onClickMarketNextBtn() {
    const wrapWidth = marketRef.current.offsetWidth;
    const contWidth = marketRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(autoAuctionList.length / itemNumByPage);

    if (marketIndex < pageNum - 1) setMarketIndex(marketIndex + 1);
    else setMarketIndex(0);
  }

  useEffect(() => {
    const wrapWidth = headLineRef.current.offsetWidth;
    const contWidth = headLineRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(headLineList.length / itemNumByPage);

    if (headLineRef.current?.scrollTo) {
      if (headLineIndex < pageNum) {
        headLineRef.current.scrollTo({
          left: contWidth * itemNumByPage * headLineIndex,
          behavior: "smooth",
        });
      } else {
        headLineRef.current.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      }
    }
  }, [headLineIndex]);

  useEffect(() => {
    const wrapWidth = auctionRef.current.offsetWidth;
    const contWidth = auctionRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);

    if (auctionRef.current?.scrollTo) {
      if (auctionIndex === 0) {
        auctionRef.current.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        auctionRef.current.scrollTo({
          left: contWidth * itemNumByPage * auctionIndex + 160,
          behavior: "smooth",
        });
      }
    }
  }, [auctionIndex]);

  useEffect(() => {
    const wrapWidth = marketRef.current.offsetWidth;
    const contWidth = marketRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);

    if (marketRef.current?.scrollTo) {
      if (marketIndex === 0) {
        marketRef.current.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        marketRef.current.scrollTo({
          left: contWidth * itemNumByPage * marketIndex + 160,
          behavior: "smooth",
        });
      }
    }
  }, [marketIndex]);

  return (
    <>
      <MainBox>
        <section className="headLineContainer">
          <ul ref={headLineRef}>
            {headLineList.map((value, index) => (
              <li key={index}>
                <article className="leftBox">
                  <span className="interview">
                    <img src={E_interview} alt="" />
                  </span>

                  <div className="titleBox">
                    <p className="title">Pak on the frontier of NFTs.</p>
                    <p className="explain">
                      The acclaimed anonymous art entity has been pioneering in
                      digital spaces for decades. Here’s what’s next.
                    </p>
                  </div>

                  <p className="bottomText">ON THE FRONTIER OF NFTS.</p>
                </article>
                <img className="mainImg" src={E_cc} alt="" />
              </li>
            ))}
          </ul>
          <button className="preBtn indexBtn" onClick={onClickHeadLinePreBtn}>
            <img src={I_ltArwWhite} alt="" />
          </button>
          <button className="nextBtn indexBtn" onClick={onClickHeadLineNextBtn}>
            <img src={I_rtArwWhite} alt="" />
          </button>
        </section>

        <section className="issueContainer">
          <article className="issueBox">
            <div className="contBox">
              <div className="profBox">
                <img src={E_issueProf} alt="" />
                <p className="nickname">@andyfeltham</p>
              </div>

              <p className="cont">
                purchased <u>Ming #122</u> at 158 USDT
              </p>
            </div>

            <div className="timeBox">4 mins ago</div>
          </article>
        </section>

        <section className="itemListContainer">
          <article className="autoAuctionBox itemListBox">
            <strong className="title">Subscription Auction</strong>

            <div className="listBox">
              <div className="posBox">
                <ul className="itemList" ref={auctionRef}>
                  {autoAuctionList.map((cont, index) => (
                    <Fragment key={index}>
                      <AuctionItem
                        data={cont}
                        index={index}
                        likeObj={likeObj}
                        setLikeObj={setLikeObj}
                      />
                    </Fragment>
                  ))}
                </ul>
                <button className="nextBtn" onClick={onClickAuctionNextBtn}>
                  <img src={I_rtArw} alt="" />
                </button>
              </div>
              <div className="posBox">
                <ul className="itemList">
                  {autoAuctionList.map((cont, index) => (
                    <Fragment key={index}>
                      <AuctionItem
                        data={cont}
                        index={index}
                        likeObj={likeObj}
                        setLikeObj={setLikeObj}
                      />
                    </Fragment>
                  ))}
                </ul>
                <button className="nextBtn">
                  <img src={I_rtArw} alt="" />
                </button>
              </div>
            </div>
          </article>

          <article className="marketplaceBox itemListBox">
            <strong className="title">MarketPlace</strong>

            <div className="posBox">
              <ul className="itemList" ref={marketRef}>
                {marketPlaceList.map((cont, index) => (
                  <Fragment key={index}>
                    <MarketItem
                      data={cont}
                      index={index}
                      likeObj={likeObj}
                      setLikeObj={setLikeObj}
                    />
                  </Fragment>
                ))}
              </ul>
              <button className="nextBtn" onClick={onClickMarketNextBtn}>
                <img src={I_rtArw} alt="" />
              </button>
            </div>
          </article>
        </section>
      </MainBox>
      <Footer />
    </>
  );
}

const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 0 0 0;

  .headLineContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background: #000;
    position: relative;

    ul {
      display: flex;
      width: 100%;
      max-width: 1020px;
      height: 420px;
      overflow-x: scroll;

      li {
        display: flex;
        justify-content: space-between;
        min-width: 100%;
        color: #fff;
        padding: 40px 0;

        .leftBox {
          display: flex;
          flex-direction: column;
          margin: 50px 0 40px;

          .interview {
            display: flex;
            align-items: center;
            width: 132px;
            height: 36px;
            padding: 0 16px;
            border: 1.2px solid #ffffff;
            border-radius: 30px;
          }

          .titleBox {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin: 20px 0 0 0;
            font-weight: 500;

            .title {
              font-size: 44px;
              line-height: 66px;
            }

            .explain {
              font-size: 18px;
              line-height: 27px;
            }
          }

          .bottomText {
            font-size: 18px;
            line-height: 24px;
          }
        }

        .mainImg {
          height: 100%;
        }
      }
    }

    .indexBtn {
      position: absolute;

      &.preBtn {
        left: 60px;
      }
      &.nextBtn {
        right: 60px;
      }
    }
  }

  .issueContainer {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    height: 104px;

    .issueBox {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      max-width: 820px;
      height: 60px;
      padding: 0 34px;
      font-size: 18px;
      line-height: 18px;
      border-radius: 50px;
      box-shadow: 0px 3px 16px rgba(0, 0, 0, 0.16);

      * {
        font-family: "Roboto", sans-serif;
      }

      .contBox {
        display: flex;
        align-items: center;
        gap: 20px;

        .profBox {
          display: flex;
          align-items: center;
          gap: 10px;

          img {
            width: 34px;
            height: 34px;
            border-radius: 50%;
            object-fit: cover;
          }
        }
      }

      .timeBox {
        color: #7a7a7a;
      }
    }
  }

  .itemListContainer {
    display: flex;
    flex-direction: column;
    gap: 80px;
    width: 100%;
    max-width: 1480px;

    .itemListBox {
      display: flex;
      flex-direction: column;
      gap: 4px;

      &.autoAuctionBox {
        padding: 60px 0 0 0;

        .detailList {
          border-top: 1px solid #f6f6f6;
        }
      }

      & > .title {
        font-size: 30px;
        line-height: 45px;
        padding: 0 20px;
      }

      .listBox {
        display: flex;
        flex-direction: column;
      }

      .posBox {
        display: flex;
        align-items: center;
        position: relative;

        .itemList {
          display: flex;
          gap: 40px;
          padding: 20px;
          overflow-x: scroll;
        }

        .nextBtn {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 54px;
          height: 54px;
          background: rgba(255, 255, 255, 0.6);
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

const headLineList = [1, 2, 3, 4];
