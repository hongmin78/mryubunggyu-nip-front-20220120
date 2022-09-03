import { useSelector } from "react-redux";
import styled from "styled-components";

export default function SelectPopup({ off, dataList, select, setFunc }) {
  const isMobile = useSelector((state) => state.common.isMobile);

  if (isMobile)
    return (
      <MselectPopupBox className="sortPopup" onClick={() => off()}>
        {dataList.map((cont, index) => (
          <li key={index} onClick={() => setFunc(cont.title)}>
<<<<<<< HEAD
            {cont.title}
=======
            {cont}
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
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
            onClick={() => {
              setFunc(cont);
            }}
          >
<<<<<<< HEAD
            {cont.title}
=======
            {cont}
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
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
<<<<<<< HEAD

    &:hover {
      color: #fff;
      background: #000;
=======
    color: #000;

    &:hover {
      color: #000;
      background: #fff;
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
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
<<<<<<< HEAD

    &:hover {
      color: #fff;
      background: #000;
=======
    color: #000;

    &:hover {
      color: #000;
      background: #fff;
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
    }
  }
`;
