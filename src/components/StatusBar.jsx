import { useSelector } from "react-redux";
import styled from "styled-components";

export default function StatusBar({ off, dataList }) {
  const isMobile = useSelector((state) => state.common.isMobile);

  if (isMobile)
    return (
      <MstatusBar className="sortPopup" onClick={() => off()}>
        {/* {dataList.map((cont, index) => (
          <li key={index} onClick={() => {}}>
            {cont.title}
          </li>
        ))} */}
      </MstatusBar>
    );
  else
    return (
      <PstatusBar className="sortPopup" onClick={() => off()}>
        {/* {dataList.map((cont, index) => (
          <li key={index} onClick={() => {}}>
            {cont.title}
          </li>
        ))} */}
        <li>Claimable amount : 0.00 USDT</li>
        <li>Total Employed NFTs : 10</li>
        <li>Total Claimed Reward : 0.00 USDT</li>
        <li>Estimated Apr : 0%</li>
        <li>My USDT balance : 100 USDT</li>
      </PstatusBar>
    );
}

const MstatusBar = styled.ul`
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

    &:hover {
      color: #fff;
      background: #000;
    }
  }
`;

const PstatusBar = styled.ul`
  width: 25em;
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
    justify-content: center;
    height: 46px;
    padding: 0 14px;
    font-size: 16px;
    font-weight: 500;
    border-radius: 8px;
    cursor: pointer;

    &:hover {
      color: #fff;
      background: #000;
    }
  }
`;
