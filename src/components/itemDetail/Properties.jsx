import styled from "styled-components";
import I_etherScan from "../../img/icon/I_etherScan.png";
import I_cube from "../../img/icon/I_cube.svg";
import I_eye from "../../img/icon/I_eye.svg";

export default function Properties() {
  return (
    <PropertiesBox>
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
    </PropertiesBox>
  );
}

const PropertiesBox = styled.ul`
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
