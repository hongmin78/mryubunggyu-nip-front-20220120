import { Fragment, useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { D_faqList, D_issueList, marketPlaceList } from "../data/Dmain";
import Footer from "./Footer";
import AuctionItem from "../components/AuctionItem";
import AuctionItem0228 from "../components/AuctionItem0228";
import MarketItem from "../components/MarketItem";
import MarketItem0227 from "../components/MarketItem0227";
import Header from "../components/header/Header";
import { useSelector } from "react-redux";
import { getStyle, onClickNextBtn, onClickPreBtn, swiperListener } from "../util/Util";
import FaqItem from "../components/FaqCont";
import { useNavigate } from "react-router-dom";
import SetErrorBar from "../util/SetErrorBar";
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
import { API } from "../configs/api";
import { LOGGER, getmyaddress } from "../util/common";
import { setDelinquencyAmount } from "../util/store/commonSlice";
import moment from "moment";
import { strDot } from "../util/common.js";

export default function Main() {
  const navigate = useNavigate();
  const headLineRef = useRef();
  const issueRef = useRef();
  const firstAuctionRef = useRef();
  const secondAuctionRef = useRef();
  const marketRef = useRef();
  const ticketRef = useRef();
  let premiumref = useRef();
  const faqRef = useRef();
  let issueIndex = 0;
  const isMobile = useSelector((state) => state.common.isMobile);
  const [headLineIndex, setHeadLineIndex] = useState(0);
  const [firstAuctionIndex, setFirstAuctionIndex] = useState(0);
  const [secondAuctionIndex, setSecondAuctionIndex] = useState(0);
  const [marketIndex, setMarketIndex] = useState(0);
  const [premiumIndex, setPremiumIndex] = useState(0);
  const [ticketIndex, setTicketIndex] = useState(0);
  const [faqIndex, setFaqIndex] = useState(0);
  const [auctionListFirst, setAuctionListFirst] = useState([]);
  const [auctionListSecond, setAuctionListSecond] = useState([]);
  const [likeObj, setLikeObj] = useState({});
  let [premiumitemlist, setpremiumitemlist] = useState([]);
  const [typestrPay, setTypestrPay] = useState([]);
  console.log("typestrPay", typestrPay);

  const dispatch = useDispatch();

  function onClickTopBtn() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    localStorage.removeItem("referer");
  }, []);

  useEffect(() => {
    setTimeout(() => {
      let address = getmyaddress();
      console.log("address", address);
      axios
        .get(`${API.API_DELINQUENCY}/${address}`)
        .then((res) => {
          console.log("RES", res);
          let { status } = res.data;

          if (status === "OK") {
            let { list } = res.data;
            if (list && list?.length > 0) {
              // const amount = list.reduce((a, b) => a.amount + b.amount, 0);
              let sum = 0;
              list.forEach((item) => {
                sum += +item.amount;
              });
              dispatch(setDelinquencyAmount(sum.toFixed(2)));
              localStorage.setItem("seller", list[0].seller);
              SetErrorBar("Please pay delinquency fee");
              navigate("/penalty");
            }
          }
        })
        .catch((err) => {
          console.log(err);
          alert(err.message);
        });
      axios
        .get(API.API_RECEIVABLES + `/${address}`)
        .then((res) => {
          let { list } = res.data;
          LOGGER("receivables", list);
          if (list?.length > 0) {
            SetErrorBar("exists receivables");
          }
        })
        .catch((err) => console.log(err));
    }, 1500);
  }, []);

  function fetchitems() {
    axios
      //      .get(  "http://3.35.117.87:34705/auction/list", { params: { limit: 16 } })
      .get(API.API_COMMONITEMS + `/items/group_/kong/0/128/id/DESC`)
      .then((res) => {
        // console.log(res.data);
        let { status, list } = res.data;
        if (status == "OK") {
          setAuctionListFirst(list.slice(0, 64));
          setAuctionListSecond(list.slice(64));
        }
      });
    axios.get(API.API_PREMIUMITEMS + `/items/group_/kingkong/0/128/id/DESC`).then((resp) => {
      LOGGER("De0Mlt93PT", resp.data);
      let { status, list } = resp.data;
      if (status == "OK") {
        setpremiumitemlist(list);
      }
    });
    axios.get(API.API_TYPESTR).then((resp) => {
      LOGGER("API_TYPESTR", resp.data);
      let { status, payload } = resp.data;
      if (status == "OK") {
        setTypestrPay(resp.data.list);
      }
    });
  }

  useEffect(() => {
    fetchitems();
    setInterval(() => {
      if (!issueRef.current) return;
      if (issueRef.current?.children[0]) {
        const contHeight = issueRef?.current?.children[0]?.offsetHeight;

        issueIndex++;
        if (issueRef.current?.scrollTo) {
          if (issueIndex < D_issueList.length) {
            issueRef.current.scrollTo({
              top: contHeight * issueIndex + issueIndex * getStyle(issueRef, "gap"),
              behavior: "smooth",
            });
          } else {
            issueRef.current.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }
        }
      }
    }, 5000);
  }, []);

  useEffect(() => {
    if (!headLineRef.current) return;
    const wrapWidth = headLineRef.current.offsetWidth;
    const contWidth = headLineRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);

    if (headLineRef.current?.scrollTo) {
      if (headLineIndex === 0) {
        headLineRef.current.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        headLineRef.current.scrollTo({
          left: contWidth * itemNumByPage * headLineIndex,
          behavior: "smooth",
        });
      }
    }
  }, [headLineIndex]);

  useEffect(() => {
    swiperListener(firstAuctionRef, firstAuctionIndex);
  }, [firstAuctionIndex]);

  useEffect(() => {
    swiperListener(secondAuctionRef, secondAuctionIndex);
  }, [secondAuctionIndex]);

  useEffect(() => {
    swiperListener(marketRef, marketIndex);
  }, [marketIndex]);

  useEffect(() => {
    swiperListener(premiumref, premiumIndex);
  }, [premiumIndex]);

  useEffect(() => {
    swiperListener(ticketRef, ticketIndex);
  }, [ticketIndex]);

  useEffect(() => {
    swiperListener(faqRef, faqIndex);
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
                      The acclaimed anonymous art entity has been pioneering in digital spaces for decades. Here’s
                      what’s next.
                    </p>

                    <p className="bottomText">ON THE FRONTIER OF NFTS.</p>
                  </div>
                </li>
              ))}
            </ul>
            <button
              className="preBtn indexBtn"
              onClick={() => onClickPreBtn(headLineRef, headLineList, headLineIndex, setHeadLineIndex)}
            >
              <img src={I_ltArwWhite} alt="" />
            </button>
            <button
              className="nextBtn indexBtn"
              onClick={() => onClickNextBtn(headLineRef, headLineList, headLineIndex, setHeadLineIndex)}
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
                        <AuctionItem0228 data={cont} index={index} likeObj={likeObj} setLikeObj={setLikeObj} />
                      </Fragment>
                    ))}
                  </ul>
                  <button
                    className="nextBtn"
                    onClick={() =>
                      onClickNextBtn(firstAuctionRef, auctionListFirst, firstAuctionIndex, setFirstAuctionIndex)
                    }
                  >
                    <img src={I_rtArw} alt="" />
                  </button>
                </div>
                <div className="posBox">
                  <ul className="itemList">
                    {auctionListSecond.map((cont, index) => (
                      <Fragment key={index}>
                        <AuctionItem0228 data={cont} index={index} likeObj={likeObj} setLikeObj={setLikeObj} />
                      </Fragment>
                    ))}
                  </ul>
                  <button className="nextBtn">
                    <img src={I_rtArw} alt="" />
                  </button>
                </div>
              </div>
            </article>

            <article className="marketplaceBox itemListBox" style={{ display: "none" }}>
              <strong className="title">MarketPlace</strong>
              <div className="posBox">
                <ul className="itemList" ref={marketRef}>
                  {marketPlaceList.map((cont, index) => (
                    <Fragment key={index}>
                      <MarketItem data={cont} index={index} likeObj={likeObj} setLikeObj={setLikeObj} />
                    </Fragment>
                  ))}
                </ul>
                <button
                  className="nextBtn"
                  onClick={() => onClickNextBtn(marketRef, auctionListFirst, marketIndex, setMarketIndex)}
                >
                  <img src={I_rtArw} alt="" />
                </button>
              </div>
            </article>

            <article className="marketplaceBox itemListBox">
              <strong className="title">Marketplace</strong>
              <div className="posBox">
                <ul className="itemList" ref={premiumref}>
                  {premiumitemlist.map((cont, index) => (
                    <Fragment key={index}>
                      <MarketItem0227 data={cont} index={index} likeObj={likeObj} setLikeObj={setLikeObj} />
                    </Fragment>
                  ))}
                </ul>
                <button
                  className="nextBtn"
                  onClick={() => onClickNextBtn(premiumref, premiumitemlist, premiumIndex, setPremiumIndex)}
                >
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
                        {/* <p className="value">#{`${index}`.padStart(5, '0')}</p> */}
                      </div>

                      <img src={E_staking} alt="" />

                      <button className="stakeBtn" onClick={() => navigate("/staking")}>
                        Buy Now
                      </button>
                    </li>
                  ))}
                </ul>
                <button
                  className="nextBtn"
                  onClick={() => onClickNextBtn(ticketRef, ticketList, ticketIndex, setTicketIndex)}
                >
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
                  <button className="preBtn" onClick={() => onClickPreBtn(faqRef, D_faqList, faqIndex, setFaqIndex)}>
                    <img src={I_ltArwWhite} alt="" />
                  </button>
                  <button className="nextBtn" onClick={() => onClickNextBtn(faqRef, D_faqList, faqIndex, setFaqIndex)}>
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
                        The acclaimed anonymous art entity has been pioneering in digital spaces for decades. Here’s
                        what’s next.
                      </p>
                    </div>

                    <p className="bottomText">ON THE FRONTIER OF NFTS.</p>
                  </article>
                  <img className="mainImg" src={E_staking} alt="" />
                </li>
              ))}
            </ul>
            <button
              className="preBtn indexBtn"
              onClick={() => onClickPreBtn(headLineRef, headLineList, headLineIndex, setHeadLineIndex)}
            >
              <img src={I_ltArwWhite} alt="" />
            </button>
            <button
              className="nextBtn indexBtn"
              onClick={() => onClickNextBtn(headLineRef, headLineList, headLineIndex, setHeadLineIndex)}
            >
              <img src={I_rtArwWhite} alt="" />
            </button>
          </section>

          <section className="issueContainer">
            <ul className="issueList" ref={issueRef}>
              {typestrPay?.map((cont, index) => (
                <li className="issueBox" key={index}>
                  <div className="infoBox">
                    <div className="profBox">
                      <img src={E_issueProf} alt="" />
                      <p className="nickname">{strDot(cont.username, 3, 15)}</p>
                    </div>
                    {/* <div className="timeBox">At__{cont.createdat.split("T")[0]}</div> */}
                    <div className="timeBox">{moment(new Date()).diff(moment(cont.createdat), "days")} days ago</div>
                  </div>
                  <p className="cont">
                    {cont.typestr === "PAY" ? "purchased" : ""} <u>{cont.actionname}</u> at {cont.price} USDT
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
                        <AuctionItem0228 data={cont} index={index} likeObj={likeObj} setLikeObj={setLikeObj} />
                      </Fragment>
                    ))}
                  </ul>
                  <button
                    className="nextBtn"
                    onClick={() =>
                      onClickNextBtn(firstAuctionRef, auctionListFirst, firstAuctionIndex, setFirstAuctionIndex)
                    }
                  >
                    <img src={I_rtArw} alt="" />
                  </button>
                </div>

                <div className="posBox">
                  <ul className="itemList" ref={secondAuctionRef}>
                    {auctionListSecond.map((cont, index) => (
                      <Fragment key={index}>
                        <AuctionItem0228 data={cont} index={index} likeObj={likeObj} setLikeObj={setLikeObj} />
                      </Fragment>
                    ))}
                  </ul>
                  <button
                    className="nextBtn"
                    onClick={() =>
                      onClickNextBtn(secondAuctionRef, auctionListSecond, secondAuctionIndex, setSecondAuctionIndex)
                    }
                  >
                    <img src={I_rtArw} alt="" />
                  </button>
                </div>
              </div>
            </article>

            <article className="marketplaceBox itemListBox" style={{ display: "none" }}>
              <strong className="title">MarketPlace</strong>
              <div className="posBox">
                <ul className="itemList" ref={marketRef}>
                  {marketPlaceList.map((cont, index) => (
                    <Fragment key={index}>
                      <MarketItem data={cont} index={index} likeObj={likeObj} setLikeObj={setLikeObj} />
                    </Fragment>
                  ))}
                </ul>
                <button
                  className="nextBtn"
                  onClick={() => onClickNextBtn(marketRef, auctionListFirst, marketIndex, setMarketIndex)}
                >
                  <img src={I_rtArw} alt="" />
                </button>
              </div>
            </article>

            <article className="marketplaceBox itemListBox">
              <strong className="title">Marketplace</strong>
              <div className="posBox">
                <ul className="itemList" ref={premiumref}>
                  {premiumitemlist.map((cont, index) => (
                    <Fragment key={index}>
                      <MarketItem0227 data={cont} index={index} likeObj={likeObj} setLikeObj={setLikeObj} />
                    </Fragment>
                  ))}
                </ul>
                <button
                  className="nextBtn"
                  onClick={() => onClickNextBtn(premiumref, premiumitemlist, premiumIndex, setPremiumIndex)}
                >
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
                        {/* <p className="value">#{`${index}`.padStart(5, "0")}</p> */}
                      </div>

                      <img src={E_staking} alt="" />

                      <button className="stakeBtn" onClick={() => navigate("/staking")}>
                        Buy Now
                      </button>
                    </li>
                  ))}
                </ul>
                <button
                  className="nextBtn"
                  onClick={() => onClickNextBtn(ticketRef, ticketList, ticketIndex, setTicketIndex)}
                >
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
                  <button className="preBtn" onClick={() => onClickPreBtn(faqRef, D_faqList, faqIndex, setFaqIndex)}>
                    <img src={I_ltArwWhite} alt="" />
                  </button>
                  <button className="nextBtn" onClick={() => onClickNextBtn(faqRef, D_faqList, faqIndex, setFaqIndex)}>
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
        width: 1000px;
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
          margin-left: 15px;
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
