import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../context/GlobalContext";
import { Hamburger } from "../svgs/DashboardIcons";
import useAxios from "../../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import Table from "../Table";
import Pagination from "../Pagination";
import Search from "./Search";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const Logs = () => {
  // local states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(null);

  const [search, setSearch] = useState("");

  // sideBar State
  const { globalState, globalDispatch } = useGlobalContext();

  // intercepted axios
  const axiosInstance = useAxios();

  const queryClient = useQueryClient();

  const wallets = queryClient.getQueryData(["wallets"]);

  const navigate = useNavigate();

  // functions;
  const handleChange = (e) => {
    const newW = wallets.filter((w) => w.name === e.target.value);
    globalDispatch({ type: "setCurrentWallet", payload: newW[0] });
    setCurrentPage(1);
    setSearch("");
  };

  const getAllLogs = ({ queryKey }) => {
    const id = queryKey[1];
    const page = queryKey[2];
    return axiosInstance
      .get(`api/wallet/${id}/log/list-create/?page=${page}`)
      .then((res) => res.data);
  };

  const { status, data } = useQuery(
    ["allLogs", globalState.currentWallet.id, currentPage],
    getAllLogs,
    {
      onSuccess: (data) => {
        setTotalCount(data.count);
      },
      enabled: !!globalState.currentWallet.id,
      keepPreviousData: true,
    }
  );

  // useEffects
  // Don't come to this route if you don't own a wallet
  useEffect(() => {
    if (!globalState.currentWallet.id) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className="ml-auto min-h-screen lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
      {/* Top bar */}
      <div className="sticky z-30 top-0 h-16 border-b bg-white lg:py-2.5">
        <div className="px-6 flex items-center justify-between space-x-4 2xl:container">
          <h5 hidden className="text-2xl text-gray-600 font-medium lg:block">
            All Logs
          </h5>
          <button
            className="w-12 h-16 -mr-2 border-r lg:hidden"
            onClick={() => globalDispatch({ type: "toggle" })}
          >
            <Hamburger />
          </button>
          <Search
            currentPage={currentPage}
            setTotalCount={setTotalCount}
            search={search}
            setSearch={setSearch}
          />
        </div>
      </div>

      {/* Main */}
      <div className="px-6 pt-6 2xl:container">
        <div className="flex justify-start flex-col min-h-[80vh] border-gray-300 rounded-xl">
          {/* Button */}
          {wallets?.length > 1 && (
            <select
              className="select select-secondary w-full max-w-md"
              defaultValue={
                globalState.currentWallet
                  ? globalState.currentWallet.name
                  : "Change wallet"
              }
              onChange={handleChange}
            >
              <option disabled>Change wallet</option>
              {wallets?.map((w, index) => {
                return <option key={index}>{w.name}</option>;
              })}
            </select>
          )}
          {/* Table */}
          <Table
            logs={data?.results}
            loadingLogs={status === "loading"}
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
