import styled from "styled-components";
import B_staking from "../img/staking/B_staking.png";
import E_staking from "../img/common/E_staking.png";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { D_vaultList } from "../data/Dstaking";
import Footer from "./Footer";
import Header from "../components/header/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../configs/api";
import { getmyaddress, LOGGER } from "../util/common";
import SetErrorBar from "../util/SetErrorBar";
import { messages } from "../configs/messages";

export default function Staking(props) {
  const navigate = useNavigate();
  const isMobile = useSelector((state) => state.common.isMobile);
  let [isstaked, setisstaked] = useState();

  console.log("isMobile", isMobile);
  // console.log("asdofijasdofijasdofij");
  // console.log(parmas);

  useEffect((_) => {
    const fetchdata = async (_) => {
      let myaddress = getmyaddress();
      LOGGER("", myaddress);
      let resp = await axios.get(API.API_USERINFO + `/${myaddress}`);
      LOGGER("rBojncz0CD", resp.data);
      let { status, respdata } = resp.data;
      if (status == "OK") {
        setisstaked(respdata.isstaked ? true : false);
        if (respdata.isstaked) {
          SetErrorBar(messages.MSG_YOU_ALREADY_HAVE_STAKED);
        } else {
          false && SetErrorBar("FYI: YOU NEED TO STAKE ");
        }
      }
    };
    setTimeout((_) => {
      fetchdata();
    }, 1500);
  }, []);
  const checkIf = (a) => {
    navigate(`/staking/detail/${a}`);
  };
  /**   const checkIf=(a)=>{		
    if (isstaked == null ||isstaked == undefined || isstaked == ''){
      SetErrorBar("HOLD ON")
      return;
    }
    if(!isstaked){
      navigate(`detail/${a}`)
    }
  }*/
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
                  </div>

                  <div className="contBox">
                    <img className="mainImg" src={E_staking} alt="" />
                    {isstaked ? (
                      <button className="buyBtn">Staked</button>
                    ) : (
                      <button className="buyBtn" onClick={(e) => checkIf(index)}>
                        Buy Now
                      </button>
                    )}
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
            <strong className="title">Stake to participate in the auction!</strong>
            <ul className="ticketList">
              {[1, 2, 3, 4].map((cont, index) => (
                <li key={index}>
                  <div className="topBar">
                    <p className="key">LUCKY TICKET</p>
                  </div>

                  <div className="contBox">
                    <img className="mainImg" src={E_staking} alt="" />
                    {isstaked ? (
                      <button className="buyBtn" disabled>
                        Staked
                      </button>
                    ) : (
                      <button className="buyBtn" onClick={() => checkIf(index)}>
                        Buy Now
                      </button>
                    )}
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
