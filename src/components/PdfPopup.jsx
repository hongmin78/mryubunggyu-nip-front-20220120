import styled from "styled-components";
<<<<<<< HEAD
=======
import adasdasd from "../doc/nftinfinty_guide/nip_wp01.png";
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027

export default function PdfPopup({ type }) {
  console.log("type", type);
  return (
    <>
      {type === "introduction" && (
        <PdfPopupBox>
<<<<<<< HEAD
          {new Array(19).fill("*").forEach((el, i) => {
            return (
              <img
                src={
                  require(`../doc/nip_wp${
                    i + 1 < 10 ? "0" + i + 1 : i + 1
                  }.png`).default || null
                }
=======
          {new Array(19).fill("*").map((el, i) => {
            return (
              <img
                src={require(`../doc/nftinfinty_guide/nip_wp${i + 1 < 10 ? "0" + (i + 1) : i + 1}.png`).default}
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
                alt=""
                key={i}
              />
            );
          })}
        </PdfPopupBox>
      )}
      {type === "manual" && (
        <PdfPopupBox>
          {new Array(17).fill("*").map((el, i) => {
            return (
              <img
<<<<<<< HEAD
                src={
                  require(`../doc/nftinfinity_manual/nip_wp${
                    i + 1 < 10 ? "0" + (i + 1) : i + 1
                  }.png`).default || null
                }
=======
                src={require(`../doc/nftinfinity_manual/nip_wp${i + 1 < 10 ? "0" + (i + 1) : i + 1}.png`).default}
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
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
