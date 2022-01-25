import styled from "styled-components";
import B_staking from "../img/staking/B_staking.png";
import I_tIcon from "../img/icon/I_tIcon.png";
import E_cc from "../img/common/E_cc.png";
import E_title from "../img/staking/E_title.svg";
import { useState } from "react";
import PopupBg from "../components/PopupBg";
import StakingPopup from "../components/StakingPopup";

export default function Staking() {
  const [price, setPrice] = useState("");
  const [stakingPopup, setStakingPopup] = useState(false);

  return (
    <StakingBox>
      <article className="imgContainer">
        <div className="topBar">
          <span className="tBox">
            <img src={I_tIcon} alt="" />
          </span>

          <span className="tokenTitle">USDT-MOONG</span>
        </div>

        <img className="mainImg" src={E_cc} alt="" />
      </article>

      <article className="settingContainer">
        <img className="title" src={E_title} alt="" />

        <div className="contBox">
          <div className="availbleBox">
            <p className="key">Available Balance</p>
            <p className="value">0.00 USDT</p>
          </div>

          <div className="inputBox">
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0"
            />

            <span className="unit">USDT</span>
          </div>

          <p className="explain">Unstake period: 3 months</p>

          <button className="confirmBtn" onClick={() => setStakingPopup(true)}>
            Staking
            {/* You don’t have enough USDT */}
          </button>
        </div>
      </article>

      {stakingPopup && (
        <>
          <StakingPopup off={setStakingPopup} />
          <PopupBg blur off={setStakingPopup} />
        </>
      )}
    </StakingBox>
  );
}

const StakingBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 92px;
  height: 100vh;
  background: #000;
  background-image: url(${B_staking});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  .imgContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 34px;
    width: 404px;
    height: 538px;
    padding: 24px;
    background: #000;
    box-shadow: 0px 0px 60px rgba(255, 255, 255, 0.4);
    border-radius: 12px;

    .topBar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;

      .tBox {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 82px;
        height: 82px;
        background: #fff;
        border-radius: 50%;
        border: 7px solid #333;

        img {
          width: 38px;
        }
      }

      .tokenTitle {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 206px;
        height: 52px;
        font-size: 22px;
        font-weight: 700;
        text-transform: uppercase;
        color: #fff;
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(60px);
        border-radius: 30px;
      }
    }

    .mainImg {
      width: 258px;
    }
  }

  .settingContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 30px;
    width: 480px;

    .title {
      height: 29px;
    }

    .contBox {
      .availbleBox {
        display: flex;
        flex-direction: column;
        gap: 10px;
        font-size: 18px;
        font-weight: 500;
        line-height: 21px;

        .key {
          color: #7a7a7a;
        }

        .value {
          color: #fff;
        }
      }

      .inputBox {
        display: flex;
        align-items: center;
        width: 100%;
        height: 70px;
        margin: 30px 0 0 0;
        padding: 10px 10px 10px 24px;
        background: #fff;
        border-radius: 12px;

        * {
          font-weight: 700;
        }

        input {
          flex: 1;
          height: 100%;
          font-size: 30px;
          min-width: 0;
        }

        .unit {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          padding: 0 16px;
          font-size: 28px;
          color: #fff;
          background: #000;
          border-radius: 10px;
        }
      }

      .explain {
        margin: 20px 0 0 0;
        font-size: 18px;
        font-weight: 500;
        color: #7a7a7a;
      }

      .confirmBtn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 60px;
        margin: 48px 0 0 0;
        font-size: 20px;
        font-weight: 500;
        background: #fff;
        border-radius: 12px;
      }
    }
  }
`;
