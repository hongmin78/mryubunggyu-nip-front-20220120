import styled from "styled-components";
import I_etherScan from "../../img/icon/I_etherScan.png";
import I_cube from "../../img/icon/I_cube.svg";
import I_eye from "../../img/icon/I_eye.svg";
import { useSelector } from "react-redux";

export default function Properties() {
  const isMobile = useSelector((state) => state.common.isMobile);

  if (isMobile)
    return (
      <MpropertiesBox>
        <li>
          <button className="" onClick={() => {}}>
            <img src={I_etherScan} alt="" />
            <p>View on Etherscan</p>
          </button>
        </li>
        <li>
          <button className="" onClick={() => {}}>
            <img src={I_cube} alt="" />
            <p>View metadata</p>
          </button>
        </li>
        <li>
          <button className="" onClick={() => {}}>
            <img src={I_eye} alt="" />
            <p>View on IPFS</p>
          </button>
        </li>
      </MpropertiesBox>
    );
  else
    return (
      <PpropertiesBox>
        <li>
          <button className="" onClick={() => {}}>
            <img src={I_etherScan} alt="" />
            <p>View on Etherscan</p>
          </button>
        </li>
        <li>
          <button className="" onClick={() => {}}>
            <img src={I_cube} alt="" />
            <p>View metadata</p>
          </button>
        </li>
        <li>
          <button className="" onClick={() => {}}>
            <img src={I_eye} alt="" />
            <p>View on IPFS</p>
          </button>
        </li>
      </PpropertiesBox>
    );
}



const MpropertiesBox = styled.ul`
  display: flex;
  flex-direction: column;

  li {
    display: flex;
    align-items: center;
    height: 15vw;
    padding: 0 0 0 2vw;

    button {
      display: flex;
      align-items: center;
      gap: 3.88vw;
      font-size: 4.44vw;
      font-weight: 500;

      img {
        width: 8.33vw;
      }
    }
  }
`;

const PpropertiesBox = styled.ul`
  display: flex;
  flex-direction: column;

  li {
    display: flex;
    align-items: center;
    height: 54px;

    button {
      display: flex;
      align-items: center;
      gap: 14px;
      font-size: 18px;
      font-weight: 500;

      img {
        width: 30px;
      }
    }
  }
`;
