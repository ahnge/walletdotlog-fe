import { createContext, useContext, useReducer } from "react";

const SideBarContext = createContext();

// reducer function for dispatchs
const sideBarReducer = (state, action) => {
  switch (action.type) {
    case "toggle": {
      return {
        open: !state.open,
      };
    }
    case "close": {
      return {
        open: false,
      };
    }
    default: {
      throw new Error(`Unabled action type: ${action.type}`);
    }
  }
};

// PROVIDER
export const SideBarProvider = ({ children }) => {
  // init states
  let initState = {
    open: false,
  };
  const [sideBarState, sideBarDispatch] = useReducer(sideBarReducer, initState);

  const value = { sideBarState, sideBarDispatch };
  return (
    <SideBarContext.Provider value={value}>{children}</SideBarContext.Provider>
  );
};

// CONSUMER
export const useSideBar = () => {
  const context = useContext(SideBarContext);
  if (context === undefined) {
    throw new Error("useAuth must be used withid a AuthProvider");
  }
  return context;
};
