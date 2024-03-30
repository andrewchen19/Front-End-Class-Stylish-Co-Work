import { Outlet, useLocation } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { Reset } from "styled-reset";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { AuthContextProvider } from "./context/authContext";
import { CartContextProvider } from "./context/cartContext";

import { useEffect, useState } from "react";
import { useGlobalContext } from "./context/globalContext";
import Modal from "./components/Modal";

import "./index.css";

const GlobalStyle = createGlobalStyle`
  * {
  box-sizing: border-box;
}

body {
  font-family: "Noto Sans TC", sans-serif;
}

#root {
  min-height: 100vh;
  padding: 140px 0 115px;
  position: relative;

  @media screen and (max-width: 1279px) {
    padding: 102px 0 208px;
  }
}
`;

function App() {
  const { shouldModalOpen, setShouldModalOpen } = useGlobalContext();
  const [isLogin, setIsLogin] = useState(true);
  const [isTodayFirstLogin, setIsTodayFirstLogin] = useState(true);
  const location = useLocation();
  const isHomeRoute = location.pathname === "/" && !location.search;
  const isProfileRoute = location.pathname === "/profile";

  // console.log(isHomeRoute);
  // console.log(isProfileRoute);

  const checkOpenModal = () => {
    if ((isHomeRoute || isProfileRoute) && isLogin && isTodayFirstLogin) {
      setShouldModalOpen(true);
    }
  };

  useEffect(() => {
    checkOpenModal();
  }, []);

  return (
    <>
      <Reset />
      <GlobalStyle />
      <AuthContextProvider>
        <CartContextProvider>
          <Header />
          <Outlet />
          <Footer />
          {shouldModalOpen && <Modal />}
        </CartContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
