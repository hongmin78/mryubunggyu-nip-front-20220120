import styled from "styled-components";
import I_heartO from "../../img/icon/I_heartO.svg";
import I_tIcon from "../../img/icon/I_tIcon.png";
import I_dnArw from "../../img/icon/I_dnArw.svg";
import E_item1 from "../../img/mypage/E_item1.png";
import E_item2 from "../../img/mypage/E_item2.png";
import E_item3 from "../../img/mypage/E_item3.png";

import { putCommaAtPrice } from "../../util/Util";
import { useState } from "react";
import PopupBg from "../../components/PopupBg";
import { D_sortList } from "../../data/DmyPage";
import { useNavigate } from "react-router-dom";
import SelectPopup from "../SelectPopup";

export default function MyItems() {
  const navigate = useNavigate();

  const [filter, setFilter] = useState(0);
  const [sortOpt, setSortOpt] = useState(D_sortList[1]);
  const [sortPopup, setSortPopup] = useState(false);

  return (
    <MyItemsBox>
      <div className="topBar">
        <ul className="filterList">
          {filterList.map((cont, index) => (
            <li
              key={index}
              className={filter === index && "on"}
              onClick={() => setFilter(index)}
            >
              {cont}
            </li>
          ))}
        </ul>

        <div className="sortBox">
          <button className="sortBtn" onClick={() => setSortPopup(true)}>
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
        <li className="stakingBox">
          <div className="imgBox">
            <img className="itemImg" src={E_item1} alt="" />

            <div className="topBar">
              <span className="profImg">
                <img src={I_tIcon} alt="" />
              </span>

              <span className="profName">
                <strong>USDT-MOONG</strong>
              </span>
            </div>
          </div>

          <div className="infoBox">
            <div className="titleBox">
              <strong className="title">Ming #58</strong>
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
                <strong className="price">{putCommaAtPrice(100)} USDT</strong>

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
                <li>
                  <p className="key">Fee</p>
                  <p className="value">8%</p>
                </li>
              </ul>
            </div>

            <button className="actionBtn">Swap</button>

            <p className="description">
              The NFT purchased by participating in the subscription auction
              generates 12% of profits after 3 days and is sold random. In
              addition, the results are announced at 9:00 AM, and the
              transaction is completed from 9:00 AM to 21:00 PM. If the
              transaction is not completed within time, all transactions in your
              account will be suspended. It operates normally after applying a
              penalty of 10% of the winning bid amount.
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
              <strong className="title">Ming #58</strong>
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
                <strong className="price">{putCommaAtPrice(100)} USDT</strong>

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
                <li>
                  <p className="key">Fee</p>
                  <p className="value">8%</p>
                </li>
              </ul>
            </div>

            <button className="actionBtn">Swap</button>

            <p className="description">
              The NFT purchased by participating in the subscription auction
              generates 12% of profits after 3 days and is sold random. In
              addition, the results are announced at 9:00 AM, and the
              transaction is completed from 9:00 AM to 21:00 PM. If the
              transaction is not completed within time, all transactions in your
              account will be suspended. It operates normally after applying a
              penalty of 10% of the winning bid amount.
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
              <strong className="title">Nero #112</strong>
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
                <strong className="price">{putCommaAtPrice(686.6)} USDT</strong>

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
                <li>
                  <p className="key">Fee</p>
                  <p className="value">8%</p>
                </li>
              </ul>
            </div>

            <div className="btnBox">
              <button className="actionBtn" onClick={() => navigate("/resell")}>
                Sell
              </button>
              <button className="actionBtn">Staking</button>
            </div>

            <p className="description">
              King Kong NFT can be staking or sold to Marketplace at a price of
              up to 25%. If you steaking, you will get 30% annual NIP COIN
              reward.
            </p>
          </div>
        </li>
      </ul>
    </MyItemsBox>
  );
}

const MyItemsBox = styled.section`
  .topBar {
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

      .imgBox {
        width: 760px;
        height: 760px;
        border-radius: 12px;
        position: relative;
        overflow: hidden;

        .itemImg {
          width: 100%;
          height: 100%;
          object-fit: cover;
          position: absolute;
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
        width: 608px;

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
