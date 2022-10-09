import { createContext, useContext, useReducer } from "react";

const globalContext = createContext();

// reducer function for dispatchs
const globalReducer = (state, action) => {
  switch (action.type) {
    case "toggle": {
      return {
        ...state,
        open: !state.open,
      };
    }
    case "close": {
      return {
        ...state,
        open: false,
      };
    }
    case "setCurrentWallet": {
      return {
        ...state,
        currentWallet: action.payload,
      };
    }
    case "updateName": {
      return {
        ...state,
        currentWallet: { ...state.currentWallet, name: action.payload },
      };
    }
    default: {
      throw new Error(`Unabled action type: ${action.type}`);
    }
  }
};

// PROVIDER
export const GlobalProvider = ({ children }) => {
  // init states
  let initState = {
    open: false,
    currentWallet: {},
  };
  const [globalState, globalDispatch] = useReducer(globalReducer, initState);

  const value = { globalState, globalDispatch };
  return (
    <globalContext.Provider value={value}>{children}</globalContext.Provider>
  );
};

// CONSUMER
export const useGlobalContext = () => {
  const context = useContext(globalContext);
  if (context === undefined) {
    throw new Error(
      "useGlobalContext must be used withid a globalContextProvider"
    );
  }
  return context;
};
