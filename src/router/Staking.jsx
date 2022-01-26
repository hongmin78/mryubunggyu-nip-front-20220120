import styled from "styled-components";
import B_staking from "../img/staking/B_staking.png";
import I_tIcon from "../img/icon/I_tIcon.png";
import E_cc from "../img/common/E_cc.png";
import E_title from "../img/staking/E_title.svg";
import { useState } from "react";
import PopupBg from "../components/PopupBg";
import StakingPopup from "../components/StakingPopup";
import Header from "./Header";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";

export default function Staking() {
  const navigate = useNavigate();
  const isMobile = useSelector((state) => state.common.isMobile);
  const param = useParams();

  console.log(param);

  const [price, setPrice] = useState("");
  const [stakingPopup, setStakingPopup] = useState(false);

  if (isMobile)
    return (
      <>
        <Header />
        <MstakingBox>
          <article className="imgContainer">
            <div className="topBar">
              <span className="tBox">
                <img src={I_tIcon} alt="" />
              </span>

              <span className="tokenTitle">USDT-MOONG</span>
            </div>

            <div className="imgBox">
              <img className="mainImg" src={E_cc} alt="" />
            </div>
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

              <button className="confirmBtn" onClick={() => navigate("popup")}>
                Staking
                {/* You don’t have enough USDT */}
              </button>
            </div>
          </article>

          {param.popup && (
            <>
              <StakingPopup off={setStakingPopup} />
              <PopupBg blur off={setStakingPopup} />
            </>
          )}
        </MstakingBox>
      </>
    );
  else
    return (
      <>
        <Header />
        <PstakingBox>
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

              <button
                className="confirmBtn"
                onClick={() => setStakingPopup(true)}
              >
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
        </PstakingBox>
      </>
    );
}

const MstakingBox = styled.div`
  padding: 56px 5.55vw 5.55vw 5.55vw;
  background: #000;
  background-image: url(${B_staking});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  overflow-y: scroll;

  .imgContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 88.9vw;
    padding: 4.44vw;
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
        width: 16.66vw;
        height: 16.66vw;
        background: #fff;
        border-radius: 50%;
        border: 1.38vw solid #333;

        img {
          width: 7.5vw;
        }
      }

      .tokenTitle {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 44.44vw;
        height: 11.11vw;
        font-size: 4.44vw;
        font-weight: 700;
        text-transform: uppercase;
        color: #fff;
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(60px);
        border-radius: 30px;
      }
    }

    .imgBox {
      flex: 1;
      width: 100%;
      overflow: hidden;

      .mainImg {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }

  .settingContainer {
    display: flex;
    flex-direction: column;
    gap: 5.55vw;
    margin: 12.22vw 0 0 0;

    .title {
      height: 5.55vw;
      padding: 0 3.33vw;
      object-fit: cover;
    }

    .contBox {
      .availbleBox {
        display: flex;
        flex-direction: column;
        gap: 2.77vw;
        padding: 0 3.33vw;
        font-size: 5vw;
        font-weight: 500;

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
        height: 16.66vw;
        margin: 5.55vw 0 0 0;
        padding: 2.77vw 2.77vw 2.77vw 6.66vw;
        background: #fff;
        border-radius: 3.33vw;

        * {
          font-weight: 700;
        }

        input {
          flex: 1;
          height: 100%;
          font-size: 6.66vw;
          min-width: 0;
        }

        .unit {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          padding: 0 4.44vw;
          font-size: 6.66vw;
          color: #fff;
          background: #000;
          border-radius: 2.77vw;
        }
      }

      .explain {
        margin: 5.55vw 0 0 0;
        font-size: 5vw;
        font-weight: 500;
        color: #7a7a7a;
      }

      .confirmBtn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 13.88vw;
        margin: 5.55vw 0 0 0;
        font-size: 4.44vw;
        font-weight: 500;
        background: #fff;
        border-radius: 12px;
      }
    }
  }
`;

const PstakingBox = styled.div`
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
