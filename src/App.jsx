import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import SignUpPopup from "./components/SignUpPopup";
import StakingPopup from "./components/StakingPopup";
import Auction from "./router/Auction";
import AuctionDetail from "./router/AuctionDetail";
import ConnectWallet from "./router/ConnectWallet";
import EditProf from "./router/EditProf";
import Main from "./router/Main";
import Market from "./router/Market";
import MarketDetail from "./router/MarketDetail";
import Mypage from "./router/Mypage";
import Resell from "./router/Resell";
import Staking from "./router/Staking";
import GlobalStyle from "./util/GlobalStyle";
import { setMobile } from "./util/store/commonSlice";

function App() {
  const dispatch = useDispatch();

  const isMobile = useSelector((state) => state.common.isMobile);

  function handleResize() {
    if (window.innerWidth > 1024) dispatch(setMobile(false));
    else dispatch(setMobile(true));
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <AppBox>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
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
        <Routes>
          <Route path="/" element={<Main />} />

          <Route path="/connectwallet" element={<ConnectWallet />} />
          <Route path="/signup" element={<SignUpPopup />} />

          <Route path="/staking" element={<Staking />} />
          <Route path="/staking/:popup" element={<Staking />} />

          <Route path="/auction" element={<Auction />} />
          <Route path="/auction/detail/:id" element={<AuctionDetail />} />

          <Route path="/market" element={<Market />} />
          <Route path="/market/detail/:id" element={<MarketDetail />} />

          <Route path="/mypage" element={<Mypage />} />
          <Route path="/editprof" element={<EditProf />} />

          <Route path="/resell" element={<Resell />} />
        </Routes>
      </HashRouter>
    </AppBox>
  );
}

const AppBox = styled.div`
  background: #fff;
`;

export default App;
