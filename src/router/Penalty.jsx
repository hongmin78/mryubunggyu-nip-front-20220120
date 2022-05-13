import { useState, useEffect } from "react";
import styled from "styled-components";
import I_x from "../img/icon/I_x.svg";
import I_heartO from "../img/icon/I_heartO.svg";
import I_heart from "../img/icon/I_heart.svg";
import E_marketProf1 from "../img/main/E_marketProf1.png";
import E_marketItem1 from "../img/main/E_marketItem1.png";
import { API } from "../configs/api";
import { useNavigate } from "react-router-dom";
import LogoHeader from "../components/header/LogoHeader";
import { useSelector } from "react-redux";
import PayDelinquency from "../components/PayDelinquency";
import axios from "axios";
import { LOGGER, getmyaddress } from "../util/common";
import { net } from "../configs/net";
import { strDot } from "../util/Util";

export default function Penalty() {
  const navigate = useNavigate();
  let address = getmyaddress();
  const isMobile = useSelector((state) => state.common.isMobile);
  const delinquencyAmount = useSelector((state) => state.common.delinquencyAmount);

  const [like, setLike] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [payList, setPayList] = useState([]);

  const modalToggle = () => {
    setOpenModal(() => !openModal);
  };

  const fatchData = () => {
    axios
      .get(`${API.API_DELINQUENCY}/${address}/0/10/id/DESC` + `?nettype=${net}&itemdetail=1`)
      .then((res) => {
        console.log("Pay", res);
        let { status, list } = res.data;
        if (status === "OK") {
          setPayList(list);
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  useEffect(() => {
    fatchData();
  }, []);

  if (isMobile)
    return (
      <>
        <LogoHeader />
        <MpenaltyBox>
          <section className="innerBox">
            <article className="textBox">
              <div className="explainBox">
                <div className="titleBox">
                  <strong className="title">
                    Yor NFT is
                    <br /> on its way!
                  </strong>
                </div>

                <div className="explain">
                  <p className="cong">Your profile is blocked temporarily. Please pay for your delinquency.</p>
                </div>
              </div>
            </article>

            <article className="item">
              <div className="topBar">
                <div className="profBox">
                  <img src={E_marketProf1} alt="" />
                  <p className="address">{payList[0] ? strDot(payList[0].username, 4, 10) : null}</p>
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

              <div className="infoBox">
                {payList &&
                  payList.map((item, i) => (
                    <ul className="detailList">
                      <li className="time">
                        <p>Series Kong #{item.item.id}</p>
                      </li>
                      <li className="price">
                        <p>Price : {item.circulations.price} USDT</p>
                      </li>
                      <li className="price">
                        <p>Penalty : {item.amount} USDT</p>
                      </li>
                    </ul>
                  ))}
              </div>
            </article>
            <p style={{ fontSize: "6vw", fontWeight: "bold" }}>Please pay Total {delinquencyAmount} USDT</p>
            <article className="btnBox">
              <button className="confirmBtn" onClick={modalToggle}>
                Pay now
              </button>
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
                    <p className="address">{payList[0] ? strDot(payList[0].username, 4, 10) : null}</p>
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

                <div className="infoBox">
                  {payList &&
                    payList.map((item, i) => (
                      <ul className="detailList">
                        <li className="time">
                          <p>Series Kong #{item.item.id}</p>
                        </li>
                        <li className="price">
                          <p>Price : {item.circulations.price} USDT</p>
                        </li>
                        <li className="price">
                          <p>Penalty : {item.amount} USDT</p>
                        </li>
                      </ul>
                    ))}
                </div>
              </div>

              <div className="textBox">
                <div className="explainBox">
                  <strong className="title">
                    Yor NFT is
                    <br /> on its way!
                  </strong>

                  <div className="explain">
                    <p className="pay">Your profile is blocked temporarily. Please pay for your delinquency.</p>
                    <p className="cong">Please pay Total {delinquencyAmount} USDT</p>
                    {/* <p className="pay">Pay 688 USDT for your NFT transfer</p> */}
                  </div>
                </div>

                <div className="btnBox">
                  <button className="confirmBtn" onClick={modalToggle}>
                    Pay now
                  </button>
                </div>
              </div>
            </article>
          </section>
          {openModal && <PayDelinquency off={modalToggle} delinquencyAmount={delinquencyAmount} />}
        </PpenaltyBox>
      </>
    );
}

const MpenaltyBox = styled.div`
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

          .title {
            width: 56vw;
            font-size: 10vw;
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
        img {
          width: 6vw;
        }
        .address {
          font-size: 4.44vw;
          font-weight: 500;
        }
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
        height: 90vw;

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
            margin-top: 2vw;
            &.time {
              font-size: 4.44vw;
              line-height: 3.88vw;
              color: #fff;
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
          margin-bottom: 1.5vw;

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
          height: 90vw;

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
            padding: 20px 12px;
            font-size: 20px;
            font-weight: 500;
            line-height: 19px;
            background: #000;
            border-radius: 30px;

            li {
              display: flex;
              justify-content: space-between;

              &.time {
                color: #fff;
              }

              &.price {
                color: #fff;
              }
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
              margin-top: 4vw;
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
