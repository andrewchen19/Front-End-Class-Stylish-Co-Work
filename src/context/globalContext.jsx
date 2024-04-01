import { createContext, useState, useContext } from "react";

const globalContext = createContext();

export const useGlobalContext = () => useContext(globalContext);
export const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const AppProvider = (props) => {
  const [shouldModalOpen, setShouldModalOpen] = useState(false);
  const [user, setUser] = useState(() => getUserFromLocalStorage());
  const [isLogin, setIsLogin] = useState(false);
  const [isLoginToday, setIsLoginToday] = useState(
    () => getUserFromLocalStorage()?.status?.ifLoginToday || false
  );
  const [totalCoin, setTotalCoin] = useState(
    () => getUserFromLocalStorage()?.status?.userTotalPoints || 0
  );
  const [continuousToday, setContinuousToday] = useState(
    () => getUserFromLocalStorage()?.status?.continuousLoginCounts || 0
  );

  return (
    <globalContext.Provider
      value={{
        shouldModalOpen,
        setShouldModalOpen,
        user,
        setUser,
        isLogin,
        setIsLogin,
        isLoginToday,
        setIsLoginToday,
        totalCoin,
        setTotalCoin,
        continuousToday,
        setContinuousToday,
      }}
    >
      {props.children}
    </globalContext.Provider>
  );
};

export default AppProvider;
