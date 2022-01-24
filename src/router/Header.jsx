import styled from "styled-components";
import I_logo from "../img/icon/I_logo.svg";
import { strDot } from "../util/Util";

export default function Header() {
  return (
    <HeaderBox>
      <section className="innerBox">
        <article className="logoBox">
          <span className="logoImg">
            <ul className="blurBox">
              <li />
              <li />
              <li />
            </ul>

            <img src={I_logo} alt="" />
          </span>
          <p className="logoText">logo</p>
        </article>

        <article className="rightBox">
          <nav>
            <button onClick={() => {}}>Staking</button>
            <button onClick={() => {}}>Auto Auction</button>
            <button onClick={() => {}}>Marketplece</button>
          </nav>

          <button className="menuBtn" onClick={() => {}}>
            <span className="balanceBox">
              <p className="price">0.0523456</p>
              <p className="unit">USDT</p>
            </span>

            <span className="address">{strDot("0xF8901234Be03", 4, 4)}</span>
          </button>
        </article>
      </section>
    </HeaderBox>
  );
}

const HeaderBox = styled.header`
  display: flex;
  justify-content: center;
  height: 100px;

  .innerBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1240px;

    .logoBox {
      display: flex;
      align-items: center;
      gap: 14px;

      .logoImg {
        position: relative;

        .blurBox {
          display: flex;
          width: 100%;
          height: 100%;
          position: absolute;

          li {
            width: 25%;
            height: 100%;

            &:nth-of-type(1) {
              backdrop-filter: blur(4px);
            }
            &:nth-of-type(2) {
              backdrop-filter: blur(2.5px);
            }
            &:nth-of-type(3) {
              backdrop-filter: blur(1px);
            }
          }
        }
      }

      .logoText {
        font-size: 24px;
        font-weight: 600;
      }
    }

    .rightBox {
      display: flex;
      align-items: center;
      gap: 40px;

      nav {
        display: flex;
        gap: 30px;

        button {
          font-size: 18px;
          font-weight: 500;
        }
      }

      .menuBtn {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 14px;
        width: 280px;
        height: 54px;
        padding: 6px 6px 6px 24px;
        background: #000;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
        border-radius: 30px;

        .balanceBox {
          flex: 1;
          display: flex;
          font-size: 18px;
          font-weight: 500;
          color: #fff;
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
          background: #f6f6f6;
          border-radius: 30px;
        }
      }
    }
  }
`;
