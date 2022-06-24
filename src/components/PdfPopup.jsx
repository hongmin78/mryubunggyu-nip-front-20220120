import styled from "styled-components";
import nip_wp01 from "../doc/nip_wp01.png";
import nip_wp02 from "../doc/nip_wp02.png";
import nip_wp03 from "../doc/nip_wp03.png";
import nip_wp04 from "../doc/nip_wp04.png";
import nip_wp05 from "../doc/nip_wp05.png";
import nip_wp06 from "../doc/nip_wp06.png";
import nip_wp07 from "../doc/nip_wp07.png";
import nip_wp08 from "../doc/nip_wp08.png";
import nip_wp09 from "../doc/nip_wp09.png";
import nip_wp10 from "../doc/nip_wp10.png";
import nip_wp11 from "../doc/nip_wp11.png";
import nip_wp12 from "../doc/nip_wp12.png";
import nip_wp13 from "../doc/nip_wp13.png";
import nip_wp14 from "../doc/nip_wp14.png";
import nip_wp15 from "../doc/nip_wp15.png";
import nip_wp16 from "../doc/nip_wp16.png";
import nip_wp17 from "../doc/nip_wp17.png";
import nip_wp18 from "../doc/nip_wp18.png";
import nip_wp19 from "../doc/nip_wp19.png";

export default function PdfPopup({ type }) {
  //manual == "" introduction == ""
  console.log("type", type);
  return (
    <>
      {type === "introduction" && (
        <PdfPopupBox>
          {/* <img src={nip_wp01} alt="" />
          <img src={nip_wp02} alt="" />
          <img src={nip_wp03} alt="" />
          <img src={nip_wp04} alt="" />
          <img src={nip_wp05} alt="" />
          <img src={nip_wp06} alt="" />
          <img src={nip_wp07} alt="" />
          <img src={nip_wp08} alt="" />
          <img src={nip_wp09} alt="" />
          <img src={nip_wp10} alt="" />
          <img src={nip_wp11} alt="" />
          <img src={nip_wp12} alt="" />
          <img src={nip_wp13} alt="" />
          <img src={nip_wp14} alt="" />
          <img src={nip_wp15} alt="" />
          <img src={nip_wp16} alt="" />
          <img src={nip_wp17} alt="" />
          <img src={nip_wp18} alt="" />
          <img src={nip_wp19} alt="" /> */}

          {Array.from(19).forEach((el, i) => {
            return (
              <img
                src={require(`../doc/nip_wp${
                  i < 10 ? "0" + i + 1 : i + 1
                }.png`)}
                alt=""
                key={i}
              />
            );
          })}
        </PdfPopupBox>
      )}
      {type === "manual" && (
        <PdfPopupBox>
          {Array.from(17).forEach((el, i) => {
            return (
              <img
                src={require(`../doc/nftinfinity_manual/nip_wp${
                  i < 10 ? "0" + i + 1 : i + 1
                }.png`)}
                alt=""
                key={i}
              />
            );
          })}
        </PdfPopupBox>
      )}
    </>
  );
}

const PdfPopupBox = styled.ul`
  width: 80vw;
  height: 100%;
  margin: 0 auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: fixed;
  z-index: 6;
  overflow-y: scroll;

  img {
    width: 100%;
  }
`;
