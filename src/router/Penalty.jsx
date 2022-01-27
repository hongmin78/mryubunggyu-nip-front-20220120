import { useState } from "react";
import styled from "styled-components";
import I_x from "../img/icon/I_x.svg";
import I_heartO from "../img/icon/I_heartO.svg";
import I_heart from "../img/icon/I_heart.svg";
import E_marketProf1 from "../img/main/E_marketProf1.png";
import E_marketItem1 from "../img/main/E_marketItem1.png";

import { useNavigate } from "react-router-dom";
import LogoHeader from "../components/header/LogoHeader";
import { useSelector } from "react-redux";

export default function Penalty() {
  const navigate = useNavigate();

  const isMobile = useSelector((state) => state.common.isMobile);

  const [like, setLike] = useState(false);

  if (isMobile)
    return (
      <>
        <LogoHeader />
        <MpenaltyBox>
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
                  <p className="title">Nero #1</p>

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
                      If the winning auction bid amount is not paid by 9:00 on
                      the same day, the account will be locked and a 10% penalty
                      will be charged
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
        </MpenaltyBox>
      </>
    );
  else
    return (
      <>
        <LogoHeader />
        <PpenaltyBox>
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
                  <p className="title">Nero #1</p>

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
                      If the winning auction bid amount is not paid by 9:00 on
                      the same day, the account will be locked and a 10% penalty
                      will be charged
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
        </PpenaltyBox>
      </>
    );
}

const MpenaltyBox = styled.div`
  padding: 56px 0 0 0;
  .innerBox {
    padding: 2.77vw 0 0 0;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 48px;
    width: 1144px;
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
        box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.2);
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
            background: #f6f6f6;
            backdrop-filter: blur(60px);
            border-radius: 30px;
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

const PpenaltyBox = styled.div`
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
    width: 1144px;
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
        box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.2);
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
            background: #f6f6f6;
            backdrop-filter: blur(60px);
            border-radius: 30px;
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
