import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import HeaderPopup from "../components/HeaderPopup";
import I_logo from "../img/icon/I_logo.svg";
import I_logoText from "../img/icon/I_logoText.svg";
import I_logoTextWhite from "../img/icon/I_logoTextWhite.svg";
import I_3line from "../img/icon/I_3line.svg";
import I_3lineWhite from "../img/icon/I_3lineWhite.svg";
import { strDot } from "../util/Util";
import MenuPopup from "../components/header/MmenuPopup";

export default function Header() {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  const isMobile = useSelector((state) => state.common.isMobile);
  const isLogin = useSelector((state) => state.common.isLogin);
  let isStaking = pathname.indexOf("/staking") !== -1;

  const [headerPopup, setHeaderPopup] = useState(false);

  const [mMenuPopup, setMmenuPopup] = useState(false);

  if (isMobile) {
    return (
      <>
        <MheaderBox style={{ background: isStaking && "unset" }}>
          <div className="logoBox">
            <img className="logoImg" src={I_logo} alt="" />
            <p className="logoText" style={{ color: isStaking && "#fff" }}>
              NIP
            </p>
          </div>

          <button className="menuBtn" onClick={() => setMmenuPopup(true)}>
            <img src={isStaking ? I_3lineWhite:I_3line} alt="" />
          </button>
        </MheaderBox>

        {mMenuPopup && <MenuPopup off={setMmenuPopup} />}
      </>
    );
  } else {
    return (
      <PheaderBox style={{ background: isStaking && "unset" }}>
        <section className="innerBox">
          <button className="logoBox" onClick={() => navigate("/")}>
            <img className="logoImg" src={I_logo} alt="" />
            <img
              className="logoText"
              src={isStaking ? I_logoTextWhite : I_logoText}
              alt=""
            />
          </button>

          <article className="rightBox">
            <nav>
              <button
                style={{ color: isStaking && "#fff" }}
                onClick={() => navigate("/staking")}
              >
                Lucky Ticket
              </button>
              <button
                style={{ color: isStaking && "#fff" }}
                onClick={() => navigate("/auction")}
              >
                Subscription Auction
              </button>
              <button
                style={{ color: isStaking && "#fff" }}
                onClick={() => navigate("/market")}
              >
                Marketplece
              </button>
            </nav>

            {isLogin ? (
              <button
                className="menuBtn"
                style={{
                  color: isStaking && "#000",
                  background: isStaking && "#fff",
                }}
                onClick={() => setHeaderPopup(!headerPopup)}
              >
                <span className="balanceBox">
                  <p className="price">0.0523456</p>
                  <p className="unit">USDT</p>
                </span>

                <span
                  className="address"
                  style={{
                    background: isStaking && "#f6f6f6",
                  }}
                >
                  {strDot(isLogin, 4, 4)}
                </span>

                {headerPopup && <HeaderPopup />}
              </button>
            ) : (
              <button
                className="connectBtn"
                onClick={() => navigate("/connectwallet")}
              >
                Connect Wallet
              </button>
            )}
          </article>
        </section>
      </PheaderBox>
    );
  }
}

const PheaderBox = styled.header`
  display: flex;
  justify-content: center;
  height: 100px;
  background: #fff;
  top: 0;
  right: 0;
  left: 0;
  position: fixed;
  z-index: 4;

  .innerBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1440px;
    @media screen and (max-width: 1024px) {
      padding: 0 20px;
    }

    .logoBox {
      display: flex;
      align-items: flex-end;
      gap: 4px;

      .logoImg {
        height: 57px;
      }

      .logoText {
        height: 24px;
      }
    }

    .rightBox {
      display: flex;
      align-items: center;
      gap: 40px;

      & > nav {
        display: flex;
        gap: 30px;

        button {
          font-size: 18px;
          font-weight: 500;
        }
      }

      .menuBtn {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 14px;
        width: 280px;
        height: 54px;
        padding: 6px 6px 6px 24px;
        font-size: 18px;
        font-weight: 500;
        color: #fff;
        background: #000;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
        border-radius: 30px;
        position: relative;

        .balanceBox {
          flex: 1;
          display: flex;
          overflow: hidden;

          .price {
            flex: 1;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }

        .address {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 130px;
          height: 100%;
          font-size: 18px;
          font-weight: 500;
          color: #000;
          background: #f6f6f6;
          border-radius: 30px;
        }
      }
    }

    .connectBtn {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 54px;
      padding: 0 24px;
      font-size: 18px;
      font-weight: 500;
      line-height: 18px;
      color: #fff;
      background: #000;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
      border-radius: 30px;
    }
  }
`;

const MheaderBox = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  padding: 0 20px;
  background: #fff;
  top: 0;
  right: 0;
  left: 0;
  position: fixed;
  z-index: 4;

  .logoBox {
    display: flex;
    align-items: center;
    gap: 3px;

    .logoImg {
      width: 22px;
    }

    .logoText {
      font-size: 20px;
      font-weight: 600;
      color: #063a71;
    }
  }
`;
