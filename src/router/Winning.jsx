import React, { memo, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import I_x from "../img/icon/I_x.svg";
import I_heartO from "../img/icon/I_heartO.svg";
import I_heart from "../img/icon/I_heart.svg";
import I_party from "../img/icon/I_party.png";
import E_marketProf1 from "../img/main/E_marketProf1.png";
import E_marketItem1 from "../img/main/E_marketItem1.png";

import { useNavigate } from "react-router-dom";
import LogoHeader from "../components/header/LogoHeader";
import { useSelector } from "react-redux";
import { Particles } from "../util/Particle";

export default function Winning() {
  const navigate = useNavigate();

  const isMobile = useSelector((state) => state.common.isMobile);

  const [like, setLike] = useState(false);
  const [particles, setParticles] = useState([]);

  function getEffect() {
    setParticles((particles) => [...particles, 1]);
    setTimeout(() => {
      // Cleanup
      setParticles((particles) => particles.filter(() => false));
    }, 5000);
  }

  useEffect(() => {
    getEffect();
  }, []);

  if (isMobile)
    return (
      <>
        <LogoHeader />
        <Mwinning>
          <section className="innerBox">
            <article className="textBox">
              <div className="explainBox">
                <div className="titleBox">
                  <strong className="title">
                    Yor NFT is
                    <br /> on its way!
                  </strong>

                  <img src={I_party} alt="" />
                </div>

                <div className="explain">
                  <p className="cong">
                    Congratulations! you've claimed your NFT, it's currently
                    being transferred to your wallet.
                  </p>
                  <p className="pay">Pay 688 USDT for your NFT transfer</p>
                </div>
              </div>
            </article>

            <article className="item">
              <div className="topBar">
                <div className="profBox">
                  <img src={E_marketProf1} alt="" />
                  <p className="address">@andyfeltham</p>
                </div>

                <button className="likeBtn" onClick={() => setLike(!like)}>
                  <img src={like ? I_heartO : I_heart} alt="" />
                  <p
                    className="count"
                    style={{
                      color: like && "#ff5050",
                    }}
                  >
                    22
                  </p>
                </button>
              </div>

              <img className="itemImg" src={E_marketItem1} alt="" />

              <div className="infoBox">
                <p className="title">Series Kong #1</p>

                <ul className="detailList">
                  <li className="time">
                    <p>Last</p>
                  </li>
                  <li className="price">
                    <p>688&nbsp;USDT</p>
                  </li>
                </ul>
              </div>
            </article>

            <article className="btnBox">
              <p className="explain">
                If payment is not made by 2022-01-22 21:00:00, payment will be
                It will be canceled and your account will be locked.
              </p>

              <button className="confirmBtn" onClick={() => navigate("/")}>
                Confirm checkout
              </button>
            </article>
          </section>
        </Mwinning>
      </>
    );
  else
    return (
      <>
        {particles.map((id) => (
          <Particles key={id} count={Math.floor(window.innerWidth / 10)} />
        ))}

        <LogoHeader />
        <PwinningBox>
          <section className="innerBox">
            <article className="topBar">
              <button className="exitBtn" onClick={() => navigate("/")}>
                <img src={I_x} alt="" />
              </button>
            </article>

            <article className="contBox">
              <div className="item">
                <div className="topBar">
                  <div className="profBox">
                    <img src={E_marketProf1} alt="" />
                    <p className="address">@andyfeltham</p>
                  </div>

                  <button className="likeBtn" onClick={() => setLike(!like)}>
                    <img src={like ? I_heartO : I_heart} alt="" />
                    <p
                      className="count"
                      style={{
                        color: like && "#ff5050",
                      }}
                    >
                      22
                    </p>
                  </button>
                </div>

                <img className="itemImg" src={E_marketItem1} alt="" />

                <div className="infoBox">
                  <p className="title">Series Kong #1</p>

                  <ul className="detailList">
                    <li>
                      <p>Current bid</p>
                    </li>
                    <li style={{ color: "#fff" }}>
                      <p>688&nbsp;USDT</p>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="textBox">
                <div className="explainBox">
                  <strong className="title">
                    Yor NFT is
                    <br /> on its way!
                  </strong>

                  <div className="explain">
                    <p className="cong">
                      Congratulations! you've claimed your NFT, it's currently
                      being transferred to your wallet.
                    </p>
                    <p className="pay">Pay 688 USDT for your NFT transfer</p>
                  </div>
                </div>

                <div className="btnBox">
                  <p className="explain">
                    If payment is not made by 2022-01-22 21:00:00, payment will
                    be It will be canceled and your account will be locked.
                  </p>

                  <button className="confirmBtn" onClick={() => navigate("/")}>
                    Confirm checkout
                  </button>
                </div>
              </div>
            </article>
          </section>
        </PwinningBox>
      </>
    );
}

const Mwinning = styled.div`
  padding: 56px 0 0 0;

  .innerBox {
    display: flex;
    flex-direction: column;
    gap: 8.33vw;
    padding: 2.77vw 5.55vw 18.33vw 5.55vw;

    .textBox {
      display: flex;
      flex-direction: column;

      .explainBox {
        display: flex;
        flex-direction: column;
        gap: 1.66vw;

        .titleBox {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .title {
            width: 56vw;
            font-size: 10vw;
          }

          img {
            width: 26.94vw;
            object-fit: contain;
          }
        }

        .explain {
          display: flex;
          flex-direction: column;
          gap: 3.33vw;

          .cong {
            font-size: 5vw;
            font-weight: 500;
            font-family: "Roboto", sans-serif;
          }

          .pay {
            font-size: 3.88vw;
            font-weight: 600;
            color: #c4c4c4;
          }
        }
      }
    }

    .item {
      display: flex;
      flex-direction: column;
      box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.2);
      border-radius: 3.33vw;
      overflow: hidden;
      cursor: pointer;

      .topBar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 16.66vw;
        padding: 0 4.44vw;

        .profBox {
          display: flex;
          align-items: center;
          gap: 2.77vw;
        }

        .likeBtn {
          display: flex;
          align-items: center;
          gap: 1.66vw;
          height: 10vw;
          padding: 0 13px;
          font-size: 4.44vw;
          font-weight: 500;
          backdrop-filter: blur(60px);
          border-radius: 8.33vw;

          &:hover {
            background: #f6f6f6;
          }
        }
      }

      .itemImg {
        width: 100%;
        height: 88.9vw;
        object-fit: cover;
      }

      .infoBox {
        display: flex;
        flex-direction: column;
        height: 27.77vw;

        .title {
          display: flex;
          align-items: center;
          height: 12.5vw;
          padding: 0 4.44vw;
          font-size: 4.44vw;
          font-weight: 600;
        }

        .detailList {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 1.11vw;
          padding: 0 4.44vw;
          font-weight: 500;
          background: #000;
          font-weight: 500;

          li {
            display: flex;
            justify-content: space-between;

            &.time {
              font-size: 3.88vw;
              line-height: 3.88vw;
              color: #7a7a7a;
            }

            &.price {
              font-size: 4.44vw;
              line-height: 4.44vw;
              color: #fff;
            }
          }
        }
      }
    }

    .btnBox {
      display: flex;
      flex-direction: column;
      gap: 8.88vw;

      .explain {
        font-size: 3.88vw;
        font-weight: 600;
        text-align: center;
      }

      .confirmBtn {
        height: 13.88vw;
        border-radius: 3.33vw;
        font-size: 5.55vw;
        font-weight: 600;
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
      }
    }
  }
`;

const PwinningBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;

  .innerBox {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 48px;
    width: 100%;
    max-width: 1144px;
    height: 764px;
    padding: 58px 68px;
    background: #ffffff;
    box-shadow: 5px 4px 10px rgba(0, 0, 0, 0.25);
    border-radius: 20px 20px 0px 20px;
    z-index: 2;

    .topBar {
      display: flex;
      justify-content: flex-end;
      width: 100%;

      .exitBtn {
        img {
          width: 22px;
        }
      }
    }

    .contBox {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      max-width: 934px;

      .item {
        display: flex;
        flex-direction: column;
        width: 330px;
        min-width: 330px;
        height: 522px;
        border-radius: 12px;
        overflow: hidden;
        cursor: pointer;

        .topBar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 60px;
          padding: 0 16px;

          .profBox {
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .likeBtn {
            display: flex;
            align-items: center;
            gap: 6px;
            height: 38px;
            padding: 0 13px;
            font-weight: 500;
            backdrop-filter: blur(60px);
            border-radius: 30px;

            &:hover {
              background: #f6f6f6;
            }
          }
        }

        .itemImg {
          flex: 1;
          width: 100%;
          object-fit: cover;
        }

        .infoBox {
          display: flex;
          flex-direction: column;
          height: 132px;

          .title {
            height: 54px;
            padding: 0 12px;
            font-size: 20px;
            font-weight: 600;
            line-height: 54px;
          }

          .detailList {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 6px;
            padding: 0 12px;
            font-size: 16px;
            font-weight: 500;
            line-height: 19px;
            color: #7a7a7a;
            background: #000;

            li {
              display: flex;
              justify-content: space-between;
            }
          }
        }
      }

      .textBox {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 540px;
        height: 100%;

        .explainBox {
          display: flex;
          flex-direction: column;
          gap: 24px;
          width: 100%;

          .title {
            font-size: 56px;
          }

          .explain {
            display: flex;
            flex-direction: column;
            gap: 13px;

            .cong {
              font-size: 24px;
              font-weight: 500;
              font-family: "Roboto", sans-serif;
            }

            .pay {
              font-size: 20px;
              font-weight: 600;
              color: #c4c4c4;
            }
          }
        }

        .btnBox {
          display: flex;
          flex-direction: column;
          gap: 16px;

          .explain {
            font-size: 16px;
            font-weight: 600;
          }

          .confirmBtn {
            width: 480px;
            height: 60px;
            border-radius: 12px;
            font-size: 20px;
            font-weight: 600;
            box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
          }
        }
      }
    }
  }
`;
