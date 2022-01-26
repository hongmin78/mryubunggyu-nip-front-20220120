import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import styled from "styled-components";
import I_metaMask from "../img/icon/I_metaMask.svg";
import PopupBg from "../components/PopupBg";
import SignUpPopup from "../components/SignUpPopup";
import { useSelector } from "react-redux";
import Header from "./Header";

export default function ConnectWallet() {
  const isMobile = useSelector((state) => state.common.isMobile);
  const navigate = useNavigate();

  const [signUpPopup, setSignUpPopup] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  async function requestconnect() {
    let { ethereum } = window;
    if (!ethereum) return;

    ethereum.request({ method: "eth_requestAccounts" }).then((res) => {
      let address = res[0];
      setWalletAddress(address);
      if (isMobile) navigate("/signup");
      else setSignUpPopup(true);

      // navigate(-1);
      // dispatch(setLogin(address));
    });
  }

  return (
    <>
      <Header />
      <ConnectWalletBox>
        <p className="explain">Login with your wallet</p>
        <button className="connectBtn" onClick={requestconnect}>
          <img src={I_metaMask} alt="" />
        </button>

        {signUpPopup && (
          <>
            <SignUpPopup walletAddress={walletAddress} />
            <PopupBg blur off={setSignUpPopup} />
          </>
        )}

        {/* {isMobile && (
        <Routes>
          <Route path="signup" element={<SignUpPopup />} />
        </Routes>
      )} */}
      </ConnectWalletBox>
    </>
  );
}

const ConnectWalletBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;
  padding: 180px 0 0 0;

  .explain {
    font-size: 24px;
    font-weight: 600;
    line-height: 36px;
  }

  .connectBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 168px;
    height: 168px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
    border-radius: 12px;

    img {
      height: 100px;
    }
  }
`;
