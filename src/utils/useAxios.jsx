import axios from "axios";
import dayjs from "dayjs";
import { useAuth } from "../context/AuthContext";

const baseURL = "http://127.0.0.1:8000";

const useAxios = () => {
  // auth states
  const { authState, authDispatch } = useAuth();

  // create axios instance with base config
  const axiosInstance = axios.create({
    baseURL,
    timeout: 5000,
    headers: {
      Authorization: `Bearer ${authState.authTokens?.access}`,
    },
  });

  // intercept the axios instance
  axiosInstance.interceptors.request.use(async (config) => {
    // check if the access token is expire
    // if not ; just return the ai instance with default config
    // if yes ; get new tokens and update the auth state and localstorage
    // also update the headers of the axios req
    const isExpired = dayjs.unix(authState.user?.exp).diff(dayjs()) < 1;
    if (!isExpired) return config;

    const response = await axios.post(`${baseURL}/api/token/refresh/`, {
      refresh: authState.authTokens.refresh,
    });
    authDispatch({ type: "updateAccessToken", payload: response.data });
    console.log(response);
    localStorage.setItem(
      "authTokens",
      JSON.stringify({
        refresh: authState.authTokens.refresh,
        access: response.data.access,
      })
    );
    config.headers.Authorization = `Bearer ${response.data.access}`;

    return config;
  });

  return axiosInstance;
};

export default useAxios;
