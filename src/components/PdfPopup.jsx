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

//maunal
import nip_manu01 from "../doc/nftinfinity_manual/nip_manu-01.png";
import nip_manu02 from "../doc/nftinfinity_manual/nip_manu-02.png";
import nip_manu03 from "../doc/nftinfinity_manual/nip_manu-03.png";
import nip_manu04 from "../doc/nftinfinity_manual/nip_manu-04.png";
import nip_manu05 from "../doc/nftinfinity_manual/nip_manu-05.png";
import nip_manu06 from "../doc/nftinfinity_manual/nip_manu-06.png";
import nip_manu07 from "../doc/nftinfinity_manual/nip_manu-07.png";
import nip_manu08 from "../doc/nftinfinity_manual/nip_manu-08.png";
import nip_manu09 from "../doc/nftinfinity_manual/nip_manu-09.png";
import nip_manu10 from "../doc/nftinfinity_manual/nip_manu-10.png";
import nip_manu11 from "../doc/nftinfinity_manual/nip_manu-11.png";
import nip_manu12 from "../doc/nftinfinity_manual/nip_manu-12.png";
import nip_manu13 from "../doc/nftinfinity_manual/nip_manu-13.png";
import nip_manu14 from "../doc/nftinfinity_manual/nip_manu-14.png";
import nip_manu15 from "../doc/nftinfinity_manual/nip_manu-15.png";
import nip_manu16 from "../doc/nftinfinity_manual/nip_manu-16.png";
import nip_manu17 from "../doc/nftinfinity_manual/nip_manu-17.png";

export default function PdfPopup({ type }) {
  //manual == "" introduction == ""
  console.log("type", type);
  return (
    <>
      {type === "introduction" && (
        <PdfPopupBox>
          <img src={nip_wp01} alt="" />
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
          <img src={nip_wp19} alt="" />
        </PdfPopupBox>
      )}
      {type === "manual" && (
        <PdfPopupBox>
          <img src={nip_manu01} alt="" />
          <img src={nip_manu02} alt="" />
          <img src={nip_manu03} alt="" />
          <img src={nip_manu04} alt="" />
          <img src={nip_manu05} alt="" />
          <img src={nip_manu06} alt="" />
          <img src={nip_manu07} alt="" />
          <img src={nip_manu08} alt="" />
          <img src={nip_manu09} alt="" />
          <img src={nip_manu10} alt="" />
          <img src={nip_manu11} alt="" />
          <img src={nip_manu12} alt="" />
          <img src={nip_manu13} alt="" />
          <img src={nip_manu14} alt="" />
          <img src={nip_manu15} alt="" />
          <img src={nip_manu16} alt="" />
          <img src={nip_manu17} alt="" />
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
