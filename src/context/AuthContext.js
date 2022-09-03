import jwt_decode from "jwt-decode";
import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

// reducer function for dispatchs
const authReducer = (state, action) => {
  switch (action.type) {
    case "setTokens": {
      return {
        user: jwt_decode(action.payload.access),
        authTokens: action.payload,
      };
    }
    case "logout": {
      return {
        user: null,
        authTokens: null,
      };
    }
    default: {
      throw new Error(`Unabled action type: ${action.type}`);
    }
  }
};

// PROVIDER
export const AuthProvider = ({ children }) => {
  const authTokens = JSON.parse(localStorage.getItem("authTokens")) || null;
  // init states
  let initState = {
    user: authTokens ? jwt_decode(authTokens.access) : null,
    authTokens,
  };
  const [authState, authDispatch] = useReducer(authReducer, initState);

  const value = { authState, authDispatch };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// CONSUMER
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used withid a AuthProvider");
  }
  return context;
};
