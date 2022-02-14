import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import I_metaMask from "../img/icon/I_metaMask.svg";
import PopupBg from "../components/PopupBg";
import SignUpPopup from "../components/SignUpPopup";
import { useSelector } from "react-redux";
import Header from "../components/header/Header";
import { login } from "../api/Signup";
import { setLogin } from "../util/store/commonSlice";
import { useDispatch } from "react-redux";
import SetErrorBar from "../util/SetErrorBar";

export default function ConnectWallet() {
  const navigate = useNavigate();
  const param = useParams();
  const dispatch = useDispatch();

  const isMobile = useSelector((state) => state.common.isMobile);

  const [signUpPopup, setSignUpPopup] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  async function requestconnect() {
    let { ethereum } = window;
    if (!ethereum) return;

    ethereum.request({ method: "eth_requestAccounts" }).then(async (res) => {
      let address = res[0];
      setWalletAddress(address);

      
      try{
        const resp = await login(address);
        console.log(resp.walletAddress);
        dispatch(setLogin(resp.walletAddress));
        localStorage.setItem("walletAddress", resp.walletAddress);
        SetErrorBar(resp.message);
        navigate("/");
      } catch {
        if (isMobile) navigate("signup");
        else setSignUpPopup(true);
      }

      // navigate(-1);
      // dispatch(setLogin(address));
    });
  }

  if (param.popup) return <SignUpPopup walletAddress={walletAddress} />;
  else
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
        </ConnectWalletBox>
      </>
    );
}

const ConnectWalletBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;
  padding: 280px 0 0 0;

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
