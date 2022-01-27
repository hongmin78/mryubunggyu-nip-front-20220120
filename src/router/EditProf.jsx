import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import I_ltArw from "../img/icon/I_ltArw.svg";
import I_img from "../img/icon/I_img.svg";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../components/header/Header";
import DetailHeader from "../components/header/DetailHeader";

export default function EditProf() {
  const navigate = useNavigate();
  const profImgInputRef = useRef();
  const covImgInputRef = useRef();

  const isMobile = useSelector((state) => state.common.isMobile);

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [onClickChange, setOnClickChange] = useState(false);

  function OnChangeProfImgFile(file) {}
  function OnChangeCovImgFile(file) {}

  if (isMobile)
    return (
      <>
        <DetailHeader title="Edit Profile" />
        <MeditProfBox>
          <ul className="setList">
            <li className="profImgBox">
              <p className="title">Upload a profile image</p>

              <button
                className="profImgBtn"
                onClick={() => profImgInputRef.current.click()}
              >
                <div className="innerBox">
                  <img src={I_img} alt="" />
                </div>

                <input
                  ref={profImgInputRef}
                  className="noSpace"
                  type="file"
                  accept="image/*"
                  onChange={(e) => OnChangeProfImgFile(e.target.files[0])}
                />
              </button>
            </li>

            <li className="covImgBox">
              <p className="title">Upload a profile image</p>

              <button
                className="covImgBtn"
                onClick={() => covImgInputRef.current.click()}
              >
                <div className="innerBox">
                  <p className="explain">
                    Recommended size: 1500x500px.
                    <br />
                    JPG, PNG, or GIF. 10MB max size.
                  </p>

                  <button className="chooseBtn">Choose File</button>
                </div>

                <input
                  ref={covImgInputRef}
                  className="noSpace"
                  type="file"
                  accept="image/*"
                  onChange={(e) => OnChangeCovImgFile(e.target.files[0])}
                />
              </button>
            </li>

            <li className="emailBox">
              <p className="title">Email</p>

              <div className="inputBox">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="enter email"
                />
              </div>
              <button className="updateBtn" onClick={() => {}}>
                Update email preferences
              </button>
            </li>

            <li className="pwBox">
              <p className="title">Password</p>

              <div className="inputBox">
                <input
                  type="password"
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                  placeholder="enter password"
                />
              </div>

              <button
                className="changeBtn"
                onClick={() => setOnClickChange(true)}
              >
                Change Password
              </button>
            </li>

            {onClickChange && (
              <li className="chkPwBox">
                <p className="title">Confirm password</p>

                <div className="inputCont">
                  <div className="inputBox">
                    <input
                      type="password"
                      value={pw}
                      onChange={(e) => setPw(e.target.value)}
                      placeholder="enter confirm password"
                    />
                  </div>

                  <p className="alarm">Passwords are not matching.</p>
                </div>
              </li>
            )}

            <button className="saveBtn" onClick={() => {}}>
              Save Changes
            </button>
          </ul>
        </MeditProfBox>
      </>
    );
  else
    return (
      <>
        <Header />
        <PeditProfBox>
          <article className="topBar">
            <button className="exitBtn" onClick={() => navigate(-1)}>
              <img src={I_ltArw} alt="" />
            </button>
            <p className="title">Edit Profile</p>
          </article>

          <ul className="setList">
            <li className="profImgBox">
              <p className="title">Upload a profile image</p>

              <button
                className="profImgBtn"
                onClick={() => profImgInputRef.current.click()}
              >
                <div className="innerBox">
                  <img src={I_img} alt="" />
                </div>

                <input
                  ref={profImgInputRef}
                  className="noSpace"
                  type="file"
                  accept="image/*"
                  onChange={(e) => OnChangeProfImgFile(e.target.files[0])}
                />
              </button>
            </li>

            <li className="covImgBox">
              <p className="title">Upload a profile image</p>

              <button
                className="covImgBtn"
                onClick={() => covImgInputRef.current.click()}
              >
                <div className="innerBox">
                  <p className="explain">
                    Recommended size: 1500x500px.
                    <br />
                    JPG, PNG, or GIF. 10MB max size.
                  </p>

                  <button className="chooseBtn">Choose File</button>
                </div>

                <input
                  ref={covImgInputRef}
                  className="noSpace"
                  type="file"
                  accept="image/*"
                  onChange={(e) => OnChangeCovImgFile(e.target.files[0])}
                />
              </button>
            </li>

            <li className="emailBox">
              <p className="title">Email</p>

              <div className="inputBox">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="enter email"
                />

                <button className="updateBtn" onClick={() => {}}>
                  Update email preferences
                </button>
              </div>
            </li>

            <li className="pwBox">
              <p className="title">Password</p>

              <div className="inputCont">
                <div className="inputBox">
                  <input
                    type="password"
                    value={pw}
                    onChange={(e) => setPw(e.target.value)}
                    placeholder="enter password"
                  />
                </div>

                <button
                  className="changeBtn"
                  onClick={() => setOnClickChange(true)}
                >
                  Change Password
                </button>
              </div>
            </li>

            {onClickChange && (
              <li className="chkPwBox">
                <p className="title">Confirm password</p>

                <div className="inputCont">
                  <div className="inputBox">
                    <input
                      type="password"
                      value={pw}
                      onChange={(e) => setPw(e.target.value)}
                      placeholder="enter confirm password"
                    />
                  </div>

                  <p className="alarm">Passwords are not matching.</p>
                </div>
              </li>
            )}

            <button className="saveBtn" onClick={() => {}}>
              Save Changes
            </button>
          </ul>
        </PeditProfBox>
      </>
    );
}

const MeditProfBox = styled.section`
  padding: 55px 0 0 0;

  .setList {
    display: flex;
    flex-direction: column;
    gap: 5.55vw;
    padding: 6.94vw 5.55vw 8.88vw 5.55vw;

    & > li {
      display: flex;
      flex-direction: column;
      gap: 4.44vw;

      .title {
        font-size: 4.44vw;
        font-weight: 600;
      }

      .inputBox {
        display: flex;
        align-items: center;
        height: 12.22vw;
        padding: 0 16px;
        border: 1px solid #d9d9d9;
        border-radius: 12px;

        input {
          flex: 1;
          font-size: 16px;
          font-family: "Roboto", sans-serif;
        }
      }

      .alarm {
        margin: 2.77vw 0 0 0;
        font-size: 3.33vw;
        color: #ff5050;
        font-family: "Roboto", sans-serif;
      }

      &.profImgBox {
        .profImgBtn {
          width: 55.55vw;
          height: 55.55vw;
          padding: 3.33vw;
          border-radius: 3.33vw;
          border: 2px dashed #d9d9d9;

          .innerBox {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            border-radius: 2.77vw;
            background: #f6f6f6;

            img {
              width: 16.66vw;
              height: 16.66vw;
              object-fit: contain;
            }
          }
        }
      }

      &.covImgBox {
        .covImgBtn {
          width: 100%;
          height: 51.11vw;
          padding: 3.33vw;
          border-radius: 3.33vw;
          border: 2px dashed #d9d9d9;

          .innerBox {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 5.55vw;
            width: 100%;
            height: 100%;
            border-radius: 2.77vw;
            background: #f6f6f6;

            * {
              font-family: "Roboto", sans-serif;
            }

            .explain {
              font-size: 3.33vw;
              color: #7a7a7a;
            }

            .chooseBtn {
              width: 43.33vw;
              height: 12.22vw;
              font-size: 4.44vw;
              font-weight: 500;
              color: #7a7a7a;
              background: #e1e1e1;
              border-radius: 3.33vw;
            }
          }
        }
      }

      &.emailBox {
        .updateBtn {
          align-self: flex-end;
          font-size: 16px;
          font-weight: 500;
          color: #26a5d9;
        }
      }

      &.pwBox {
        .changeBtn {
          height: 12.22vw;
          font-size: 4.44vw;
          font-weight: 500;
          font-family: "Roboto", sans-serif;
          border: 1px solid #000;
          border-radius: 3.33vw;
        }
      }
    }

    .saveBtn {
      margin: 3.88vw 0 0 0;
      height: 13.88vw;
      font-size: 5vw;
      font-weight: 500;
      color: #fff;
      background: #000;
      border-radius: 3.33vw;
    }
  }
`;

const PeditProfBox = styled.section`
  width: 100%;
  margin: 190px auto 220px auto;
  max-width: 1044px;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.16);
  border-radius: 20px;

  .topBar {
    display: flex;
    align-items: center;
    gap: 26px;
    height: 84px;
    padding: 0 32px;

    .title {
      font-size: 24px;
      line-height: 24px;
      font-weight: 600;
    }
  }

  .setList {
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 44px 50px;
    border-top: 1px solid #d9d9d9;

    & > li {
      display: flex;
      flex-direction: column;
      gap: 14px;

      .title {
        font-size: 18px;
        font-weight: 600;
      }

      .inputBox {
        display: flex;
        align-items: center;
        height: 44px;
        padding: 0 16px;
        border: 1px solid #d9d9d9;
        border-radius: 12px;

        input {
          flex: 1;
          font-size: 16px;
          font-family: "Roboto", sans-serif;
        }
      }

      .alarm {
        margin: 10px 0 0 0;
        font-size: 16px;
        color: #ff5050;
        font-family: "Roboto", sans-serif;
      }

      &.profImgBox {
        .profImgBtn {
          width: 200px;
          height: 200px;
          padding: 12px;
          border-radius: 12px;
          border: 2px dashed #d9d9d9;

          .innerBox {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            border-radius: 10px;
            background: #f6f6f6;

            img {
              width: 60px;
              height: 60px;
              object-fit: contain;
            }
          }
        }
      }

      &.covImgBox {
        .covImgBtn {
          width: 100%;
          height: 184px;
          padding: 12px;
          border-radius: 12px;
          border: 2px dashed #d9d9d9;

          .innerBox {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 14px;
            width: 100%;
            height: 100%;
            border-radius: 10px;
            background: #f6f6f6;

            * {
              font-family: "Roboto", sans-serif;
            }

            .explain {
              font-size: 16px;
              color: #7a7a7a;
            }

            .chooseBtn {
              width: 156px;
              height: 44px;
              font-size: 18px;
              font-weight: 500;
              color: #7a7a7a;
              border-radius: 12px;
              background: #e1e1e1;
            }
          }
        }
      }

      &.emailBox {
        margin: 14px 0 0 0;
        .updateBtn {
          font-size: 16px;
          font-weight: 500;
          color: #26a5d9;
        }
      }

      &.pwBox {
        .inputCont {
          display: flex;
          gap: 20px;

          .inputBox {
            flex: 1;
          }

          .changeBtn {
            height: 44px;
            padding: 0 20px;
            font-size: 18px;
            font-weight: 500;
            font-family: "Roboto", sans-serif;
            color: #fff;
            background: #000;
            border-radius: 12px;
          }
        }
      }

      &.chkPwBox {
      }
    }

    .saveBtn {
      margin: 14px 0 0 0;
      height: 60px;
      font-size: 20px;
      font-weight: 500;
      color: #fff;
      background: #000;
      border-radius: 12px;
    }
  }
`;
