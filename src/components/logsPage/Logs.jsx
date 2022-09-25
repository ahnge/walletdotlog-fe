import React, { useState, useEffect } from "react";
import { useSideBar } from "../../context/SidebarContext";
import { useWallet } from "../../context/WalletContext";
import { Hamburger } from "../svgs/DashboardIcons";
import useAxios from "../../utils/useAxios";
import { useNavigate } from "react-router-dom";
import Table from "../Table";
import Pagination from "../Pagination";
import Search from "./Search";

const Logs = () => {
  // local states
  const [logs, setLogs] = useState([]);
  const [loadingLogs, setLoadingLogs] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(null);

  // sideBar State
  const { sideBarDispatch } = useSideBar();
  // wallet State
  const { walletState, walletDispatch } = useWallet();

  // intercepted axios
  const ai = useAxios();

  const navigate = useNavigate();

  // functions
  const handleChange = (e) => {
    console.log("hi", e.target.value);
    const newW = walletState.wallets.filter((w) => w.name === e.target.value);
    walletDispatch({ type: "setCurrentWallet", payload: newW[0] });
    setCurrentPage(1);
  };

  const getLogs = async (id) => {
    setLoadingLogs(true);
    const res = await ai.get(
      `/api/wallet/${id}/log/list-create/?page=${currentPage}`
    );
    console.log("getLogs success in logs");
    console.log(`walletId in logs: ${id} logs`, res);
    setLogs(res.data.results);
    setTotalCount(res.data.count);
    setLoadingLogs(false);
  };

  // useEffects
  // Don't come to this route if you don't own a wallet
  useEffect(() => {
    if (walletState.wallets.length < 1) {
      navigate("/dashboard");
    }
  }, []);

  // get the logs if there is a wallet to show
  useEffect(() => {
    if (walletState.currentWallet) {
      getLogs(walletState.currentWallet.id);
    }
  }, [walletState.currentWallet, currentPage]);

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
          <Search
            currentPage={currentPage}
            setLogs={setLogs}
            setLoadingLogs={setLoadingLogs}
            setTotalCount={setTotalCount}
          />
        </div>
      </div>

      {/* Main */}
      <div className="px-6 pt-6 2xl:container">
        <div className="flex justify-start flex-col min-h-[80vh] border-gray-300 rounded-xl">
          {/* Button */}
          {walletState.wallets.length > 1 && (
            <select
              className="select select-secondary w-full max-w-md"
              defaultValue={
                walletState.currentWallet
                  ? walletState.currentWallet.name
                  : "Change wallet"
              }
              onChange={handleChange}
            >
              <option disabled>Change wallet</option>
              {walletState.wallets.map((w, index) => {
                return <option key={index}>{w.name}</option>;
              })}
            </select>
          )}
          {/* Table */}
          <Table
            logs={logs}
            loadingLogs={loadingLogs}
            title="All logs"
            loadingRows={14}
          />
          <Pagination
            currentPage={currentPage}
            totalCount={totalCount}
            pageSize={8}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default Logs;
