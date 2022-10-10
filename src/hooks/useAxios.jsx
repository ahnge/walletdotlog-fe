import axios from "axios";
import dayjs from "dayjs";
import { useAuth } from "../context/AuthContext";

export const baseURL = "https://walletdotlog.onrender.com/";

const useAxios = () => {
  // auth states
  const { authState, authDispatch } = useAuth();

  // create axios instance with base config
  const axiosInstance = axios.create({
    baseURL,
    timeout: 10000,
  });

  // intercept the axios instance
  axiosInstance.interceptors.request.use(async (config) => {
    if (!authState.user) return config;
    console.log("i passed");
    const isExpired = dayjs.unix(authState.user?.exp).diff(dayjs()) < 1;
    if (!isExpired) {
      console.log("token is not expired");
      config.headers.Authorization = `Bearer ${authState.access_token}`;
      return config;
    }
    console.log("token expired \t refreshing...");

    const response = await axios.post(`${baseURL}dj-rest-auth/token/refresh/`, {
      refresh: authState.refresh_token,
    });
    console.log("token refresh res", response);
    if (response.status === 200) {
      config.headers.Authorization = `Bearer ${response.data.access}`;
      localStorage.setItem(
        "access_token",
        JSON.stringify(response.data.access)
      );
      localStorage.setItem(
        "refresh_token",
        JSON.stringify(response.data.refresh)
      );
      authDispatch({ type: "refresh", payload: response.data });
    }

    return config;
  });

  return axiosInstance;
};

export default useAxios;
