import React from "react";
import { useSideBar } from "../../context/SidebarContext";
import { Hamburger } from "../svgs/DashboardIcons";

const Logs = () => {
  // sideBar State
  const { sideBarDispatch } = useSideBar();
  return (
    <div className="ml-auto min-h-screen lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
      {/* Top bar */}
      <div className="sticky z-10 top-0 h-16 border-b bg-white lg:py-2.5">
        <div className="px-6 flex items-center justify-between space-x-4 2xl:container">
          <h5 hidden className="text-2xl text-gray-600 font-medium lg:block">
            All Logs
          </h5>
          <button
            className="w-12 h-16 -mr-2 border-r lg:hidden"
            onClick={() => sideBarDispatch({ type: "toggle" })}
          >
            <Hamburger />
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="px-6 pt-6 2xl:container">
        <div className="flex justify-start flex-col min-h-[80vh] border-gray-300 rounded-xl"></div>
      </div>
    </div>
  );
};

export default Logs;
