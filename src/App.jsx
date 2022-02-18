import { useLayoutEffect } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HashRouter, Route, Routes } from "react-router-dom";
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
import { setLogin, setMobile , setaddress } from "./util/store/commonSlice";
import { messages } from "./configs/messages";
import SetErrorBar from './util/SetErrorBar'
import { LOGGER } from "./util/common";
import { strDot } from "./util/Util";

function App() {
  const dispatch = useDispatch()
  function handleResize() {
    if (window.innerWidth > 1024) dispatch(setMobile(false));
    else dispatch(setMobile(true));
  }

	useEffect( _=> {
		let { ethereum }=window
		if ( ethereum){}
		else {return }
		ethereum.on('accountsChanged', resp=>{ LOGGER(resp )
			SetErrorBar( messages.MSG_ACCOUNTS_CHANGED )
			dispatch( setaddress( resp[ 0 ] ) )
		})
		ethereum.on('networkChanged', function (networkId) { LOGGER( networkId )
			// Time to reload your interface with the new networkId
		})
		dispatch( setaddress( strDot(ethereum.selectedAddress , 8 , 0 )  ) ) 
	} , [ window.ethereum ] )
  useLayoutEffect(async () => {
    const walletAddress = localStorage.getItem("walletAddress");
    console.log("walletAddress", walletAddress);
    if (walletAddress) dispatch(setLogin(walletAddress));
  });

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
          <Route path="/winning" element={<Winning />} />
          <Route path="/penalty" element={<Penalty />} />

          <Route path="/term" element={<Term />} />

          <Route path="/connectwallet" element={<ConnectWallet />} />
          <Route path="/connectwallet/:popup" element={<ConnectWallet />} />
          <Route path="/emailauth/:email/:authNum" element={<EmailAuth />} />

          <Route path="/staking" element={<Staking />} />
          <Route path="/staking/:popup" element={<Staking />} />
          <Route path="/staking/detail/:id" element={<StakingDetail />} />

          <Route path="/auction" element={<Auction />} />
          <Route path="/auction/detail/:dna" element={<AuctionDetail />} />

          <Route path="/market" element={<Market />} />
          <Route path="/market/detail/:id" element={<MarketDetail />} />
          <Route path="/market/detail/:id/:popup" element={<MarketDetail />} />

          <Route path="/mypage" element={<Mypage />} />
          <Route path="/editprof" element={<EditProf />} />

          <Route path="/resell" element={<Resell />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </HashRouter>
    </AppBox>
  );
}

const AppBox = styled.div`
  background: #fff;
`;

export default App;
