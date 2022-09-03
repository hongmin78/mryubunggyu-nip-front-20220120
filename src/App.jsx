import { useLayoutEffect } from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
<<<<<<< HEAD
import { HashRouter, Route, Routes, useNavigate, Navigate } from "react-router-dom";
=======
import {
  HashRouter,
  Route,
  Routes,
  useNavigate,
  Navigate,
} from "react-router-dom";
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
import styled from "styled-components";
import Auction from "./router/Auction";
import AuctionDetail from "./router/AuctionDetail";
import ConnectWallet from "./router/ConnectWallet";
import EditProf from "./router/EditProf";
import EmailAuth from "./router/EmailAuth";
import Main from "./router/Main";
import Market from "./router/Market";
import MarketDetail from "./router/MarketDetail";
import Mypage from "./router/Mypage";
import Penalty from "./router/Penalty";
import Resell from "./router/Resell";
import Staking from "./router/Staking";
import StakingDetail from "./router/StakingDetail";
import Term from "./router/Term";
import Test from "./router/Test";
import Winning from "./router/Winning";
import GlobalStyle from "./util/GlobalStyle";
import { setLogin, setMobile, setaddress } from "./util/store/commonSlice";
import { messages } from "./configs/messages";
import SetErrorBar from "./util/SetErrorBar";
import { getmyaddress, LOGGER } from "./util/common";
import { strDot } from "./util/Util";
import axios from "axios";
import { API } from "./configs/api";
<<<<<<< HEAD
import { browserName, browserVersion, isChrome, isFirefox, isSafari, isEdge } from "react-device-detect";
import { CURRENT_TIME } from "./configs/configs";
import { net } from "./configs/net";
import Employment from "./router/Employment";

function App() {
  const dispatch = useDispatch();
=======
import {
  browserName,
  browserVersion,
  isChrome,
  isFirefox,
  isSafari,
  isEdge,
} from "react-device-detect";
import { CURRENT_TIME } from "./configs/configs";
import { net } from "./configs/net";
import Employed from "./router/Employed";
import Employ from "./router/Employ";
import UnderConst from "./components/UnderConstruction/UnderConst";
import NoMatch from "./components/NoMatch";
import { web3 } from "./configs/configweb3";
import { chainId, networks } from "./configs/chains";
function App() {
  const dispatch = useDispatch();
  const [isavailable, setisavailable] = useState(1);
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
  //	let [ address , setaddress ] = useState()
  function handleResize() {
    if (window.innerWidth > 1024) dispatch(setMobile(false));
    else dispatch(setMobile(true));
  }

<<<<<<< HEAD
  const queryuseraddress = (address) => {
    axios.get(API.API_QUERY_USERADDRESS + `/users/username/${address}?nettype=${net}`).then((resp) => {
      LOGGER("QlzCkJ0KYu", resp.data);
      let { status, respdata } = resp.data;
      if (status == "OK") {
        if (respdata?.id) {
          dispatch(setaddress(address));
          dispatch(setLogin(address));
          setaddress(address);
        }
      } else {
        LOGGER("user not found");
      }
    });
  };

  useEffect(() => {
    setTimeout(() => {
      let myaddress = getmyaddress();
      if (myaddress) {
      } else {
        SetErrorBar(messages.MSG_PLEASE_CONNECT_WALLET);
        return;
      }
      queryuseraddress(myaddress);
    }, 1500);
=======
  useLayoutEffect(() => {
    (async function () {
      let { ethereum } = window;
      if (ethereum) {
      } else {
        SetErrorBar(messages.MSG_NO_METAMASK);
        return;
      }
      if (window.ethereum.networkVersion !== chainId) {
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: web3.utils.toHex(chainId) }],
          });
        } catch (err) {
          console.error(err);
          if (err.code === 4902) {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [networks],
            });
          }
        }
      }
    })();
  });

  useEffect(() => {
    (async function getAddress() {
      const { ethereum } = window;
      if (!(ethereum && ethereum.isMetaMask)) {
        SetErrorBar("메타마스크를 설치해주세요");
        return;
      }
      const [address] = await ethereum.request({
        method: "eth_requestAccounts",
      });
      localStorage.setItem("walletaddress", address);
    })();
  }, []);

  const queryuseraddress = (address) => {
    axios
      .get(
        API.API_QUERY_USERADDRESS + `/users/username/${address}?nettype=${net}`
      )
      .then((resp) => {
        LOGGER("QlzCkJ0KYu", resp.data);
        let { status, respdata } = resp.data;
        if (status == "OK") {
          if (respdata?.id) {
            dispatch(setaddress(address));
            dispatch(setLogin(address));
            setaddress(address);
          }
        } else {
          LOGGER("user not found");
        }
      });
  };

  useEffect(() => {
    let myaddress = getmyaddress();
    if (myaddress) {
    } else {
      return;
    }
    queryuseraddress(myaddress);
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
  }, []);

  useEffect(() => {
    axios.get(API.API_KEY_TIME_STAMP + `?nettype=${net}`).then((resp) => {
      LOGGER("asdasdasdasds", resp);
      let { status, respdata } = resp.data;
      if (status == "OK") {
<<<<<<< HEAD
        if (parseInt(respdata._value) > CURRENT_TIME) window.location.reload("/");
      } else {
        return;
=======
        if (parseInt(respdata?._value) > CURRENT_TIME)
          window.location.reload("/");
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
      }
    });
    let { ethereum } = window;
    if (ethereum) {
      let { selectedAddress: address } = ethereum;
      ethereum.on("accountsChanged", (resp) => {
        LOGGER("GsnRPWi8Zg@accountsChanged", resp);
        window.location.replace("/");
        SetErrorBar(messages.MSG_ACCOUNTS_CHANGED);
        if (resp[0]) {
          let address = resp[0];
          dispatch(setaddress(address));
          dispatch(setLogin(address));
          setaddress(address);
          dispatch(setLogin(address));
<<<<<<< HEAD
=======
          localStorage.setItem("walletaddress", address);
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
        } else {
          dispatch(setaddress(null));
          dispatch(setLogin(null));
          dispatch(setLogin(null));
          setaddress(null);
        }
      });
      ethereum.on("networkChanged", function (networkId) {
        LOGGER(networkId);
        // Time to reload your interface with the new networkId
      });
      ethereum.on("chainChanged", (chainId) => {
        LOGGER("@chainChanged", chainId);
      });

<<<<<<< HEAD
      setTimeout(() => {
        if (address) {
        } else {
          SetErrorBar(messages.MSG_PLEASE_CONNECT_WALLET);
          return;
        }
        queryuseraddress(address);
      }, 1500);
=======
      // setTimeout(() => {
      if (address) {
      } else {
        return;
      }
      queryuseraddress(address);
      // }, 1500);
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
    } else {
      SetErrorBar("Please Install MetaMask");
      if (isChrome) {
        window.open(
          "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en",
          "_blank"
        );
      }
      if (isSafari) {
<<<<<<< HEAD
        alert("Metamask is not supported on Safari, please use a different browser!");
=======
        alert(
          "Metamask is not supported on Safari, please use a different browser!"
        );
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
      }
      if (isEdge) {
        window.open(
          "https://microsoftedge.microsoft.com/addons/detail/metamask/ejbalbakoplchlghecdalmeeeajnimhm?hl=en-US",
          "_blank"
        );
      }
    }
  }, [window.ethereum]);

  useEffect(() => {
    if (window.innerWidth > 1024) dispatch(setMobile(false));
    else dispatch(setMobile(true));

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <AppBox>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
<<<<<<< HEAD
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
=======
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
<<<<<<< HEAD
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Red+Hat+Mono:wght@500&display=swap" rel="stylesheet" />

      <GlobalStyle />
      <HashRouter>
        <Routes>
          {/* <Route path="*" element={<Navigate to="/" />} /> */}
          <Route path="/" element={<Main />} />
          <Route path="/winning" element={<Winning />} />
          <Route path="/penalty" element={<Penalty />} />

          <Route path="/term" element={<Term />} />

          <Route path="/connectwallet" element={<ConnectWallet />} />
          <Route path="/connectwallet/:refere" element={<ConnectWallet />} />
          <Route path="/emailauth/:email/:authNum/:walletaddress" element={<EmailAuth />} />
          <Route path="/emailauth/:email/:authNum" element={<EmailAuth />} />

          <Route path="/staking" element={<Staking />} />
          <Route path="/staking/:popup" element={<Staking />} />
          <Route path="/staking/detail/:id" element={<StakingDetail />} />

          <Route path="/auction" element={<Auction />} />
          <Route path="/auction/detail/:itemid" element={<AuctionDetail />} />

          <Route path="/market" element={<Market />} />
          <Route path="/employment" element={<Employment />} />
          <Route path="/market/detail/:itemid" element={<MarketDetail />} />
          <Route path="/market/detail/:itemid/:popup" element={<MarketDetail />} />

          <Route path="/mypage" element={<Mypage />} />
          <Route path="/editprof" element={<EditProf />} />

          <Route path="/resell/:id" element={<Resell />} />
          <Route path="/test" element={<Test />} />
        </Routes>
=======
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Red+Hat+Mono:wght@500&display=swap"
        rel="stylesheet"
      />

      <GlobalStyle />
      <HashRouter>
        {isavailable ? (
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/winning" element={<Winning />} />
            <Route path="/penalty" element={<Penalty />} />

            <Route path="/term" element={<Term />} />

            <Route path="/connectwallet" element={<ConnectWallet />} />
            <Route path="/connectwallet/:refere" element={<ConnectWallet />} />
            <Route
              path="/emailauth/:email/:authNum/:walletaddress"
              element={<EmailAuth />}
            />
            <Route path="/emailauth/:email/:authNum" element={<EmailAuth />} />

            <Route path="/staking" element={<Staking />} />
            <Route path="/staking/:popup" element={<Staking />} />
            <Route path="/staking/detail/:id" element={<StakingDetail />} />

            <Route path="/auction" element={<Auction />} />
            <Route path="/auction/detail/:itemid" element={<AuctionDetail />} />

            <Route path="/market" element={<Market />} />
            <Route path="/market/detail/:itemid" element={<MarketDetail />} />
            <Route
              path="/market/detail/:itemid/:popup"
              element={<MarketDetail />}
            />

            <Route path="/mypage" element={<Mypage />} />
            <Route path="/editprof" element={<EditProf />} />

            <Route path="/resell/:id/:type/:tokenId" element={<Resell />} />

            <Route path="/test" element={<Test />} />
            <Route path="/employed" element={<Employed />} />
            <Route path="/employ" element={<Employ />} />
            <Route path="/employ/:id/:type/:tokenId" element={<Employ />} />
            <Route path="*" element={<UnderConst />} />
          </Routes>
        ) : (
          <Routes>
            <Route exact path="/" element={<UnderConst />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        )}
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
      </HashRouter>
    </AppBox>
  );
}

const AppBox = styled.div`
  background: #fff;
`;

export default App;
