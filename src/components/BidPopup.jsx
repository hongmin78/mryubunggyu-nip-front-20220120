import styled from "styled-components";
import I_x from "../img/icon/I_x.svg";
import I_tIcon from "../img/icon/I_tIcon.png";
import I_chkWhite from "../img/icon/I_chkWhite.svg";
import { putCommaAtPrice } from "../util/Util";
import { useState } from "react";
import E_detailItem from "../img/market/E_detailItem.png";

export default function BidPopup({ off }) {
  const [price, setPrice] = useState("");

  return (
    <BidPopupBox>
      <article className="topBar">
        <span className="blank" />
        <p className="title">Place a bid</p>
        <button className="exitBtn" onClick={() => off()}>
          <img src={I_x} alt="" />
        </button>
      </article>

      <article className="contBox">
        <div className="itemBox">
          <img src={E_detailItem} alt="" />
          <p>You are about to purchase a ming #12</p>
        </div>

        <div className="priceBox">
          <div className="inputBox">
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0"
            />
            <span className="unit">USDT</span>
          </div>

          <ul className="priceList">
            <li>
              <p className="key">Your bidding balance</p>
              <p className="value">0 USDT</p>
            </li>
            <li>
              <p className="key">Fee</p>
              <p className="value">0 USDT</p>
            </li>
            <li>
              <p className="key">Total</p>
              <p className="value">0 USDT</p>
            </li>
          </ul>
        </div>

        <div className="confrimBox">
          <p className="explain">
            Placing this bid will start a 24 hour auction for the artwork. Once
            a bid is placed, it cannot be withdrawn.
          </p>
          <button className="confirmBtn" onClick={() => off()}>
            Bid amount is required
          </button>
        </div>
      </article>
    </BidPopupBox>
  );
}

const BidPopupBox = styled.section`
  width: 540px;
  padding: 0;
  border-radius: 20px;
  background: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
  z-index: 6;

  .topBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 72px;
    padding: 0 30px;

    .title {
      font-size: 24px;
      font-weight: 600;
      line-height: 24px;
    }

    .blank,
    .exitBtn {
      width: 22px;
    }
  }

  .contBox {
    padding: 34px 30px 40px;

    .itemBox {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      font-size: 18px;

      img {
        width: 104px;
        height: 104px;
        object-fit: cover;
      }
    }

    .priceBox {
      display: flex;
      flex-direction: column;
      gap: 24px;
      margin: 60px 0 0 0;

      .inputBox {
        display: flex;
        align-items: center;
        height: 70px;
        padding: 10px 10px 10px 24px;
        box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.2);
        border-radius: 12px;

        input {
          flex: 1;
          font-size: 30px;
          font-weight: 700;
          min-width: 0;
        }

        .unit {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 102px;
          height: 50px;
          font-size: 26px;
          font-weight: 700;
          color: #fff;
          background: #000;
          border-radius: 10px;
        }
      }

      .priceList {
        display: flex;
        flex-direction: column;
        gap: 8px;

        li {
          display: flex;
          justify-content: space-between;
          font-size: 18px;
          font-weight: 500;

          .key {
            color: #7a7a7a;
          }
        }
      }
    }

    .confrimBox {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin: 84px 0 0 0;

      .explain {
        font-size: 18px;
        text-align: center;
      }

      .confirmBtn {
        height: 60px;
        font-size: 20px;
        font-weight: 500;
        font-family: "Poppins", sans-serif;
        color: #fff;
        background: #000;
        border-radius: 12px;

        &:disabled {
          color: #7a7a7a;
          background: #e1e1e1;
        }
      }
    }
  }
`;
