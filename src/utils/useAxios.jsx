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
      Authorization: `Bearer ${authState.access_token}`,
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
    console.log("token expired \t refreshing...");

    const response = await axios.post(
      `${baseURL}/dj-rest-auth/token/refresh/`,
      {
        refresh: authState.refresh_token,
      }
    );
    console.log(response);
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
