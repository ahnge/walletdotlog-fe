import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import useAxios from "../../utils/useAxios";
import Logo from "../svgs/Logo";
import { FourDots, LogoutIcon } from "../svgs/DashboardIcons";

const Aside = ({ sideBarOpen, setSideBarOpen, handleLogout }) => {
  // auth state
  const { authState } = useAuth();

  return (
    <aside
      className={`ml-[-100%] fixed z-20 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%] ${
        sideBarOpen ? "ml-0" : ""
      }`}
    >
      <div className="relative">
        <button
          className="btn-circle btn absolute top-10 right-0 lg:hidden"
          onClick={() => setSideBarOpen((p) => !p)}
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
            alt="Profile Image"
            className="w-10 h-10 m-auto rounded-full object-cover lg:block lg:w-28 lg:h-28"
          />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
            {authState.user.full_name}
          </h5>
          <span className="hidden text-gray-400 lg:block">Admin</span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          <li>
            <a
              href="#"
              aria-label="dashboard"
              className="btn btn-outline hover:opacity-80 gap-2 btn-block"
            >
              <FourDots />
              <span className="-mr-1 font-medium">Dashboard</span>
            </a>
          </li>
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
