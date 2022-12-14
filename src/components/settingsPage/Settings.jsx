import { Wallets } from "./Wallets";
import { UserDetail } from "./UserDetail";
import React, { useState } from "react";
import { Hamburger } from "../svgs/DashboardIcons";
import { useQueryClient } from "@tanstack/react-query";
import { useGlobalContext } from "../../context/GlobalContext";

const Settings = () => {
  const { globalDispatch } = useGlobalContext();

  const queryClient = useQueryClient();

  const [wallets, setWallets] = useState(
    queryClient.getQueryData(["wallets"]) || []
  );

  return (
    <div className="ml-auto min-h-screen lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
      {/* Top bar */}
      <div className="sticky z-30 top-0 h-16 border-b bg-white lg:py-2.5">
        <div className="px-6 flex items-center justify-between space-x-4 2xl:container">
          <h5 hidden className="text-2xl text-gray-600 font-medium lg:block">
            Settings
          </h5>
          <button
            className="w-12 h-16 -mr-2 border-r lg:hidden"
            onClick={() => globalDispatch({ type: "toggle" })}
          >
            <Hamburger />
          </button>
        </div>
      </div>
      {/* Top bar end */}

      <div className="px-6 2xl:container">
        <div className="flex justify-start flex-col space-y-10 min-h-[80vh] border-gray-300 rounded-xl py-10">
          <UserDetail />
          {parseInt(wallets?.length) > 0 && (
            <Wallets wallets={wallets} setWallets={setWallets} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
