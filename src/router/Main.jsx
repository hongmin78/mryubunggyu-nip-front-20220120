import { Fragment, useEffect, useRef } from "react";
import { useState } from "react";
import styled from "styled-components";
import { D_faqList, D_issueList, marketPlaceList } from "../data/Dmain";
import Footer from "./Footer";
import AuctionItem from "../components/AuctionItem";
import MarketItem from "../components/MarketItem";
import Header from "../components/header/Header";
import { useSelector } from "react-redux";
import { getStyle } from "../util/Util";
import FaqItem from "../components/FaqCont";
import { useNavigate } from "react-router-dom";

import E_interview from "../img/main/E_interview.svg";
import E_issueProf from "../img/main/E_issueProf.png";
import I_rtArw from "../img/icon/I_rtArw.svg";
import I_ltArwWhite from "../img/icon/I_ltArwWhite.svg";
import I_rtArwWhite from "../img/icon/I_rtArwWhite.svg";
import I_upArw3 from "../img/icon/I_upArw3.svg";
import E_staking from "../img/common/E_staking.png";
import B_tip1 from "../img/main/B_tip1.png";
import B_tip2 from "../img/main/B_tip2.png";
import B_tip3 from "../img/main/B_tip3.png";
import axios from "axios";

export default function Main() {
  const navigate = useNavigate();

  const headLineRef = useRef();
  const issueRef = useRef();
  const firstAuctionRef = useRef();
  const secondAuctionRef = useRef();
  const marketRef = useRef();
  const ticketRef = useRef();
  const faqRef = useRef();

  let issueIndex = 0;

  const isMobile = useSelector((state) => state.common.isMobile);

  const [headLineIndex, setHeadLineIndex] = useState(0);
  const [firstAuctionIndex, setFirstAuctionIndex] = useState(0);
  const [secondAuctionIndex, setSecondAuctionIndex] = useState(0);
  const [marketIndex, setMarketIndex] = useState(0);
  const [ticketIndex, setTicketIndex] = useState(0);
  const [faqIndex, setFaqIndex] = useState(0);

  const [auctionListFirst, setAuctionListFirst] = useState([]);
  const [auctionListSecond, setAuctionListSecond] = useState([]);

  const [likeObj, setLikeObj] = useState({});

  function onClickHeadLinePreBtn() {
    if (!headLineRef.current.children) return;
    const wrapWidth = headLineRef.current.offsetWidth;
    const contWidth = headLineRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(headLineList.length / itemNumByPage);

    if (headLineIndex > 0) setHeadLineIndex(headLineIndex - 1);
    else setHeadLineIndex(pageNum - 1);
  }

  function onClickHeadLineNextBtn() {
    if (!headLineRef.current.children) return;
    const wrapWidth = headLineRef.current.offsetWidth;
    const contWidth = headLineRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(headLineList.length / itemNumByPage);

    if (headLineIndex < pageNum - 1) setHeadLineIndex(headLineIndex + 1);
    else setHeadLineIndex(0);
  }

  function onClickFirstAuctionNextBtn() {
    if (!firstAuctionRef.current.children) return;
    const wrapWidth = firstAuctionRef.current.offsetWidth;
    const contWidth = firstAuctionRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(auctionListFirst.length / itemNumByPage);

    if (firstAuctionIndex < pageNum - 1)
      setFirstAuctionIndex(firstAuctionIndex + 1);
    else setFirstAuctionIndex(0);
  }

  function onClickSecondAuctionNextBtn() {
    if (!secondAuctionRef.current.children) return;
    const wrapWidth = secondAuctionRef.current.offsetWidth;
    const contWidth = secondAuctionRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(auctionListFirst.length / itemNumByPage);

    if (secondAuctionIndex < pageNum - 1)
      setSecondAuctionIndex(firstAuctionIndex + 1);
    else setSecondAuctionIndex(0);
  }

  function onClickMarketNextBtn() {
    if (!marketRef.current.children) return;
    const wrapWidth = marketRef.current.offsetWidth;
    const contWidth = marketRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(auctionListFirst.length / itemNumByPage);

    if (marketIndex < pageNum - 1) setMarketIndex(marketIndex + 1);
    else setMarketIndex(0);
  }

  function onClickTicketNextBtn() {
    if (!ticketRef.current.children) return;
    const wrapWidth = ticketRef.current.offsetWidth;
    const contWidth = ticketRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(ticketList.length / itemNumByPage);

    if (ticketIndex < pageNum - 1) setTicketIndex(ticketIndex + 1);
    else setTicketIndex(0);
  }

  function onClickFaqPreBtn() {
    if (!faqRef.current.children) return;
    const wrapWidth = faqRef.current.offsetWidth;
    const contWidth = faqRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(D_faqList.length / itemNumByPage);

    if (faqIndex > 0) setFaqIndex(faqIndex - 1);
    else setFaqIndex(pageNum - 1);
  }

  function onClickFaqNextBtn() {
    if (!faqRef.current.children) return;
    const wrapWidth = faqRef.current.offsetWidth;
    const contWidth = faqRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(D_faqList.length / itemNumByPage);

    if (faqIndex < pageNum - 1) setFaqIndex(faqIndex + 1);
    else setFaqIndex(0);
  }

  function onClickTopBtn() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function getAuction() {
    axios
      .get("http://nips1.net:34805/auction/list", { params: { limit: 16 } })
      .then((res) => {
        console.log(res.data);
        setAuctionListFirst(res.data.slice(0, 8));
        setAuctionListSecond(res.data.slice(8));
      });
  }

  useEffect(() => {
    getAuction();

    setInterval(() => {
      if (!issueRef.current) return;

      const contHeight = issueRef.current.children[0].offsetHeight;
      issueIndex++;

      if (issueRef.current?.scrollTo) {
        if (issueIndex < D_issueList.length) {
          issueRef.current.scrollTo({
            top:
              contHeight * issueIndex + issueIndex * getStyle(issueRef, "gap"),
            behavior: "smooth",
          });
        } else {
          issueRef.current.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
      }
    }, 5000);
  }, []);

  useEffect(() => {
    if (!headLineRef.current) return;
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
    if (!firstAuctionRef.current || !firstAuctionRef.current.children[0])
      return;
    const wrapWidth = firstAuctionRef.current.offsetWidth;
    const contWidth = firstAuctionRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);

    if (firstAuctionRef.current?.scrollTo) {
      if (firstAuctionIndex === 0) {
        firstAuctionRef.current.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        firstAuctionRef.current.scrollTo({
          left:
            contWidth * itemNumByPage * firstAuctionIndex +
            firstAuctionIndex *
              getStyle(firstAuctionRef, "gap") *
              itemNumByPage,
          behavior: "smooth",
        });
      }
    }
  }, [firstAuctionIndex]);

  useEffect(() => {
    if (!secondAuctionRef.current || !secondAuctionRef.current.children[0])
      return;
    const wrapWidth = secondAuctionRef.current.offsetWidth;
    const contWidth = secondAuctionRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);

    if (secondAuctionRef.current?.scrollTo) {
      if (secondAuctionIndex === 0) {
        secondAuctionRef.current.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        secondAuctionRef.current.scrollTo({
          left:
            contWidth * itemNumByPage * secondAuctionIndex +
            secondAuctionIndex *
              getStyle(secondAuctionRef, "gap") *
              itemNumByPage,
          behavior: "smooth",
        });
      }
    }
  }, [secondAuctionIndex]);

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
          left:
            contWidth * itemNumByPage * marketIndex +
            marketIndex * getStyle(marketRef, "gap") * itemNumByPage,
          behavior: "smooth",
        });
      }
    }
  }, [marketIndex]);

  useEffect(() => {
    const wrapWidth = ticketRef.current.offsetWidth;
    const contWidth = ticketRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);

    if (ticketRef.current?.scrollTo) {
      if (ticketIndex === 0) {
        ticketRef.current.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        ticketRef.current.scrollTo({
          left:
            contWidth * itemNumByPage * ticketIndex +
            ticketIndex * getStyle(ticketRef, "gap"),
          behavior: "smooth",
        });
      }
    }
  }, [ticketIndex]);

  useEffect(() => {
    const wrapWidth = faqRef.current.offsetWidth;
    const contWidth = faqRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);

    if (faqRef.current?.scrollTo) {
      if (faqIndex === 0) {
        faqRef.current.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        faqRef.current.scrollTo({
          left:
            contWidth * itemNumByPage * faqIndex +
            faqIndex * getStyle(faqRef, "gap"),
          behavior: "smooth",
        });
      }
    }
  }, [faqIndex]);

  if (isMobile)
    return (
      <>
        <Header />
        <MmainBox>
          <section className="headLineContainer">
            <ul ref={headLineRef}>
              {headLineList.map((value, index) => (
                <li key={index}>
                  <div className="innerBox">
                    <span className="interview">
                      <img src={E_interview} alt="" />
                    </span>

                    <p className="title">Pak on the frontier of NFTs.</p>

                    <p className="explain">
                      The acclaimed anonymous art entity has been pioneering in
                      digital spaces for decades. Here’s what’s next.
                    </p>

                    <p className="bottomText">ON THE FRONTIER OF NFTS.</p>
                  </div>
                </li>
              ))}
            </ul>
            <button className="preBtn indexBtn" onClick={onClickHeadLinePreBtn}>
              <img src={I_ltArwWhite} alt="" />
            </button>
            <button
              className="nextBtn indexBtn"
              onClick={onClickHeadLineNextBtn}
            >
              <img src={I_rtArwWhite} alt="" />
            </button>
          </section>

          <section className="issueContainer">
            <ul className="issueList" ref={issueRef}>
              {[1, 2, 3, 4].map((cont, index) => (
                <li className="issueBox" key={index}>
                  <div className="infoBox">
                    <div className="profBox">
                      <img src={E_issueProf} alt="" />
                      <p className="nickname">@andyfeltham</p>
                    </div>
                    <div className="timeBox">4 mins ago</div>
                  </div>
                  <p className="cont">
                    purchased <u>Kingkong #122</u> at 158 USDT
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section className="itemListContainer">
            <article className="autoAuctionBox itemListBox">
              <strong className="title">Subscription Auction</strong>

              <div className="listBox">
                <div className="posBox">
                  <ul className="itemList" ref={firstAuctionRef}>
                    {auctionListFirst.map((cont, index) => (
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
                  <button
                    className="nextBtn"
                    onClick={onClickFirstAuctionNextBtn}
                  >
                    <img src={I_rtArw} alt="" />
                  </button>
                </div>
                <div className="posBox">
                  <ul className="itemList">
                    {auctionListSecond.map((cont, index) => (
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

            <article className="ticketBox itemListBox">
              <strong className="title">Lucky Ticket</strong>

              <div className="posBox">
                <ul className="itemList" ref={ticketRef}>
                  {ticketList.map((cont, index) => (
                    <li key={index} className="item">
                      <div className="topBar">
                        <p className="key">LUCKY TICKET</p>
                        <p className="value">#{`${index}`.padStart(5, "0")}</p>
                      </div>

                      <img src={E_staking} alt="" />

                      <button
                        className="stakeBtn"
                        onClick={() => navigate("/staking")}
                      >
                        Buy Now
                      </button>
                    </li>
                  ))}
                </ul>
                <button className="nextBtn" onClick={onClickTicketNextBtn}>
                  <img src={I_rtArw} alt="" />
                </button>
              </div>
            </article>

            <article className="tipBox itemListBox">
              <strong className="title">Tips for Nip users</strong>

              <ul className="tipList">
                <li>
                  <img src={B_tip1} alt="" />
                  <p>Before Participating in NFT Collection</p>
                </li>
                <li>
                  <img src={B_tip2} alt="" />
                  <p>Discover and buy promising NFTs</p>
                </li>
                <li>
                  <img src={B_tip3} alt="" />
                  <p>
                    A chance to win a variety of common,
                    <br />
                    rare and unique NFTs.
                  </p>
                </li>
              </ul>
            </article>

            <article className="faqBox itemListBox">
              <strong className="title">FAQ</strong>

              <div className="posBox">
                <ul className="itemList" ref={faqRef}>
                  {D_faqList.map((cont, index) => (
                    <Fragment key={index}>
                      <FaqItem data={cont} index={index} />
                    </Fragment>
                  ))}
                </ul>
                <div className="pageBtnBox">
                  <button className="preBtn" onClick={onClickFaqPreBtn}>
                    <img src={I_ltArwWhite} alt="" />
                  </button>
                  <button className="nextBtn" onClick={onClickFaqNextBtn}>
                    <img src={I_rtArwWhite} alt="" />
                  </button>
                </div>
              </div>
            </article>
          </section>

          <button className="topBtn" onClick={() => onClickTopBtn()}>
            <img src={I_upArw3} alt="" />
          </button>
        </MmainBox>
        <Footer />
      </>
    );
  else
    return (
      <>
        <Header />
        <PmainBox>
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
                        The acclaimed anonymous art entity has been pioneering
                        in digital spaces for decades. Here’s what’s next.
                      </p>
                    </div>

                    <p className="bottomText">ON THE FRONTIER OF NFTS.</p>
                  </article>
                  <img className="mainImg" src={E_staking} alt="" />
                </li>
              ))}
            </ul>
            <button className="preBtn indexBtn" onClick={onClickHeadLinePreBtn}>
              <img src={I_ltArwWhite} alt="" />
            </button>
            <button
              className="nextBtn indexBtn"
              onClick={onClickHeadLineNextBtn}
            >
              <img src={I_rtArwWhite} alt="" />
            </button>
          </section>

          <section className="issueContainer">
            <ul className="issueList" ref={issueRef}>
              {D_issueList.map((cont, index) => (
                <li className="issueBox" key={index}>
                  <div className="infoBox">
                    <div className="profBox">
                      <img src={E_issueProf} alt="" />
                      <p className="nickname">@andyfeltham</p>
                    </div>
                    <div className="timeBox">4 mins ago</div>
                  </div>
                  <p className="cont">
                    purchased <u>Kingkong #122</u> at 158 USDT
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section className="itemListContainer">
            <article className="autoAuctionBox itemListBox">
              <strong className="title">Subscription Auction</strong>

              <div className="listBox">
                <div className="posBox">
                  <ul className="itemList" ref={firstAuctionRef}>
                    {auctionListFirst.map((cont, index) => (
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
                  <button
                    className="nextBtn"
                    onClick={onClickFirstAuctionNextBtn}
                  >
                    <img src={I_rtArw} alt="" />
                  </button>
                </div>

                <div className="posBox">
                  <ul className="itemList" ref={secondAuctionRef}>
                    {auctionListSecond.map((cont, index) => (
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
                  <button
                    className="nextBtn"
                    onClick={onClickSecondAuctionNextBtn}
                  >
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

            <article className="ticketBox itemListBox">
              <strong className="title">Lucky Ticket</strong>

              <div className="posBox">
                <ul className="itemList" ref={ticketRef}>
                  {ticketList.map((cont, index) => (
                    <li key={index} className="item">
                      <div className="topBar">
                        <p className="key">LUCKY TICKET</p>
                        <p className="value">#{`${index}`.padStart(5, "0")}</p>
                      </div>

                      <img src={E_staking} alt="" />

                      <button
                        className="stakeBtn"
                        onClick={() => navigate("/staking")}
                      >
                        Buy Now
                      </button>
                    </li>
                  ))}
                </ul>
                <button className="nextBtn" onClick={onClickTicketNextBtn}>
                  <img src={I_rtArw} alt="" />
                </button>
              </div>
            </article>

            <article className="tipBox itemListBox">
              <strong className="title">Tips for Nip users</strong>

              <ul className="tipList">
                <li>
                  <img src={B_tip1} alt="" />
                  <p>Before Participating in NFT Collection</p>
                </li>
                <li>
                  <img src={B_tip2} alt="" />
                  <p>Discover and buy promising NFTs</p>
                </li>
                <li>
                  <img src={B_tip3} alt="" />
                  <p>
                    A chance to win a variety of common,
                    <br />
                    rare and unique NFTs.
                  </p>
                </li>
              </ul>
            </article>

            <article className="faqBox itemListBox">
              <strong className="title">FAQ</strong>

              <div className="posBox">
                <ul className="itemList" ref={faqRef}>
                  {D_faqList.map((cont, index) => (
                    <Fragment key={index}>
                      <FaqItem data={cont} index={index} />
                    </Fragment>
                  ))}
                </ul>
                <div className="pageBtnBox">
                  <button className="preBtn" onClick={onClickFaqPreBtn}>
                    <img src={I_ltArwWhite} alt="" />
                  </button>
                  <button className="nextBtn" onClick={onClickFaqNextBtn}>
                    <img src={I_rtArwWhite} alt="" />
                  </button>
                </div>
              </div>
            </article>
          </section>

          <button className="topBtn" onClick={() => onClickTopBtn()}>
            <img src={I_upArw3} alt="" />
          </button>
        </PmainBox>
        <Footer />
      </>
    );
}

const MmainBox = styled.div`
  padding: 72px 0 20vw 0;

  .headLineContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 93vw;
    background: #000;
    position: relative;

    ul {
      display: flex;
      width: 100%;
      height: inherit;
      overflow-x: scroll;
      scroll-snap-type: x mandatory;

      li {
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 100%;
        color: #fff;
        padding: 11.11vw 0;
        scroll-snap-align: center;

        .innerBox {
          display: flex;
          flex-direction: column;
          gap: 1.38vw;
          margin: 0 11.66vw;

          .interview {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 36.66vw;
            height: 10vw;
            border: 1.2px solid #ffffff;
            border-radius: 8.33vw;
          }

          .title {
            font-size: 8.33vw;
            font-weight: 500;
          }

          .explain {
            font-size: 4.44vw;
            font-weight: 500;
          }
        }

        .bottomText {
          font-size: 4.44vw;
          font-weight: 500;
        }
      }
    }

    .indexBtn {
      position: absolute;

      &.preBtn {
        left: 3.33vw;

        img {
          height: 3.05vw;
        }
      }
      &.nextBtn {
        right: 3.33vw;

        img {
          height: 3.05vw;
        }
      }
    }
  }

  .issueContainer {
    display: flex;
    justify-content: center;
    align-items: flex-end;

    .issueList {
      display: flex;
      flex-direction: column;
      gap: 8.88vw;
      padding: 4.44vw 5.55vw;
      width: 100%;
      height: 31.11vw;
      overflow-y: scroll;

      .issueBox {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 100%;
        height: 22.22vw;
        padding: 3.33vw;
        border-radius: 2.77vw;
        box-shadow: 0px 3px 16px rgba(0, 0, 0, 0.16);

        * {
          font-family: "Roboto", sans-serif;
        }

        .infoBox {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .profBox {
            display: flex;
            align-items: center;
            gap: 1.66vw;
            font-size: 3.88vw;

            img {
              width: 8.33vw;
              height: 8.33vw;
              border-radius: 50%;
              object-fit: cover;
            }
          }

          .timeBox {
            font-size: 3.33vw;
            color: #7a7a7a;
          }
        }

        .cont {
          font-size: 3.33vw;
        }
      }
    }
  }

  .itemListContainer {
    display: flex;
    flex-direction: column;
    gap: 6.66vw;
    width: 100%;

    .itemListBox {
      display: flex;
      flex-direction: column;
      gap: 3.33vw;

      & > .title {
        font-size: 5.55vw;
        line-height: 5.55vw;
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
          scroll-snap-type: x mandatory;

          .item {
            scroll-snap-align: center;
          }
        }

        .nextBtn {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 15vw;
          height: 15vw;
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid #f6f6f6;
          border-radius: 50%;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
          position: absolute;
          z-index: 2;
          right: 7px;

          img {
            height: 3.05vw;
          }
        }
      }

      &.autoAuctionBox {
        padding: 6.66vw 0 0 0;
      }

      &.ticketBox {
        .item {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 100%;
          min-width: 100%;
          height: 112.77vw;
          padding: 4.44vw;
          background: #000;
          box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.2);
          border-radius: 3.33vw;
          overflow: hidden;
          cursor: pointer;

          .topBar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: 11.11vw;
            padding: 0 5vw;
            font-size: 4.44vw;
            font-weight: 700;
            text-transform: uppercase;
            color: #fff;
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(60px);
            border-radius: 8.33vw;
          }

          .itemImg {
            flex: 1;
            width: 100%;
            object-fit: cover;
          }

          .stakeBtn {
            height: 15.55vw;
            font-size: 5vw;
            font-weight: 700;
            font-family: "Roboto", sans-serif;
            color: #fff;
            background: #333;
            border-radius: 8.33vw;
          }
        }
      }

      &.tipBox {
        .tipList {
          display: flex;
          flex-direction: column;
          padding: 0 20px;
          gap: 4.44vw;

          li {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 77.22vw;
            min-height: 77.22vw;
            gap: 10vw;
            box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.16);
            border-radius: 3.33vw;
            cursor: pointer;

            img {
              height: 40.27vw;
            }

            p {
              font-size: 4.44vw;
              font-weight: 500;
              text-align: center;
              font-family: "Roboto", sans-serif;
            }
          }
        }
      }

      &.faqBox {
        .posBox {
          .itemList {
            width: 100%;
          }

          .pageBtnBox {
            display: flex;
            gap: 4.22vw;
            top: 0;
            right: 46px;
            position: absolute;
            transform: translate(0, -3vw);

            button {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 12.22vw;
              height: 12.22vw;
              border-radius: 50%;
              background: #000;
              position: relative;

              img {
                height: 3.05vw;
              }
            }
          }
        }
      }
    }
  }

  .topBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 12.22vw;
    height: 12.22vw;
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid #f6f6f6;
    border-radius: 50%;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    right: 30px;
    bottom: 20px;
    position: fixed;
  }
`;

const PmainBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 0 200px 0;

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
      @media screen and (max-width: 1440px) {
        width: 80%;
      }
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
    align-items: center;
    height: 148px;

    .issueList {
      display: flex;
      flex-direction: column;
      gap: 32px;
      height: 92px;
      padding: 16px;
      overflow-y: scroll;

      .issueBox {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 820px;
        height: 60px;
        min-height: 60px;
        padding: 0 34px;
        font-size: 18px;
        line-height: 18px;
        border-radius: 50px;
        box-shadow: 0px 3px 16px rgba(0, 0, 0, 0.16);

        * {
          font-family: "Roboto", sans-serif;
        }

        .infoBox {
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
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid #f6f6f6;
          border-radius: 50%;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
          right: -7px;
          @media screen and (max-width: 1440px) {
            right: 20px;
          }
          position: absolute;
          z-index: 2;
        }
      }

      &.autoAuctionBox {
        padding: 16px 0 0 0;

        .detailList {
          border-top: 1px solid #f6f6f6;
        }
      }

      &.ticketBox {
        .item {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 330px;
          min-width: 330px;
          height: 440px;
          padding: 20px;
          background: #000;
          box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.2);
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;

          .topBar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: 40px;
            padding: 0 18px;
            font-size: 16px;
            font-weight: 700;
            text-transform: uppercase;
            color: #fff;
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(60px);
            border-radius: 30px;
          }

          .itemImg {
            flex: 1;
            width: 100%;
            object-fit: cover;
          }

          .stakeBtn {
            height: 56px;
            font-size: 18px;
            font-weight: 700;
            font-family: "Roboto", sans-serif;
            color: #fff;
            background: #333;
            border-radius: 30px;
          }
        }
      }

      &.tipBox {
        .tipList {
          display: flex;
          padding: 0 20px;
          height: 308px;
          gap: 40px;
          margin: 20px 0 0 0;

          li {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 52px;
            box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.16);
            border-radius: 12px;
            cursor: pointer;

            img {
              height: 145px;
            }

            p {
              font-size: 16px;
              font-weight: 500;
              text-align: center;
              font-family: "Roboto", sans-serif;
            }
          }
        }
      }

      &.faqBox {
        .posBox {
          .itemList {
            width: 100%;
          }

          .pageBtnBox {
            display: flex;
            gap: 8px;
            top: 0;
            right: 46px;
            position: absolute;
            transform: translate(0, -7px);

            button {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 54px;
              height: 54px;
              border-radius: 50%;
              background: #000;
              position: relative;
              right: unset;
            }
          }
        }
      }
    }
  }

  .topBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 54px;
    height: 54px;
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid #f6f6f6;
    border-radius: 50%;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    right: 30px;
    bottom: 20px;
    position: fixed;
  }
`;

const headLineList = [1, 2, 3, 4];
const ticketList = [1, 2, 3, 4, 5, 6, 7, 8];
