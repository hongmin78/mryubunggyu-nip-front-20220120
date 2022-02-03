import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import I_logoSky from "../img/icon/I_logoSky.png";
import I_logoWhite from "../img/icon/I_logoWhite.png";
import PopupBg from "../components/PopupBg";
import PdfPopup from "../components/PdfPopup";
import { useLocation } from "react-router-dom";

export default function Footer() {
  const pathname = useLocation().pathname;
  let isStaking = pathname.indexOf("/staking") !== -1;

  const isMobile = useSelector((state) => state.common.isMobile);
  const [pdfPopup, setPdfPopup] = useState(false);

  if (isMobile)
    return (
      <MfooterBox style={{ padding: isStaking && "unset" }}>
        <p className="copyright" style={{ color: isStaking && "#DBDEE2" }}>
          Copyright © 2022 METACHAIN .LTD. All rights reserved.
        </p>

        <article className="logoBox" onClick={() => setPdfPopup(true)}>
          <img
            className="logoImg"
            src={isStaking ? I_logoWhite : I_logoSky}
            alt=""
          />
          <p className="logoText" style={{ color: isStaking && "#DBDEE2" }}>
            NIP
          </p>
        </article>

        {pdfPopup && (
          <>
            <PdfPopup />
            <PopupBg blur off={setPdfPopup} />
          </>
        )}
      </MfooterBox>
    );
  else
    return (
      <>
        <PfooterBox style={{ background: isStaking && "unset" }}>
          <div className="innerBox">
            <p className="copyright" style={{ color: isStaking && "#DBDEE2" }}>
              Copyright © 2022 METACHAIN .LTD. All rights reserved.
            </p>

            <article className="logoBox" onClick={() => setPdfPopup(true)}>
              <img
                className="logoImg"
                src={isStaking ? I_logoWhite : I_logoSky}
                alt=""
              />
              <p className="logoText" style={{ color: isStaking && "#DBDEE2" }}>
                NIP
              </p>
            </article>
          </div>
        </PfooterBox>

        {pdfPopup && (
          <>
            <PdfPopup />
            <PopupBg blur off={setPdfPopup} />
          </>
        )}
      </>
    );
}

const MfooterBox = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 10px;
  padding: 0 20px 30px 20px;

  .copyright {
    font-size: 10px;
    font-weight: 500;
    line-height: 10px;
    color: #4f4f4f;
    letter-spacing: -0.04em;
  }

  .logoBox {
    display: flex;
    align-self: flex-end;
    align-items: flex-end;
    gap: 3px;
    cursor: pointer;

    .logoImg {
      height: 27px;
    }

    .logoText {
      font-size: 14px;
      font-weight: 600;
      line-height: 14px;
      color: #839cb8;
    }
  }
`;

const PfooterBox = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 108px;
  background: #fff;

  .innerBox {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    width: 100%;
    max-width: 1440px;
    @media screen and (max-width: 1440px) {
      padding: 0 20px;
    }

    .copyright {
      font-size: 14px;
      font-weight: 500;
      line-height: 14px;
      color: #4f4f4f;
    }

    .logoBox {
      display: flex;
      align-items: flex-end;
      gap: 6px;
      cursor: pointer;

      .logoImg {
        height: 40px;
      }

      .logoText {
        font-size: 21px;
        font-weight: 600;
        line-height: 21px;
        color: #839cb8;
      }
    }
  }
`;
