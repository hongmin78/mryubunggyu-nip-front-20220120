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
      <MfooterBox
        style={{
          padding: isStaking && "unset",
          background: isStaking && "unset",
        }}
      >
        <article className="logoBox" onClick={() => setPdfPopup(true)}>
          <img className="logoImg" src={I_logoWhite} alt="" />
          <p className="logoText">NIP</p>
        </article>

        <p className="copyright" style={{ color: isStaking && "#DBDEE2" }}>
          abc@gmail.com
        </p>

        <p className="copyright" style={{ color: isStaking && "#DBDEE2" }}>
          Copyright © 2022 METACHAIN .LTD. All rights reserved.
        </p>

        {pdfPopup && (
          <>
            <PdfPopup type="introduction" />
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
              <img className="logoImg" src={I_logoWhite} alt="" />
              <p className="logoText" style={{ color: isStaking && "#DBDEE2" }}>
                NIP
              </p>
            </article>
          </div>
        </PfooterBox>

        {pdfPopup && (
          <>
            <PdfPopup type="introduction" />
            <PopupBg blur off={setPdfPopup} />
          </>
        )}
      </>
    );
}

const MfooterBox = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 2px;
  height: 112px;
  padding: 0 20px 24px 20px;
  background: #758faa;

  .copyright {
    font-size: 14px;
    font-weight: 500;
    line-height: 18px;
    color: #fff;
    letter-spacing: -0.04em;
  }

  .logoBox {
    display: flex;
    align-self: flex-end;
    align-items: flex-end;
    gap: 3px;
    cursor: pointer;

    .logoImg {
      height: 48px;
    }

    .logoText {
      font-size: 25px;
      font-weight: 600;
      line-height: 25px;
      color: #fff;
    }
  }
`;

const PfooterBox = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 180px;
  background: #758faa;

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
      font-size: 18px;
      font-weight: 500;
      line-height: 18px;
      color: #fff;
    }

    .logoBox {
      display: flex;
      align-items: flex-end;
      gap: 6px;
      cursor: pointer;

      .logoImg {
        height: 102px;
      }

      .logoText {
        font-size: 54px;
        font-weight: 600;
        line-height: 54px;
        color: #fff;
      }
    }
  }
`;
