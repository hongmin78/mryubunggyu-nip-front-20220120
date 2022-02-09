import styled from "styled-components";
import B_staking from "../img/staking/B_staking.png";
import E_staking from "../img/common/E_staking.png";

import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Header from "../components/header/Header";
import { D_vaultList } from "../data/Dstaking";
import Footer from "./Footer";

export default function Staking() {
  const navigate = useNavigate();

  const isMobile = useSelector((state) => state.common.isMobile);


  if (isMobile)
    return (
      <>
        <Header />
        <MstakingDetailBox>
          <article className="listArea">
            <p className="title">
              Stake to participate
              <br /> in the auction!
            </p>

            <ul className="ticketList">
              {D_vaultList.map((cont, index) => (
                <li key={index}>
                  <div className="topBar">
                    <p className="key">LUCKY TICKET</p>
                    <p className="value">#00001</p>
                  </div>

                  <div className="contBox">
                    <img className="mainImg" src={E_staking} alt="" />
                    <button className="buyBtn" onClick={() => navigate(`detail/${index}`)}>
                      Buy Now
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </article>
          <Footer />
        </MstakingDetailBox>
      </>
    );
  else
    return (
      <>
        <Header />
        <PstakingDetailBox>
          <div className="innerBox">
            <strong className="title">
              Stake to participate in the auction!
            </strong>
            <ul className="ticketList">
              {[1, 2, 3, 4].map((cont, index) => (
                <li key={index}>
                  <div className="topBar">
                    <p className="key">LUCKY TICKET</p>
                    <p className="value">#{`${index}`.padStart(5, "0")}</p>
                  </div>

                  <div className="contBox">
                    <img className="mainImg" src={E_staking} alt="" />
                    <button
                      className="buyBtn"
                      onClick={() => navigate(`detail/${index}`)}
                    >
                      Buy Now
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <Footer />
        </PstakingDetailBox>
      </>
    );
}

const MstakingDetailBox = styled.div`
  padding: 75px 5.55vw 5.55vw 5.55vw;
  background: #000;
  background-image: url(${B_staking});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  overflow-y: scroll;

  .listArea {
    display: flex;
    flex-direction: column;
    gap: 3.88vw;
    padding: 0 0 16.66vw 0;

    .title {
      font-size: 5.55vw;
      font-weight: 600;
      line-height: 8.33vw;
      color: #fff;
      text-align: center;
    }

    .ticketList {
      display: flex;
      flex-direction: column;
      gap: 5.55vw;

      li {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 112.5vw;
        padding: 6.66vw 5.55vw;
        background: #000;
        box-shadow: 0px 0px 60px rgba(255, 255, 255, 0.4);
        border-radius: 3.33vw;

        .topBar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 11.11vw;
          padding: 0 6.66vw;
          font-size: 4.44vw;
          font-weight: 700;
          text-transform: uppercase;
          color: #fff;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(60px);
          border-radius: 8.33vw;
        }

        .contBox {
          display: flex;
          flex-direction: column;
          gap: 5.83vw;

          .mainImg {
            width: 100%;
          }

          .buyBtn {
            height: 15.55vw;
            font-size: 5vw;
            font-weight: 700;
            color: #fff;
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(60px);
            border-radius: 8.33vw;
          }
        }
      }
    }
  }
`;

const PstakingDetailBox = styled.div`
  min-height: 100vh;
  background: #000;
  background-image: url(${B_staking});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  & > .innerBox {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 60px;
    max-width: 1440px;
    padding: 220px 0;
    margin: 0 auto;

    .title {
      font-size: 34px;
      font-weight: 600;
      color: #fff;
    }

    .ticketList {
      display: flex;
      justify-content: space-between;
      width: 100%;

      li {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        width: 330px;
        height: 440px;
        padding: 24px 20px;
        background: #000;
        box-shadow: 0px 0px 60px rgba(255, 255, 255, 0.4);
        border-radius: 12px;

        .topBar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 40px;
          padding: 0 18px;
          font-size: 16px;
          font-weight: 700;
          text-transform: uppercase;
          color: #fff;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(60px);
          border-radius: 30px;
        }

        .contBox {
          display: flex;
          flex-direction: column;
          gap: 30px;

          .mainImg {
            width: 100%;
          }

          .buyBtn {
            height: 56px;
            font-size: 18px;
            font-weight: 700;
            color: #fff;
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(60px);
            border-radius: 30px;
          }
        }
      }
    }
  }
`;
