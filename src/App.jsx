import { Outlet, useLocation } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { Reset } from "styled-reset";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { AuthContextProvider } from "./context/authContext";
import { CartContextProvider } from "./context/cartContext";

import { useEffect } from "react";
import { useGlobalContext } from "./context/globalContext";
import Modal from "./components/Modal";
import { ToastContainer, Zoom } from "react-toastify";
import axios from "axios";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";

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
    isLoginToday,
    setIsLoginToday,
    setTotalCoin,
    setContinuousToday,
    setUser,
    user,
  } = useGlobalContext();

  const location = useLocation();

  useEffect(() => {
    const isHomeRoute = location.pathname === "/" && !location.search;

    const checkStatus = async () => {
      const url = `https://3.225.61.15/api/1.0/user/getUserStatus`;
      const token = user.accessToken;
      try {
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log(response);

        const { ifLoginToday, userTotalPoints, continuousLoginCounts, userId } =
          response.data;

        setIsLogin(true);
        setIsLoginToday(ifLoginToday);
        setTotalCoin(userTotalPoints);
        setContinuousToday(continuousLoginCounts);

        const updatedUser = {
          ...user,
          status: {
            continuousLoginCounts,
            ifLoginToday,
            userTotalPoints,
            userId,
          },
        };

        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      } catch (error) {
        console.log("token expired or missing");
      }
    };

    if (isHomeRoute && user) {
      checkStatus();
    }
  }, [location.pathname]);

  useEffect(() => {
    if (isLogin && !isLoginToday) {
      setTimeout(() => {
        setShouldModalOpen(true);
      }, 1500);
    }
    setShouldModalOpen(false);
  }, [isLogin, isLoginToday]);

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
          <ToastContainer
            position="top-center"
            autoClose={2000}
            transition={Zoom}
          />
        </CartContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
