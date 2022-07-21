import styled from "styled-components";

export default function PdfPopup({ type }) {
  console.log("type", type);
  return (
    <>
      {type === "introduction" && (
        <PdfPopupBox>
          {new Array(19).fill("*").map((el, i) => {
            return (
              <img src={require(`../doc/nip_wp${i + 1 < 10 ? "0" + (i + 1) : i + 1}.png`).default} alt="" key={i} />
            );
          })}
        </PdfPopupBox>
      )}
      {type === "manual" && (
        <PdfPopupBox>
          {new Array(17).fill("*").map((el, i) => {
            return (
              <img
                src={require(`../doc/nftinfinity_manual/nip_wp${i + 1 < 10 ? "0" + (i + 1) : i + 1}.png`).default}
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
