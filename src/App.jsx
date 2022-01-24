import { HashRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Header from "./router/Header";
import Main from "./router/Main";
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
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&display=swap"
        rel="stylesheet"
      />

      <GlobalStyle />
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </HashRouter>
    </AppBox>
  );
}

const AppBox = styled.div``;

export default App;
