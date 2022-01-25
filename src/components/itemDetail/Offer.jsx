import styled from "styled-components";
import { D_offer } from "../../data/DauctionDetail";
import { strDot } from "../../util/Util";

export default function Offer() {
  return (
    <OfferBox>
      {D_offer.map((cont, index) => (
        <li key={index}>
          <img src={cont.prfoImg} alt="" />

          <div className="infoBox">
            <p className="info">{`${cont.price} ${cont.unit} ${strDot(
              cont.address,
              11,
              4
            )}`}</p>
            <p className="time">{cont.time}</p>
          </div>
        </li>
      ))}
    </OfferBox>
  );
}

const OfferBox = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding: 24px 0;

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
    }

    .infoBox {
      display: flex;
      flex-direction: column;
      gap: 4px;
      
      .info {
        font-size: 18px;
      }

      .time {
        font-size: 14px;
      }
    }
  }
`;
