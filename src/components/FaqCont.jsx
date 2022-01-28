import { strDot } from "../util/Util";
import I_heart from "../img/icon/I_heart.svg";
import I_heartO from "../img/icon/I_heartO.svg";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function FaqItem({ data, index }) {
  const navigate = useNavigate();

  const isMobile = useSelector((state) => state.common.isMobile);

  if (isMobile)
    return (
      <MfaqItem className="item">
        <strong className="title">{data.title}</strong>
        <div className="cont">{data.cont}</div>
      </MfaqItem>
    );
  else
    return (
      <PfaqItem className="item">
        <strong className="title">{data.title}</strong>
        <div className="cont">{data.cont}</div>
      </PfaqItem>
    );
}

const MfaqItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: 4.44vw;
  width: 100%;
  min-width: 100%;
  padding: 6.66vw;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.16);
  border-radius: 2.77vw;
  overflow: hidden;
  cursor: pointer;

  .title {
    font-size: 4.44vw;
  }

  .cont {
    font-size: 3.88vw;
    color: #7a7a7a;
  }
`;

const PfaqItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 1440px;
  min-width: 100%;
  padding: 46px 48px;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.16);
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;

  .title {
    font-size: 24px;
  }

  .cont {
    font-size: 18px;
    color: #7a7a7a;
  }
`;
