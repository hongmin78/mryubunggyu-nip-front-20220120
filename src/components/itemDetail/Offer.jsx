import { useSelector } from "react-redux";
import styled from "styled-components";
import { D_offer } from "../../data/DauctionDetail";
import { strDot } from "../../util/Util";

export default function Offer() {
  const isMobile = useSelector((state) => state.common.isMobile);

  if (isMobile)
    return (
      <MofferBox>
        {D_offer.map((cont, index) => (
          <li key={index}>
            <img src={cont.prfoImg} alt="" />
            <div className="infoBox">
              <p className="info">{`${cont.price} ${cont.unit} ${strDot(cont.address, 11, 4)}`}</p>
              <p className="time">{cont.time}</p>
            </div>
          </li>
        ))}
      </MofferBox>
    );
  else
    return (
      <PofferBox>
        {D_offer.map((cont, index) => (
          <li key={index}>
            <img src={cont.prfoImg} alt="" />

            <div className="infoBox">
              <p className="info">{`${cont.price} ${cont.unit} ${strDot(cont.address, 11, 4)}`}</p>
              <p className="time">{cont.time}</p>
            </div>
          </li>
        ))}
      </PofferBox>
    );
}

const MofferBox = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 6.94vw;
  padding: 6.11vw 0;

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 3.88vw;
    padding: 0 0 0 5.55vw;

    img {
      width: 11.11vw;
      height: 11.11vw;
      border-radius: 50%;
      object-fit: cover;
    }

    .infoBox {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 1.11vw;
      overflow: hidden;

      .info {
        font-size: 3.88vw;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .time {
        font-size: 3.33vw;
        color: #a3a3a3;
      }
    }
  }
`;

const PofferBox = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding: 24px 0;

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    width: 100%;

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
    }

    .infoBox {
      flex: 1;
      gap: 4px;

      .info {
        font-size: 18px;
      }

      .time {
        font-size: 14px;
        color: #a3a3a3;
      }
    }
  }
`;
