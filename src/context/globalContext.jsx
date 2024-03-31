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
  const [isLogin, setIsLogin] = useState(true);
  const [isTodayFirstLogin, setIsTodayFirstLogin] = useState(true);
  const [totalCoin, setTotalCoin] = useState(
    () => getUserFromLocalStorage()?.totalCoin || 30
  );
  const [continuousToday, setContinuousToday] = useState(5);

  return (
    <globalContext.Provider
      value={{
        shouldModalOpen,
        setShouldModalOpen,
        user,
        setUser,
        isLogin,
        setIsLogin,
        isTodayFirstLogin,
        setIsTodayFirstLogin,
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
