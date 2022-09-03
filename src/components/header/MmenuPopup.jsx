import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import I_x from "../../img/icon/I_x.svg";
import I_rocket from "../../img/icon/I_rocket.svg";
import I_openBox from "../../img/icon/I_openBox.svg";
import I_market from "../../img/icon/I_market.svg";
import I_book from "../../img/icon/I_book.svg";
import I_person from "../../img/icon/I_person.svg";
import { strDot } from "../../util/Util";
import SetErrorBar from "../../util/SetErrorBar";

export default function MmenuPopup({ off, mybalance, ticketInfo }) {
  const navigate = useNavigate();

  const isLogin = useSelector((state) => state.common.isLogin);
  const onclick_staked_val_btn = (currentValue) => {
    if (ticketInfo) {
      navigate(currentValue);
    } else {
      SetErrorBar("You need purchased lucky ticket");
    }
  };

  return (
    <MmenuPopupBox onClick={() => off()}>
      <article className="innerBox">
        <div className="topBar">
          <button className="exitBtn">
            <img src={I_x} alt="" />
          </button>
        </div>

        <div className="contBox">
          {isLogin ? (
            <button className="addressBtn">
              <span className="balanceBox">
                <p className="price">{mybalance}</p>
                <p className="unit">USDT</p>
              </span>

              <span className="address">{strDot(isLogin, 4, 4)}</span>
            </button>
          ) : (
            <button className="connectBtn" onClick={() => navigate("/connectwallet")}>
              Connect Wallet
            </button>
          )}

          <nav>
            <button
              className="stakingBtn"
              onClick={() => {
                navigate("/staking");
              }}
            >
              <img src={I_rocket} alt="" />
              <p>Lucky Ticket</p>
            </button>
<<<<<<< HEAD
            <button className="auctionBtn" onClick={() => onclick_staked_val_btn("/auction")}>
              <img src={I_openBox} alt="" />
              <p>Subscription Auction</p>
            </button>
            <button className="marketPlaceBtn" onClick={() => onclick_staked_val_btn("/market")}>
=======
            <button className="auctionBtn" onClick={() => navigate("/auction")}>
              <img src={I_openBox} alt="" />
              <p>Subscription Auction</p>
            </button>
            <button className="marketPlaceBtn" onClick={() => navigate("/market")}>
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
              <img src={I_market} alt="" />
              <p>Marketplece</p>
            </button>
            <button className="faqBtn" onClick={() => {}}>
              <img src={I_book} alt="" />
              <p>FAQ</p>
            </button>
<<<<<<< HEAD
            <button className="mypageBtn" onClick={() => onclick_staked_val_btn("/mypage")}>
=======
            <button className="mypageBtn" onClick={() => navigate("/mypage")}>
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
              <img src={I_person} alt="" />
              <p>Mypage</p>
            </button>
          </nav>
        </div>
      </article>
    </MmenuPopupBox>
  );
}

const MmenuPopupBox = styled.section`
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20px);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: fixed;
  z-index: 5;

  .innerBox {
    width: 330px;
    height: 100%;
    background: #fff;

    .topBar {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: 50px;
      padding: 0 20px;

      .exitBtn {
        img {
          height: 16px;
        }
      }
    }

    .contBox {
      padding: 0 20px;

      .connectBtn {
        width: 100%;
        height: 54px;
        font-size: 18px;
        font-weight: 500;
        color: #fff;
        background: #000;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
        border-radius: 30px;
      }

      .addressBtn {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 14px;
        width: 280px;
        height: 54px;
        padding: 6px 6px 6px 24px;
        font-size: 18px;
        font-weight: 500;
        color: #fff;
        background: #000;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
        border-radius: 30px;
        position: relative;

        .balanceBox {
          flex: 1;
          display: flex;
          overflow: hidden;

          .price {
            flex: 1;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }

        .address {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 130px;
          height: 100%;
          font-size: 18px;
          font-weight: 500;
          color: #000;
          background: #f6f6f6;
          border-radius: 30px;
        }
      }

      nav {
        display: flex;
        flex-direction: column;
        padding: 20px 0;

        button {
          display: flex;
          align-items: center;
          gap: 14px;
          height: 50px;
          padding: 0 16px;
          font-size: 18px;
          font-weight: 500;

          img {
            width: 26px;
          }

          &:nth-of-type(-n + 2) {
            img {
              width: 28px;
            }
          }
        }
      }
    }
  }
`;
