import React, { useEffect, useState } from "react";
import useAxios from "../../utils/useAxios";
import { Hamburger } from "../svgs/DashboardIcons";
import { useNavigate } from "react-router-dom";
import AddLogForm from "./AddLogForm";
import AddWalletForm from "./AddWalletForm";
import Aside from "./Aside";
import SubstractLogForm from "./SubstractLogForm";
import Table from "./Table";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import Alert from "../Alert";

const Dashboard = () => {
  // local states
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [walletFormOpen, setWalletFormOpen] = useState(false);
  const [pulsLogFormOpen, setPlusLogFormOpen] = useState(false);
  const [minusLogFormOpen, setMinusLogFormOpen] = useState(false);

  const [wallets, setWallets] = useState([]);
  const [logs, setLogs] = useState([]);
  const [currentWallet, setCurrentWallet] = useState(null);

  // local states -- alert
  const [addWalletSuccess, setAddWalletSuccess] = useState(false);
  const [addWalletErr, setAddWalletErr] = useState(false);
  const [addLogSuccess, setAddLogSuccess] = useState(false);
  const [substractLogSuccess, setSubstractLogSuccess] = useState(false);
  const [addLogErr, setAddLogErr] = useState(false);
  const [substractLogErr, setSubstractLogErr] = useState(false);

  // auth state
  const { authState, authDispatch } = useAuth();

  // navigate
  const navigate = useNavigate();

  // intercepted axios
  const ai = useAxios();

  // functions
  const handleLogout = () => {
    const blacklistToken = async () => {
      const res = await axios.post(
        "http://localhost:8000/dj-rest-auth/logout/"
      );
      console.log("logout success", res);
      authDispatch({ type: "logout" });
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      navigate("/");
    };
    blacklistToken().catch((err) => console.log("logout err", err));
  };

  const handleChange = (e) => {
    console.log("hi", e.target.value);
    const newW = wallets.filter((w) => w.name === e.target.value);
    setCurrentWallet(newW[0]);
  };

  const getWallets = async () => {
    const res = await ai.get("/api/wallet/list-create/");
    console.log("getWallets success", res);
    setWallets(res.data);
    if (res.data.length > 0 && !currentWallet) {
      setCurrentWallet(res.data[0]);
      getLogs(res.data[0].id).catch((err) => console.error("getLogsErr", err));
    }
  };

  const getLogs = async (id) => {
    const res = await ai.get(`/api/wallet/${id}/log/list-create/`);
    console.log("getLogs success");
    console.log(`walletId: ${id} logs`, res);
    setLogs(res.data);
  };

  useEffect(() => {
    getWallets().catch((err) => {
      console.log("get wallet err", err);
      handleLogout();
    });
  }, []);

  useEffect(() => {
    if (currentWallet) {
      getLogs(currentWallet.id);
    }
  }, [currentWallet]);

  return (
    <>
      {/* Alert */}
      <div className="fixed top-20 right-10 w-fit transition duration-500 flex flex-col space-y-3">
        {addWalletSuccess && (
          <Alert text="Add wallet success!" type="success" />
        )}
        {(addWalletErr || addLogErr || substractLogErr) && (
          <Alert text="Something went wrong!" type="error" />
        )}
        {addLogSuccess && <Alert text="Add log success!" type="success" />}
        {substractLogSuccess && (
          <Alert text="Substract log success!" type="success" />
        )}
      </div>

      <Aside
        sideBarOpen={sideBarOpen}
        setSideBarOpen={setSideBarOpen}
        handleLogout={handleLogout}
      />
      <div className="ml-auto h-screen lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        {/* Top bar */}
        <div className="sticky top-0 h-16 border-b bg-white lg:py-2.5">
          <div className="px-6 flex items-center justify-between space-x-4 2xl:container">
            <h5 hidden className="text-2xl text-gray-600 font-medium lg:block">
              Dashboard
            </h5>
            <button
              className="w-12 h-16 -mr-2 border-r lg:hidden"
              onClick={() => setSideBarOpen((p) => !p)}
            >
              <Hamburger />
            </button>
          </div>
        </div>

        {/* Main */}
        <div className="px-6 pt-6 2xl:container">
          <div className="flex justify-start flex-col h-[80vh] border-gray-300 rounded-xl">
            <div className="flex flex-col md:flex-row md:space-x-10">
              {/* Card */}
              {wallets.length > 0 ? (
                <div className="card w-full max-w-sm h-fit bg-white shadow-xl">
                  <div className="card-body">
                    <h2 className="font-bold text-2xl">{currentWallet.name}</h2>
                    <div className="stat">
                      <div className="stat-title">Current balance</div>
                      <div className="stat-value">
                        Ks {currentWallet.amount.toLocaleString()}
                      </div>
                      <div className="mt-5 flex justify-start space-x-3">
                        <button
                          className="btn btn-circle text-2xl"
                          onClick={() => setPlusLogFormOpen((p) => !p)}
                        >
                          +
                        </button>
                        <button
                          className="btn btn-circle text-2xl"
                          onClick={() => setMinusLogFormOpen((p) => !p)}
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="card w-full max-w-sm h-fit bg-white shadow-xl">
                  <div className="card-body">
                    <h2 className="font-bold text-2xl">You have no wallet.</h2>
                  </div>
                </div>
              )}

              {/* Button group */}
              <div className="mt-8 space-y-3 flex flex-col">
                <button
                  className="btn w-fit"
                  onClick={() => setWalletFormOpen((p) => !p)}
                >
                  Add wallet
                </button>
                {wallets.length > 1 && (
                  <select
                    className="select select-secondary w-full max-w-md"
                    defaultValue="Change wallet"
                    onChange={handleChange}
                  >
                    <option disabled>Change wallet</option>
                    {wallets.map((w, index) => {
                      return <option key={index}>{w.name}</option>;
                    })}
                  </select>
                )}
              </div>
            </div>

            <Table logs={logs} />
          </div>
        </div>

        {walletFormOpen && (
          <AddWalletForm
            setWalletFormOpen={setWalletFormOpen}
            setAddWalletSuccess={setAddWalletSuccess}
            setAddWalletErr={setAddWalletErr}
            getWallets={getWallets}
            handleLogout={handleLogout}
          />
        )}

        {pulsLogFormOpen && (
          <AddLogForm
            setPlusLogFormOpen={setPlusLogFormOpen}
            setAddLogSuccess={setAddLogSuccess}
            setAddLogErr={setAddLogErr}
            currentWallet={currentWallet}
            getLogs={getLogs}
          />
        )}

        {minusLogFormOpen && (
          <SubstractLogForm
            setMinusLogFormOpen={setMinusLogFormOpen}
            setSubstractLogSuccess={setSubstractLogSuccess}
            setSubstractLogErr={setSubstractLogSuccess}
            currentWallet={currentWallet}
            getLogs={getLogs}
          />
        )}
      </div>
    </>
  );
};

export default Dashboard;
