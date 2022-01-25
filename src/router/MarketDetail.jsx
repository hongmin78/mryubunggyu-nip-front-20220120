import styled from "styled-components";
import I_heart from "../img/icon/I_heart.svg";
import I_heartO from "../img/icon/I_heartO.svg";
import I_3dot from "../img/icon/I_3dot.svg";
import E_detailItem from "../img/market/E_detailItem.png";
import I_rtArw from "../img/icon/I_rtArw.svg";
import { Fragment, useEffect, useRef, useState } from "react";
import { putCommaAtPrice } from "../util/Util";
import { D_category, D_transactionHistory } from "../data/DauctionDetail";
import Offer from "../components/itemDetail/Offer";
import { marketPlaceList } from "../data/Dmain";
import Details from "../components/itemDetail/Details";
import Properties from "../components/itemDetail/Properties";
import MarketItem from "../components/MarketItem";
import BidPopup from "../components/BidPopup";
import PopupBg from "../components/PopupBg";

export default function MarketDetail() {
  const moreRef = useRef();

  const [toggleLike, setToggleLike] = useState(false);
  const [category, setCategory] = useState(0);
  const [moreIndex, setMoreIndex] = useState(0);
  const [bidPopup, setBidPopup] = useState(false);

  function onClickAuctionNextBtn() {
    const wrapWidth = moreRef.current.offsetWidth;
    const contWidth = moreRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(marketPlaceList.length / itemNumByPage);

    if (moreIndex < pageNum - 1) setMoreIndex(moreIndex + 1);
    else setMoreIndex(0);
  }

  useEffect(() => {
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
          left: contWidth * itemNumByPage * moreIndex + 160,
          behavior: "smooth",
        });
      }
    }
  }, [moreIndex]);

  return (
    <MarketDetailBox>
      <section className="itemInfoContainer">
        <img className="itemImg" src={E_detailItem} alt="" />

        <article className="infoBox">
          <div className="itemInfoBox">
            <div className="titleBox">
              <strong className="title">Nero #9</strong>

              <div className="btnBox">
                <button
                  className="likeBtn"
                  onClick={() => setToggleLike(!toggleLike)}
                >
                  <img src={toggleLike ? I_heartO : I_heart} alt="" />
                </button>

                <button className="moreBtn" onClick={() => {}}>
                  <img src={I_3dot} alt="" />
                </button>
              </div>
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
                <strong className="price">{putCommaAtPrice(588)} USDT</strong>

                <ul className="timeList">
                  <li>00</li>
                  <li>12</li>
                  <li>59</li>
                  <li>09</li>
                </ul>
              </div>
            </div>

            <button className="bidBtn" onClick={() => setBidPopup(true)}>
              Bid
            </button>
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
              {category === 0 && <Offer />}
              {category === 1 && <Details />}
              {category === 2 && <Properties />}
            </div>
          </div>
        </article>
      </section>

      <section className="historyBox">
        <article className="titleBox">
          <strong className="title">Transaction History</strong>
        </article>

        <ul className="historyList">
          {D_transactionHistory.map((cont, index) => (
            <>
              {index ? (
                <div className="sideBarBox">
                  <span className="sideBar" />
                </div>
              ) : (
                <></>
              )}
              <li key={index}>
                <span className="iconBox">
                  <img src={cont.img} alt="" />
                </span>

                <div className="contBox">
                  <p className="cont">{cont.cont}</p>
                  <p className="time">{cont.time}</p>
                </div>
              </li>
            </>
          ))}
        </ul>
      </section>

      <section className="moreBox">
        <strong className="title">More from this collection</strong>

        <div className="listBox">
          <div className="posBox">
            <ul className="itemList" ref={moreRef}>
              {marketPlaceList.map((cont, index) => (
                <Fragment key={index}>
                  <MarketItem data={cont} index={index} />
                </Fragment>
              ))}
            </ul>
            <button className="nextBtn" onClick={onClickAuctionNextBtn}>
              <img src={I_rtArw} alt="" />
            </button>
          </div>
        </div>
      </section>

      {bidPopup && (
        <>
          <BidPopup off={setBidPopup} />
          <PopupBg blur off={setBidPopup} />
        </>
      )}
    </MarketDetailBox>
  );
}

const MarketDetailBox = styled.div`
  max-width: 1480px;
  padding: 220px 0;
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

    .copyBtn {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
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

  .itemInfoContainer {
    display: flex;
    justify-content: space-between;

    .itemImg {
      width: 760px;
      height: 760px;
      object-fit: contain;
    }

    .infoBox {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      max-width: 608px;
      width: 100%;

      .itemInfoBox {
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
        }

        .bidBtn {
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
