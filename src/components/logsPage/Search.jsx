import React, { useState } from "react";
import useAxios from "../../hooks/useAxios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { SearchIcon } from "../svgs/DashboardIcons";
import { useGlobalContext } from "../../context/GlobalContext";

const Search = ({ currentPage, setTotalCount, search, setSearch }) => {
  // local states
  const [goFind, setGoFind] = useState(false);

  const { globalState } = useGlobalContext();

  // intercepted axios
  const axiosInstance = useAxios();

  const queryClient = useQueryClient();

  const getSearchLogs = ({ queryKey }) => {
    const id = queryKey[1];
    return axiosInstance
      .get(`api/wallet/${id}/log/list-create/?search=${search}`)
      .then((res) => res.data);
  };

  const { data, status } = useQuery(
    ["searchLogs", globalState.currentWallet.id],
    getSearchLogs,
    {
      onSuccess: (data) => {
        queryClient.setQueryData(
          ["allLogs", globalState.currentWallet.id, currentPage],
          () => data
        );
        setTotalCount(data.count);
      },
      enabled: !!goFind,
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setGoFind(true);
    setTimeout(() => {
      setGoFind(false);
    }, 1000);
  };

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
