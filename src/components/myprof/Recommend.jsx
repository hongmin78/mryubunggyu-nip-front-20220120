import styled from "styled-components";
import I_copy from "../../img/icon/I_copy.svg";
import { D_recommendList } from "../../data/DmyPage";

export default function Recommend() {
  return (
    <RecommendBox>
      <p className="title">Referals</p>

      <ul className="contList">
        <li className="friendBox">
          <strong className="contTitle">Friend Recommendation</strong>

          <p className="explain">
            Share your referral link! When a new user who accesses this link
            purchases a product,
            <br />
            an additional 2% of the sales amount is paid. Referral rewards are
            paid in lump sum every month.
          </p>
        </li>

        <li className="recommendBox">
          <strong className="contTitle">Recommend</strong>

          <ul>
            <li>
              <strong className="key">Code</strong>
              <span className="value">
                <p>98Dd4DBE</p>
                <img src={I_copy} alt="" />
              </span>
            </li>
            <li>
              <strong className="key">Link</strong>
              <span className="value">
                <p>
                  https://ausp.io/market/?ref=0x97b155a698d4bdec4c4bf3a92e9071190093cafb
                </p>
                <img src={I_copy} alt="" />
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
              {D_recommendList.map((cont, index) => (
                <li key={index}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span>{cont.account}</span>
                  <span>{cont.symbol ? cont.symbol : "-"}</span>
                  <span>{cont.level} Level</span>
                  <span>{cont.date}</span>
                  <span>{cont.point} USDT</span>
                </li>
              ))}
            </ul>
          </div>
        </li>
      </ul>
    </RecommendBox>
  );
}

const RecommendBox = styled.section`
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
              width: 65px;
              text-align: center;
            }
            &:nth-of-type(2) {
              width: 250px;
              text-align: center;
            }
            &:nth-of-type(3) {
              width: 210px;
              margin: 0 0 0 52px;
            }
            &:nth-of-type(4) {
              width: 312px;
            }
            &:nth-of-type(5) {
              width: 292px;
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

const headerList = [
  "No",
  "Account",
  "Symbol",
  "Recommender Level",
  "Date of subscription	",
  "Points Received",
];
