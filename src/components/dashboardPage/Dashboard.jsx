import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { Hamburger } from "../svgs/DashboardIcons";
import { useNavigate, Link } from "react-router-dom";
import AddLogForm from "./AddLogForm";
import AddWalletForm from "./AddWalletForm";
import SubstractLogForm from "./SubstractLogForm";
import Table from "../Table";
import { useAuth } from "../../context/AuthContext";
import Alert from "../Alert";
import { useSideBar } from "../../context/SidebarContext";
import { useQuery, useMutation } from "@tanstack/react-query";

const Dashboard = () => {
  // local states
  const [currentWallet, setCurrentWallet] = useState({});

  const [walletFormOpen, setWalletFormOpen] = useState(false);
  const [pulsLogFormOpen, setPlusLogFormOpen] = useState(false);
  const [minusLogFormOpen, setMinusLogFormOpen] = useState(false);

  // const [logs, setLogs] = useState([]);

  // const [loadingWallets, setLoadingWallets] = useState(false);
  // const [loadingLogs, setLoadingLogs] = useState(true);

  // local states -- alert
  // const [addWalletSuccess, setAddWalletSuccess] = useState(false);
  // const [addWalletErr, setAddWalletErr] = useState(false);
  // const [addLogSuccess, setAddLogSuccess] = useState(false);
  // const [substractLogSuccess, setSubstractLogSuccess] = useState(false);
  // const [addLogErr, setAddLogErr] = useState(false);
  // const [substractLogErr, setSubstractLogErr] = useState(false);
  // const [insufficientErr, setInsufficientErr] = useState(false);

  // auth state
  const { authDispatch } = useAuth();
  // sideBar state
  const { sideBarDispatch } = useSideBar();
  // wallet state
  // const { walletState, walletDispatch } = useWallet();

  // navigate
  const navigate = useNavigate();

  // intercepted axios
  const axiosInstance = useAxios();

  const getWallets = () => {
    return axiosInstance.get("api/wallet/list-create/").then((res) => res.data);
  };

  const getLogs = ({ queryKey }) => {
    const id = queryKey[1];
    return axiosInstance
      .get(`api/wallet/${id}/log/list/latest/`)
      .then((res) => res.data);
  };

  const {
    status: walletsStatus,
    data: wallets,
    error: walletsError,
  } = useQuery(["wallets"], getWallets, {
    onSuccess: (data) => {
      if (data.length > 0 && !currentWallet.id) setCurrentWallet(data[0]);
    },
  });

  const {
    status: logsStatus,
    data: logs,
    error: logsError,
  } = useQuery(["logs", currentWallet.id], getLogs, {
    enabled: !!currentWallet.id,
  });

  const handleChange = (e) => {
    const newW = wallets.filter((w) => w.name === e.target.value);
    setCurrentWallet(newW[0]);
  };

  return (
    <>
      {/* Alert */}
      <div className="fixed top-20 right-10 w-fit z-50 transition duration-500 flex flex-col space-y-3">
        {/* {addWalletSuccess && (
          <Alert text="Add wallet success!" type="success" />
        )}
        {(addWalletErr || addLogErr || substractLogErr) && (
          <Alert text="Something went wrong!" type="error" />
        )}
        {addLogSuccess && <Alert text="Add log success!" type="success" />}
        {substractLogSuccess && (
          <Alert text="Substract log success!" type="success" />
        )}
        {insufficientErr && (
          <Alert
            text="You can't substract more than what you have!!"
            type="warning"
          />
        )} */}
      </div>

      <div className="ml-auto min-h-screen lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        {/* Top bar */}
        <div className="sticky z-10 top-0 h-16 border-b bg-white lg:py-2.5">
          <div className="px-6 flex items-center justify-between space-x-4 2xl:container">
            <h5 hidden className="text-2xl text-gray-600 font-medium lg:block">
              Dashboard
            </h5>
            <button
              className="w-12 h-16 -mr-2 border-r lg:hidden"
              onClick={() => sideBarDispatch({ type: "toggle" })}
            >
              <Hamburger />
            </button>
          </div>
        </div>
        {/* Top bar end */}

        {/* Main */}
        <div className="px-6 pt-6 2xl:container">
          <div className="flex justify-start py-10 flex-col min-h-[80vh] border-gray-300 rounded-xl">
            {/* Card */}
            <div className="flex flex-col md:flex-row md:space-x-10">
              {walletsStatus == "loading" && (
                <div className="card w-full max-w-sm h-fit bg-white shadow-xl">
                  <div className="card-body animate-pulse">
                    <h2 className="font-bold text-2xl bg-slate-200 text-slate-200 w-fit">
                      Name
                    </h2>
                    <div className="stat">
                      <div className="stat-title bg-slate-200 text-slate-200 w-fit">
                        current balance
                      </div>
                      <div className="stat-value bg-slate-200 text-slate-200 mt-3">
                        Ks 000
                      </div>
                      <div className="mt-5 flex justify-start space-x-3">
                        <button className="btn-circle bg-slate-200 text-slate-200">
                          +
                        </button>
                        <button className="btn-circle bg-slate-200 text-slate-200">
                          -
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {walletsStatus === "success" && wallets.length > 0 ? (
                <div className="card w-full max-w-sm h-fit bg-white shadow-xl">
                  <div className="card-body">
                    <h2 className="font-bold text-2xl">{currentWallet.name}</h2>
                    <div className="stat">
                      <div className="stat-title">Current balance</div>
                      <div className="stat-value">
                        Ks {currentWallet.amount}
                      </div>
                      <div className="mt-5 flex justify-start space-x-3">
                        <button
                          className={`btn btn-circle text-2xl ${
                            !currentWallet ? "disabled" : ""
                          }`}
                          onClick={() => setPlusLogFormOpen((p) => !p)}
                        >
                          +
                        </button>
                        <button
                          className={`btn btn-circle text-2xl ${
                            !currentWallet ? "disabled" : ""
                          }`}
                          onClick={() => setMinusLogFormOpen((p) => !p)}
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="card-body">
                  <h2 className="font-bold text-2xl">You have no wallet.</h2>
                </div>
              )}

              {/* Button group */}
              <div className="mt-8 space-y-3 flex flex-col">
                <button
                  className={`btn w-fit ${
                    walletsStatus === "loading" ? " btn-disabled" : ""
                  }`}
                  onClick={() => setWalletFormOpen((p) => !p)}
                >
                  Add wallet
                </button>
                {walletsStatus === "success" && wallets.length > 1 && (
                  <select
                    className="select select-secondary w-full max-w-md"
                    defaultValue="Change wallet"
                    onChange={handleChange}
                  >
                    <option disabled>Change wallet</option>
                    {wallets.map((w) => {
                      return <option key={w.id}>{w.name}</option>;
                    })}
                  </select>
                )}
              </div>
            </div>
            {/* Card end */}

            {currentWallet.id && (
              <Table
                logs={logs}
                loadingLogs={logsStatus === "loading"}
                title="Latest logs"
                loadingRows={8}
              />
            )}
            {/* <Link to={"/dashboard/logs"} className="btn w-fit">
              See more
            </Link> */}
          </div>
        </div>

        {walletFormOpen && (
          <AddWalletForm setWalletFormOpen={setWalletFormOpen} />
        )}

        {pulsLogFormOpen && (
          <AddLogForm
            setPlusLogFormOpen={setPlusLogFormOpen}
            currentWallet={currentWallet}
            setCurrentWallet={setCurrentWallet}
          />
        )}

        {minusLogFormOpen && (
          <SubstractLogForm
            setMinusLogFormOpen={setMinusLogFormOpen}
            currentWallet={currentWallet}
            setCurrentWallet={setCurrentWallet}
          />
        )}
      </div>
    </>
  );
};

export default Dashboard;
