import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../svgs/Logo";
import useAxios from "../../utils/useAxios";
import { FourDots, Hamburger, LogoutIcon } from "../svgs/DashboardIcons";
import Aside from "./Aside";
import Table from "./Table";

const Dashboard = () => {
  // local states
  const [sideBarOpen, setSideBarOpen] = useState(false);

  // intercepted axios
  const ai = useAxios();

  useEffect(() => {
    const getWallets = async () => {
      const res = await ai.get("/api/wallet/list-create/");
      console.log(res);
    };
    // getWallets();
  }, []);

  return (
    <>
      <Aside sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} />
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
              <div className="card w-full max-w-sm h-fit bg-white shadow-xl">
                <div className="card-body">
                  <h2 className="font-bold text-2xl">Wallet name</h2>
                  <div className="stat">
                    <div className="stat-title">Current balance</div>
                    <div className="stat-value">$89,400</div>
                    <div className="mt-5 flex justify-start space-x-3">
                      <button className="btn btn-circle text-2xl">+</button>
                      <button className="btn btn-circle text-2xl">-</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Button group */}
              <div className="mt-8 space-y-3">
                <button className="btn">Add wallet</button>
                <div className="form-control">
                  <div className="input-group">
                    <select className="select select-bordered">
                      <option disabled selected>
                        Change wallet
                      </option>
                      <option>T-shirts</option>
                      <option>Mugs</option>
                    </select>
                    <button className="btn">Change</button>
                  </div>
                </div>
              </div>
            </div>

            <Table />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
