import { useSelector } from "react-redux";
import styled from "styled-components";

export default function SelectPopup({ off, dataList, select, setFunc }) {
  const isMobile = useSelector((state) => state.common.isMobile);

  if (isMobile)
    return (
      <MselectPopupBox className="sortPopup" onClick={() => off()}>
        {dataList.map((cont, index) => (
          <li
            key={index}
            className={select === cont && "select"}
            onClick={() => setFunc(cont)}
          >
            {cont}
          </li>
        ))}
      </MselectPopupBox>
    );
  else
    return (
      <PselectPopupBox className="sortPopup" onClick={() => off()}>
        {dataList.map((cont, index) => (
          <li
            key={index}
            className={select === cont && "select"}
            onClick={() => setFunc(cont)}
          >
            {cont}
          </li>
        ))}
      </PselectPopupBox>
    );
}

const MselectPopupBox = styled.ul`
  width: inherit;
  padding: 1.66vw 2.77vw;
  background: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 3.33vw;
  position: absolute;
  transform: translate(0, 10px);
  z-index: 6;

  li {
    display: flex;
    align-items: center;
    height: 12.77vw;
    padding: 0 3.88vw;
    font-size: 4.44vw;
    font-weight: 500;
    border-radius: 2.22vw;
    cursor: pointer;

    &.select {
      color: #fff;
      background: #000;
    }
  }
`;

const PselectPopupBox = styled.ul`
  width: inherit;
  padding: 6px 10px;
  background: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  position: absolute;
  transform: translate(0, 10px);
  z-index: 6;

  li {
    display: flex;
    align-items: center;
    height: 46px;
    padding: 0 14px;
    font-size: 16px;
    font-weight: 500;
    border-radius: 8px;
    cursor: pointer;

    &.select {
      color: #fff;
      background: #000;
    }
  }
`;
