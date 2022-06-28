import { useState, useEffect } from "react";
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
import axios from "axios";
import { API } from "../configs/api";
import { messages } from "../configs/messages";
import { TIME_PAGE_TRANSITION_DEF } from "../configs/configs";
import { net } from "../configs/net";

export default function ConnectWallet() {
  const navigate = useNavigate();
  const param = useParams();
  const dispatch = useDispatch();
  const isMobile = useSelector((state) => state.common.isMobile);
  const [signUpPopup, setSignUpPopup] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  async function requestconnect() {
    let { ethereum } = window;
    if (ethereum) {
    } else {
      SetErrorBar("Please Install MetaMask");
      return;
    }
    ethereum.request({ method: "eth_requestAccounts" }).then(async (res) => {
      if (res && res[0]) {
      } else {
        SetErrorBar(messages.MSG_PLEASE_CONNECT_WALLET);
        return;
      }
      let address = res[0];
      setWalletAddress(address);
      try {
        const resp = await axios.post(API.API_LOGIN + `?nettype=${net}`, {
          address,
          cryptotype: "ETH",
          nettype: net,
        }); // login( address )
        console.log("", resp.data); // walletAddress
        let { status } = resp.data;
        if (status == "OK") {
          dispatch(setLogin(address)); // resp.walletAddress
          //					localStorage.setItem("walletAddress", resp.walletAddress);
          SetErrorBar(messages.MSG_DONE_LOGIN); // resp.message
          setTimeout((_) => {
            navigate("/");
          }, TIME_PAGE_TRANSITION_DEF);
        } else {
          if (isMobile) {
            navigate("/connectwallet/:popup");
          } // navigate("signup");
          else {
            setSignUpPopup(true);
          }
        }
      } catch {
        if (isMobile) navigate("signup");
        else setSignUpPopup(true);
      }
      // navigate(-1);
      // dispatch(setLogin(address));
    });
  }
  useEffect((_) => {
    if (param.referer) {
      localStorage.setItem("referer", param.referer);
    }
  }, []);

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
  padding: 280px 0 280px 0;

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
