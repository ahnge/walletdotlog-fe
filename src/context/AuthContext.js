import jwt_decode from "jwt-decode";
import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

// reducer function for dispatchs
const authReducer = (state, action) => {
  switch (action.type) {
    case "setInfos": {
      return {
        access_token: action.payload.access_token,
        refresh_token: action.payload.refresh_token,
        user: jwt_decode(action.payload.access_token),
      };
    }
    case "logout": {
      return {
        access_token: null,
        refresh_token: null,
        user: null,
      };
    }
    case "refresh": {
      return {
        access_token: action.payload.access,
        refresh_token: action.payload.refresh,
        user: jwt_decode(action.payload.access),
      };
    }
    default: {
      throw new Error(`Unabled action type: ${action.type}`);
    }
  }
};

// PROVIDER
export const AuthProvider = ({ children }) => {
  const access_token = JSON.parse(localStorage.getItem("access_token")) || null;
  const refresh_token =
    JSON.parse(localStorage.getItem("refresh_token")) || null;
  let user = null;
  if (access_token) {
    user = jwt_decode(access_token);
  }

  // init states
  let initState = {
    access_token,
    refresh_token,
    user,
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
