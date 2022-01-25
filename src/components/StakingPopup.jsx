import styled from "styled-components";
import I_x from "../img/icon/I_x.svg";
import I_tIcon from "../img/icon/I_tIcon.png";
import I_chkWhite from "../img/icon/I_chkWhite.svg";
import { putCommaAtPrice } from "../util/Util";
import { useState } from "react";

export default function StakingPopup({ off }) {
  const [termChk, setTermChk] = useState(false);

  return (
    <StakingPopupBox>
      <article className="topBar">
        <span className="blank" />
        <p className="title">Stake</p>
        <button className="exitBtn" onClick={() => off()}>
          <img src={I_x} alt="" />
        </button>
      </article>

      <article className="contBox">
        <div className="infoBox">
          <div className="coinBox">
            <span className="coinImgBox">
              <img src={I_tIcon} alt="" />
            </span>

            <ul className="priceList">
              <li className="price">10 USDT</li>
              <li className="exchange">${putCommaAtPrice(2115222)}</li>
            </ul>
          </div>

          <ul className="dataList">
            <li>
              <p className="key">Calculation</p>
              <p className="value">2022-01-11 00:00 UTC</p>
            </li>
            <li>
              <p className="key">Distribution</p>
              <p className="value">2022-03-12 00:00 UTC</p>
            </li>
            <li>
              <p className="key">Total Staked</p>
              <p className="value">10 USDT</p>
            </li>
          </ul>
        </div>

        <div className="confirmBox">
          <div className="termBox">
            <p className="key">Would you like to stake long term?</p>
            <span className="value">
              <button className="yesBtn" onClick={() => setTermChk(true)}>
                <span
                  className="chkBtn"
                  style={{
                    background: termChk && "#000",
                  }}
                >
                  <img src={I_chkWhite} alt="" />
                </span>
                yes
              </button>
              <button className="noBtn" onClick={() => setTermChk(false)}>
                <span
                  className="chkBtn"
                  style={{
                    background: !termChk && "#000",
                  }}
                >
                  <img src={I_chkWhite} alt="" />
                </span>
                no
              </button>
            </span>
          </div>

          <button className="confirmBtn" onClick={() => off()}>
            Confirm
          </button>
        </div>
      </article>
    </StakingPopupBox>
  );
}

const StakingPopupBox = styled.section`
  width: 540px;
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
    display: flex;
    flex-direction: column;
    gap: 80px;
    padding: 40px;

    * {
      font-family: "Roboto", sans-serif;
    }

    .infoBox {
      display: flex;
      flex-direction: column;
      gap: 24px;

      .coinBox {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 104px;
        padding: 0 26px;
        background: #f6f6f6;
        border-radius: 12px;

        .coinImgBox {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 68px;
          height: 68px;
          padding: 15px;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);

          img {
            width: 100%;
            object-fit: contain;
          }
        }

        .priceList {
          display: flex;
          flex-direction: column;
          text-align: end;
          gap: 6px;
          font-size: 20px;
          line-height: 20px;

          .price {
            font-weight: 600;
          }

          .exchange {
            font-weight: 500;
            color: #7a7a7a;
          }
        }
      }

      .dataList {
        display: flex;
        flex-direction: column;
        gap: 8px;
        font-size: 18px;
        font-weight: 500;
        color: #7a7a7a;

        li {
          display: flex;
          justify-content: space-between;
        }
      }
    }

    .confirmBox {
      display: flex;
      flex-direction: column;
      gap: 20px;

      .termBox {
        display: flex;
        align-items: center;
        gap: 10px;

        * {
          font-size: 18px;
          line-height: 18px;
        }

        .value {
          display: flex;
          gap: 18px;
          align-items: center;

          button {
            display: flex;
            align-items: center;
            gap: 6px;

            .chkBtn {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 22px;
              height: 22px;
              border: 1.4px solid #000;
              border-radius: 4px;
            }
          }
        }
      }

      .confirmBtn {
        height: 60px;
        font-size: 20px;
        font-weight: 500;
        color: #fff;
        background: #000;
        border-radius: 12px;
      }
    }
  }
`;
