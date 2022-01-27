import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import I_x from "../../img/icon/I_x.svg";
import I_logoBlue from "../../img/icon/I_logoBlue.png";

export default function LogoHeader() {
  const navigate = useNavigate();

  const isMobile = useSelector((state) => state.common.isMobile);

  if (isMobile) {
    return (
      <MheaderBox>
        <button className="exitBtn" onClick={() => navigate("/")}>
          <img src={I_x} alt="" />
        </button>
      </MheaderBox>
    );
  } else {
    return (
      <PheaderBox>
        <section className="innerBox">
          <button className="logoBox" onClick={() => navigate("/")}>
            <img className="logoImg" src={I_logoBlue} alt="" />
            <p className="logoText">NIP</p>
          </button>
        </section>
      </PheaderBox>
    );
  }
}

const MheaderBox = styled.header`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 56px;
  padding: 0 20px;
  top: 0;
  right: 0;
  left: 0;
  position: fixed;
  z-index: 4;

  .exitBtn {
    width: 16px;
  }
`;

const PheaderBox = styled.header`
  display: flex;
  justify-content: center;
  height: 100px;
  top: 0;
  right: 0;
  left: 0;
  position: fixed;
  z-index: 4;

  .innerBox {
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 1440px;
    @media screen and (max-width: 1024px) {
      padding: 0 20px;
    }

    .logoBox {
      display: flex;
      align-items: center;
      gap: 6px;

      .logoImg {
        height: 57px;
      }

      .logoText {
        font-size: 34px;
        font-weight: 600;
        color: #063a71;
      }
    }
  }
`;
