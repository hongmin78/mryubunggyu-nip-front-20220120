import { useState } from "react";
import styled from "styled-components";
import I_ltArw from "../img/icon/I_ltArw.svg";
import I_dnArw from "../img/icon/I_dnArw.svg";
import I_info from "../img/icon/I_info.svg";
import E_item3 from "../img/mypage/E_item3.png";
import PopupBg from "../components/PopupBg";
import SelectPopup from "../components/SelectPopup";
import { D_expDateList, D_startDateList } from "../data/Dresell";
import { useNavigate } from "react-router-dom";

export default function Resell() {
  const navigate = useNavigate();

  const [bid, setBid] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startPopup, setStartPopup] = useState(false);
  const [expDate, setExpDate] = useState("");
  const [expDatePopup, setExpDatePopup] = useState(false);

  return (
    <ResellBox>
      <article className="sellSec">
        <div className="topBar">
          <button className="exitBtn" onClick={() => navigate(-1)}>
            <img src={I_ltArw} alt="" />
          </button>
          <p className="title">Put on marketplace</p>
        </div>

        <ul className="sellBox">
          <li className="bidBox contBox">
            <div className="titleBox">
              <p className="title">Minimum bid</p>

              <span className="hovInfo">
                <img src={I_info} alt="" />

                <div className="hovPopup">
                  <p>
                    You can always accept a sale even if you are offered a price
                    that is higher than your minimum bid and lower than your
                    target bid.
                  </p>
                </div>
              </span>
            </div>

            <div className="inputBox">
              <input
                value={bid}
                onChange={(e) => setBid(e.target.value)}
                placeholder="Enter Minimum bid"
              />
              <strong className="unit">USDT</strong>
            </div>

            <p className="explain">Suggested: 0%, 10%, 20%. Maximum is 25%</p>
          </li>

          <li className="dateContainer contBox">
            <div className="startDateBox dateBox">
              <p className="title">Starting Date</p>
              <div className="posBox">
                <div className="inputBox" onClick={() => setStartPopup(true)}>
                  <input value={startDate} disabled placeholder="Select Date" />
                  <img src={I_dnArw} alt="" />
                </div>

                {startPopup && (
                  <>
                    <SelectPopup
                      off={setStartPopup}
                      dataList={D_startDateList}
                      select={startDate}
                      setFunc={setStartDate}
                    />
                    <PopupBg off={setStartPopup} />
                  </>
                )}
              </div>
            </div>

            <div className="startDateBox dateBox">
              <p className="title">Starting Date</p>
              <div className="posBox">
                <div className="inputBox" onClick={() => setExpDatePopup(true)}>
                  <input value={expDate} disabled placeholder="Select Date" />
                  <img src={I_dnArw} alt="" />
                </div>

                {expDatePopup && (
                  <>
                    <SelectPopup
                      off={setExpDatePopup}
                      dataList={D_expDateList}
                      select={expDate}
                      setFunc={setExpDate}
                    />
                    <PopupBg off={setExpDatePopup} />
                  </>
                )}
              </div>
            </div>
          </li>

          <li className="instructionBox contBox">
            <p className="title">Instruction</p>

            <div className="textBox">
              <p>
                When you sell items for the first time in your account, you need
                to go through the contract approval process
              </p>

              <ul className="processList">
                <li>
                  <p>
                    - If you are trading for the first time, you will need to
                    reset your account. The process of sending 0 USDT to verify
                    that the account is a valid account proceeds.
                  </p>
                </li>
                <li>
                  <p>- Please complete the signature to create a sales list.</p>
                </li>
                <li>
                  <p>
                    - Gas fee is paid only for the first time, and subsequent
                    listings are supported free of charge.
                  </p>
                </li>
              </ul>
            </div>
          </li>

          <button className="actionBtn" onClick={() => {}}>
            Sales start
          </button>
        </ul>
      </article>

      <ul className="itemSec">
        <li className="itemBox">
          <img className="itemImg" src={E_item3} alt="" />
          <p className="title">Nero #112</p>
        </li>

        <li className="transactionBox">
          <p className="title">
            Summary of
            <br /> transaction information
          </p>
        </li>

        <li className="priceBox">
          <p className="title">Fees</p>

          <ul className="priceList">
            <li>platform fee</li>
            <li>royalty</li>
            <li className="total">total</li>
          </ul>
        </li>
      </ul>
    </ResellBox>
  );
}
const ResellBox = styled.section`
  display: flex;
  justify-content: space-between;
  padding: 190px 0 0 0;
  margin: 0 auto;
  max-width: 1134px;

  .sellSec {
    max-width: 800px;
    box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.16);
    border-radius: 20px;

    .topBar {
      display: flex;
      align-items: center;
      gap: 26px;
      height: 84px;
      padding: 0 32px;

      .title {
        font-size: 24px;
        font-weight: 600;
        line-height: 24px;
      }
    }

    .sellBox {
      display: flex;
      flex-direction: column;
      gap: 30px;
      padding: 44px 50px;
      border-top: 1px solid #d9d9d9;

      .contBox {
        display: flex;
        flex-direction: column;
        gap: 14px;

        .title {
          font-size: 18px;
          font-weight: 600;
        }

        .inputBox {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 44px;
          padding: 0 20px 0 16px;
          border: 1px solid #d9d9d9;
          border-radius: 12px;

          * {
            font-size: 16px;
            font-family: "Roboto", sans-serif;
          }

          input {
            font-weight: 500;

            &::placeholder {
              color: #d9d9d9;
            }
          }
        }

        .explain {
          font-size: 16px;
          color: #7a7a7a;
          font-family: "Roboto", sans-serif;
        }

        &.bidBox {
          .titleBox {
            display: flex;
            align-items: center;
            gap: 8px;

            .hovInfo {
              display: flex;
              align-items: center;
              position: relative;
              cursor: pointer;

              &:hover {
                .hovPopup {
                  display: block;
                }
              }

              .hovPopup {
                display: none;
                width: 10000%;
                max-width: 380px;
                padding: 10px 12px;
                font-size: 16px;
                color: #fff;
                background: rgba(0, 0, 0, 0.6);
                border-radius: 8px;
                top: 0;
                left: 0;
                position: absolute;
                transform: translate(-22px, 26px);
                z-index: 2;

                p {
                  font-family: "Roboto", sans-serif;
                }
              }
            }
          }
        }

        &.dateContainer {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          gap: 24px;

          .dateBox {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 14px;

            .posBox {
              position: relative;
              width: 100%;
              cursor: pointer;

              input {
                cursor: pointer;
              }
            }
          }
        }

        &.instructionBox {
          .textBox {
            display: flex;
            flex-direction: column;
            gap: 14px;
            padding: 20px 18px;
            font-size: 16px;
            color: #7a7a7a;
            font-family: "Roboto", sans-serif;
            border: 1px solid #d9d9d9;
            border-radius: 12px;

            .processList {
              display: flex;
              flex-direction: column;
              gap: 10px;
              line-height: 18px;
            }
          }
        }
      }

      .actionBtn {
        height: 60px;
        font-size: 20px;
        font-weight: 500;
        color: #fff;
        background: #000;
        border-radius: 12px;
      }
    }
  }

  .itemSec {
    width: 100%;
    max-width: 310px;
    height: 100%;
    padding: 30px;
    box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.16);
    border-radius: 20px;

    & > li {
      display: flex;
      flex-direction: column;
      gap: 14px;
      padding-bottom: 20px;

      &:nth-of-type(n + 2) {
        border-top: 1px solid #d9d9d9;
        padding-top: 20px;
      }
      &:last-of-type {
        padding-bottom: 0;
      }

      .title {
        font-size: 18px;
        font-weight: 600;
      }

      &.itemBox {
        .itemImg {
          width: 100%;
          max-height: 250px;
          object-fit: contain;
          border-radius: 12px;
        }
      }

      &.transactionBox {
      }

      &.priceBox {
        .priceList {
          display: flex;
          flex-direction: column;
          gap: 10px;
          color: #7a7a7a;

          .total {
            color: #000;
            font-weight: 500;
          }
        }
      }
    }
  }
`;
