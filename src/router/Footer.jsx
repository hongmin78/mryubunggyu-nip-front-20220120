import styled from "styled-components";
import I_logo from "../img/icon/I_logo.svg";
import I_logoText from "../img/icon/I_logoText.svg";

export default function Footer() {
  return (
    <FooterBox>
      <div className="innerBox">
        <p className="copyright">
          Copyright © 2022 METACHAIN .LTD. All rights reserved.
        </p>

        <article className="logoBox">
          <img className="logoImg" src={I_logo} alt="" />
          <img className="logoText" src={I_logoText} alt=""/>
        </article>
      </div>
    </FooterBox>
  );
}

const FooterBox = styled.footer`
  display: flex;
  justify-content: center;
  height: 108px;
  background: #fff;

  .innerBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1440px;

    .copyright {
      font-size: 18px;
      font-weight: 500;
      line-height: 18px;
      color: #4f4f4f;
    }

    .logoBox {
      display: flex;
      align-items: flex-end;
      gap: 6px;

      .logoImg {
        height: 40px;
      }

      .logoText {
        height: 18px;
      }
    }
  }
`;
