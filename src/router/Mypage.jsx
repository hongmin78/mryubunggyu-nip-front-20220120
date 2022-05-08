import styled from "styled-components";
import Header from "../components/header/Header";
import Footer from "./Footer";
import { strDot } from "../util/Util";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import MyItems from "../components/myprof/MyItems";
import Recommend from "../components/myprof/Recommend";
import PopupBg from "../components/PopupBg";
import { useNavigate } from "react-router-dom";
import B_mypage from "../img/mypage/B_mypage.png";
import E_prof from "../img/mypage/E_prof.png";
import I_copy from "../img/icon/I_copy.svg";
import I_3dot from "../img/icon/I_3dot.svg";
import I_upload from "../img/icon/I_upload.svg";
import I_clip from "../img/icon/I_clip.svg";
import Staking from "../components/myprof/Staking";
import { getmyaddress, LOGGER } from "../util/common";
import moment from "moment";
import axios from "axios";
import { API } from "../configs/api";
import { addresses } from "../configs/addresses";
import { TIME_FETCH_MYADDRESS_DEF } from "../configs/configs";
import SetErrorBar from "../util/SetErrorBar.js";
import { messages } from "../configs/messages";
import { net } from "../configs/net";

export default function Mypage() {
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.common.isLogin);
  const isMobile = useSelector((state) => state.common.isMobile);
  const [category, setCategory] = useState(0);
  const [showEditBtn, setShowEditBtn] = useState(false);
  const [showCopyBtn, setShowCopyBtn] = useState(false);
  const [userinfo, setuserinfo] = useState();

  const fetchdata = async (_) => {
    let myaddress = getmyaddress();
    if (myaddress) {
      axios
        .get(API.API_USERINFO + `/${myaddress}?nettype=${net}`)
        .then((resp) => {
          LOGGER("userInfo", resp.data);
          let { status, respdata } = resp.data;

          if (status == "OK") {
            setuserinfo(respdata);
          }
        });
    } else {
      SetErrorBar(messages.MSG_CONNECTWALET);
    }
  };
  useEffect((_) => {
    fetchdata();
  }, []);

  if (isMobile)
    return (
      <>
        <Header />
        <MmypageBox>
          <article className="profBox">
            <img className="bg" src={B_mypage} alt="" />
            <div className="contBox">
              <div className="leftBox">
                <span className="profImg">
                  <img src={E_prof} alt="" />
                </span>

                <span className="adressContainer">
                  <span className="name">@{userinfo?.nickname}</span>
                  <span className="addressBox">
                    <p>{strDot(isLogin, 4, 4)}</p>
                    <img src={I_copy} alt="" />
                  </span>
                </span>
              </div>

              <div className="btnBox">
                <div className="posBox">
                  <button className="moreBtn hoverBtn" onClick={() => {}}>
                    <img src={I_3dot} alt="" />
                  </button>

                  <div className="hoverBox">
                    <button
                      className="editBtn displayBtn"
                      onClick={() => navigate("/editprof")}
                    >
                      <p>Edit Profile</p>
                    </button>
                  </div>
                </div>

                <div className="posBox">
                  <button className="shareBtn hoverBtn" onClick={() => {}}>
                    <img src={I_upload} alt="" />
                    <p>Share</p>
                  </button>

                  <div className="hoverBox">
                    <button className="copyBtn displayBtn" onClick={() => {}}>
                      <img src={I_clip} alt="" />
                      <p>Copy Link</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <article className="categoryCont">
            <ul className="categoryBar">
              {categoryList.map((cont, index) => (
                <li key={index} onClick={() => setCategory(index)}>
                  <p>{cont}</p>

                  <div
                    className="underLine"
                    style={{
                      display: category === index && "block",
                    }}
                  />
                </li>
              ))}
            </ul>

            <div className="contBox">
              {category === 0 && <MyItems />}
              {category === 1 && <Staking />}
              {category === 2 && <Recommend userinfo={userinfo} />}
            </div>
          </article>
        </MmypageBox>
        <Footer />
      </>
    );
  else
    return (
      <>
        <Header />
        <PmypageBox>
          <article className="profBox">
            <img className="bg" src={B_mypage} alt="" />
            <div className="contBox">
              <div className="leftBox">
                <span className="profImg">
                  <img src={userinfo?.profileimageurl} alt="" />
                </span>

                <span className="adressContainer">
                  <span className="name">@{userinfo?.nickname}</span>
                  <span className="addressBox">
                    <p>{strDot(isLogin, 4, 4)}</p>
                    <img src={I_copy} alt="" />
                  </span>
                </span>
              </div>

              <div className="btnBox">
                <div className="posBox">
                  <button className="moreBtn hoverBtn" onClick={() => {}}>
                    <img src={I_3dot} alt="" />
                  </button>

                  <div className="hoverBox">
                    <button
                      className="editBtn displayBtn"
                      onClick={() => navigate("/editprof", { state: userinfo })}
                    >
                      <p>Edit Profile</p>
                    </button>
                  </div>
                </div>

                <div className="posBox">
                  <button className="shareBtn hoverBtn" onClick={() => {}}>
                    <img src={I_upload} alt="" />
                    <p>Share</p>
                  </button>

                  <div className="hoverBox">
                    <button className="copyBtn displayBtn" onClick={() => {}}>
                      <img src={I_clip} alt="" />
                      <p>Copy Link</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <article className="categoryCont">
            <ul className="categoryBar">
              {categoryList.map((cont, index) => (
                <li key={index} onClick={() => setCategory(index)}>
                  <p>{cont}</p>

                  <div
                    className="underLine"
                    style={{
                      display: category === index && "block",
                    }}
                  />
                </li>
              ))}
            </ul>

            <div className="contBox">
              {category === 0 && <MyItems />}
              {category === 1 && <Staking />}
              {category === 2 && <Recommend userinfo={userinfo} />}
            </div>
          </article>
        </PmypageBox>
        <Footer />
      </>
    );
}

const MmypageBox = styled.section`
  padding: 56px 0 25vw 0;

  .profBox {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 83.33vw;
    position: relative;

    .bg {
      width: 100%;
      height: 67.77vw;
      object-fit: cover;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -48%);
      position: absolute;
    }

    .contBox {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 100%;
      padding: 0 2.77vw;
      z-index: 2;
      position: relative;

      .topBar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 24px;
        width: 100%;

        .profImg {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 20.55vw;
          height: 20.55vw;
          border-radius: 50%;
          border: 1.66vw solid #fff;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        .btnBox {
          display: flex;
          gap: 1.38vw;
          position: relative;

          .posBox {
            position: relative;

            .hoverBtn {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 10.55vw;
              font-size: 3.88vw;
              font-weight: 500;
              background: red;
              box-shadow: 2px 0px 6px rgba(0, 0, 0, 0.1);

              &.moreBtn {
                width: 10.55vw;
                border-radius: 50%;
              }

              &.shareBtn {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 25vw;
                padding: 0 3.88vw 0 3.33vw;
                border-radius: 30px;

                img {
                  height: 4.16vw;
                }
              }
            }

            .displayBtn {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 12.22vw;
              padding: 0 5.55vw;
              font-size: 3.88vw;
              font-weight: 500;
              background: #fff;
              border-radius: 3.33vw;
              right: 0;
              top: 0;
              position: absolute;
              transform: translate(0, 46px);
              z-index: 6;

              &.editBtn {
              }

              &.copyBtn {
                gap: 2vw;

                img {
                  height: 6vw;
                }
              }

              p {
                white-space: nowrap;
                font-family: "Roboto", sans-serif;
              }
            }
          }
        }
      }

      .adressContainer {
        display: flex;
        width: 100%;
        height: 13.33vw;
        background: #fff;
        border-radius: 8.33vw;
        box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
        overflow: hidden;

        .name {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 7.77vw;
          font-size: 4.44vw;
          font-weight: 500;
          color: #fff;
          background: #000;
          border-radius: 8.33vw;
        }

        .addressBox {
          flex: 1;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 5.55vw 0 3.88vw;
          font-size: 4.44vw;
          font-weight: 500;

          p {
            font-family: "Red Hat Mono", monospace;
          }

          img {
            width: 6.66vw;
            cursor: pointer;
          }
        }
      }
    }
  }

  .categoryCont {
    .categoryBar {
      display: flex;
      height: 18.33vw;
      border-bottom: 1.4px solid #d9d9d9;

      li {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        font-size: 4.44vw;
        font-weight: 600;
        position: relative;
        cursor: pointer;

        .underLine {
          display: none;
          width: 100%;
          height: 4px;
          background: #000;
          bottom: 0;
          position: absolute;
        }
      }
    }

    .contBox {
    }
  }
`;

const PmypageBox = styled.section`
  padding: 160px 0 220px 0;
  margin: 0 auto;
  max-width: 1440px;

  @media screen and (max-width: 1440px) {
    padding: 160px 20px 220px 20px;
  }

  .profBox {
    display: flex;
    width: 100%;
    height: 320px;
    position: relative;

    .bg {
      width: 100%;
      height: 256px;
      object-fit: cover;
      top: 0;
      position: absolute;
      border-radius: 24px;
    }

    .contBox {
      display: flex;
      align-self: flex-end;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 0 40px;
      z-index: 2;
      position: relative;

      .leftBox {
        display: flex;
        align-self: center;
        align-items: center;
        gap: 24px;

        .profImg {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          border: 10px solid #fff;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        .adressContainer {
          display: flex;
          width: 324px;
          height: 54px;
          background: #fff;
          border-radius: 30px;
          box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
          overflow: hidden;

          .name {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 18px;
            font-weight: 500;
            color: #fff;
            background: #000;
            padding: 0 24px;
            border-radius: 30px;
          }

          .addressBox {
            flex: 1;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 15px;
            padding: 0 24px 0 20px;
            font-size: 18px;
            font-weight: 500;

            p {
              font-family: "Red Hat Mono", monospace;
            }

            img {
              cursor: pointer;
            }
          }
        }
      }

      .btnBox {
        display: flex;
        gap: 15px;
        position: relative;

        .posBox {
          position: relative;

          &:hover {
            .hoverBox {
              display: block;
            }
          }

          .hoverBtn {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 54px;
            font-size: 16px;
            font-weight: 500;
            background: #fff;
            box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);

            &.moreBtn {
              width: 54px;
              border-radius: 50%;
            }

            &.shareBtn {
              display: flex;
              justify-content: space-between;
              align-items: center;
              width: 128px;
              padding: 0 24px;
              border-radius: 30px;
            }
          }

          .hoverBox {
            display: none;
            width: 100%;
            height: 108px;
            bottom: 0;
            position: absolute;

            .displayBtn {
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 10px;
              height: 44px;
              padding: 0 20px;
              font-size: 18px;
              font-weight: 500;
              background: #fff;
              border-radius: 12px;
              right: 0;
              position: absolute;
              z-index: 6;

              p {
                white-space: nowrap;
                font-family: "Roboto", sans-serif;
              }
            }
          }
        }
      }
    }
  }

  .categoryCont {
    .categoryBar {
      display: flex;
      height: 66px;
      border-bottom: 1.4px solid #d9d9d9;

      li {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        font-weight: 600;
        position: relative;
        cursor: pointer;

        p {
          padding: 0 16px;
        }

        .underLine {
          display: none;
          width: 100%;
          height: 4px;
          background: #000;
          bottom: 0;
          position: absolute;
        }
      }
    }

    .contBox {
    }
  }
`;

const categoryList = ["My Items", "Staking", "Recommend"];
