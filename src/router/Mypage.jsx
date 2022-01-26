import styled from "styled-components";
import B_mypage from "../img/mypage/B_mypage.png";
import E_prof from "../img/mypage/E_prof.png";
import I_copy from "../img/icon/I_copy.svg";
import I_3dot from "../img/icon/I_3dot.svg";
import I_upload from "../img/icon/I_upload.svg";
import I_clip from "../img/icon/I_clip.svg";

import Footer from "./Footer";
import { strDot } from "../util/Util";
import { useSelector } from "react-redux";
import { useState } from "react";
import MyItems from "../components/myprof/MyItems";
import Recommend from "../components/myprof/Recommend";
import PopupBg from "../components/PopupBg";
import { useNavigate } from "react-router-dom";

export default function Mypage() {
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.common.isLogin);

  const [category, setCategory] = useState(0);
  const [morePopup, setMorePopup] = useState(false);

  return (
    <>
      <MypageBox>
        <article className="profBox">
          <img className="bg" src={B_mypage} alt="" />
          <div className="contBox">
            <div className="leftBox">
              <span className="profImg">
                <img src={E_prof} alt="" />
              </span>

              <span className="adressContainer">
                <span className="name">#36185</span>
                <span className="addressBox">
                  <p>{strDot(isLogin, 4, 4)}</p>
                  <img src={I_copy} alt="" />
                </span>
              </span>
            </div>

            <div className="btnBox">
              <button className="moreBtn" onClick={() => setMorePopup(true)}>
                <img src={I_3dot} alt="" />
              </button>

              <button className="shareBtn" onClick={() => {}}>
                <img src={I_upload} alt="" />
                <p>Share</p>
              </button>

              {morePopup && (
                <>
                  <div className="morePopup" onClick={() => setMorePopup()}>
                    <button
                      className="editBtn"
                      onClick={() => navigate("/editprof")}
                    >
                      <p>Edit Profile</p>
                    </button>
                    <button className="copyBtn" onClick={() => {}}>
                      <img src={I_clip} alt="" />
                      <p>Copy Link</p>
                    </button>
                  </div>
                  <PopupBg off={setMorePopup} />
                </>
              )}
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
            {category === 1 && <Recommend />}
          </div>
        </article>
      </MypageBox>
      <Footer />
    </>
  );
}

const MypageBox = styled.section`
  padding: 160px 0 220px 0;
  margin: 0 auto;
  max-width: 1440px;

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
            align-items: center;
            gap: 15px;
            padding: 0 0 0 20px;
            font-size: 18px;
            font-weight: 500;

            p {
              font-family: "Red Hat Mono", monospace;
            }
          }
        }
      }

      .btnBox {
        display: flex;
        gap: 15px;
        position: relative;

        & > button {
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

        .morePopup {
          display: flex;
          background: #fff;
          border-radius: 12px;
          right: 0;
          bottom: 0;
          position: absolute;
          transform: translate(0, -64px);
          z-index: 6;

          button {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 44px;
            font-size: 18px;
            font-weight: 500;

            &.editBtn {
              padding: 0 16px 0 20px;
            }

            &.copyBtn {
              padding: 0 20px 0 16px;
            }

            p {
              white-space: nowrap;
              font-family: "Roboto", sans-serif;
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

const categoryList = ["My Items", "Recommend"];
