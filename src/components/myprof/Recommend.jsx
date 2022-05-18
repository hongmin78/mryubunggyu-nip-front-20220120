import styled from "styled-components";
import I_copy from "../../img/icon/I_copy.svg";
import I_circleChk from "../../img/icon/I_circleChk.svg";
import { D_recommendList } from "../../data/DmyPage";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { strDot } from "../../util/Util";
import { onclickcopy } from "../../util/common.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../../configs/api";
import { getmyaddress, LOGGER } from "../../util/common";
import SetErrorBar from "../../util/SetErrorBar.js";
import { messages } from "../../configs/messages";
import { TIME_FETCH_MYADDRESS_DEF } from "../../configs/configs";
import { net } from "../../configs/net";

export default function Recommend() {
  const isMobile = useSelector((state) => state.common.isMobile);
  const navigate = useNavigate();

  const [toggleCode, setToggleCode] = useState(false);
  const [toggleLink, setToggleLink] = useState(false);
  const [userinfoProp, setUserinfoProp] = useState([]);
  const [myRefererList, setMyRefererList] = useState([]);

  const fetchdataUserInfo = async (_) => {
    let myaddress = getmyaddress();
    if (myaddress) {
      axios.get(API.API_USERINFO + `/${myaddress}?nettype=${net}`).then((resp) => {
        let { status, respdata } = resp.data;
        LOGGER("userInfo", respdata);
        if (status == "OK") {
          setUserinfoProp(respdata);
          respdata.myreferercode &&
            axios.get(API.API_REFERER + `/${respdata.myreferercode}/0/120/id/DESC?nettype=${net}`).then((resp) => {
              console.log("myRefererList", resp.data);
              let { status, list } = resp.data;
              if (status == "OK") {
                setMyRefererList(list);
              }
            });
        }
      });
    } else {
      SetErrorBar(messages.MSG_CONNECTWALET);
    }
  };
  useEffect((_) => {
    fetchdataUserInfo();
    return () => {};
  }, []);

  if (isMobile)
    return (
      <MrecommendBox>
        <p className="title">Referals</p>

        <ul className="contList">
          <li className="friendBox">
            <strong className="contTitle">Friend Recommendation</strong>

            <p className="explain">
              Share your referral link! When a new user who accesses this link purchases a product,
              <br />
              an additional 4% of the sales amount is paid. Referral rewards are paid in lump sum every month.
            </p>
          </li>

          <li className="recommendBox">
            <strong className="contTitle">Recommend</strong>

            <ul>
              <li className="codeBox">
                <strong className="key">Code</strong>
                <span className="value">
                  <p>{userinfoProp.myreferercode}</p>
                  <button
                    className="copyBtn"
                    onClick={() => {
                      onclickcopy(userinfoProp.myreferercode);
                      setToggleCode(true);
                    }}
                  >
                    <img src={toggleCode ? I_circleChk : I_copy} alt="" />
                  </button>
                </span>
              </li>
              <li className="linkBox">
                <strong className="key">Link</strong>
                <span className="value">
                  <p
                    onClick={() => {
                      navigate(`/connectwallet/${userinfoProp?.myreferercode}`);
                    }}
                  >
                    http://nftinfinityworld.net/#/staking?referer=$
                    {userinfoProp?.myreferercode}
                  </p>
                  <button
                    className="copyBtn"
                    onClick={() => {
                      setToggleLink(true);
                      onclickcopy(`https://nftinfinity.world/#/connectwallet/${userinfoProp?.myreferercode}`);
                    }}
                  >
                    <img src={toggleLink ? I_circleChk : I_copy} alt="" />
                  </button>
                </span>
              </li>
            </ul>
          </li>

          <li className="recommenderBox">
            <strong className="contTitle">My recommender</strong>

            <div className="listBox">
              <ul className="listHeader">
                {headerList.map((cont, index) => (
                  <li key={index}>{cont}</li>
                ))}
              </ul>

              <ul className="dataList">
                {myRefererList?.map((cont, index) => (
                  <li key={index}>
                    <span>{cont.id}</span>
                    <span>{strDot(cont.username, 4, 4)}</span>
                    <span>{cont.symbol ? cont.symbol : "-"}</span>
                    <span>{cont.referer}</span>
                    <span>{cont.createdat.substring(0, 10)}</span>
                    <span>{cont.hasreceivables} USDT</span>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </ul>
      </MrecommendBox>
    );
  else
    return (
      <PrecommendBox>
        <p className="title">Referals</p>

        <ul className="contList">
          <li className="friendBox">
            <strong className="contTitle">Friend Recommendation</strong>

            <p className="explain">
              Share your referral link! When a new user who accesses this link purchases a product,
              <br />
              an additional 4% of the sales amount is paid. Referral rewards are paid in lump sum every month.
            </p>
          </li>

          <li className="recommendBox">
            <strong className="contTitle">Recommend</strong>

            <ul>
              <li className="codeBox">
                <strong className="key">Code</strong>
                <span className="value">
                  <p>{userinfoProp?.myreferercode}</p>
                  <button
                    className="copyBtn"
                    onClick={() => {
                      onclickcopy(userinfoProp?.myreferercode);
                      setToggleCode(true);
                    }}
                  >
                    <img src={toggleCode ? I_circleChk : I_copy} alt="" />
                  </button>
                </span>
              </li>
              <li className="linkBox">
                <strong className="key">Link</strong>
                <span className="value">
                  <p
                    onClick={() => {
                      navigate(`/connectwallet/${userinfoProp?.myreferercode}`);
                    }}
                  >
                    https://nftinfinity.world/#/connectwallet/$
                    {userinfoProp?.myreferercode}
                  </p>
                  <button
                    className="copyBtn"
                    onClick={() => {
                      setToggleLink(true);
                      onclickcopy(`https://nftinfinity.world/#/connectwallet/${userinfoProp?.myreferercode}`);
                    }}
                  >
                    <img src={toggleLink ? I_circleChk : I_copy} alt="" />
                  </button>
                </span>
              </li>
            </ul>
          </li>

          <li className="recommenderBox">
            <strong className="contTitle">My recommender</strong>

            <div className="listBox">
              <ul className="listHeader">
                {headerList.map((cont, index) => (
                  <li key={index}>{cont}</li>
                ))}
              </ul>

              <ul className="dataList">
                {myRefererList?.map((cont, index) => (
                  <li key={index}>
                    <span>{cont.id}</span>
                    <span>{strDot(cont.username, 4, 4)}</span>
                    <span>{cont.symbol ? cont.symbol : "-"}</span>
                    <span>{cont.referer}</span>
                    <span>{cont.createdat.substring(0, 10)}</span>
                    <span>{cont.hasreceivables} USDT</span>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </ul>
      </PrecommendBox>
    );
}

const MrecommendBox = styled.section`
  padding: 9.16vw 5.55vw 0 5.55vw;

  * {
    font-family: "Roboto", sans-serif;
  }

  .title {
    font-size: 5vw;
  }

  .contList {
    margin: 5vw 0 0 0;

    & > li {
      display: flex;
      flex-direction: column;
      gap: 3.88vw;
      padding: 6.66vw 0;
      border-top: 1px solid #e1e1e1;

      .contTitle {
        font-size: 4.44vw;
      }

      &.friendBox {
        padding-top: 0;
        border-top: none;

        .explain {
          font-size: 3.88vw;
        }
      }

      &.recommendBox {
        ul {
          display: flex;
          flex-direction: column;
          gap: 2.77vw;

          li {
            display: flex;
            padding: 4.44vw;
            background: #f7f7f7;
            border-radius: 3.33vw;

            .key {
              font-size: 3.88vw;
            }

            .value {
              flex: 1;
              display: flex;
              justify-content: space-between;
              align-items: center;
              font-size: 4.44vw;
            }

            img {
              width: 5.55vw;
              cursor: pointer;
            }

            &.codeBox {
              align-items: center;

              .key {
                width: 13.88vw;
              }
            }

            &.linkBox {
              flex-direction: column;
              gap: 2.22vw;
              word-break: break-all;

              .key {
                display: flex;
                justify-content: space-between;
                align-items: center;
              }
            }
          }
        }
      }

      &.recommenderBox {
        .listBox {
          box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.16);
          border-radius: 20px;
          overflow: hidden;
          .listHeader {
            display: flex;
            align-items: center;
            height: 55px;
            padding: 0 20px;
            font-weight: 600;
          }
        }
        .listHeader li,
        .dataList span {
          &:nth-of-type(1) {
            width: 4.64%;
            text-align: center;
          }
          &:nth-of-type(2) {
            width: 17.85%;
            text-align: center;
          }
          &:nth-of-type(3) {
            width: 15%;
            margin: 0 0 0 3.71%;
          }
          &:nth-of-type(4) {
            width: 22.28%;
          }
          &:nth-of-type(5) {
            width: 20.85%;
          }
          &:nth-of-type(6) {
            flex: 1;
          }
        }
        .dataList {
          li {
            display: flex;
            align-items: center;
            height: 70px;
            padding: 0 20px;
            font-weight: 500;
            border-top: 1px solid #d9d9d9;

            & > div {
              display: flex;
              justify-content: space-between;
              align-items: center;
              font-size: 3.88vw;
              font-weight: 500;

              .account {
                color: #545454;
              }

              .level {
                font-size: 5vw;
              }

              .date {
                color: #7d7d7d;
              }
            }
          }
        }
      }
    }
  }
`;

const PrecommendBox = styled.section`
  padding: 60px 0 0 0;

  * {
    font-family: "Roboto", sans-serif;
  }

  .title {
    font-size: 18px;
  }

  .contList {
    display: flex;
    flex-direction: column;
    gap: 44px;
    margin: 14px 0 0 0;

    & > li {
      display: flex;
      flex-direction: column;
      gap: 24px;

      .contTitle {
        font-size: 18px;
      }

      &.friendBox {
        .explain {
          font-size: 18px;
        }
      }

      &.recommendBox {
        ul {
          display: flex;
          flex-direction: column;
          gap: 14px;

          li {
            display: flex;
            align-items: center;
            padding: 0 20px;
            height: 60px;
            background: #f7f7f7;
            border-radius: 12px;

            .key {
              width: 80px;
            }

            .value {
              display: flex;
              align-items: center;
              gap: 12px;

              img {
                cursor: pointer;
              }
            }
          }
        }
      }

      &.recommenderBox {
        .listBox {
          box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.16);
          border-radius: 20px;
          overflow: hidden;

          .listHeader {
            display: flex;
            align-items: center;
            height: 55px;
            padding: 0 20px;
            font-weight: 600;
          }

          .dataList {
            li {
              display: flex;
              align-items: center;
              height: 70px;
              padding: 0 20px;
              font-weight: 500;
              border-top: 1px solid #d9d9d9;
            }
          }

          .listHeader li,
          .dataList span {
            &:nth-of-type(1) {
              width: 4.64%;
              text-align: center;
            }
            &:nth-of-type(2) {
              width: 17.85%;
              text-align: center;
            }
            &:nth-of-type(3) {
              width: 15%;
              margin: 0 0 0 3.71%;
            }
            &:nth-of-type(4) {
              width: 22.28%;
            }
            &:nth-of-type(5) {
              width: 20.85%;
            }
            &:nth-of-type(6) {
              flex: 1;
            }
          }
        }
      }
    }
  }
`;

const headerList = ["No", "Account", "Symbol", "Recommender", "Date of subscription	", "Points Received"];
