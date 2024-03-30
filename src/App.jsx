import { Outlet } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { Reset } from "styled-reset";
import Footer from "./components/Footer";
import Header from "./components/Header";
import CustomerService from "./components/CostomerService/CostomerService";
import { AuthContextProvider } from "./context/authContext";
import { CartContextProvider } from "./context/cartContext";

import "./index.css";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'Noto Sans TC', sans-serif;
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
  return (
    <>
      <Reset />
      <GlobalStyle />
      <AuthContextProvider>
        <CartContextProvider>
          <Header />
          <Outlet />
          <CustomerService />
          <Footer />
        </CartContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
