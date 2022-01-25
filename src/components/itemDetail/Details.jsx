import styled from "styled-components";
import { D_details } from "../../data/DauctionDetail";
import { strDot } from "../../util/Util";

export default function Details() {
  return (
    <DetailsBox>
      {D_details.map((cont, index) => (
        <li key={index}>
          <p className="part">{cont.part}</p>
          <p className="option">{cont.option}</p>
        </li>
      ))}
    </DetailsBox>
  );
}

const DetailsBox = styled.ul`
  display: flex;
  flex-direction: column;

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 54px;
    font-size: 18px;
    padding: 0 24px 0 0;

    &:nth-of-type(n + 2) {
      border-top: 1px solid #d9d9d9;
    }

    .option {
      color: #7a7a7a;
    }
  }
`;
