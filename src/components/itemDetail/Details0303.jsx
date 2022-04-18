import { useSelector } from "react-redux";
import styled from "styled-components";
import { D_details } from "../../data/DauctionDetail";
import { Fragment, useEffect, useRef, useState } from "react";

export default function Details0303({ attributes }) {
  const isMobile = useSelector((state) => state.common.isMobile);
  console.log("attributes");
  console.log(attributes);
  const [attributesMap, setAttributesMap] = useState([attributes]);

  if (isMobile)
    return (
      <MdetailsBox>
        {attributesMap.map((cont, index) =>
          cont.attributes.map((item) => (
            <li key={index}>
              <p className="part">{item.trait_type}</p>
              <p className="option">{item.value}</p>
            </li>
          ))
        )}
      </MdetailsBox>
    );
  else
    return (
      <PdetailsBox>
        {attributesMap.map((cont, index) =>
          cont.attributes.map((item) => (
            <li key={index}>
              <p className="part">{item.trait_type}</p>
              <p className="option">{item.value}</p>
            </li>
          ))
        )}
      </PdetailsBox>
    );
}

const MdetailsBox = styled.ul`
  display: flex;
  flex-direction: column;
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2.22vw;
    height: 15vw;
    font-size: 3.88vw;
    padding: 0 6.66vw 0 2vw;
    &:nth-of-type(n + 2) {
      border-top: 1px solid #d9d9d9;
    }
    .part {
      width: 22.22vw;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .option {
      flex: 1;
      text-align: end;
      color: #7a7a7a;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
`;

const PdetailsBox = styled.ul`
  display: flex;
  flex-direction: column;
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 40px;
    height: 54px;
    font-size: 18px;
    padding: 0 24px 0 0;
    &:nth-of-type(n + 2) {
      border-top: 1px solid #d9d9d9;
    }
    .part {
      width: 160px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .option {
      flex: 1;
      text-align: end;
      color: #7a7a7a;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
`;
