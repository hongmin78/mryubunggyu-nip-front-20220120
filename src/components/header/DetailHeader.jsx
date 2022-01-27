import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import I_ltArw from "../../img/icon/I_ltArw.svg";

export default function DetailHeader({ title }) {
  const navigate = useNavigate();

  const isMobile = useSelector((state) => state.common.isMobile);

  if (isMobile) {
    return (
      <DetailHeaderBox>
        <button className="exitBtn" onClick={() => navigate(-1)}>
          <img src={I_ltArw} alt="" />
        </button>

        <p className="title">{title}</p>

        <span className="blank"></span>
      </DetailHeaderBox>
    );
  }
}

const DetailHeaderBox = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  padding: 0 20px;
  background: #fff;
  top: 0;
  right: 0;
  left: 0;
  position: fixed;
  z-index: 4;

  .exitBtn img,
  .blank {
    width: 20px;
  }

  .title {
    font-size: 18px;
    font-weight: 600;
    line-height: 18px;
  }
`;
