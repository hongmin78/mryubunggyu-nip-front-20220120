import styled from "styled-components";
import I_person from "../img/icon/I_person.svg";
import I_personWhite from "../img/icon/I_personWhite.svg";
import I_book from "../img/icon/I_book.svg";
import I_bookWhite from "../img/icon/I_bookWhite.svg";
import I_power from "../img/icon/I_power.svg";
import I_powerWhite from "../img/icon/I_powerWhite.svg";
import { useNavigate } from "react-router-dom";

export default function HeaderPopup() {
  const navigate = useNavigate();

  return (
    <HeaderPopupBox>
      <nav>
        <button className="mypageBtn" onClick={() => navigate('/mypage')}>
          <img src={I_person} alt="" />
          <p>My page</p>
        </button>
        <button className="faqBtn" onClick={() => {}}>
          <img src={I_book} alt="" />
          <p>FAQ</p>
        </button>
        <button className="disconnectBtn" onClick={() => {}}>
          <img src={I_power} alt="" />
          <p>Disconnect</p>
        </button>
      </nav>
    </HeaderPopupBox>
  );
}

const HeaderPopupBox = styled.section`
  width: 100%;
  padding: 12px;
  background: #fff;
  box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  top: 64px;
  left: 0;
  z-index: 6;
  position: absolute;

  nav {
    display: flex;
    flex-direction: column;

    button {
      display: flex;
      align-items: center;
      gap: 14px;
      height: 50px;
      padding: 0 14px;
      font-size: 18px;
      line-height: 18px;
      font-weight: 500;
      border-radius: 8px;

      img {
        width: 28px;
        height: 28px;
        object-fit: contain;
      }

      &:hover {
        color: #fff;
        background: #000;
      }

      &.mypageBtn {
        &:hover {
          img {
            content: url(${I_personWhite});
          }
        }
      }

      &.faqBtn {
        &:hover {
          img {
            content: url(${I_bookWhite});
          }
        }
      }

      &.disconnectBtn {
        &:hover {
          img {
            content: url(${I_powerWhite});
          }
        }
      }
    }
  }
`;
