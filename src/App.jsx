import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import styled from "styled-components";
import ConnectWallet from "./router/ConnectWallet";
import Header from "./router/Header";
import Main from "./router/Main";
import Staking from "./router/Staking";
import GlobalStyle from "./util/GlobalStyle";

function App() {
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

      <GlobalStyle />
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/connectwallet" element={<ConnectWallet />} />
          <Route path="/staking" element={<Staking />} />
        </Routes>
      </HashRouter>
    </AppBox>
  );
}

const AppBox = styled.div`
  background: #fff;
`;

export default App;
