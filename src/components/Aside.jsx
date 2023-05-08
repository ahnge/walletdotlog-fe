import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "./svgs/Logo";
import {
  FourDots,
  LogoutIcon,
  ReportIcon,
  SettingIcon,
} from "./svgs/DashboardIcons";
import axios from "axios";
import { useGlobalContext } from "../context/GlobalContext";

const Aside = () => {
  // auth state
  const { authState, authDispatch } = useAuth();
  const { globalState, globalDispatch } = useGlobalContext();

  const location = useLocation();
  const navigate = useNavigate();

  // functions
  const handleLogout = () => {
    const blacklistToken = async () => {
      const res = await axios.post(
        "https://api.walletdotlog.site/dj-rest-auth/logout/"
      );
      console.log("logout success", res);
      authDispatch({ type: "logout" });
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      navigate("/");
    };
    blacklistToken().catch((err) => console.log("logout err", err));
  };

  // variables
  const navs = [
    { route: "/dashboard", name: "Dashboard", icon: <FourDots /> },
    { route: "/dashboard/logs", name: "Logs", icon: <ReportIcon /> },
    { route: "/dashboard/settings", name: "Settings", icon: <SettingIcon /> },
  ];

  return (
    <aside
      className={`ml-[-100%] fixed z-50 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%] ${
        globalState.open ? "ml-0" : ""
      }`}
    >
      <div className="relative">
        <button
          className="btn-circle btn absolute top-10 right-0 lg:hidden"
          onClick={() => globalDispatch({ type: "toggle" })}
        >
          X
        </button>
        <div className="-mx-6 px-6 py-4">
          <Link to="/" className="flex justify-start lg:justify-center mt-8">
            <Logo />
          </Link>
        </div>

        <div className="mt-8 text-center">
          <img
            src={authState.user.profile_img}
            alt="Profile"
            className="w-10 h-10 m-auto rounded-full object-cover lg:block lg:w-28 lg:h-28"
          />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
            {authState.user.full_name}
          </h5>
          <span className="hidden text-gray-400 lg:block">Admin</span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          {navs.map((n, index) => {
            return (
              <li key={index}>
                <Link
                  to={n.route}
                  aria-label={n.name}
                  className={`btn gap-2 btn-block ${
                    location.pathname === n.route ? "btn-active" : "btn-outline"
                  } ${
                    !globalState.currentWallet.id && n.name === "Logs"
                      ? "btn-disabled"
                      : ""
                  }`}
                  onClick={() => globalDispatch({ type: "close" })}
                >
                  {n.icon}
                  <span className="-mr-1 font-medium">{n.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <button
          className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
          onClick={handleLogout}
        >
          <LogoutIcon />
          <span className="group-hover:text-gray-700">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Aside;
