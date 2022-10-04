import React, { useState } from "react";
// import { useWallet } from "../../context/WalletContext";
import useAxios from "../../hooks/useAxios";
import { SearchIcon } from "../svgs/DashboardIcons";

const Search = ({ setLogs, setLoadingLogs, currentPage, setTotalCount }) => {
  // local states
  const [search, setSearch] = useState("");

  // walletState
  // const { walletState } = useWallet();

  // intercepted axios
  const axiosInstance = useAxios();

  const handleSubmit = () => {};

  // functions
  // const getLogs = async (id) => {
  //   setLoadingLogs(true);
  //   const res = await ai.get(
  //     `/api/wallet/${id}/log/list-create/?page=${currentPage}&search=${search}`
  //   );
  //   console.log("getLogs success in logs");
  //   console.log(`walletId in logs: ${id} logs`, res);
  //   setLogs(res.data.results);
  //   setTotalCount(res.data.count);
  //   setLoadingLogs(false);
  // };

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   if (walletState.currentWallet) {
  //     getLogs(walletState.currentWallet.id).catch((err) =>
  //       console.log("get logs err", err)
  //     );
  //   }
  //   setSearch("");
  // };

  return (
    <form className="form-control" onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          placeholder="Search…"
          className="input input-bordered input-sm sm:input-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-sm sm:btn-md" type="submit">
          <SearchIcon />
        </button>
      </div>
    </form>
  );
};

export default Search;
