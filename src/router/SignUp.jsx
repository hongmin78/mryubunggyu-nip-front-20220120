import { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import I_metaMask from "../img/icon/I_metaMask.svg";
import { setLogin } from "../util/store/commonSlice";
import { Route, Routes } from "react-router-dom";

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function requestconnect() {
    let { ethereum } = window;
    if (!ethereum) return;

    ethereum.request({ method: "eth_requestAccounts" }).then((res) => {
      let address = res[0];
      dispatch(setLogin(address));
      navigate("/signup");
      // navigate(-1);
    });
  }

  return (
    <ConnectWalletBox>
      <p className="explain">Login with your wallet</p>
      <button className="connectBtn" onClick={requestconnect}>
        <img src={I_metaMask} alt="" />
      </button>
    </ConnectWalletBox>
  );
}

const ConnectWalletBox = styled.div`
  position: fixed;
  opacity: 0.6;
`;
