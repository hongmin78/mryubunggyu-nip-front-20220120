import styled from "styled-components";

export default function PopupBg({ setAllPopupOff, bg, blur, off }) {
  function onClickBg() {
    if (off) off();
  }

  return (
    <PopupBgBox
      onClick={onClickBg}
      style={{
        background: (bg && "rgba(0,0,0,0.5") || (blur && "rgba(0, 0, 0, 0.1)"),
        backdropFilter: blur && "blur(20px)",
      }}
    />
  );
}

const PopupBgBox = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  cursor: pointer;
  z-index: 5;
`;
