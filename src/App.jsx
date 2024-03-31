import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { Reset } from "styled-reset";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { AuthContextProvider } from "./context/authContext";
import { CartContextProvider } from "./context/cartContext";

import { useEffect } from "react";
import { useGlobalContext } from "./context/globalContext";
import { customFetch } from "./utils/interceptor";
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
  const {
    shouldModalOpen,
    setShouldModalOpen,
    isLogin,
    setIsLogin,
    isTodayFirstLogin,
    setIsTodayFirstLogin,
    setTotalCoin,
    setContinuousToday,
  } = useGlobalContext();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkStatus = async () => {
      try {
        // const response = await customFetch.get()
        // setIsLogin();
        // setIsTodayFirstLogin();
        // setTotalCoin();
        // setContinuousToday();
      } catch (error) {
        console.log(error);
        // token expired or missing
        alert("Authentication required. Please login again");
        navigate("/login");
      }
    };
    const isHomeRoute = location.pathname === "/" && !location.search;
    const isProfileRoute = location.pathname === "/profile";

    if (isHomeRoute || isProfileRoute) {
      checkStatus();
    }
  }, [location.pathname]);

  useEffect(() => {
    if (isLogin && isTodayFirstLogin) {
      setTimeout(() => {
        setShouldModalOpen(true);
      }, 1500);
    }
    setShouldModalOpen(false);
  }, [isLogin, isTodayFirstLogin]);

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
