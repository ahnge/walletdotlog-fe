import { createContext, useContext, useReducer } from "react";

const WalletContext = createContext();

// reducer function for dispatchs
const walletReducer = (state, action) => {
  switch (action.type) {
    case "setCurrentWallet": {
      return {
        currentWallet: action.payload,
      };
    }
    case "setNewAmount": {
      return {
        currentWallet: { ...state.currentWallet, amount: action.payload },
      };
    }
    default: {
      throw new Error(`Unabled action type: ${action.type}`);
    }
  }
};

// PROVIDER
export const WalletProvider = ({ children }) => {
  // init states
  let initState = {
    currentWallet: null,
  };
  const [walletState, walletDispatch] = useReducer(walletReducer, initState);

  const value = { walletState, walletDispatch };
  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};

// CONSUMER
export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useAuth must be used withid a AuthProvider");
  }
  return context;
};
