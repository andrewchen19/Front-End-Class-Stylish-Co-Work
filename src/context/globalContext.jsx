import { createContext, useState, useContext } from "react";

const globalContext = createContext();

export const useGlobalContext = () => useContext(globalContext);

const AppProvider = (props) => {
  const [shouldModalOpen, setShouldModalOpen] = useState(false);

  return (
    <globalContext.Provider value={{ shouldModalOpen, setShouldModalOpen }}>
      {props.children}
    </globalContext.Provider>
  );
};

export default AppProvider;
